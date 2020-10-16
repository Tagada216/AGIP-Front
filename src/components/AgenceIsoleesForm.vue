<template>
	<div>
		<div>
			<div ref="target" id="target">
				<table class="styled-table">
					<thead id="tableHead">
						<tr v-for="(headData, head) in tableHeadFinal" :key="head">
							<td v-for="(rowHead, headRow) in headData" :key="headRow">{{rowHead}}</td>
						</tr>
					</thead>
					<tbody id="tableBody">
						<tr class="active-row" v-for="(data, tData) in tableData" :key="tData">
							<td v-for="(row, tRow) in data" :key="tRow">{{row}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div>
			<!-- Agences isolées -->
			<h4 class="card-header">Agences isolées</h4>
			<el-button id="myButton" type="primary" class="button" @click="changeButton()">{{ buttonName }}</el-button>
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

			buttonName: 'Importer',

			tableData: [],
			tableHeadFinal: [],
			tableHead: [],
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
			setTimeout(this.changeButtonName(), 5000);

			//console.log(rawFile);
		},

		//Change la fonctionnalité du bouton
		changeButton() {
			var getButton = document.getElementById('myButton');
			var getValueOfTableHead = document.getElementById('tableHead');
			var getValueOfTableBody = document.getElementById('tableBody');

			if (
				getValueOfTableHead.innerHTML == '' &&
				getValueOfTableBody.innerHTML == ''
			) {
				getButton.onclick = this.importer();
			} else {
				getButton.onclick = this.submit();
			}
		},

		changeButtonName() {
			var getTHead = document.getElementById('tableHead');
			var getTBody = document.getElementById('tableBody');
			var getValueButton = document.getElementById('myButton');
			if (getTHead && getTBody == '') {
				this.buttonName = 'Importer';
			} else {
				this.buttonName = 'Sauvegarder';
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
					//Si le fichier Excel contient plusieurs feuilles
					if (workbook.SheetNames.length > 1) {
						for (var i = 0; i < workbook.SheetNames.length; i++) {
							var unwantedSheetName = workbook.SheetNames;
							//RegEx qui permet de tester la valeur de unwantedSheetName pour ne pas les prendre en compte
							if (
								/[^cc|temp|CDN|Parametre|HISTO]/.test(
									unwantedSheetName[i]
								)
							) {
								//Récupère le nom du fichier
								var theSheetNames = workbook.SheetNames[i];
								//Récupère les données du fichier par rapport à son nom
								var theSheets = workbook.Sheets[theSheetNames];

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

										/*Permet de récupérer que la partie head du tableau, enlêle la cellule "Commentaires Ticket Jump" 
										et les cellules vides*/
										if (
											key === c + 1 &&
											key != 'L1' &&
											theSheets[key]['w'] != undefined
										) {
											vm.tableHead.push(
												theSheets[key]['w']
											);
										} else {
											/**
											 * Traitement du reste du tableau allant dans le body
											 * Les cellules vide sont enlevées avec le regEx
											 */
											if (/[^L-Z]/.test(c)) {
												vm.tableRow.push(
													theSheets[key]['w']
												);
											}
										}
									}

									vm.tableHeadFinal.push(vm.tableHead);
									vm.tableData.push(vm.tableRow);

									vm.tableHead = [];
									vm.tableRow = [];

									this.loading = false;
									resolve();
								}
							}
						}
						console.log(vm.tableHeadFinal);
					} else {
						//Si le fichier contient une seul feuille
						var sheetName = workbook.SheetNames[0];
						var sheet = workbook.Sheets[sheetName];
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

								if (key === c + 1) {
									vm.tableHead.push(sheet[key]['w']);

									for (
										let i = 0;
										i < vm.tableHead.length;
										i++
									) {
										if (vm.tableHead[i] == undefined) {
											vm.tableHead.pop(vm.tableHead[i]);
										}
									}
								} else {
									if (/[^L-Z]/.test(c)) {
										vm.tableRow.push(sheet[key]['w']);
									}
								}
							}

							vm.tableHeadFinal.push(vm.tableHead);
							vm.tableData.push(vm.tableRow);

							vm.tableHead = [];
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
					return `${this.files.length} fichiers sélectionnés.`;
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
	margin-bottom: 100px !important;
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
}

.styled-table {
	border-collapse: collapse;
	margin: 25px 25px;
	font-size: 0.9em;
	font-family: sans-serif;
	min-width: 400px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table > thead > tr {
	background-color: #009879;
	color: #ffffff;
	text-align: left;
}

.styled-table th,
.styled-table td {
	padding: 12px 15px;
}

.styled-table tbody tr {
	border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
	background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
	border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
	font-weight: bold;
	color: #009879;
}
</style>