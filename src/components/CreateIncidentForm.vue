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
                        <el-switch
                            style="display: block"
                            v-model="form.is_faux_incident"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="Oui"
                            inactive-text="Non"
                        ></el-switch>
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
                        <el-switch
                            style="display: block"
                            v-model="form.is_contournement"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="Oui"
                            inactive-text="Non"
                            @change="setContournementRule()"
                        ></el-switch>
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
            <el-button type="primary" @click="submit()">Sauvegarder</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import confirmationVue from './confirmation.vue';
import MyUpdateIncidentForm from './MyUpdateIncidentForm.vue';
import { thisExpression } from 'babel-types';
import Axios from 'axios';
import { win32 } from 'path';
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
        };
    },
    methods: {
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
            console.log(this.form.application_impactee);

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

                    for (
                        var i = 0;
                        i < this.form.application_impactee.length;
                        i++
                    ) {
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

                    for (var i = 0; i < this.form.references.length; i++) {
						if (this.form.references.length >= 1 && this.form.references[i].reference == '')
						{
                            this.form.references[i].reference = 'A venir';
						}
                    }

                    console.log(this.form);

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

		// Permet de dupliquer l'incident sélectionné dans la main courante
		duplicate()
		{
			// On récupère l'id de l'incident situé après le '=' dans l'url 
			var test = window.location.href.indexOf('=')
			if(test!=-1)
			{
				var idIncident=window.location.href.substr(test+1)
				console.log(idIncident)
			}

			// On récupère les informations de l'incident à dupliquer et on les affiche dans les champs correspondant
			if(idIncident!=undefined)
			{
				Axios.get('http://localhost:5000/api/main-courante/' + idIncident).then(
					response => {
						this.form.incident_id=idIncident
						this.form.description=response.data[0].description
						this.form.date_debut = response.data[0].date_debut;
                		this.form.date_fin = response.data[0].date_fin;
                		this.form.description_impact = response.data[0].description_impact;
                		this.form.statut_id = response.data[0].statut;
						this.form.priorite_id = response.data[0].priorite;
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
						})
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

            // Obtention des statut
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
