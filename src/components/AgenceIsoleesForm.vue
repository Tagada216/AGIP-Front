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

                            /*if(row[7].includes('En cours')){
                                console.log("j'accède au row 7");
                            }else{
                                console.log("je n'y accède pas ");
                            }*/


                            

							// On vérifie que les différentes références du fichier Excel des agences sont présentes dans la main courante
							/*if (
									response.data[p].references.includes(
										row[0]
									) == true
								) {
									for (let row of rows) {
										// Si l'état de l'incident est "En cours"
										if (
											row[7].includes('En cours') == true
										) {
											this.incident_id =
											response.data[p].incident_id;
										this.curID =
											response.data[p].incident_id;

											console.log(row[0] + ' En cours');
											console.log(this.incident_id);
										}
										// Sinon si l'état de l'incident est "Clos"
										else {
											this.incident_id =
											response.data[p].incident_id;
										this.curID =
											response.data[p].incident_id;
										window.open(
											'/#/maj-agence/id=' +
												this.incident_id
										);
											console.log(row[0] + ' Clos');
										}
									}
								} */
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