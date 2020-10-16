<template>
	<div>
		<div>
			<div id="app">
				<div ref="target" id="target" class="hover">
					<table id="table">
						<tr v-for="data in tableData">
							<td v-for="row in data">{{row}}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div>
			<!-- Agences isolées -->
			<h4 class="card-header">Agences isolées</h4>
			<el-button id="myButton" type="primary" class="button" @click="changeButton()">Importer</el-button>
			<modal class="modal" name="importModal">
				<div class="fileupload" :class="{ 'fileupload--slim': slim }">
					<base-button v-if="slim">
						<slot :files="files">{{ title }}</slot>
					</base-button>
					<div v-else class="fileupload__help">
						<slot :files="files">
							<span>Glisser-Déposer un fichier</span>
							<br />
							<span>ou</span>
							<br />
							<span>Cliquer dans la fenêtre pour choisir un fichier</span>
							<br />
							<span class="fileupload__description">{{ description }}</span>
						</slot>
					</div>
					<input
						multiple
						:slim="true"
						accept=".xlsx, .xls, .xlsm"
						type="file"
						:loading="loading"
						ref="excel-upload-input"
						class="fileupload__file"
						@change="fileSelected"
					/>
				</div>
				<el-button type="primary" class="button-ok" @click="ok">OK</el-button>
			</modal>
			<!-- Fin agenc es isolées-->
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import Axios from 'axios';
import { importSpecifier, thisTypeAnnotation, identifier } from 'babel-types';
import readXlsxFile from 'read-excel-file';
import { setTimeout } from 'timers';
import { constants } from 'crypto';
import { log, isNull } from 'util';
import { arraySlugToHeader, arraySlugifier, arrayToJSON } from '../etlUtils';
import fs from 'fs';
import VModal from 'vue-js-modal';
import XLSX from 'xlsx';

Vue.use(VModal, { componentName: 'modal' });

export default {
	props: {
		slim: { type: Boolean, default: false },
		title: { type: String, default: '' },
	},

	data() {
		return {
			files: [],
			loading: false,
			state: {
				tickets: [{ name: 'test' }],
				headers: ['Test header'],
			},

			tableData: [],
			tableCleanData: [],
			tableRow: [],

			loading: false,

			// Données énumérées venant de l'API
			remoteEnum: {
				priorites: [],
				statut: [],
				enseignes: [],
				application_impactee: [],
			},

			// Données du formulaire agence
			agence: {
				references: '', //
				is_faux_incident: false, //
				date_debut: '', //
				date_fin: null, //
				description: '', //
				description_impact: '', //
				description_contournement: 'Aucun contournement', //
				is_contournement: false, //
				priorite_id: '', //
				statut_id: '', //
				enseigne_impactee: '',
				application_impactee: [],
				cause: '',
				is_agence: true,
				service_metier: '',
				observations: '',
			},
		};
	},

	methods: {
		//Permet de formater les dates
		// dateFormate(date) {
		// 	if (this.state.tickets == 'Début') {
		// 		const event = new Date(Date.UTC(date));
		// 		const options = {
		// 			day: '2-digit',
		// 			month: '2-digit',
		// 			year: 'numeric',
		// 		};
		// 		return event.toLocaleDateString(undefined, options);
		// 	} else {
		// 		console.log(date);
		// 	}
		// },

		//Permet de séléctionner un ou plusieurs fichiers et de les télécharger
		fileSelected(e) {
			const files = e.target.files;
			this.files = [...files];
			//console.log(files);
			const rawFile = files[0]; //Nom du fichier
			if (!rawFile) return;
			if (!this.isExcel(rawFile)) {
				this.$message.error(
					'support téléchargeable avec les suffixes .xlsx, .xlsm, .xls, .csv uniquement '
				);
				return false;
			}
			this.upload(rawFile);
			//console.log(rawFile);
		},

		//Change la fonctionnalité du bouton
		changeButton() {
			var change = document.getElementById('myButton');
			var getValueOfTableDiv = document.getElementById('table');

			if (getValueOfTableDiv.innerHTML == '') {
				change.onclick = this.importer();
				change.innerHTML = 'Sauvegarder';
			} else {
				change.onclick = this.submit();
			}
		},

		test() {
			alert('je fonctionne');
		},

		//ouvre la fenêtre modal
		importer() {
			this.$modal.show('importModal');
		},

		//ferme la fenêtre modal
		ok() {
			this.$modal.hide('importModal');
		},

		//permet de récupérer le(s) fichier(s) et de les envoyer en lecture
		upload(rawFile) {
			this.$refs['excel-upload-input'].value = null; // Permet de ne pas sélectionner le même excel

			//Voir si fonction nécessaire en réunion

			// if (!this.beforeUpload) {
			// 	this.readerData(rawFile);
			// 	return;
			// }
			// const before = this.beforeUpload(rawFile);
			// if (before) {

			this.readerData(rawFile);
			// }
		},
		// Permet de limiter la taille du fichier télécharger(voir si fonction nécessaire en réunion)
		// beforeUpload(file) {
		// 	console.log(file.size)
		// 	const isLt1M = file.size / 1024 / 1024 < 1;
		// 	if (isLt1M) {
		// 		return true;
		// 	}
		// 	this.$message({
		// 		message: 'Vous ne pouvez pas importer un fichier de plus de 1m.',
		// 		type: 'warning',
		// 	});
		// 	return false;
		// },

		//Permet de lire le(s) fichier(s) et de les enregistrers dans un ou des tableaux
		readerData(rawFile) {
			this.loading = true;
			return new Promise((resolve, reject) => {
				var reader = new FileReader(),
					name = rawFile.name,
					vm = this;
				reader.onload = e => {
					var data = e.target.result;
					var workbook = XLSX.read(data, { type: 'binary' });
					// console.log(workbook);
					// console.log(workbook.SheetNames.length);

					//Si le fichier Excel contient plusieurs feuilles
					if (workbook.SheetNames.length > 1) {
						//Enlève le premier élément du tableau dont on n'as pas besoin en lecture
						var unwantedSheetName = workbook.SheetNames.shift();
						for (var i = 0; i < workbook.SheetNames.length; i++) {
							// console.log('/////////////////////////');
							// console.log(workbook.SheetNames[i]);
							// console.log('/////////////////////////');
							//Récupère le nom du fichier
							var theSheetNames = workbook.SheetNames[i];
							// console.log(theSheetNames);
							//Récupère les données du fichier par rapport à son nom
							var theSheets = workbook.Sheets[theSheetNames];
							// console.log(theSheets);

							//Variable qui ne me sert pas pour le moment(à voir si modif du code nécessaire)
							// var temp = [];

							for (var row = 1; ; row++) {
								//Vérifie si la première cellule est vide
								if (theSheets['A' + row] == null) {
									break;
								}

								for (var col = 65; col <= 90; col++) {
									var c = String.fromCharCode(col); // get 'A', 'B', 'C' ...

									//Permet de récupérer les clés Excel comme "A1"
									var key = '' + c + row;
									if (theSheets[key] == null) {
										theSheets[key] = '';
									}

									vm.tableRow.push(theSheets[key]['w']);
								}
								vm.tableData.push(vm.tableRow);
								vm.tableRow = [];
								this.loading = false;
								resolve();
							}
						}
					} else {
						//Si le fichier contient une seul feuille
						// console.log(workbook);
						// console.log('ma taille est de 1');
						var sheetName = workbook.SheetNames[0];
						// console.log(sheetName);
						var sheet = workbook.Sheets[sheetName];
						// console.log(sheet);
						if (sheet[key] == undefined) {
						}
						var temp = [];
						for (var row = 1; ; row++) {
							if (sheet['A' + row] == null) {
								break;
							}

							for (var col = 65; col <= 90; col++) {
								var c = String.fromCharCode(col); // get 'A', 'B', 'C' ...
								var key = '' + c + row;
								if (sheet[key] == null) {
									sheet[key] = '';
								}
								// if (sheet[key] !== undefined) {
								// 	console.log(sheet[key]['w']);
								// }
								vm.tableRow.push(sheet[key]['w']);
							}

							vm.tableData.push(vm.tableRow);

							vm.tableRow = [];

							this.loading = false;
							resolve();
						}
					}
				};
				reader.readAsBinaryString(rawFile);
			});
		},

		//Permet de vérifier si le fichier à bien le suffixe nécessaire avant de l'importer
		isExcel(file) {
			return /\.(xlsx|xls|xlsm|csv)$/.test(file.name);
		},

		//////Partie Agence/////////
		submit() {
			console.log(this.tableData);

			Axios.get('http://localhost:5000/api/reference').then(response => {
				//On parcourt toutes les lignes du fichier Excel des agences
				// for (const row of rows) {
				// 	const reponse = response.data;
				//Si la référence existe déjà, ont la met à jours
				// if (rep.reference == row[0]) {
				// 	console.log(this.agence.references);
				// 	let date = row[1] + '';
				// 	let dateFin = row[2] + '';
				// 	let mois = '';
				// 	let moisFin = '';
				//On enregistre en base de données
				// this.$http
				// 	.put(
				// 		'http://localhost:5000/api/main-courante',
				// 		this.agence
				// 	)
				// 	.then(result => {
				// 		this.$message({
				// 			dangerouslyUseHTMLString: true,
				// 			message:
				// 				"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
				// 			type: 'success',
				// 		});
				// 	});
				// window.location.reload();
				// }
				//Sinon on effectue une insertion
				// else {
				//On exclu la première ligne du fichier Excel
				// if (row[0].includes('Réf')) {
				// 	console.log('je suis le ot Réf');
				// } else {
				// 	this.agence.references = row[0];
				// 	console.log('Références non identiques');
				// 	this.$http
				// 		.post(
				// 			'http://localhost:5000/api/creation-incident_main-courante',
				// 			this.agence
				// 		)
				// 		.then(result => {
				// 			this.$message({
				// 				dangerouslyUseHTMLString: true,
				// 				message:
				// 					"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
				// 				type: 'success',
				// 			});
				// 		});
				// }
				// }
				// console.log(response.data[p].reference);
				// }
			});
		},
	},

	computed: {
		description() {
			switch (this.files.length) {
				case 0:
					return 'Aucun fichier sélectionné.';
				case 1:
					return `${this.files[0].name}`;
				default:
					return `${this.files.length} files selected.`;
			}
		},
	},
};
</script>

<style lang="scss">
$redColor: #ed1a3a;
$blackColor: #2c3e50;

.button {
	padding: 15px 50px !important;
	font-size: 20px !important;
	border-radius: 25px !important;
}

.el-button.is-loading {
	position: absolute !important;
	pointer-events: none !important;
}

.button-ok {
	background-color: #409eff;
	border-color: #409eff;
	color: #fff;
	padding: 15px 50px !important;
	font-size: 20px !important;
	border-radius: 25px !important;
	margin-top: 5em;
	position: absolute;
	top: 12em;
	left: 15em;
}

.button-ok:focus,
.button-ok:hover {
	background: #66b1ff;
	border-color: #66b1ff;
	color: #fff;
}

.vm--modal {
	width: 750px !important;
	height: 480px !important;
	border: 10px solid;
	border-image-slice: 1;
	border-width: 5px;
	border-image-source: linear-gradient(to left, $blackColor, $redColor);
}

.card-header {
	margin-top: 5em;
	margin-bottom: 5em;
}

.fileupload {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4rem 2rem;
	height: 23em;
	cursor: pointer;

	&--slim {
		display: inline-block;
		padding: 0;
		border: none;
	}

	&__help {
		display: flex;
		flex-direction: column;
		align-items: center;

		font-size: 14px;
		line-height: 19px;
		color: #808196;
		text-align: center;
	}

	&__file {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		cursor: inherit;
	}

	&__description {
		margin-top: 1rem;
		font-weight: 600;
	}

	#target {
		height: 400px;
		width: 700px;
		background-color: #f8f8f8;
		margin: 200px auto;
		overflow: hidden;
		border-radius: 5px;
		box-shadow: 2px 2px 5px #888;
	}
	.hover::before {
		content: 'Drop excel file here.';
		width: 100%;
		height: 100%;
		display: block;
		text-align: center;
		line-height: 400px;
		font-size: 24px;
	}
	#target > table {
		height: 250px;
		width: 400px;
		border: 1px solid #ccc;
		border-radius: 3px;
		margin: 75px auto;
	}
	#target > table td {
		text-align: center;
		border-top: 1px solid #ccc;
		border-left: 1px solid #ccc;
	}
	#target > table tr:first-child > td {
		border-top: 0px solid #ccc;
	}
	#target > table tr > td:first-child {
		border-left: 0px solid #ccc;
	}
}
</style>