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
									id="reference"
									v-model="
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
							id="date_debut"
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

					<el-form-item label="Détection">
						<el-date-picker
							v-model="form.date_detection"
							type="datetime"
							placeholder="Sélectionnez l'horodatage"
							format="dd/MM/yyyy HH:mm:ss"
							value-format="yyyy-MM-dd HH:mm:ss"
						/>
					</el-form-item>

					<el-form-item label="Communication à la Tour De Contrôle">
						<el-date-picker
							v-model="form.date_communication_TDC"
							type="datetime"
							placeholder="Sélectionnez l'horodatage"
							format="dd/MM/yyyy HH:mm:ss"
							value-format="yyyy-MM-dd HH:mm:ss"
						/>
					</el-form-item>

					<el-form-item label="Qualification P0 P1">
						<el-date-picker
							v-model="form.date_qualification_p01"
							type="datetime"
							placeholder="Sélectionnez l'horodatage"
							format="dd/MM/yyyy HH:mm:ss"
							value-format="yyyy-MM-dd HH:mm:ss"
						/>
					</el-form-item>

					<el-form-item label="Première communication à l'enseigne">
						<el-date-picker
							v-model="form.date_premiere_com"
							type="datetime"
							placeholder="Sélectionnez l'horodatage"
							format="dd/MM/yyyy HH:mm:ss"
							value-format="yyyy-MM-dd HH:mm:ss"
						/>
					</el-form-item>
				</el-card>
				<!-- Fin Horodatage -->

				<!-- Agences isolées -->
<!-- 
				<el-card>
					<div slot="header">
						<h4 class="card-header">Agences isolées</h4>
					</div>
					<input type="file" id="input" @click="importer()" style="margin-left:10px;" />
				</el-card> -->

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
								<el-select id="priorite_id" v-model="form.priorite_id">
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
								<el-select id="statut_id" v-model="form.statut_id">
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
								id="enseigne"
								v-for="enseigne in remoteEnum.enseignes"
								:label="enseigne.id"
								:key="enseigne.id"
								v-if="!enseigne.is_deprecated"
							>{{ enseigne.nom }}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>

					<el-form-item label="Description" prop="description">
						<el-input
							id="description"
							type="textarea"
							:autosize="{ minRows: 2, maxRows: 8 }"
							placeholder="Description"
							v-model="form.description"
						></el-input>
					</el-form-item>

					<el-form-item label="Impact" prop="description_impact">
						<el-input
							id="description_impact"
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

					<el-form-item label="Cause">
						<el-input
							id="cause"
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 8 }"
							placeholder="Cause"
							v-model="form.cause"
						></el-input>
					</el-form-item>

					<el-form-item label="Origine">
						<el-input
							id="origine"
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 8 }"
							placeholder="Origine"
							v-model="form.origine"
						></el-input>
					</el-form-item>

					<el-form-item label="Action de rétablissement" prop="action_retablissement">
						<el-input
							id="action_retablissement"
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 8 }"
							placeholder="Action de rétablissement"
							v-model="form.action_retablissement"
						></el-input>
					</el-form-item>

					<el-form-item label="Plan d'action" prop="plan_action">
						<el-input
							id="plan_action"
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 8 }"
							placeholder="Plan d'action"
							v-model="form.plan_action"
						></el-input>
					</el-form-item>
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
			<el-button type="primary" class="button" @click="onSubmit() ">Sauvegarder</el-button>
			<el-button type="primary" class="button" @click="envoyerMail()">Envoyer un mail</el-button>
			<el-button type="primary" class="button" @click="dupliquer()">Dupliquer</el-button>
			<el-button type="primary" class="button" @click="cosip()">Cosip</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import Axios from 'axios';
// import { scrypt } from 'crypto';
// import { escape } from 'querystring';
// import { open } from 'fs';
// import confirmationVue from './confirmation.vue';
// import func from '../../vue-temp/vue-editor-bridge';
import Vue from 'vue';
import CreateIncidentFormVue from './CreateIncidentForm.vue';
import { readFile, watch } from 'fs';
import { importSpecifier, thisTypeAnnotation, identifier } from 'babel-types';
import readXlsxFile from 'read-excel-file';
import { setTimeout } from 'timers';
import { constants } from 'crypto';
import { Loading } from 'element-ui';
export default {
	created() {
		this.getFieldsOptions();
		this.getIncident(this.incident_id);
	},
	props: {
		incident_id: {
			type: Number,
		},
	},
	data() {
		return {
			classificationBDDF: '',
			classificationCDN: '',
			classificationBPF: '',
			// Données énumérées venant de l'API
			remoteEnum: {
				priorites: [],
				statut: [],
				enseignes: [],
				application_impactee: [],
			},

			// Données du formulaire
			form: {
				incident_id: 0,
				references: [], //
				is_faux_incident: false, //
				date_debut: '', //
				date_fin: null, //
				description: '', //
				cause: '',
				cosip_id: '',
				origine: '',
				gravite_id: '',
				action_retablissement: '',
				plan_action: '',
				description_impact: '', //
				description_contournement: 'Aucun contournement', //
				is_contournement: false, //
				priorite_id: '', //
				statut_id: '', //
				enseigne_impactee: [],
				application_impactee: [],
				date_detection: '',
				date_communication_TDC: '',
				date_qualification_p01: '',
				date_premiere_com: '',
				valueImpactCDN: '',
				valueImpactBDDF: '',
				valueImpactBPF: '',
				impact_avereCDN: '',
				impact_avereBDDF: '',
				impact_avereBPF: '',

				gravite_idCDN: '',
				gravite_idBPF: '',
				gravite_idBDDF: '',
				enseigne_impactee: [],
				desc_impact_enseigne: [],
				description_impact: '', //
				description_impactCDN: '',
				description_impactBDDF: '',
				description_impactBPF: '',
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
				plan_action: [
					{
						required: false,
						message: "Plan d'action",
						trigger: 'blur',
					},
				],
				action_retablissement: [
					{
						required: false,
						message: 'Action de rétablissement',
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
				applicationImpactee: [
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
			dialogFormVisible: false,
		};
	},

	methods: {
		// Cette méthode est lancée quand un champ d'appli impacté s'est vu selectionné une appli parmis les propositions
		// Quand tel est le cas, on insere les données de l'appli (CI et trigramme) pour pouvoir la relier en BDD
		isValid(value) {
			return /^P\d{2,}[IN|PB|CH|RQ]{2,}[-]{1,}\d{7,}$/.test(value);
		},
		appSelected(appSelection) {
			const appIndex = this.form.application_impactee
				.map(el => el.display_name)
				.indexOf(appSelection.display_name);
			this.form.application_impactee[appIndex] = appSelection;
		},
		onSubmit() {
			
			let loadingInstance = Loading.service({fullscreen: true,text:"Chargement des donnée ...",
					background: "rgba(0, 0, 0, 0.7)"})
							
			// Vérification Trigramme not udefined 
			for(let i = 0; i < this.form.application_impactee.length; i++){
				if((this.form.application_impactee[i].trigramme === undefined) && (this.form.application_impactee[i].code_irt !== undefined)){
					this.form.application_impactee[i].trigramme = "FFF"
				}
			}
			// Vérification si les champs son vide ne pas enregistrer la valeur null retourner par défaut par vueJS avec le v-model
			if (
				this.form.cause == 'null' ||
				(this.form.cause == null && this.form.origine == 'null') ||
				(this.form.origine == null &&
					this.form.action_retablissement == 'null') ||
				(this.form.action_retablissement == null &&
					this.form.plan_action == 'null') ||
				this.form.plan_action == null
			) {
				this.form.cause = '';
				this.form.origine = '';
				this.form.action_retablissement = '';
				this.form.plan_action = '';
			}//  Vérifier avant la modification si l'incident est au COSIP si c'est le cas le modifier depuis l'onglet : COSIP car plus d'infos sur celui-ci 
			this.$refs['form'].validate(valid => {
				if (valid) {
					if (
						this.form.cosip_id != null &&
						this.form.cosip_id != ''
					) {
						this.$message({
							dangerouslyUseHTMLString: true,
							message:
								"<h2 style='font-family: arial'>Cet incident est au cosip</h2> <p style='font-family: arial'>==> Modifier le depuis l'onglet <strong>Cosip</strong></p>",
							type: 'error',
						});
						loadingInstance.close();
						return false;
					}
					/*// On vérifie qu'il y a au moins une référence
                    if (this.form.references.length == 0) {
                        alert('Aucune donnée dans les références');
                        return false;
                    }
                    // On vérifie qu'il y a au moins une application impactée
                    else if (this.form.application_impactee.length == 0) {
                        alert('Aucune donnée dans les applications impactées');
                        return false;
                    }*/
					// On vérifie qu'il y a au moins une référence
					if (this.form.references.length == 0) {
						this.$message({
							dangerouslyUseHTMLString: true,
							message:
								"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> Au moins une <strong>Référence</strong> doit être renseignée.</p>",
							type: 'error',
						});
						loadingInstance.close();
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
						loadingInstance.close();
						return false;
					}

					// On parcourt tous les champs application impactée
					for (
						var i = 0;
						i < this.form.application_impactee.length;
						i++
					) {
						// On vérifie que les champs ouverts soient remplis
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
							loadingInstance.close();
							return false;
						}
					}
					// On parcourt tous les champs référence
					for (let i = 0; i < this.form.references.length; i++) {
						// Si le premier champs est vide on écrit "A venir"
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
						} else {
							this.$message({
								dangerouslyUseHTMLString: true,
								message:
									"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> Veuillez remplir les champs au format : \"P00IN-0000000\".</p>",
								type: 'error',
							});
							loadingInstance.close();
							return false;
						}
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
							loadingInstance.close();
							return false;
						}
					}
					this.curID = this.incident_id;
					// On enregistre en base de données
					this.$http
						.put(
							'http://localhost:5000/api/main-courante',
							this.form
						)
						.then(result => {
							this.$message({
								dangerouslyUseHTMLString: true,
								message:
									"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
								type: 'success',
							});
							setTimeout(function(){
								loadingInstance.close();	
								window.location.reload();
							},4000);
							
						});
				} else {
					this.$message({
						dangerouslyUseHTMLString: true,
						message:
							"<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> Tous les <strong>Champs requis</strong> n'ont pas été remplis.</p>",
						type: 'error',
					});
					loadingInstance.close();
					return false;
				}
			});
			
		},

		///////Partie Agence/////////
		importer() {
			const input = document.getElementById('input');
			input.addEventListener('change', () => {
				readXlsxFile(input.files[0]).then(rows => {
					Axios.get('http://localhost:5000/api/reference').then(
						response => {
							// On parcourt toutes les références de la main courante
							for (var p = 0; p <= response.data.length; p++) {
								// On parcourt toutes les lignes du fichier Excel des agences
								for (const row of rows) {
									// On vérifie que les différentes références du fichier Excel des agences sont présentes dans la main courante
									if (
										response.data[p].reference.includes(
											row[0]
										) == true
									) {
										// Si l'état de l'incident est "En cours"
										if (
											row[7].includes('En cours') == true
										) {
											this.incident_id =
												response.data[p].incident_id;
											this.curID =
												response.data[p].incident_id;
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
										}
									}
								}
							}
						}
					);
				});
			});
		},
		////////////////////////////////////////
		// Il faudra voir pour dedoublonner ces fonctions mais c'est pas urgent
		////////////////////////////////////////
		// Les handler pour la table et le modal des references
		////////////////////////////////////////
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
		//
		confirmDeleteAppAgence() {
			this.agence.application_agence.splice(
				this.indexRefToDeleteAppAgence,
				1
			);
			this.delConfirmationModalVisibleApp = false;
		},
		handleDeleteAppAgence(index) {
			this.indexRefToDeleteAppAgence = index;
			this.refToDeleteAppAgence = this.agence.application_agence[
				index
			].application_agence;
			this.delConfirmationModalVisibleApp = true;
		},
		handleCreateAppAgence() {
			this.agence.application_agence.push({ display_name_agence: '' });
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
		// Méthode qui permet de dupliquer l'incident sélectionné
		dupliquer() {
			window.location.href = '/#/new-incident/id=' + this.incident_id;
			if (this.incident_id == undefined) {
				console.log('ID non existant');
			} else {
				console.log(this.incident_id);
			}
		},
		// Méthode qui permet d'envoyer l'incident séléctionné vers un formulaire COSIP
		cosip() {
			
			window.location.href = '/cosip/id=' + this.incident_id;
			if (this.incident_id == undefined) {
				console.log('ID non existant');
			} else {
				console.log(this.incident_id);
			}
		},

		// Méthode qui permettra de faire de la communication d'incident (non fonctionnelle)
		async envoyerMail() {
			// Only needed if you don't have a real mail account for testing
			let testAccount = await nodemailer.createTestAccount();
			// create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport({
				host: 'smtp.ethereal.email',
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: testAccount.user, // generated ethereal user
					pass: testAccount.pass, // generated ethereal password
				},
			});
			// send mail with defined transport object
			let info = await transporter.sendMail({
				from: '"Fred Foo 👻" <foo@example.com>', // sender address
				to: 'bar@example.com, baz@example.com', // list of receivers
				subject: 'Hello ✔', // Subject line
				text: 'Hello world?', // plain text body
				html: '<b>Hello world?</b>', // html body
			});
			console.log('Message sent: %s', info.messageId);
			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
			//Récupération des différents champs
			// var description = document.getElementById('description').value;
			// var description_impact = document.getElementById(
			//     'description_impact'
			// ).value;
			// var priorite_id = document.getElementById('priorite_id').value;
			// var enseigne = document.getElementById('enseigne').value;
			// //var ref=document.getElementById('reference').value
			// var date_debut = document.getElementById('date_debut').value;
			// var cause = document.getElementById('cause').value;
			// var origine = document.getElementById('origine').value;
			// var action_retablissement = document.getElementById(
			//     'action_retablissement'
			// ).value;
			// var plan_action = document.getElementById('plan_action').value;
			// var enseigne = this.form.enseigne_impactee;
			// var ref = this.form.references;
			// //Définition des adresses mail, de l'objet et du contenu du mail
			// var adresseMail = 'lucie.varlet@socgen.com';
			// var obj =
			//     '[Incident ' +
			//     priorite_id +
			//     '][' +
			//     enseigne +
			//     '][Annonce][' +
			//     ref +
			//     '][][' +
			//     date_debut +
			//     ']';
			// var formatedBody =
			//     'INCIDENT TRAITE EN ' +
			//     priorite_id +
			//     '\n \nDescription\n' +
			//     description +
			//     '\n \nEnseigne impactée\n' +
			//     enseigne +
			//     '\nVisible du client final : \nListe détaillée des clients et opérations à fournir au métier : \n' +
			//     '\n \nImpacts\n' +
			//     description_impact +
			//     '\n \nCauses\n' +
			//     cause +
			//     '\n \nActions de résolution menées\n' +
			//     action_retablissement +
			//     "\n \nPlan d'actions\n" +
			//     plan_action +
			//     '\n \nProchaine communication à ..h..\n' +
			//     '\n \nCordialement,' +
			//     '\nXXXXXXXXXX' +
			//     '\nTour De Contrôle' +
			//     '\nITIM/GSI/TDC' +
			//     '\nHeures Ouvrées : 01-42-14-22-23' +
			//     '\nAstreinte de crise : 06-09-79-20-35';
			// //Ouvre outlook avec le mail pré-rempli (adresses mail, objet, corps du mail (Possibilité d'ajouter les CC))
			// //window.open("mailto:"+adresseMail+"?subject="+obj+"&body="+body)
			// var mailTo =
			//     'mailto:' +
			//     adresseMail +
			//     '?subject=' +
			//     obj +
			//     '&body=' +
			//     encodeURIComponent(formatedBody);
			// window.location.href = mailTo;
			// ////////////////////////////////////////
			// //////////////NODEMAILER////////////////
			// ////////////////////////////////////////
			// /*const nodeMailer = require('nodemailer');
			//     var transporter = nodeMailer.createTransport({
			//         service: 'Outlook365',
			//         auth: {
			//             user: '',
			//             pass: '',
			//         },
			//     });
			//     var mailOptions = {
			//         from: 'lucie.varlet@socgen.com',
			//         to: 'lucie-varlet@hotmail.fr',
			//         subject: 'Test',
			//         text: 'Message',
			//         html: '<b>corps du mail</b>',
			//     };
			//     transporter.sendMail(mailOptions, function(error, info) {
			//         if (error) {
			//             return console.log(error);
			//         }
			//         console.log('Message sent: ' + info.response);
			//     });
			//     transporter.close();*/
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
			// Obtention des application
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
		// Récupère les informations d'un incident pour l'insérer dans le formulaire
        getIncident(idIncident) {
            // Obtention de l'incident
            Axios.get(
                'http://localhost:5000/api/main-courante/' + idIncident
            ).then(response => {
				this.form.incident_id = this.incident_id;
	
				this.form.description = response.data[0].description;
                this.form.date_debut = response.data[0].date_debut;
                this.form.date_fin = response.data[0].date_fin;
                this.form.description_impact = response.data[0].description_impact;
                this.form.statut_id = response.data[0].statut;
                this.form.priorite_id = response.data[0].priorite;
                this.form.date_detection = response.data[0].date_detection;
                this.form.date_communication_TDC =
                    response.data[0].date_communication_tdc;
                this.form.date_qualification_p01 =
                    response.data[0].date_qualif_p01;
                this.form.gravite_id = response.data[0].gravite_id;
                this.form.date_premiere_com = response.data[0].date_premier_com;
                this.form.cause = response.data[0].cause;
                this.form.action_retablissement = response.data[0].action_retablissement;
                this.form.origine = response.data[0].origine;
                this.form.plan_action = response.data[0].plan_action;

				this.form.is_faux_incident = response.data[0].is_faux_incident
					? true
					: false;
				this.form.is_contournement = response.data[0].is_contournement
					? true
					: false;
				this.form.description_contournement =
					response.data[0].description_contournement;
				this.form.enseigne_impactee = [];
				this.form.references = [];
                this.form.application_impactee = [];
                this.form.cosip_id = response.data[0].cosip_id
                for (const ens_id of response.data[0].id_enseigne.split('/')) {
					this.form.enseigne_impactee.push(parseInt(ens_id));
				}

				// console.log("Nb ref ", response.data[0].reference_id.split('/').length)
				//Gestion pour la récupération des référence 
                for (
                    let index = 0;
                    index < response.data[0].reference_id.split('/').length; // récupération de la référence et stop séparation au caractère / 
					index++
                ) {
                    const id = response.data[0].reference_id.split('/')[index];
					const ref = response.data[0].reference.split('/')[index];
                    this.form.references.push({
                        reference_id: id,
						reference: ref, 
                    });
				}

				//Récupération des applications
				for (
					let index = 0;
					index < response.data[0].code_irt.split('/').length;
					index++
				) {
					const itr = response.data[0].code_irt.split('/')[index];
					const app = response.data[0].display_name.split('|||')[index];
					const  tri = response.data[0].trigramme.split('/')[index];

					this.form.application_impactee.push({
						code_irt: itr,
						display_name: app,
						trigramme: tri
					});
				}

				//Récupération des enseignes et affichage des cards
				if((this.form.cosip_id !== "") && (this.form.cosip_id !== null)){
				for (
					let index = 0;
					index < response.data[0].enseigne_id.split('/').length;
					index++
				) {
					const idEns = response.data[0].enseigne_id.split('/')[
						index
					];
					this.form.enseigne_impactee.push(parseInt(idEns));
					const desImpact = response.data[0].description_impact.split(
						'/'
					)[index];
					const graviteA = response.data[0].gravite_id.split('/')[
						index
					];
					const graviteNom = response.data[0].gravite_nom.split('/')[
						index
					];
					const criticite = response.data[0].classification.split(
						'/'
					)[index];
					this.tab_enseignes.push({
						enseigne_id: idEns,
						desc: desImpact,
						gravite: graviteNom,
						id_grav: graviteA,
						class: criticite,
					}); // Switch case pour récupérer les données qui sont indépendantes en fonction de l'enseigne
					switch (this.tab_enseignes[index].enseigne_id) {
						case '1':
							this.form.description_impactBDDF = this.tab_enseignes[
								index
							].desc;
							this.form.impact_avereBDDF = this.tab_enseignes[
								index
							].gravite;
							this.classificationBDDF = this.tab_enseignes[
								index
							].class;
							this.form.gravite_idBDDF = this.tab_enseignes[
								index
							].id_grav;
							break;
						case '2':
							this.form.description_impactCDN = this.tab_enseignes[
								index
							].desc;
							this.form.impact_avereCDN = this.tab_enseignes[
								index
							].gravite;
							this.classificationCDN = this.tab_enseignes[
								index
							].class;
							this.form.gravite_idCDN = this.tab_enseignes[
								index
							].id_grav;
							break;
						case '3':
							this.form.impact_avereBPF = this.tab_enseignes[
								index
							].gravite;
							this.form.description_impactBPF = this.tab_enseignes[
								index
							].desc;
							this.classificationBPF = this.tab_enseignes[
								index
							].class;
							this.form.gravite_idBPF = this.tab_enseignes[
								index
							].id_grav;
							break;
					}
				}
				}
			});
		},
	},

	// 			for (const app of response.data[0].display_name.split('|||')) {
	// 				console.log({display_name: app });

	//                 this.form.application_impactee.push({display_name: app })
	//             }

	// 			console.log(this.form.application_impactee);
	//         });
	//     },

	// },

	// 				this.form.application_impactee.push({ display_name: app });
	// 			}

	// 			console.log(this.form.application_impactee);
	// 		});
	// 	},
	// },
	watch: {
		incident_id: function() {
			this.getIncident(this.incident_id);
		},
	},
};
</script>

<!-- 
	Ici on met le CSS du component mais en SASS (pas SCSS)
	Voir : https://en.wikipedia.org/wiki/Sass_(stylesheet_language)
	Ou : https://sass-lang.com/guide
-->
<style lang="sass">
 
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
th:first-child .cell
	&::before
		content: "* "
		color: red

</style>