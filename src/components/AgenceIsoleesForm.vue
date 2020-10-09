<template>
	<div>
		<!-- Agences isolées -->
		<h4 class="card-header">Agences isolées</h4>
		<el-button type="primary" @click="importer()">Importer</el-button>
		<modal name="example" height="auto">
			<p class='p'>Hello word</p>
		</modal>
		<!-- Fin agences isolées-->
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

Vue.use(VModal, { componentName: 'modal' })

export default {
	
	data() {
		return {
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
		importer() {
			this.$modal.show('example');
		},
		//////Partie Agence/////////
		/*chargerDoc(event) {
			const file = event.target.files[0];
			//console.log(file);

			readXlsxFile(file).then(rows => {
				Axios.get('http://localhost:5000/api/reference').then(
					response => {
						// On parcourt toutes les lignes du fichier Excel des agences
						for (const row of rows) {
							const reponse = response.data;

							// Si la référence existe déjà, ont la met à jours
							if (rep.reference == row[0]) {
								console.log(this.agence.references);

								let date = row[1] + '';
								let dateFin = row[2] + '';
								let mois = '';
								let moisFin = '';

								// On enregistre en base de données
								/*this.$http
										.put(
											'http://localhost:5000/api/main-courante',
											this.agence
										)
										.then(result => {
											this.$message({
												dangerouslyUseHTMLString: true,
												message:
													"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
												type: 'success',
											});
										});
									//window.location.reload();*/
		//}
		// Sinon on effectue une insertion
		//else {
		// On exclu la première ligne du fichier Excel
		/*if (row[0].includes('Réf')) {
										console.log('je suis le ot Réf');
									} else {
										this.agence.references = row[0];
										console.log(
											'Références non identiques'
										);
										/*this.$http
										.post(
											'http://localhost:5000/api/creation-incident_main-courante',
											this.agence
										)
										.then(result => {
											this.$message({
												dangerouslyUseHTMLString: true,
												message:
													"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
												type: 'success',
											});
                                        });*/
		//}
		//}

		//console.log(response.data[p].reference);
		/*}
					}
				);
			});
		},*/
	},
};
</script>

<style lang="sass">
.card-header
	margin-top: 5em
	margin-bottom: 5em

</style>