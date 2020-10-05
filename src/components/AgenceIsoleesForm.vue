<template>
	<div>
		<!-- Agences isolées -->
		<el-card>
			<div slot="header">
				<h4 class="card-header">Agences isolées</h4>
			</div>
			<input type="file" id="input" @change="importer($event)" style="margin-left:10px;" />
		</el-card>
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
import { log } from 'util';
import { arraySlugToHeader, arraySlugifier, arrayToJSON } from '../etlUtils';

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
			},
		};
	},

	methods: {
		//////Partie Agence/////////
		importer(event) {
			const file = event.target.files[0];
			//console.log(file);

			readXlsxFile(file).then(rows => {
				Axios.get('http://localhost:5000/api/reference').then(
					response => {
						// On parcourt toutes les lignes du fichier Excel des agences
						for (const row of rows) {
							//console.log(row);
							//console.log(row[0]);
							//console.log(row[7]);
							//console.log(row[2]);
							var reponse = response.data;

							for (const rep of reponse) {

                                // Si la référence existe déjà, ont la met à jours
								if ((row[0].includes('Réf'))) {
                                    //console.log('ref non identiques');

                                        this.agence.references = row[0];
                                        console.log(this.agence.references);
                                    
                                    
                                console.log('Références identiques');
									
                                
                                } 
                                // Sinon on effectue une insertion
                                else {
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
									console.log('Références non identiques');
								}

								//console.log(response.data[p].reference);
							}
						}
					}
				);
				//var agencesJSON = arrayToJSON(rows);

				//console.log(agencesJSON);
				//console.log(this.remoteEnum);

				/*for( const agence of agencesJSON){

					console.log(agence.ref);
				}*/
			});
		},
	},
};
</script>