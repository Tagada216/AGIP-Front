<template>
	<div>
		<div>
			<div ref="target" id="target">
				<h2 id="title"></h2>
				<table class="styled-table">
					<thead id="tableHead">
						<tr v-for="(headData, head) in tableHeadFinal" :key="head">
							<td v-for="(rowHead, headRow) in headData" :key="headRow">{{rowHead}}</td>
						</tr>
					</thead>
					<tbody id="tableBody">
						<tr class="active-row" v-for="(data, tData) in tableData" :key="tData">
							<td>
								<input type="checkbox" class="switch" @click="isChecked()" />
							</td>
							<td v-for="(row, tRow) in data" :key="tRow">{{row}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div>
			<!-- Agences isolées -->
			<div class="agenceButton">
				<el-button id="myButton" type="primary" class="button" @click="changeButton()">{{ buttonName }}</el-button>
				<el-button id="cancelButton" type="danger" class="button" @click="onCancel()">Annuler</el-button>
			</div>
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
						accept=".xlsx, .xls, .xlsm, .csv"
						type="file"
						:loading="loading"
						ref="excel-upload-input"
						class="fileupload__file"
						@change="fileSelected"
					/>
				</div>
				<el-button type="primary" class="button-ok" @click="ok()">OK</el-button>
			</modal>
			<!-- Fin agences isolées-->
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import Axios from 'axios';
import readXlsxFile from 'read-excel-file';
import fs from 'fs';
import VModal from 'vue-js-modal';
import XLSX from 'xlsx';
import { get } from 'https';
import { type } from 'os';

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

			checked: false,
			incrementName: '',

			buttonName: 'Importer',
			fileName: '',
			tableData: [],
			tableHeadFinal: [],
			tableHead: [],
			tableRow: [],
			agenceTable: [],
			filterResult: {},
			refUpdate: {},

			loading: false,

			// Données du formulaire agence
			agence: {
				incident_id: 0,
				reference: '', //
				is_faux_incident: false, //
				date_debut: '', //
				date_fin: '', //
				description: '', //
				description_impact: '',
				priorite_id: '', //
				statut_id: '', //
				enseigne_impactee: 0,
				cause: '',
				is_agence: true,
				application_impactee: '',
				nbUtilisateur: 0,
			},
		};
	},

	methods: {
		//Permet de séléctionner un ou plusieurs fichiers et de les télécharger
		fileSelected(e) {
			const files = e.target.files;
			this.files = [...files];
			//Blocage de l'import de plusieurs fichiers
			if (this.files.length > 1) {
				this.$message({
					dangerouslyUseHTMLString: true,
					message:
						"<h2 style='font-family: arial'>Import impossible !</h2> <p style='font-family: arial'>==> Veuillez sélectionnés <strong> un seul fichier </strong> à la fois.</p>",
					type: 'error',
				});
				return false;
			}
			const rawFile = files[0]; //Nom du fichier
			if (!rawFile) return;

			if (!this.isExcel(rawFile)) {
				this.$message({
					dangerouslyUseHTMLString: true,
					message:
						"<h2 style='font-family: arial'>Type de fichier non supporté !</h2> <p style='font-family: arial'>==>Support téléchargeable avec les suffixes <strong> .xlsx, .xlsm, .xls, .csv </strong> uniquement.</p>",
					type: 'error',
				});
				return false;
			}

			this.upload(rawFile);
			setTimeout(this.changeButtonName(), 5000);
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

		// Change le nom du bouton 
		changeButtonName() {
			var getTHead = document.getElementById('tableHead');
			var getTBody = document.getElementById('tableBody');
			var getValueButton = document.getElementById('myButton');
			var cancelButton = document.getElementById('cancelButton');

			if (getTHead && getTBody == '') {
				this.buttonName = 'Importer';
			} else {
				this.buttonName = 'Sauvegarder';
				cancelButton.style.display = 'inline-block';
			}
		},

		// fonctionnalité pour annuler
		onCancel() {
			window.location.reload();
		},

		//ouvre la fenêtre modal
		importer() {
			this.$modal.show('importModal');
			var confirmed = false;
		},

		//ferme la fenêtre modal
		ok() {
			this.$modal.hide('importModal');
			this.confirmed = true;
			this.insetNameInput();
		},

		//permet de récupérer le(s) fichier(s) et de les envoyer en lecture
		upload(rawFile) {
			this.$refs['excel-upload-input'].value; // Permet de ne pas sélectionner le même excel
			this.readerData(rawFile);
		},

		//permet de vider les tableaux
		resetValue() {
			this.tableHeadFinal = [];
			this.tableData = [];
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
				this.fileName = name;
				var creatTitle = document.getElementById('title');
				creatTitle.innerHTML = name;
				creatTitle.addEventListener('change', this.resetValue());

				reader.onload = e => {
					var data = e.target.result;
					var workbook = XLSX.read(data, { type: 'binary' });


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

								vm.tableHead.unshift('Sélect');
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

									if (row === 1) {
										vm.tableHeadFinal.push(vm.tableHead);
										vm.tableHead = [];
									} else {
										vm.tableData.push(vm.tableRow);
										vm.tableRow = [];
									}

									this.loading = false;
									resolve();
								}
							}
						}
					} else {
						//Si le fichier contient une seul feuille
						var sheetName = workbook.SheetNames[0];
						var sheet = workbook.Sheets[sheetName];
						if (sheet[key] == undefined) {
						}
						var temp = [];

						vm.tableHead.unshift('Sélect');
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

							if (row === 1) {
								vm.tableHeadFinal.push(vm.tableHead);
								vm.tableHead = [];
							} else {
								vm.tableData.push(vm.tableRow);
								vm.tableRow = [];
							}
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

		//Permet d'incrementé le name des inputs
		insetNameInput() {
			var setInputName = document.querySelectorAll('input[class=switch]');
			// console.log(getInputValue.length);
			for (var i = 0; i < setInputName.length; i++) {
				setInputName[i].setAttribute('name', 'ckeck' + i);
			}
		},

		//Permet de changer le visuelle losqu'un row est sélectionné
		isChecked() {
			var getInputs = document.querySelectorAll('input[class=switch]');

			for (var i = 0; i < getInputs.length; i++) {
				var getTdTBody = getInputs[i].parentNode,
					getTrOfTBody = getTdTBody.parentNode;

				if (getInputs[i].checked == true) {
					getTrOfTBody.style.color = '#D8E0DC';
				} else {
					getInputs[i].checked = false;
					getTrOfTBody.style.color = '#009879';
				}
			}
		},

		// isValidDate(d) {
		// 	return d instanceof Date && !isNaN(d);
		// },

		//////Partie Agence/////////
		submit() {
			Axios.get('http://localhost:5000/api/reference').then(response => {
				var i = 0;
				var reponse;
				var getInputs = document.querySelectorAll(
					'input[class=switch]'
				);

				//Boucles sur le  tableau pour enregistrer chaques cellules en objet agence
				do {
					for (var j = 0; j < response.data.length; j++) {
						if (
							this.tableData[i][0].includes(
								response.data[j].reference
							)
						) {
							this.agence.incident_id =
								response.data[j].incident_id;
						}
					}
					var getTitle = document.getElementById('title').innerHTML;
					if (getTitle.includes('CDN') || getTitle.includes('cdn')) {
						this.agence.enseigne_impactee = 2;
					} else if (
						getTitle.includes('BDDF') ||
						getTitle.includes('bddf')
					) {
						this.agence.enseigne_impactee = 1;
					} else {
						this.enseigne_impactee = null;
					}

					this.agence.reference = this.tableData[i][0];

					var dateDebut = new Date(this.tableData[i][1]);
					var recupDaysAndMounth = this.tableData[i][1].split('/');
					dateDebut.setDate(recupDaysAndMounth[0]);
					dateDebut.setMonth(recupDaysAndMounth[1]);
					
					dateDebut.toString(`dd,mm,yyyy`);
					

					this.agence.date_debut = dateDebut;
					

					var dateFin = new Date(this.tableData[i][2]);
				
					dateFin.toString(`dd,mm,yyyy`);

					this.agence.application_impactee = this.tableData[i][3];

					this.agence.description = this.tableData[i][4].trim();

					if (
						this.tableData[i][5] == 'NC' ||
						this.tableData[i][5] == '_' ||
						this.tableData[i][5] == ' _ ' ||
						this.tableData[i][5] == ' - ' ||
						this.tableData[i][5] == '-'
					) {
						this.agence.nbUtilisateur = null;
					} else {
						this.agence.nbUtilisateur = this.tableData[i][5];
					}

					if (this.tableData[i][6].includes('P0')) {
						this.agence.priorite_id = 1;
					} else if (this.tableData[i][6].includes('P1')) {
						this.agence.priorite_id = 2;
					} else if (this.tableData[i][6].includes('P2')) {
						this.agence.priorite_id = 3;
					} else if (this.tableData[i][6].includes('P3')) {
						this.agence.priorite_id = 4;
					} else if (this.tableData[i][6].includes('P4')) {
						this.agence.priorite_id = 5;
					}

					if (this.tableData[i][7].includes('En cours')) {
						this.agence.statut_id = 2;
						this.agence.date_fin = '';
					} else if (this.tableData[i][7].includes('Clos')) {
						this.agence.statut_id = 5;
						this.agence.date_fin = dateFin;
					}

					this.agence.cause = this.tableData[i][8].trim();

					this.agence.description_impact = this.tableData[
						i
					][10].trim();

					this.agence.is_agence;

					this.agenceTable.push(this.agence);

					// reset de l'objet agence pour chaque passage dans la boucle
					this.agence = {
						incident_id: 0,
						reference: '', //
						is_faux_incident: false, //
						date_debut: '', //
						date_fin: '', //
						description: '', //
						description_impact: '',
						priorite_id: '', //
						statut_id: '', //
						enseigne_impactee: 0,
						cause: '',
						is_agence: true,
						application_impactee: '',
						nbUtilisateur: 0,
					};
					i++;
				} while (i < this.tableData.length);

				/**
				 * filtre les références existantes pour garder que les réfs non existantes en BDD pour 
				 * l'ajouts de celles-ci en BDD
				 **/

				var difValueBetweenTables = this.agenceTable.filter(
					this.comparer(response.data)
				);

				for (let i = 0; i < difValueBetweenTables.length; i++) {

					//Boucle sur les inputs pour vérifier qu'elles ne sont pas checker
					for (let j = 0; j < getInputs.length; j++) {
						var getTdTBody = getInputs[j].parentNode,
							getTrOfTBody = getTdTBody.parentNode;

						if (
							getTrOfTBody.childNodes[1].innerHTML ==
							difValueBetweenTables[i].reference
						) {
							// console.log('je suis égale');
							if (getInputs[i].checked == false) {
								if (
									difValueBetweenTables[i].date_debut != '' &&
									difValueBetweenTables[i].date_debut !=
										'Invalid Date'
								) {
									this.$http.post(
										'http://localhost:5000/api/create-agence/',
										difValueBetweenTables[i]
									);
								} else {
									this.$message({
										dangerouslyUseHTMLString: true,
										message:
											"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==>  <strong>Date(s) invalide(s)</strong> dans le fichier.</p>",
										type: 'error',
									});
									return false;
								}
							}
						} 
					}
				}

				//filtre qui ressort les éléments identiques pour l'update 
				this.agenceTable.forEach(element => {
					this.filterResult = response.data.filter(
						ref => element.reference === ref.reference
					);

					// Update des références existantes 
					if (this.filterResult.length >= 1) {
						for (let i = 0; i < this.agenceTable.length; i++) {
							if (
								this.agenceTable[i].reference.includes(
									this.filterResult[0].reference
								)
							) {
								this.refUpdate = this.agenceTable[i];

								//Boucle sur les inputs pour vérifier qu'elles ne sont pas checker
								for (let j = 0; j < getInputs.length; j++) {
									var getTdTBody = getInputs[j].parentNode,
										getTrOfTBody = getTdTBody.parentNode;

									if (
										getTrOfTBody.childNodes[1].innerHTML ==
										this.refUpdate.reference
									) {
										if (getInputs[i].checked == false) {
											if (
												this.refUpdate.date_debut !=
													'' &&
												this.refUpdate.date_debut !=
													'Invalid Date'
											) {
												this.$http.put(
													'http://localhost:5000/api/update-agence/',
													this.refUpdate
												);
											}
										}
									} 
								}
							}
							this.refUpdate = {};
						}
					}
				});

				this.agenceTable = [];

				this.$message({
					dangerouslyUseHTMLString: true,
					message:
						"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
					type: 'success',
				});
				setTimeout(window.location.reload(), 30000);
			});
		},

		//Permet de comparer les références identiques entre deux tableaux
		comparer(tableau) {
			return function(current) {
				return (
					tableau.filter(function(other) {
						return other.reference == current.reference;
					}).length == 0
				);
			};
		},
	},

	computed: {
		//Affiche le nom du document selectionné dans le modal d'ajout 
		description() {
			switch (this.files.length) {
				case 0:
					return 'Aucun fichier sélectionné.';
				case 1:
					return `${this.files[0].name}`;
				default:
					//Blocage du téléchargement de plusieurs fichiers
					return 'Plusieurs fichiers sélectionnés !  Un seul fichier téléchargeable possible !';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
$redColor: #ed1a3a;
$blackColor: #2c3e50;

#cancelButton {
	display: none;
	margin-left: 3em;
}

.agenceButton .el-button {
	margin-top: 100px !important;
}

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

#title {
	margin-top: 3em;
	margin-bottom: 3em;
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
	text-align: center;
}

.styled-table th,
.styled-table td {
	padding: 12px 15px;
}

.styled-table tbody tr {
	border-bottom: 1px solid #dddddd;
	text-align: left;
	line-height: 1.2;
}

// .styled-table tbody tr:nth-of-type(even) {
// 	background-color: #f3f3f3;
// }

.styled-table tbody tr:last-of-type {
	border-bottom: 2px solid #009879;
}

.styled-table tbody tr.active-row {
	font-weight: bold;
	color: #009879;
}

@supports (-webkit-appearance: none) or (-moz-appearance: none) {
	input[type='checkbox'] {
		--active: #009879;
		--active-inner: #fff;
		--focus: 2px #00715b !important;
		--border: #009f67;
		--border-hover: #449e8c !important;
		--background: #fff;
		-webkit-appearance: none;
		-moz-appearance: none;
		height: 21px;
		outline: none;
		display: inline-block;
		vertical-align: top;
		position: relative;
		margin: 0;
		cursor: pointer;
		border: 1px solid var(--bc, var(--border));
		background: var(--b, var(--background));
		transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
		&:after {
			content: '';
			display: block;
			left: 0;
			top: 0;
			position: absolute;
			transition: transform var(--d-t, 0.3s) var(--d-t-e, ease),
				opacity var(--d-o, 0.2s);
		}
		&:checked {
			--b: var(--active);
			--bc: var(--active);
			--d-o: 0.3s;
			--d-t: 0.6s;
			--d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
		}

		&:hover {
			&:not(:checked) {
				&:not(:disabled) {
					--bc: var(--border-hover);
				}
			}
		}
		&:focus {
			box-shadow: 0 0 0 var(--focus);
		}
		&:not(.switch) {
			width: 21px;
			&:after {
				opacity: var(--o, 0);
			}
			&:checked {
				--o: 1;
			}
		}
	}
	input[type='checkbox'] {
		&:not(.switch) {
			border-radius: 7px;
			&:after {
				width: 5px;
				height: 9px;
				border: 2px solid var(--active-inner);
				border-top: 0;
				border-left: 0;
				left: 7px;
				top: 4px;
				transform: rotate(var(--r, 20deg));
			}
			&:checked {
				--r: 43deg;
			}
		}
		&.switch {
			width: 38px;
			border-radius: 11px;
			&:after {
				left: 2px;
				top: 2px;
				border-radius: 50%;
				width: 15px;
				height: 15px;
				background: var(--ab, var(--border));
				transform: translateX(var(--x, 0));
			}
			&:checked {
				--ab: var(--active-inner);
				--x: 17px;
			}
		}
	}
}
</style>