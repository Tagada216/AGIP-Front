<template>
	<div>
		<!-- Agences isolées -->
		<el-card>
			<div slot="header">
				<h4 class="card-header">Agences isolées</h4>
			</div>
			<input type="file" id="input" @change="importer($event)" style="margin-left:10px;"/>
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
import { Multipane, MultipaneResizer } from 'vue-multipane';

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

				/*for(let row of rows){

					for(let i = 0; i< row.length; i++){
						console.log(row[i]);
					}
				}*/


				var agencesJSON = arrayToJSON(rows);

				//console.log(agencesJSON);
				//console.log(this.remoteEnum);

				for( const agence of agencesJSON){

					console.log(agence.ref);
				}

				/*for (const agence of agencesJSON) {
					agence.debut.setHours(agence.debut.getHours() - 14);
					agence.fin_incident == null ? undefined : agence.fin_incident.setHours(agence.fin_incident.getHours() - 14);
					// Statut
					agence.etat.includes('Clos') ? agence.etat=5 : agence.etat=2
					// Priorité

					console.log(agence.prio);
					//agence.prio = this.remoteEnum.priorites.find(el => el.priorite == agence.prio).id
					console.log(agence.etat);
				}*/

			})

		}
	},
};
</script>