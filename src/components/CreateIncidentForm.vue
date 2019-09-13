<template>
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
                                <el-input v-model="form.references[scope.$index].reference"></el-input>
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
                            >{{enseigne.nom}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="Description" prop="description">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 8}"
                            placeholder="Description"
                            v-model="form.description"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="Impact" prop="description_impact">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8}"
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
                            :autosize="{ minRows: 4, maxRows: 8}"
                            placeholder="Contournement"
                            v-model="form.description_contournement"
                            :disabled="!form.is_contournement"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="Application impactée" prop="applicationImpactee">
                        <el-autocomplete
                            placeholder="Application impactée"
                            v-model="form.applicationImpactee"
                            :fetch-suggestions="getMatchingApplications"
                            value-key="display_name"
                        ></el-autocomplete>
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
            <span>Etes vous sur de vouloir supprimer la référence : {{refToDelete}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delConfirmationModalVisible = false">Annuler</el-button>
                <el-button type="danger" @click="confirmDelete()">Confirmer</el-button>
            </span>
        </el-dialog>
        <!-- Fin Modal de confirmation de suppression d'une reférence problème -->

        <el-form-item style="text-align: center">
            <el-button type="primary" @click="submit()">Sauvegarder</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    created() {
        this.getFieldsOptions();
    },

    data() {
        return {
            // Données énumérées venant de l'API
            remoteEnum: {
                priorites: [],
                statut: [],
                enseignes: [],
                applications: [],
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
                applicationImpactee: '',
            },

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
            indexRefToDelete: 0,
            refToDelete: '',
        };
    },
    methods: {
        submit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    console.log(this.form);
                    this.$http.post(
                        'http://localhost:5000/api/main-courante',
                        this.form
                    );
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
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

        setContournementRule() {
            this.rules.description_contournement[0].required = !this.rules
				.description_contournement[0].required
			this.form.description_contournement = !this.rules
				.description_contournement[0].required ? "Aucun contournement" : ""
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
    },
};
</script>


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
</style>

