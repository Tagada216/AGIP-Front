<template>
	<!-- 
		Toutes les balise commancant par "el-" correspondent à des composant venant de la librairie Element. 
		Pour plus d'information voir le site : https://element.eleme.io/#/fr-FR/component/installation 
	-->
	<el-form ref="form" :model="form" :rules="rules" label-position="top">
		<el-row :gutter="20">
			<el-col :span="6">
				<!-- Références incident -->
				<el-card>
					<div slot="header">
						<h4 class="card-header">Référence(s) de l'incident</h4>
					</div>
					<el-table :data="form.references" border>
						<el-table-column label="Référence">
							<template slot-scope="scope">
								<el-input
									v-model.trim="
                                        form.references[scope.$index].reference
                                    "
								></el-input>
							</template>
						</el-table-column>
						<el-table-column width="60">
							<template slot="header">
								<el-button type="primary" icon="el-icon-plus" circle @click="handleCreate()" />
							</template>
							<template slot-scope="scope">
								<el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index)" />
							</template>
						</el-table-column>
						<template slot="empty">
							<span class="arrayFormEmpty">Aucune donnée</span>
						</template>
					</el-table>
				</el-card>
				<!-- Fin Références incident -->

				<!-- Horodatages -->
				<el-card>
					<div slot="header">
						<h4 class="card-header">Horodatages de l'incident</h4>
					</div>

					<el-form-item label="Début de l'incident" prop="date_debut">
						<el-date-picker
							v-model="form.date_debut"
							type="datetime"
							placeholder="Selectionnez l'horodatage"
							format="dd/MM/yyyy HH:mm:ss"
							value-format="yyyy-MM-dd HH:mm:ss"
						></el-date-picker>
					</el-form-item>

					<el-form-item label="Faux incident ?">
						<el-col :span="3.5">
							<el-switch
								style="display: block"
								v-model="form.is_faux_incident"
								active-color="#13ce66"
								inactive-color="#ff4949"
								active-text="Oui"
								inactive-text="Non"
							></el-switch>
						</el-col>
					</el-form-item>

					<el-form-item label="Fin de l'incident">
						<el-date-picker
							v-model="form.date_fin"
							type="datetime"
							placeholder="Selectionnez l'horodatage"
							format="dd/MM/yyyy HH:mm:ss"
							value-format="yyyy-MM-dd HH:mm:ss"
							:disabled="form.is_faux_incident"
						/>
					</el-form-item>
				</el-card>
				<!-- Fin Horodatage -->

				<!-- Agences isolées -->
				<!-- <el-card>
					<div slot="header">
						<h4 class="card-header">Agences isolées</h4>
					</div>
					<input type="file" id="file" ref="fichierAgence" @change="importer" style="margin-left:10px;" />
				</el-card>-->
				<!-- Fin agences isolées-->
			</el-col>

			<!-- Info Générales -->
			<el-col :span="18">
				<!-- Infos générales incident -->
				<el-card>
					<div slot="header">
						<h4 class="card-header">Informations générales de l'incident</h4>
					</div>

					<el-row :gutter="20">
						<el-col :span="6">
							<el-form-item label="Priorité" prop="priorite_id">
								<el-select v-model="form.priorite_id">
									<el-option
										v-for="item in remoteEnum.priorites"
										:key="item.id"
										:label="item.priorite"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="Statut" prop="statut_id">
								<el-select v-model="form.statut_id">
									<el-option
										v-for="item in remoteEnum.statut"
										:key="item.id"
										:label="item.nom"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>

					<el-form-item label="Enseigne(s) impactée(s)" prop="enseigne_impactee">
						<el-checkbox-group v-model="form.enseigne_impactee">
							<el-checkbox
								v-for="enseigne in remoteEnum.enseignes"
								:label="enseigne.id"
								:key="enseigne.id"
								v-if="!enseigne.is_deprecated"
							>{{ enseigne.nom }}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>

					<el-form-item label="Description" prop="description">
						<el-input
							type="textarea"
							:autosize="{ minRows: 2, maxRows: 8 }"
							placeholder="Description"
							v-model="form.description"
						></el-input>
					</el-form-item>

					<el-form-item label="Impact" prop="description_impact">
						<el-input
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 8 }"
							placeholder="Impact"
							v-model="form.description_impact"
						></el-input>
					</el-form-item>

					<el-form-item label="Un contournement existe ?">
						<el-col :span="3.5">
							<el-switch
								style="display: block"
								v-model="form.is_contournement"
								active-color="#13ce66"
								inactive-color="#ff4949"
								active-text="Oui"
								inactive-text="Non"
								@change="setContournementRule()"
							></el-switch>
						</el-col>
					</el-form-item>

					<el-form-item label="Description du contournement" prop="description_contournement">
						<el-input
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 8 }"
							placeholder="Contournement"
							v-model="form.description_contournement"
							:disabled="!form.is_contournement"
						></el-input>
					</el-form-item>

					<el-table :data="form.application_impactee" border>
						<el-table-column label="Application(s) impactée(s)" prop="application_impactee">
							<template slot-scope="scope">
								<el-autocomplete
									placeholder="Application impactée"
									v-model="
                                        form.application_impactee[scope.$index]
                                            .display_name 
                                    "
									:fetch-suggestions="getMatchingApplications"
									value-key="display_name"
									@select="appSelected"
								></el-autocomplete>
							</template>
						</el-table-column>
						<el-table-column width="60">
							<template slot="header">
								<el-button type="primary" icon="el-icon-plus" circle @click="handleCreateApp()" />
							</template>
							<template slot-scope="scope">
								<el-button
									type="danger"
									icon="el-icon-delete"
									circle
									@click="handleDeleteApp(scope.$index)"
								/>
							</template>
						</el-table-column>
						<template slot="empty">
							<span class="arrayFormEmpty">Aucune donnée</span>
						</template>
					</el-table>
				</el-card>
				<!-- Fin Infos générales incident -->
			</el-col>
		</el-row>

		<!-- Modal de confirmation de suppression d'une reférence problème -->
		<el-dialog
			title="Demande de confirmation"
			:visible.sync="delConfirmationModalVisible"
			width="40%"
			center
		>
			<span>
				Etes vous sur de vouloir supprimer la référence :
				{{ refToDelete }}
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delConfirmationModalVisible = false">Annuler</el-button>
				<el-button type="danger" @click="confirmDelete()">Confirmer</el-button>
			</span>
		</el-dialog>
		<!-- Fin Modal de confirmation de suppression d'une reférence problème -->

		<!-- Modal de confirmation de suppression d'une application impactée -->
		<el-dialog
			title="Demande de confirmation"
			:visible.sync="delConfirmationModalVisibleApp"
			width="40%"
			center
		>
			<span>
				Etes vous sur de vouloir supprimer l'application :
				{{ refToDeleteApp }}
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="delConfirmationModalVisibleApp = false">Annuler</el-button>
				<el-button type="danger" @click="confirmDeleteApp()">Confirmer</el-button>
			</span>
		</el-dialog>
		<!-- Fin Modal de confirmation de suppression d'une application impactée-->

		<el-form-item style="text-align: center">
			<el-button type="primary" class="button" @click="submit()">Sauvegarder</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { arraySlugToHeader, arraySlugifier, arrayToJSON } from '../etlUtils';
import confirmationVue from './confirmation.vue';
import MyUpdateIncidentForm from './MyUpdateIncidentForm.vue';
import { thisExpression } from 'babel-types';
import Axios from 'axios';
import { win32 } from 'path';
import readXlsxFile from 'read-excel-file';
import { Loading } from 'element-ui';
import { Transform } from 'stream';

export default {
	components: { MyUpdateIncidentForm },
	created() {
		this.getFieldsOptions();
		this.duplicate();
	},
	props: {
		incident_id: {
			type: Number,
		},
	},

	data() {
		return {
			verifRefExistante : false,
			// Données énumérées venant de l'API
			remoteEnum: {
				priorites: [],
				statut: [],
				enseignes: [],
				application_impactee: [],
			},

			// Données du formulaire
			form: {
				references: [], //
				is_faux_incident: false, //
				date_debut: '', //
				date_fin: null, //
				description: '', //
				description_impact: '', //
				description_contournement: 'Aucun contournement', //
				is_contournement: false, //
				priorite_id: '', //
				statut_id: '', //
				enseigne_impactee: [],
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
			// Règles de validation pour le formulaire
			rules: {
				date_debut: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				description: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'blur',
					},
				],
				description_impact: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'blur',
					},
				],
				description_contournement: [
					{
						required: false,
						message: 'Champ non rempli',
						trigger: 'blur',
					},
				],
				priorite_id: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				statut_id: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				enseigne_impactee: [
					{
						type: 'array',
						required: true,
						message: 'Aucune selection',
						trigger: 'change',
					},
				],
				application_impactee: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'blur',
					},
				],
			},
			// Les lignes suivantes sont des variables nécessaires au modal de suppression
			delConfirmationModalVisible: false,
			delConfirmationModalVisibleApp: false,
			messageConfirmation: true,
			indexRefToDelete: 0,
			indexRefToDeleteApp: 0,
			refToDelete: '',
			refToDeleteApp: '',
			ajoutIncidentsAgencesVisible: false,
		};
	},

	methods: {
		isValid(value) {
			return /^P\d{2,}[IN|PB|CH|RQ]{2,}[-]{1,}\d{7,}$/.test(value);
		},

		verifUniqueRef(value) {
			Axios.get('http://localhost:5000/api/reference').then(response => {
				for (var j = 0; j < response.data.length; j++) {
					if (response.data[j].reference.includes(value)) {
						this.verifRefExistante = false
					} 
					this.verifRefExistante = true
				}
			});
			return this.verifRefExistante
		},
		// Cette méthode est lancée quand un champ d'appli impacté s'est vu selectionné une appli parmis les propositions
		// Quand tel est le cas, on insere les données de l'appli (CI et trigramme) pour pouvoir la relier en BDD
		appSelected(appSelection) {
			const appIndex = this.form.application_impactee
				.map(el => el.display_name)
				.indexOf(appSelection.display_name);
			this.form.application_impactee[appIndex] = appSelection;
		},

		// Méthode exécuté par le bouton "Sauvegarder".
		// Elle gère la validation du formulaire ainsi que l'envoie des données vers l'API
		submit() {
			//console.log(this.form.application_impactee);

			this.$refs['form'].validate(valid => {
				if (valid) {
					// On vérifie qu'il y a au moins une référence
					
					if (this.form.references.length == 0) {
						this.$message({
							dangerouslyUseHTMLString: true,
							message:
								"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> Au moins une <strong>Référence</strong> doit être renseignée.</p>",
							type: 'error',
						});
						return false;
					}
					// On vérifie qu'il y a au moins une application impactée
					else if (this.form.application_impactee.length == 0) {
						this.$message({
							dangerouslyUseHTMLString: true,
							message:
								"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> Au moins une <strong>Application</strong> doit être renseignée.</p>",
							type: 'error',
						});
						return false;
					}
					// On parcourt tous les champs applications impactées
					for (
						var i = 0;
						i < this.form.application_impactee.length;
						i++
					) {
						this.verifUniqueRef(this.form.references[i].reference)
					
						// On vérifie qu'il y a au moins une application impactée
						if (
							this.form.application_impactee.length >= 1 &&
							this.form.application_impactee[i].display_name == ''
						) {
							this.$message({
								dangerouslyUseHTMLString: true,
								message:
									"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> Veuillez remplir le(s) champ(s) 'Application(s) impactée(s) ouvert(s).</p>",
								type: 'error',
							});
							return false;
						}
					}

					// On parcourt tous les champs référence
					for (let i = 0; i < this.form.references.length; i++) {
						// Si le premier champs est vide on écrit "A venir"
						this.verifUniqueRef(this.form.references[i].reference)
						// console.log(this.verifRefExistante)
						if (
							this.form.references.length == 1 &&
							this.form.references[i].reference == '' &&
							this.form.statut_id != 5
						) {
							this.form.references[i].reference = 'A venir';
						} else if (
							(this.form.references.length == 1 &&
								this.form.references[i].reference == '') ||
							(this.form.references.length == 1 &&
								this.form.references[i].reference == 'A venir')
						) {
							this.form.references[i].reference = 'A venir';
						}
						// Si il y à plusieurs champs, les champs doivent êtres remplis d'une références obligatoirement et au bon format
						else if (
							this.form.references.length >= 1 &&
							this.form.references[i].reference.length >= 1 &&
							this.isValid(
								this.form.references[i].reference.toUpperCase()
							)
						) {
							this.form.references[
								i
							].reference = this.form.references[
								i
							].reference.toUpperCase();
							//console.log(this.form.references[i].reference);
							//console.log(this.form.references[i].reference.toUpperCase());
							//console.log(this.form.references[i].reference.length);
							//console.log("OK ");
						} else {
							this.$message({
								dangerouslyUseHTMLString: true,
								message:
									"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> La <strong>Références</strong> est déjà existante </br><strong>ou</strong></br>==> Si le <strong>Statut est Résolu<strong/> veuillez remplir le(s) champs <strong>Référence</strong> au format : \"P00IN-0000000\".</p>",
								type: 'error',
							});
							return false;
						}

						// Vérifications permettant de ne pas avoir de références en double
						// if (
						// 	!this.verifRefExistante
						// 	) 
						// {
						// 	console.log("je rentre dans le if")
						// 	this.$message({
						// 		dangerouslyUseHTMLString: true,
						// 		message:
						// 			"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> La <strong>Références</strong> est déjà existante </p>",
						// 		type: 'error',
						// 	});
						// 	return false;
						// }


						if (
							this.form.statut_id === 5 &&
							this.form.date_fin === null
						) {
							this.$message({
								dangerouslyUseHTMLString: true,
								message:
									"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> Le Statut de l'incident est en <strong>Résolu</strong> le champs <strong>Fin de l'incident est obligatoire</strong> .</p>",
								type: 'error',
							});
							return false;
						}
					}

					console.log(this.form);

					// On enregistre en base de données
					this.$http
						.post(
							'http://localhost:5000/api/main-courante',
							this.form
						)
						.then(result => {
							/* 
								Ajout du then pour attendre que l'API réponde 
								Car il se peut que ça se passe mal et qu'on envoi quand même un message de succés.
								De plus la fonction window.alert() stop tous les autres traitement JS
							*/
							// Ceci est un composent du module Element (Voir : https://element.eleme.io/#/fr-FR/component/message)
							this.$message({
								dangerouslyUseHTMLString: true,
								message:
									"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
								type: 'success',
							});
							setTimeout(window.location.reload(), 2500);
						});
				} else {
					this.$message({
						dangerouslyUseHTMLString: true,
						message:
							"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> Tous les <strong>Champs requis</strong> n'ont pas été remplis.</p>",
						type: 'error',
					});
					return false;
				}
			});
		},

		///////Partie Agence/////////
		importer() {
			readXlsxFile(this.$refs.fichierAgence.files[0]).then(rows => {
				var agencesJSON = arrayToJSON(rows);
				console.log(agencesJSON);
				//console.log(this.remoteEnum);
				for (const agence of agencesJSON) {
					agence.debut.setHours(agence.debut.getHours() - 14);
					agence.fin_incident == null
						? undefined
						: agence.fin_incident.setHours(
								agence.fin_incident.getHours() - 14
						  );
					// Statut
					agence.etat.includes('Clos')
						? (agence.etat = 5)
						: (agence.etat = 2);
					// Priorité
					agence.prio = this.remoteEnum.priorites.find(
						el => el.priorite == agence.prio
					).id;
					console.log(agence);
				}
				for (const row of rows) {
					// Si le statut est en cours on ajoute l'incident dans la main courante
					if (row[7].includes('En cours') == true) {
						//this.ajoutIncidentsAgencesVisible=true
						Axios.get(
							'http://localhost:5000/api/main-courante'
						).then(response => {
							//Date de début
							var date = row[1] + '';
							var dateFin = row[2] + '';
							var mois = '';
							var moisFin = '';
							// ----- Début des différentes modifs à faire
							this.agence.references = row[0];
							if (input.files[0].name.includes('CDN' || 'cdn')) {
								this.agence.enseigne_impactee = 2;
							}
							if (
								input.files[0].name.includes('BDDF' || 'bddf')
							) {
								this.agence.enseigne_impactee = 1;
							}
							if (input.files[0].name.includes('BPF' || 'bpf')) {
								this.agence.enseigne_impactee = 3;
							}
							this.agence.description_impact = row[5];
							if (this.agence.application_impactee.length >= 1) {
								console.log(
									"L'application est déjà présente dans le champ application impactée"
								);
							} else {
								this.agence.application_impactee.push({
									display_name:
										'Infrastructure Réseau Banque de Détail',
								});
							}
							this.agence.cause = row[8];
							////////////// Statut ///////////////
							// if (row[7].includes('En cours') == true) {
							// 	this.agence.statut_id = 2;
							// }
							// if (row[7].includes('Clos') == true) {
							// 	this.agence.statut_id = 5;
							// }
							////////////////////////////////////
							////////// Priorité /////////////
							if (row[6].includes('P0') == true) {
								this.agence.priorite_id = 1;
							}
							if (row[6].includes('P1') == true) {
								this.agence.priorite_id = 2;
							}
							if (row[6].includes('P2') == true) {
								this.agence.priorite_id = 3;
							}
							if (row[6].includes('P3') == true) {
								this.agence.priorite_id = 4;
							}
							if (row[6].includes('P4') == true) {
								this.agence.priorite_id = 5;
							}
							//////////////////////////////////
							// Afin d'afficher la date dans le format voulu soit JJ/MM/AAAA
							if (date[4] + date[5] + date[6] == 'Jan') {
								mois = '01';
							} else if (date[4] + date[5] + date[6] == 'Feb') {
								mois = '02';
							} else if (date[4] + date[5] + date[6] == 'Mar') {
								mois = '03';
							} else if (date[4] + date[5] + date[6] == 'Apr') {
								mois = '04';
							} else if (date[4] + date[5] + date[6] == 'May') {
								mois = '05';
							} else if (date[4] + date[5] + date[6] == 'Jun') {
								mois = '06';
							} else if (date[4] + date[5] + date[6] == 'Jul') {
								mois = '07';
							} else if (date[4] + date[5] + date[6] == 'Aug') {
								mois = '08';
							} else if (date[4] + date[5] + date[6] == 'Sep') {
								mois = '09';
							} else if (date[4] + date[5] + date[6] == 'Oct') {
								mois = '10';
							} else if (date[4] + date[5] + date[6] == 'Nov') {
								mois = '11';
							} else {
								mois = '12';
							}
							// Afin d'afficher la date dans le format voulu soit JJ/MM/AAAA
							if (dateFin[4] + dateFin[5] + dateFin[6] == 'Jan') {
								moisFin = '01';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'Feb'
							) {
								moisFin = '02';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'Mar'
							) {
								moisFin = '03';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'Apr'
							) {
								moisFin = '04';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'May'
							) {
								moisFin = '05';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'Jun'
							) {
								moisFin = '06';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'Jul'
							) {
								moisFin = '07';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'Aug'
							) {
								moisFin = '08';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'Sep'
							) {
								moisFin = '09';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'Oct'
							) {
								moisFin = '10';
							} else if (
								dateFin[4] + dateFin[5] + dateFin[6] ==
								'Nov'
							) {
								moisFin = '11';
							} else {
								moisFin = '12';
							}
							if (row[4].includes('isolée') == true) {
								this.agence.description =
									'Depuis le ' +
									date[8] +
									date[9] +
									'/' +
									mois +
									'/' +
									date[11] +
									date[12] +
									date[13] +
									date[14] +
									' à ' +
									date[16] +
									date[17] +
									date[18] +
									date[19] +
									date[20] +
									date[21] +
									date[22] +
									date[23] +
									", indisponibilité du réseau de données et de la téléphonie à l'agence " +
									row[4].substring(0, row[4].length - 11) +
									' (' +
									row[5] +
									' utilisateurs)';
							}
							if (row[4].includes('dégradée') == true) {
								this.agence.description =
									'Depuis le ' +
									date[8] +
									date[9] +
									'/' +
									mois +
									'/' +
									date[11] +
									date[12] +
									date[13] +
									date[14] +
									' à ' +
									date[16] +
									date[17] +
									date[18] +
									date[19] +
									date[20] +
									date[21] +
									date[22] +
									date[23] +
									", dégradation du réseau de données et de la téléphonie à l'agence " +
									row[4].substring(0, row[4].length - 13) +
									' (' +
									row[5] +
									' utilisateurs)';
							}
							////// La date et l'heure récupérées ne sont pas les bonnes (14h en plus)
							this.agence.date_debut =
								date[11] +
								date[12] +
								date[13] +
								date[14] +
								'-' +
								mois +
								'-' +
								date[8] +
								date[9] +
								' ' +
								date[16] +
								date[17] +
								date[18] +
								date[19] +
								date[20] +
								date[21] +
								date[22] +
								date[23];
							this.agence.date_fin =
								dateFin[11] +
								dateFin[12] +
								dateFin[13] +
								dateFin[14] +
								'-' +
								moisFin +
								'-' +
								dateFin[8] +
								dateFin[9] +
								' ' +
								dateFin[16] +
								dateFin[17] +
								dateFin[18] +
								dateFin[19] +
								dateFin[20] +
								dateFin[21] +
								dateFin[22] +
								dateFin[23];
							let loadingInstance = Loading.service({
								fullscreen: true,
							});
							this.$http
								.post(
									'http://localhost:5000/api/main-courante-agence',
									this.agence
								)
								.then(result => {
									this.$message({
										dangerouslyUseHTMLString: true,
										message:
											"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
										type: 'success',
									});
									loadingInstance.close();
								});
						});
					}
				}
			});
		},
		// Permet de dupliquer l'incident sélectionné dans la main courante
		duplicate() {
			// On récupère l'id de l'incident situé après le '=' dans l'url
			var test = window.location.href.indexOf('=');
			if (test != -1) {
				var idIncident = window.location.href.substr(test + 1);
				console.log(idIncident);
			}
			// On récupère les informations de l'incident à dupliquer et on les affiche dans les champs correspondant
			if (idIncident != undefined) {
				Axios.get(
					'http://localhost:5000/api/main-courante/' + idIncident
				).then(response => {
					this.form.incident_id = idIncident;
					this.form.description = response.data[0].description;
					this.form.date_debut = response.data[0].date_debut;
					this.form.date_fin = response.data[0].date_fin;
					this.form.description_impact =
						response.data[0].description_impact;
					this.form.statut_id = response.data[0].statut;
					this.form.priorite_id = response.data[0].priorite;
					this.form.is_faux_incident = response.data[0]
						.is_faux_incident
						? true
						: false;
					this.form.is_contournement = response.data[0]
						.is_contournement
						? true
						: false;
					this.form.description_contournement =
						response.data[0].description_contournement;
					this.form.enseigne_impactee = [];
					this.form.references = [];
					this.form.application_impactee = [];
					for (const ens_id of response.data[0].id_enseigne.split(
						'/'
					)) {
						this.form.enseigne_impactee.push(parseInt(ens_id));
					}
					for (
						let index = 0;
						index < response.data[0].reference_id.split('/').length;
						index++
					) {
						const id = response.data[0].reference_id.split('/')[
							index
						];
						const ref = response.data[0].reference.split('/')[
							index
						];
						this.form.references.push({
							reference_id: id,
							reference: ref,
						});
					}
					for (const app of response.data[0].display_name.split(
						'|||'
					)) {
						console.log({ display_name: app });
						this.form.application_impactee.push({
							display_name: app,
						});
					}
					console.log(this.form.application_impactee);
				});
			}
		},
		////////////////////////////////////////
		// Il faudra voir pour dedoublonner ces fonctions mais c'est pas urgent
		////////////////////////////////////////
		// Les handler pour la table et le modal des references
		confirmDelete() {
			this.form.references.splice(this.indexToDelete, 1);
			this.delConfirmationModalVisible = false;
		},
		handleDelete(index) {
			this.indexToDelete = index;
			this.refToDelete = this.form.references[index].reference;
			this.delConfirmationModalVisible = true;
		},
		handleCreate() {
			this.form.references.push({ reference: '' });
		},
		// Les handler pour la table et le modal des applis impactees
		confirmDeleteApp() {
			this.form.application_impactee.splice(this.indexRefToDeleteApp, 1);
			this.delConfirmationModalVisibleApp = false;
		},
		handleDeleteApp(index) {
			this.indexRefToDeleteApp = index;
			this.refToDeleteApp = this.form.application_impactee[
				index
			].application_impactee;
			this.delConfirmationModalVisibleApp = true;
		},
		handleCreateApp() {
			this.form.application_impactee.push({ display_name: '' });
		},
		////////////////////////////////////////
		// Fonction pour activer le "required" du champ "Description Contournement" en fonction du selecteur OUI/NON
		setContournementRule() {
			this.rules.description_contournement[0].required = !this.rules
				.description_contournement[0].required;
			this.form.description_contournement = !this.rules
				.description_contournement[0].required
				? 'Aucun contournement'
				: '';
		},
		// Méthode de récupération de tout les champs énumérées
		getFieldsOptions() {
			// Obtention des prioritées
			this.$http
				.get('http://localhost:5000/api/incidents/priorite')
				.then(response => {
					this.remoteEnum.priorites = response.data;
				});
			// Obtention des statuts
			this.$http
				.get('http://localhost:5000/api/incidents/statut')
				.then(response => {
					this.remoteEnum.statut = response.data;
				});
			// Obtention des enseignes
			this.$http
				.get('http://localhost:5000/api/enseignes')
				.then(response => {
					this.remoteEnum.enseignes = response.data;
				});
			// Obtention des applications
			this.$http
				.get('http://localhost:5000/api/applications')
				.then(response => {
					this.remoteEnum.applications = response.data;
				});
		},
		////////////////////////////////////////
		// Ces 2 fonctions sont nécessaire pour afficher les application dans le champ el-autocomplete
		// Voir "querySearch" et "createFilter" dans https://element.eleme.io/#/en-US/component/input#autocomplete
		////////////////////////////////////////
		// Récupère les applis qui match avec la saisie de l'utilisateur
		getMatchingApplications(requete, retour) {
			if (requete.length > 1) {
				var apps = this.remoteEnum.applications;
				var results = requete
					? apps.filter(this.createAppFilter(requete))
					: apps;
				retour(results);
				//console.log(retour);
			} else {
				retour([{ nom: '' }]);
			}
		},
		// Crée le filtre nécessaire à matcher les applis
		createAppFilter(queryString) {
			return apps => {
				return (
					apps.code_irt
						.toLowerCase()
						.indexOf(queryString.toLowerCase()) != -1 ||
					apps.trigramme
						.toLowerCase()
						.indexOf(queryString.toLowerCase()) != -1 ||
					apps.nom.toLowerCase().indexOf(queryString.toLowerCase()) !=
						-1 ||
					apps.libelle_court
						.toLowerCase()
						.indexOf(queryString.toLowerCase()) != -1
				);
			};
		},
		////////////////////////////////////////
	},
};
</script>

<!-- 
	Ici on met le CSS du component mais en SASS (pas SCSS)
	Voir : https://en.wikipedia.org/wiki/Sass_(stylesheet_language)
	Ou : https://sass-lang.com/guide
-->
<style lang="sass">
.el-form
	margin: 20px
	text-align: left
.card-header, .cell .el-input
	margin: 0
.el-card
	margin-bottom: 20px
.el-checkbox-group
	text-align: center
.el-date-editor.el-input, .el-select, .el-autocomplete
	width: 100%
label.el-form-item__label
	line-height: 15px
.arrayFormEmpty
	color: red
th:first-child .cell
	&::before
		content: "* "
		color: red
</style>
