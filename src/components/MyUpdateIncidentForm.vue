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
									disabled
                                    v-model="
                                        form.references[scope.$index].reference
                                    "
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot="header">
                                <el-button
                                    type="primary"
                                    icon="el-icon-plus"
                                    circle
                                    @click="handleCreate()"
                                />
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    circle
                                    @click="handleDelete(scope.$index)"
                                />
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
            </el-col>

            <!-- Info Générales -->
            <el-col :span="18">
                <!-- Infos générales incident -->
                <el-card>
                    <div slot="header">
                        <h4 class="card-header">
                            Informations générales de l'incident
                        </h4>
                    </div>

                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="Priorité" prop="priorite_id">
                                <el-select
                                    id="priorite_id"
                                    v-model="form.priorite_id"
                                >
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
                                <el-select
                                    id="statut_id"
                                    v-model="form.statut_id"
                                >
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

                    <el-form-item
                        label="Enseigne(s) impactée(s)"
                        prop="enseigne_impactee"
                    >
                        <el-checkbox-group v-model="form.enseigne_impactee">
                            <el-checkbox
                                id="enseigne"
                                v-for="enseigne in remoteEnum.enseignes"
                                :label="enseigne.id"
                                :key="enseigne.id"
                                v-if="!enseigne.is_deprecated"
                                >{{ enseigne.nom }}</el-checkbox
                            >
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
                    <el-form-item
                        label="Description du contournement"
                        prop="description_contournement"
                    >
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8 }"
                            placeholder="Contournement"
                            v-model="form.description_contournement"
                            :disabled="!form.is_contournement"
                        ></el-input>
                    </el-form-item>

                    <el-table :data="form.application_impactee" border>
                        <el-table-column
                            label="Application(s) impactée(s)"
                            prop="application_impactee"
                        >
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
                                <el-button
                                    type="primary"
                                    icon="el-icon-plus"
                                    circle
                                    @click="handleCreateApp()"
                                />
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

                    <el-form-item
                        label="Action de rétablissement"
                        prop="action_retablissement"
                    >
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
            <span
                >Etes vous sur de vouloir supprimer la référence :
                {{ refToDelete }}</span
            >
            <span slot="footer" class="dialog-footer">
                <el-button @click="delConfirmationModalVisible = false"
                    >Annuler</el-button
                >
                <el-button type="danger" @click="confirmDelete()"
                    >Confirmer</el-button
                >
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
            <span
                >Etes vous sur de vouloir supprimer l'application :
                {{ refToDeleteApp }}</span
            >
            <span slot="footer" class="dialog-footer">
                <el-button @click="delConfirmationModalVisibleApp = false"
                    >Annuler</el-button
                >
                <el-button type="danger" @click="confirmDeleteApp()"
                    >Confirmer</el-button
                >
            </span>
        </el-dialog>
        <!-- Fin Modal de confirmation de suppression d'une application impactée-->

        <el-form-item style="text-align: center">
            <el-button type="primary" @click="onSubmit()"
                >Sauvegarder</el-button
            >
            <el-button type="primary" @click="envoyerMail()"
                >Envoyer un mail</el-button
            >
			<el-button type="primary" @click="dupliquer()"
				>Dupliquer</el-button
			>
			<input type="file" id="input" @click="importer()"/>
        </el-form-item>
    </el-form>
</template>

<script>
import Axios from 'axios';
// import { scrypt } from 'crypto';
// import { escape } from 'querystring';
// import { open } from 'fs';
// import confirmationVue from './confirmation.vue';
//import func from '../../vue-temp/vue-editor-bridge';
import Vue from 'vue'
import CreateIncidentFormVue from './CreateIncidentForm.vue';
import { readFile, watch } from 'fs';
import { importSpecifier } from 'babel-types';
import readXlsxFile from 'read-excel-file'
import { setTimeout } from 'timers';
import { constants } from 'crypto';

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
                origine: '',
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
        };
	},

	
    methods: {
        // Cette méthode est lancée quand un champ d'appli impacté s'est vu selectionné une appli parmis les propositions
        // Quand tel est le cas, on insere les données de l'appli (CI et trigramme) pour pouvoir la relier en BDD
        appSelected(appSelection){
            const appIndex = this.form.application_impactee.map(el => el.display_name).indexOf(appSelection.display_name)
            this.form.application_impactee[appIndex] = appSelection
        },

        onSubmit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
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

                    for (var i=0; i<this.form.application_impactee.length;i++)
                    {
                        if(this.form.application_impactee.length>=1 && this.form.application_impactee[i].display_name=='')
                        {
                            this.$message({
                            dangerouslyUseHTMLString: true,
                            message:
                                "<h2 style='font-family: arial'>Impossible d'inserer l'incident</h2> <p style='font-family: arial'>==> Veuillez remplir le(s) champ(s) 'Application(s) impactée(s) ouvert(s).</p>",
                            type: 'error',
                        });
                            return false;
                        }
                    }

                    for (var i=0; i<this.form.references.length;i++)
                    {
                        if(this.form.references.length>=1 && this.form.references[i].reference=='')
                        {
                            this.form.references[i].reference="A venir"
                        }
                    }

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
						})
                } else {
                    /*console.log('error');
                    return false;*/
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
		importer()
		{
			const input = document.getElementById('input')
			input.addEventListener('change', () => {
				readXlsxFile(input.files[0]).then((rows) => {
						console.log(input.files[0].name)
						Axios.get(
                		'http://localhost:5000/api/reference'
            			).then(response => {
							for(var p=0;p<=response.data.length;p++)
							{
								for(const row of rows)
								{								
									if(((response.data[p]).reference.includes(row[0]))==true)
									{
										this.getIncident((response.data[p]).incident_id)
										console.log((response.data[p]).incident_id) //id des incidents en fonction de la référence
										Axios.get('http://localhost:5000/api/main-courante/').then(
										response => {
											var date=row[1]+''
											var dateFin=row[2]+''
											var mois=""
											if(row[4].includes("isolée")==true)
											{
												this.form.description="Depuis le "+ date[8]+date[9]+"/"+date[4]+date[5]+date[6]+"/"+date[11]+date[12]+date[13]+date[14]+" à "+date[16]+date[17]+date[18]+date[19]+date[20]+date[21]+date[22]+date[23]+ ", indisponibilité du réseau de données et de la téléphonie à l'agence "+row[4].substring(0,row[4].length-11)+" ("+row[5]+" utilisateurs)"
											}
											if(row[4].includes("dégradée")==true)
											{
												this.form.description="Depuis le "+ date[8]+date[9]+"/"+date[4]+date[5]+date[6]+"/"+date[11]+date[12]+date[13]+date[14]+" à "+date[16]+date[17]+date[18]+date[19]+date[20]+date[21]+date[22]+date[23] + ", dégradation du réseau de données et de la téléphonie à l'agence "+row[4].substring(0,row[4].length-13)+" ("+row[5]+" utilisateurs)"
											}

											if((input.files[0].name).includes("CDN" || "cdn"))
											{
												//cocher l'enseigne CDN
											}
											if((input.files[0].name).includes("BDDF" || "bddf"))
											{
												//cocher l'enseigne BDDF
											}
											if((input.files[0].name).includes("BPF" || "bpf"))
											{
												//cocher l'enseigne BPF
											}

											this.form.description_impact=row[5]
											this.form.application_impactee.push({display_name: "Infrastructure Réseau Banque de Détail"})
											this.form.cause = row[8]
											this.remoteEnum.priorites=row[6]
											//statut
											if(date[4]+date[5]+date[6]=="Jan")
											{
												mois="01"
											}
											if(date[4]+date[5]+date[6]=="Feb")
											{
												mois="02"
											}
											if(date[4]+date[5]+date[6]=="Mar")
											{
												mois="03"
											}
											if(date[4]+date[5]+date[6]=="Apr")
											{
												mois="04"
											}
											if(date[4]+date[5]+date[6]=="May")
											{
												mois="05"
											}
											if(date[4]+date[5]+date[6]=="Jun")
											{
												mois="06"
											}
											if(date[4]+date[5]+date[6]=="Jul")
											{
												mois="07"
											}
											if(date[4]+date[5]+date[6]=="Aug")
											{
												mois="08"
											}
											if(date[4]+date[5]+date[6]=="Sep")
											{
												mois="09"
											}
											if(date[4]+date[5]+date[6]=="Oct")
											{
												mois="10"
											}
											if(date[4]+date[5]+date[6]=="Nov")
											{
												mois="11"
											}
											if(date[4]+date[5]+date[6]=="Dec")
											{
												mois="12"
											}
											////// La date et l'heure récupérées ne sont pas les bonnes (14h en plus) 
											this.form.date_debut=date[11]+date[12]+date[13]+date[14]+"-"+mois+"-"+date[8]+date[9]+" "+date[16]+date[17]+date[18]+date[19]+date[20]+date[21]+date[22]+date[23]
											this.form.date_fin=dateFin[11]+dateFin[12]+dateFin[13]+dateFin[14]+"-"+mois+"-"+dateFin[8]+dateFin[9]+" "+dateFin[16]+dateFin[17]+dateFin[18]+dateFin[19]+dateFin[20]+dateFin[21]+dateFin[22]+dateFin[23]
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
											})
										})
									}
								}
							}
						})
				})
			})
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

		dupliquer() {
			window.location.href="/#/new-incident/id="+this.incident_id
			if (this.incident_id==undefined)
			{
				console.log("ID non existant")
			} else {
				console.log(this.incident_id)
			}
		},
	
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
                    pass: testAccount.pass // generated ethereal password
                }
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: 'bar@example.com, baz@example.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
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
                this.form.description_impact =
                    response.data[0].description_impact;
                this.form.statut_id = response.data[0].statut;
                this.form.priorite_id = response.data[0].priorite;
                this.form.date_detection = response.data[0].date_detection;
                this.form.date_communication_TDC =
                    response.data[0].date_communication_tdc;
                this.form.date_qualification_p01 =
                    response.data[0].date_qualif_p01;
                this.form.date_premiere_com = response.data[0].date_premier_com;
                this.form.cause = response.data[0].cause;
                this.form.origine = response.data[0].origine;
                this.form.action_retablissement =
                    response.data[0].action_retablissement;
                this.form.plan_action = response.data[0].plan_action;
                this.form.is_faux_incident = response.data[0].is_faux_incident
                    ? true
                    : false;
                this.form.is_contournement = response.data[0].is_contournement
                    ? true
                    : false;
                this.form.description_contournement = response.data[0].description_contournement
                this.form.enseigne_impactee = [];
				this.form.references = [];
				this.form.application_impactee = [];

                for (const ens_id of response.data[0].id_enseigne.split('/')) {
                    this.form.enseigne_impactee.push(parseInt(ens_id));
                }

                for (
                    let index = 0;
                    index < response.data[0].reference_id.split('/').length;
                    index++
                ) {
                    const id = response.data[0].reference_id.split('/')[index];
                    const ref = response.data[0].reference.split('/')[index];
                    this.form.references.push({
                        reference_id: id,
                        reference: ref,
                    });
				}
				
				for (const app of response.data[0].display_name.split('|||')) {
					console.log({display_name: app });
					
                    this.form.application_impactee.push({display_name: app })
                }
				
				console.log(this.form.application_impactee);
				
				

            });
        },
    },

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

th:first-child .cell
	&::before
		content: "* "
		color: red

</style>