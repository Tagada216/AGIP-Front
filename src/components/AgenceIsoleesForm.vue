<template>
	<div>
		<!-- Agences isolées -->
		<h4 class="card-header">Agences isolées</h4>
		<el-button type="primary" class="button" @click="importer()">Importer</el-button>
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
				<input  accept=".xlsx, .xls, .xlsm" type="file" id="input" class="fileupload__file" @change="fileSelected" />
			</div>
			<el-button :loading="loading" type="primary" class="button-ok" @click="Ok">OK</el-button>
		</modal>
		<!-- Fin agenc es isolées-->
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
		beforeUpload: Function, // eslint-disable-line
		onSuccess: Function, // eslint-disable-line
	},

	data() {
		return {
			files: [],

			loading: false,
			excelData: {
				header: null,
				results: null,
			},

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

		generateData({ header, results }) {
			this.excelData.header = header;
			this.excelData.results = results;
			this.onSuccess && this.onSuccess(this.excelData);
		},

		fileSelected(event) {
			const files = event.target.files;
			this.files = [...files];
			console.log(files);
		},

		importer() {
			this.$modal.show('importModal');
		},

		Ok() {
			this.$modal.hide('importModal');
		},

		//////Partie Agence/////////
		changeDoc(event) {
			const file = event.target.files[0];
			console.log(file);

			readXlsxFile(file).then(rows => {
				Axios.get('http://localhost:5000/api/reference').then(
					response => {
						//On parcourt toutes les lignes du fichier Excel des agences
						for (const row of rows) {
							const reponse = response.data;

							//Si la référence existe déjà, ont la met à jours
							if (rep.reference == row[0]) {
								console.log(this.agence.references);

								let date = row[1] + '';
								let dateFin = row[2] + '';
								let mois = '';
								let moisFin = '';

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
							}
							//Sinon on effectue une insertion
							else {
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
							}

							console.log(response.data[p].reference);
						}
					}
				);
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
</style>