<template>
    <el-form ref="form" :model="form" label-position="top">
        <el-row :gutter="20">
            <el-col :span="6">
                <!-- Références incident -->
                <el-card>
                    <div slot="header">
                        <h4 class="card-header">Référence(s) de l'incident</h4>
                    </div>
                    <el-table :data="references" border>
                        <el-table-column label="Référence">
                            <template slot-scope="scope">
                                <el-input v-model="references[scope.$index].reference"></el-input>
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

                    <el-form-item label="Début de l'incident" required>
                        <el-date-picker
                            v-model="dateDebut"
                            type="datetime"
                            placeholder="Selectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy/MM/dd HH:mm:ss"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="Faux incident ?" required>
                        <el-switch
                            style="display: block"
                            v-model="fauxIncident"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="Oui"
                            inactive-text="Non"
                        ></el-switch>
                    </el-form-item>

                    <el-form-item label="Fin de l'incident" required>
                        <el-date-picker
                            v-model="dateFin"
                            type="datetime"
                            placeholder="Selectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy/MM/dd HH:mm:ss"
                            :disabled="fauxIncident"
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
                            <el-form-item label="Priorité" required>
                                <el-select v-model="priorite">
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
                            <el-form-item label="Statut" required>
                                <el-select v-model="status">
                                    <el-option
                                        v-for="item in remoteEnum.status"
                                        :key="item.id"
                                        :label="item.nom"
                                        :value="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="Enseigne(s) impactée(s)" required>
                        <el-checkbox-group v-model="enseigne_impactee">
                            <el-checkbox
                                v-for="enseigne in remoteEnum.enseignes"
                                :label="enseigne.id"
                                :key="enseigne.id"
                                v-if="!enseigne.is_deprecated || enseigne_impactee.includes(enseigne.id)"
                            >{{enseigne.nom}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="Description" required>
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 8}"
                            placeholder="Description"
                            v-model="description"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="Impact" required>
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8}"
                            placeholder="Impact"
                            v-model="impact"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="Un contournement existe ?" required>
                        <el-switch
                            style="display: block"
                            v-model="is_contournement"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="Oui"
                            inactive-text="Non"
                        ></el-switch>
                    </el-form-item>

                    <el-form-item label="Description du contournement">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8}"
                            placeholder="Contournement"
                            v-model="description_contournement"
                            :disabled="!is_contournement"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="TODO Application impactée">
                        <el-autocomplete
                            placeholder="Application impactée"
                            v-model="applicationImpactee"
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
            <el-button type="primary" @click="onSubmit()">Sauvegarder</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
import Axios from 'axios';
export default {
    created() {
        this.getFieldsOptions();
    },

    data() {
        return {
            references: [],
            fauxIncident: false,
            dateDebut: '',
            dateFin: '',
            description: '',
            impact: '',
            description_contournement: '',
            is_contournement: false,
            priorite: '',
            status: '',
            enseigne_impactee: [],
            applicationImpactee: '',

            remoteEnum: {
                priorites: [],
                status: [],
                enseignes: [],
                applications: [],
            },

            remoteIncident: {},

            // Ligne de test qui sera certainement à supprimer
            form: {},

            //Les lignes suivantes sont des variables nécessaires au modal de suppression
            delConfirmationModalVisible: false,
            indexRefToDelete: 0,
            refToDelete: '',
        };
    },
    methods: {
        onSubmit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        confirmDelete() {
            this.references.splice(this.indexToDelete, 1);
            this.delConfirmationModalVisible = false;
        },
        handleDelete(index) {
            this.indexToDelete = index;
            this.refToDelete = this.references[index].reference;
            this.delConfirmationModalVisible = true;
        },
        handleCreate() {
            this.references.push({ reference: '' });
        },

        getFieldsOptions() {
            // Obtention des prioritées
            Axios.get('http://localhost:5000/api/incidents/priorite').then(
                response => {
                    this.remoteEnum.priorites = response.data;
                }
            );

            // Obtention des status
            Axios.get('http://localhost:5000/api/incidents/status').then(
                response => {
                    this.remoteEnum.status = response.data;
                }
            );

            // Obtention des enseignes
            Axios.get('http://localhost:5000/api/enseignes').then(response => {
                this.remoteEnum.enseignes = response.data;
            });

            Axios.get('http://localhost:5000/api/applications').then(
                response => {
                    this.remoteEnum.applications = response.data.data;
                }
            );
        },

        getMatchingApplications(requete, retour) {
            if (requete.length > 1) {
                var apps = this.remoteEnum.applications;
                var results = requete
                    ? apps.filter(this.createFilter(requete))
                    : apps;
                retour(results);
            } else {
                retour([{ nom: '' }]);
            }
        },

        createFilter(queryString) {
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

