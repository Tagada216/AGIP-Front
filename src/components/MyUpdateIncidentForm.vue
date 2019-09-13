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
                                <el-input id="ref" v-model="references[scope.$index].reference"></el-input>
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
                        <el-date-picker id="date"
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
                    <el-form-item label="Détection">
                        <el-date-picker
                            v-model="dateDetection"
                            type="datetime"
                            placeholder="Sélectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy/MM/dd HH:mm:ss"
                        />
                    </el-form-item>
                    <el-form-item label="Communication à la Tour De Contrôle">
                        <el-date-picker
                            v-model="dateCommunicationTDC"
                            type="datetime"
                            placeholder="Sélectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy/MM/dd HH:mm:ss"
                        />
                    </el-form-item>
                    <el-form-item label="Qualification P0 P1">
                        <el-date-picker
                            v-model="dateQualificationP01"
                            type="datetime"
                            placeholder="Sélectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy/MM/dd HH:mm:ss"
                        />
                    </el-form-item>
                    <el-form-item label="Première communication à l'enseigne">
                        <el-date-picker
                            v-model="datePremiereCom"
                            type="datetime"
                            placeholder="Sélectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy/MM/dd HH:mm:ss"
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
                                <el-select id ="prio" v-model="priorite">
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
                                <el-select v-model="statut">
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

                    <el-form-item label="Enseigne(s) impactée(s)" required>
                        <el-checkbox-group id="enseigne" v-model="enseigne_impactee">
                            <el-checkbox id="check"
                                v-for="enseigne in remoteEnum.enseignes"
                                :label="enseigne.id"
                                :key="enseigne.id"
                                v-if="!enseigne.is_deprecated || enseigne_impactee.includes(enseigne.id)"
                            >{{enseigne.nom}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="Description" required>
                        <el-input id="desc"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 8}"
                            placeholder="Description"
                            v-model="description"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="Impact" required>
                        <el-input id="imp"
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

                    <el-form-item label="Cause">
                        <el-input id="cause"
                            type="textarea"
                            :autosize="{minRows: 4, maxRows: 8}"
                            placeholder="Cause"
                            v-model="cause"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="Origine">
                        <el-input id="origine"
                            type="textarea"
                            :autosize="{minRows: 4, maxRows: 8}"
                            placeholder="Origine"
                            v-model="origine"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="Action de rétablissement">
                        <el-input id="actionRetablissement"
                            type="textarea"
                            :autosize="{minRows: 4, maxRows: 8}"
                            placeholder="Action de rétablissement"
                            v-model="action_retablissement"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="Plan d'action">
                        <el-input id="planAction"
                            type="textarea"
                            :autosize="{minRows: 4, maxRows: 8}"
                            placeholder="Plan d'action"
                            v-model="plan_action"
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
            <span>Etes vous sur de vouloir supprimer la référence : {{refToDelete}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delConfirmationModalVisible = false">Annuler</el-button>
                <el-button type="danger" @click="confirmDelete()">Confirmer</el-button>
            </span>
        </el-dialog>
		<!-- Fin Modal de confirmation de suppression d'une reférence problème -->


        <el-form-item style="text-align: center">
            <el-button type="primary" @click="onSubmit()">Sauvegarder</el-button>
            <el-button type="primary" @click="envoyerMail()">Envoyer un mail</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
import Axios from 'axios';
import { scrypt } from 'crypto';
import { escape } from 'querystring';
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
            references: [],
            fauxIncident: false,
            dateDebut: '',
            dateFin: '',
            description: '',
            impact: '',
            description_contournement: '',
            is_contournement: false,
            priorite: '',
            statut: '',
            enseigne_impactee: [],
            applicationImpactee: '',
            dateDetection:'',
            dateCommunicationTDC:'',
            dateQualificationP01:'',
            datePremiereCom:'',
            cause:'',
            origine:'',
            action_retablissement:'',
            plan_action:'',

            remoteEnum: {
                priorites: [],
                statut: [],
                enseignes: [],
                applications: [],
            },

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

        envoyerMail(){
            //Récupération des différents champs 
            var desc=document.getElementById('desc').value
            var imp=document.getElementById('imp').value
            var prio=document.getElementById('prio').value
            var enseigne=document.getElementById('enseigne').value
            var ref=document.getElementById('ref').value
            var date=document.getElementById('date').value
            var cause=document.getElementById('cause').value
            var origine=document.getElementById('origine').value
            var actionRetablissement=document.getElementById('actionRetablissement').value
            var planAction=document.getElementById('planAction').value

            //Définition des adresses mail, de l'objet et du contenu du mail
            var adresseMail = "lucie.varlet@socgen.com"
            var obj = "[Incident "+prio+"][][Annonce]["+ref+"][]["+date+"]"
            var body = "INCIDENT TRAITE EN "+prio
            +"%0D%0A %0D%0ADescription%0D%0A"+desc
            +"%0D%0A %0D%0AEnseigne impactée%0D%0A"+enseigne+"%0D%0AVisible du client final : %0D%0AListe détaillée des clients et opérations à fournir au métier : %0D%0A"
            +"%0D%0A %0D%0AImpacts%0D%0A"+imp
            +"%0D%0A %0D%0ACauses%0D%0A"+cause
            +"%0D%0A %0D%0AActions de résolution menées%0D%0A"+actionRetablissement
            +"%0D%0A %0D%0APlan d'actions%0D%0A"+planAction
            +"%0D%0A %0D%0AProchaine communication à ..h..%0D%0A"
            +"%0D%0A %0D%0ACordialement,"
            +"%0D%0AXXXXXXXXXX"
            +"%0D%0ATour De Contrôle"
            +"%0D%0AITIM/GSI/TDC"
            +"%0D%0AHeures Ouvrées : 01-42-14-22-23"
            +"%0D%0AAstreinte de crise : 06-09-79-20-35"


            //Ouvre outlook avec le mail pré-rempli (adresses mail, objet, corps du mail (Possibilité d'ajouter les CC))
            window.open("mailto:"+adresseMail+"?subject="+obj+"&body="+body)
        },
        getFieldsOptions() {
            // Obtention des prioritées
            Axios.get('http://localhost:5000/api/incidents/priorite').then(
                response => {
                    this.remoteEnum.priorites = response.data;
                }
            );

            // Obtention des statut
            Axios.get('http://localhost:5000/api/incidents/statut').then(
                response => {
                    this.remoteEnum.statut = response.data;
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

        getIncident(idIncident) {
            // Obtention de l'incident
            Axios.get(
                'http://localhost:5000/api/main-courante/' + idIncident
            ).then(response => {
				console.log(response.data[0]);
				
                this.description = response.data[0].description
                this.dateDebut = response.data[0].date_debut
                this.dateFin = response.data[0].date_fin
				this.impact = response.data[0].impact
                this.statut = response.data[0].statut
                this.priorite = response.data[0].priorite
                this.dateDetection=response.data[0].date_detection
                this.dateCommunicationTDC=response.data[0].date_communication_tdc
                this.dateQualificationP01=response.data[0].date_qualif_p01
                this.datePremiereCom=response.data[0].date_premier_com
                this.cause=response.data[0].cause
                this.origine=response.data[0].origine
                this.action_retablissement=response.data[0].action_retablissement
                this.plan_action=response.data[0].plan_action

				this.enseigne_impactee = []
				this.references = []

				for (const ens_id of response.data[0].id_enseigne.split('/')) {
					this.enseigne_impactee.push(parseInt(ens_id))
				}

				for (let index = 0; index < response.data[0].reference_id.split('/').length; index++) {
					const id = response.data[0].reference_id.split('/')[index];
					const ref = response.data[0].reference.split('/')[index];
					this.references.push({reference_id: id, reference: ref})
				}
            });
		},
		
		test(){
			console.log(this.incident_id);
			
		},
	},
	
	watch:{
		incident_id: function(){
			this.getIncident(this.incident_id)
		}
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

