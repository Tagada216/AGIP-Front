<template>
	<div>
		<div class="row">
			<div class="col-md-12">
				<table class="table table-striped table-hover table-condensed table-responsive">
					<thead>
						<tr>
							<th v-for="(item, items) in state.headers" :key="items">{{item}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, items) in state.tickets" :key="items">
							<td v-for="(key, keys) in item" :key="keys">
								<label>{{key}}</label>
								<p>{{item.key}}</p>
							</td>
						</tr>
					</tbody>
					<tfoot></tfoot>
				</table>
			</div>
		</div>
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
					<input
						:slim="true"
						accept=".xlsx, .xls, .xlsm"
						type="file"
						ref="excel-upload-input"
						class="fileupload__file"
						@change="fileSelected"
					/>
				</div>
				<el-button type="primary" class="button-ok" @click="Ok">OK</el-button>
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
		// beforeUpload: Function, // eslint-disable-line
		// onSuccess: Function, // eslint-disable-line
	},

	data() {
		return {
			files: [],
			loading: false,
			state: {
				tickets: [{ name: 'test' }],
				headers: ['Test header'],
			},

			// loading: false,
			// excelData: {
			// 	header: null,
			// 	results: null,
			// },

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
		/** HELPERS **/
		// get_header_row(sheet) {
		// 	var headers = [],
		// 		range = XLSX.utils.decode_range(sheet['!ref']);
		// 	var C,
		// 		R = range.s.r; /* start in the first row */
		// 	for (C = range.s.c; C <= range.e.c; ++C) {
		// 		/* walk every column in the range */
		// 		var cell =
		// 			sheet[
		// 				XLSX.utils.encode_cell({ c: C, r: R })
		// 			]; /* find the cell in the first row */
		// 		var hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
		// 		if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
		// 		headers.push(hdr);
		// 	}
		// 	return headers;
		// },
		// fixdata(data) {
		// 	var o = '',
		// 		l = 0,
		// 		w = 10240;
		// 	for (; l < data.byteLength / w; ++l)
		// 		o += String.fromCharCode.apply(
		// 			null,
		// 			new Uint8Array(data.slice(l * w, l * w + w))
		// 		);
		// 	o += String.fromCharCode.apply(
		// 		null,
		// 		new Uint8Array(data.slice(l * w))
		// 	);
		// 	return o;
		// },
		// workbook_to_json(workbook) {
		// 	var result = {};
		// 	workbook.SheetNames.forEach(function(sheetName) {
		// 		var roa = XLSX.utils.sheet_to_row_object_array(
		// 			workbook.Sheets[sheetName]
		// 		);
		// 		if (roa.length > 0) {
		// 			result[sheetName] = roa;
		// 		}
		// 	});
		// 	return result;
		// },
		// /** PARSING and DRAGDROP **/
		// handleDrop(e) {
		// 	e.stopPropagation();
		// 	e.preventDefault();
		// 	console.log(e);
		// 	console.log('DROPPED');
		// 	var files = e.dataTransfer.files,
		// 		i,
		// 		f;
		// 	for (i = 0, f = files[i]; i != files.length; ++i) {
		// 		var reader = new FileReader(),
		// 			name = f.name;
		// 		console.log(reader);
		// 		reader.onload = e => {
		// 			var results,
		// 				data = e.target.result,
		// 				fixedData = this.fixdata(data),
		// 				workbook = XLSX.read(btoa(fixedData), {
		// 					type: 'base64',
		// 				}),
		// 				firstSheetName = workbook.SheetNames[0],
		// 				worksheet = workbook.Sheets[firstSheetName];
		// 			this.state.headers = this.get_header_row(worksheet);
		// 			results = XLSX.utils.sheet_to_json(worksheet);
		// 			this.state.tickets = results;
		// 		};
		// 		reader.readAsArrayBuffer(f);
		// 	}
		// },
		// handleDragover(e) {
		// 	e.stopPropagation();
		// 	e.preventDefault();
		// 	e.dataTransfer.dropEffect = 'copy';
		// },

		fileSelected(e) {
			const files = e.target.files;
			this.files = [...files];
			console.log(files);
			const rawFile = files[0]; // only use files[0]
			if (!rawFile) return;
			this.upload(rawFile);
		},

		importer() {
			this.$modal.show('importModal');
		},

		Ok() {
			this.$modal.hide('importModal');
		},

		upload(rawFile) {
			this.$refs['excel-upload-input'].value = null; // fix can't select the same excel
			if (!this.beforeUpload) {
				this.readerData(rawFile);
				return;
			}
			const before = this.beforeUpload(rawFile);
			if (before) {
				this.readerData(rawFile);
			}
		},

		readerData(rawFile) {
			this.loading = true;
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = e => {
					const data = e.target.result;
					const workbook = XLSX.read(data, { type: 'array' });
					const firstSheetName = workbook.SheetNames[0];
					const worksheet = workbook.Sheets[firstSheetName];
					this.state.headers = this.getHeaderRow(worksheet);
					const results = XLSX.utils.sheet_to_json(worksheet);
					this.state.tickets = results;
					this.loading = false;
					resolve();
				};

				reader.readAsArrayBuffer(rawFile);
			});
		},

		getHeaderRow(sheet) {
			const headers = [];
			const range = XLSX.utils.decode_range(sheet['!ref']);
			let C;
			const R = range.s.r;
			/* start in the first row */
			for (C = range.s.c; C <= range.e.c; ++C) {
				/* walk every column in the range */
				const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
				/* find the cell in the first row */
				let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
				if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
				headers.push(hdr);
			}
			return headers;
		},
		isExcel(file) {
			return /\.(xlsx|xls|xlsm|csv)$/.test(file.name);
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
</style>