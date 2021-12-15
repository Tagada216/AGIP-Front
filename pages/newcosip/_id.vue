<template>
	<div>
    <el-form  :rules="rules" label-position="top">
        <el-row :gutter="20">
            <el-col :span="6">
                <!-- Références incident -->
                <el-card>
                    <div slot="header">
                        <h4 class="card-header">Référence de l'incident</h4>
                    </div>
 					<el-table :data="incident.references" border>
                        <el-table-column label="Référence">
                            <template slot-scope="scope">
                                <el-input
                                    v-model.trim="
                                        incident.references[scope.$index].reference
                                    "
                                    placeholder="PXXIN-XXXXXXXX"
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

                    <el-form-item label="Date de début" prop="date_debut">
                        <el-date-picker
                            id="date_debut"
                            v-model="incident.date_debut"
                            type="datetime"
                            placeholder="Selectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="Mois" prop="mois_cosip">
						<el-input
                            disabled
							id="mois_cosip"
							placeholder="Mois"
							v-model="mois_cosip"
						></el-input>
                    </el-form-item>

					<el-form-item label="Semaine COSIP" prop="semaine_cosip">
						<el-input
                            disabled
							id="semaine_cosip"
							placeholder="Semaine COSIP"
							v-model="cosip.semaine_cosip"
						></el-input>
					</el-form-item>

					<el-form-item label="Date de fin" prop="date_fin">
                        <el-date-picker
                            id="date_fin"
                            v-model="iEnseigne.date_fin"
                            type="datetime"
                            placeholder="Selectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
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
							<el-form-item label="Statut" prop="statut_id">
								<el-select v-model="incident.statut_id">
									<el-option
										v-for="item in datas.statut.data"
										:key="item.id"
										:label="item.nom"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="Priorité" prop="priorite_id">
								<el-select
									id="priorite_id"
									v-model="incident.priorite_id"
									>
									<el-option
										v-for="item in datas.priorites.data"
										:key="item.id"
										:label="item.priorite"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>

                    </el-row>

					<el-form-item label="Résumé" prop="cosip_resume">
                        <el-input
                            id="cosip_resume"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8 }"
                            placeholder="Résumé"
                            v-model="incident.description"
                        ></el-input>
                    </el-form-item>

					<el-form-item label="Cause"
						prop="cause"
					>
						<el-input
							id="cause"
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 8 }"
							placeholder="Cause"
							v-model="incident.cause"
						></el-input>
					</el-form-item>
					<el-row :span="3">
							<el-form-item label="Cause Racine" prop="cause_racine_id">
								<el-select
									id="cause_racine_id"
									v-model="cosip.cause_racine_id"
									>
									<el-option
										v-for="item in datas.causes_racine.data"
										:key="item.id"
										:label="item.nom"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
					</el-row>


                    <el-form-item label="Origine"
						prop="origine"
					>
						<el-input 
							id="numChangement"
							placeholder="Numéro de changement"
							v-model="incident.changement_id"
						></el-input>
                        <el-input
                            id="origine"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8 }"
                            placeholder="Origine"
                            v-model="incident.origine"
                        ></el-input>
                    </el-form-item>

                    <el-card>
							<div slot="header">
								<h4 class="card-header">Rétablissement</h4>
							</div>
							<el-row :gutter="20">
								<el-col :span="6">
									<el-form-item>
										<el-checkbox
                                        v-model="incident.crise_ITIM"
                                        >Crise</el-checkbox>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item 
										label="Problème ?"
										prop="probleme"
									>
										<el-input id="probleme" placeholder="Problème" v-model="incident.probleme"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="20">
								<el-col :span="6">
									<el-form-item label="Détection"
										prop="date_detection"
									>
										<el-date-picker
											id="date_detection"
											v-model="iEnseigne.date_detection"
											type="datetime"
											placeholder="Sélectionnez l'horodatage"
											format="dd/MM/yyyy HH:mm:ss"
											value-format="yyyy-MM-dd HH:mm:ss"
										/>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="Première communication à l'enseigne"
										prop="date_premiere_com"
									>
										<el-date-picker
											id="date_premiere_com"
											v-model="iEnseigne.date_premiere_com"
											type="datetime"
											placeholder="Sélectionnez l'horodatage"
											format="dd/MM/yyyy HH:mm:ss"
											value-format="yyyy-MM-dd HH:mm:ss"
										/>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item
								label="Action de rétablissement"
								prop="action_retablissement"
							>
								<el-input
									id="action_retablissement"
									type="textarea"
									:autosize="{ minRows: 4, maxRows: 8 }"
									placeholder="Action de rétablissement"
									v-model="incident.action_retablissement"
								></el-input>
							</el-form-item>
							
							<el-form-item label="Plan d'action" prop="plan_action">
								<el-input
									id="plan_action"
									type="textarea"
									:autosize="{ minRows: 4, maxRows: 8 }"
									placeholder="Plan d'action"
									v-model="incident.plan_action"
								></el-input>
							</el-form-item>
                    </el-card>
                <el-card>	
                    <div slot="header">
                        <h4 class="card-header">Enseignes impactées</h4>
                    </div>
                    <el-form-item label="Enseigne(s) impactée(s)" prop="enseigne_impactee" >
                        <el-checkbox-group  @change="verifCheckEnseignesImpactees()" v-model="iEnseigne.enseigne" style="text-align:left; margin-left:5px;">
                            <el-checkbox
                                v-for="enseigne in datas.enseignes.data"
                                :label="enseigne.id"
                                :key="enseigne.id"
                                v-if="!enseigne.is_deprecated"
                            >{{ enseigne.nom }}</el-checkbox>
                        </el-checkbox-group>
                        <el-tabs v-model="activeEnseigne" >
                            <el-tab-pane label="BDDF" class="flex flex-nowrap" >
                                <ImpactEnseigneForm v-if="BDDFForm" enseigne="BDDF" @emit-impactE="setImpactE"></ImpactEnseigneForm>
                            </el-tab-pane>
                            <el-tab-pane label="CDN" class="flex flex-nowrap" >
                                <ImpactEnseigneForm v-show="CDNForm" enseigne="CDN" @emit-impactE="setImpactE"></ImpactEnseigneForm>
                            </el-tab-pane>
                            <el-tab-pane label="BPF" class="flex flex-nowrap" >
                                <ImpactEnseigneForm v-show="BPFForm" enseigne="BPF" @emit-impactE="setImpactE"></ImpactEnseigneForm>
                            </el-tab-pane>
                        </el-tabs>
                    </el-form-item>
                </el-card>
                <ApplicationImpactee
                    @emit-appImpactee="setAppImpactee" 
                    :sendApp ="incident.incident_application_impactees"
                ></ApplicationImpactee>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="Responsabilité" prop="entite_responsable_id">
								<el-select v-model="incident.entite_responsable">
									<div style="margin-bottom: 10px;">
										<el-option
											v-for="item in datas.entite_responsable.data"
											:key="item.id"
											:label="item.nom"
											:value="item.id" >
										</el-option>
									</div>
								</el-select >
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="/">
								<el-input v-model="cosip.other_entite_responsable"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="Commentaire" prop="commentaire">
						<el-input
						    id="commentaire"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8 }"
                            placeholder="Commentaire"
							v-model="cosip.commentaire"
						></el-input>
					</el-form-item>
                </el-card>
                <!-- Fin Infos générales incident -->
            </el-col>
        </el-row>

        <!-- Modal de confirmation de suppression d'une reférence -->
        <el-dialog
            title="Demande de confirmation"
            :visible.sync="delConfirmationModalVisible"
            width="40%"
            center
        >
            <span
                >Etes-vous sûr de vouloir supprimer la référence :
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
                >Etes-vous sûr de vouloir supprimer l'application :
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

        <el-form-item class="mt-8 flex justify-center ">
			<button type="button" class="border-2 font-bold pr-4 pl-4 mr-8 text-red-600 border-red-600  hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors duration-300 delay-150" @click="cancel()">Annuler</button>
            <button  type="button" class="bg-black font-bold text-white pl-4 pr-4 hover:opacity-70 border-4 border-black transition-opacity duration-300 delay-150 " @click="onSubmit()"
                >Ajouter au COSIP
            </button
            >			
        </el-form-item>
    </el-form>
	</div>
</template>

<script>
import Cosip from "~/Class/CosipClass.js";
import ImpactEnseigne from "~/Class/ImpactEnseigneClass.js";
import IncidentClass from "~/Class/IncidentClass";
import DataClass from "~/Class/DataClass";
import Rule from "~/models/Rule";
export default {
    beforeCreate() {
        this.$api_agipro.enum_form_fields.getFielsOptions().then((res) =>{
            this.datas = res
        })
        
    },
    mounted(){
        this.getIncident();
    },
data(){
    return{
        cosip: new Cosip(),
        iEnseigne : new ImpactEnseigne(),
        incident: new IncidentClass(),
        datas: new DataClass(),

        //Gestion des diférent formulaire impact enseigne 
        BDDFForm:false,
        CDNForm: false,
        BPFForm:false,
        activeEnseigne:'',

        delConfirmationModalVisible: false,
        delConfirmationModalVisibleApp: false,
        messageConfirmation: true,
        indexRefToDelete: 0,
        indexRefToDeleteApp: 0,
        refToDelete: "",
        refToDeleteApp: "",
        ajoutIncidentsAgencesVisible: false,

        rules: Rule.rules,

        mois_cosip:"",
        tabEnseignesFinal:[]
    }
},
methods:{

    // envoi de l'inident au COSIP 
  async  onSubmit(){
        console.log("Incident ",this.incident);
        console.log("iEnseigne ",this.iEnseigne);
        console.log("cosip ", this.cosip);
        if(this.incident.inicident_enseigne_impactee.length > this.iEnseigne.enseigne.length ){
            this.incident.inicident_enseigne_impactee.splice(this.incident.inicident_enseigne_impactee.length -1, 1)
        }
        for(let i =0; i < this.incident.inicident_enseigne_impactee.length; i++){
            this.incident.inicident_enseigne_impactee[i].date_debut = this.incident.date_debut;
            this.incident.inicident_enseigne_impactee[i].date_fin = this.iEnseigne.date_fin;
            this.incident.inicident_enseigne_impactee[i].date_detection = this.iEnseigne.date_detection
            this.incident.inicident_enseigne_impactee[i].date_premiere_com = this.iEnseigne.date_premiere_com
        }
        this.incident.incident_impact_enseignes = this.incident.inicident_enseigne_impactee            
        const incident2Cosip = {
            other_entite_responsable : this.cosip.other_entite_responsable,
            plan_action : this.incident.plan_action,
            cause_racine_id : this.cosip.cause_racine_id,
            comment : this.cosip.comment,
            incident_id: this.$route.params.id,
            description : this.incident.description,
            cause : this.incident.cause,
            origine : this.incident.origine,
            description_contournement : this.incident.description_contournement,
            action_retablissement : this.incident.action_retablissement,
            is_faux_incident: this.incident.is_faux_incident,
            is_agence : this.incident.is_agence,
            crise_ITIM : this.incident.crise_ITIM,
            statut_id : this.incident.statut_id,
            priorite_id : this.incident.priorite_id,
            references : this.incident.references,
            incident_impact_enseignes: this.incident_impact_enseignes,
            incident_application_impactees : this.incident_application_impactees,
            semaine_cosip : this.cosip.semaine_cosip
        }
        const resp = await this.$api_agipro.cosip.addNewCosip(incident2Cosip);
        if(resp.status == 201){
          	this.$message({
                    dangerouslyUseHTMLString: true,
                    message:
                        "<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
                    type: 'success',
                });
            setTimeout(this.$router.push("/MainCourante"), 2500);
}
        console.log("Retour post COSIP ", resp)
    },
    // Méthode à Généraliser
    confirmDelete() {
      this.incident.references.splice(this.indexToDelete, 1);
      this.delConfirmationModalVisible = false;
    },

    handleDelete(index) {
      this.indexToDelete = index;
      this.refToDelete = this.incident.references[index].reference;
      this.delConfirmationModalVisible = true;
    },

    handleCreate() {
      this.incident.references.push({ reference: "" });
    },

    // Vérification des enseigne impacté et update en temp réel lors de la modifcation de l'utilisateur
        verifCheckEnseignesImpactees(){
            if(this.iEnseigne.enseigne){
                if(this.iEnseigne.enseigne[0] === 1 || this.iEnseigne.enseigne[1]==1 || this.iEnseigne.enseigne[2] ==1) {
                    this.activeEnseigne = 'BDDF'
                    this.BDDFForm = true
                }else{
                    if(this.tabEnseignesFinal.length > 0){
                        for(let i =0; i < this.tabEnseignesFinal.length; i++){
                            if(this.tabEnseignesFinal[i].enseigne_id === 1){
                                this.tabEnseignesFinal.splice(i,1);
                            }
                        }
                    }
                    this.BDDFForm = false
                }

                if(this.iEnseigne.enseigne[0] === 2 || this.iEnseigne.enseigne[1] === 2 || this.iEnseigne.enseigne[2] === 2  ) {
                    this.activeEnseigne = 'CDN'
                    this.CDNForm = true
                }else{
                    if(this.tabEnseignesFinal.length > 0){
                        for(let i =0; i < this.tabEnseignesFinal.length; i++){
                            if(this.tabEnseignesFinal[i].enseigne_id === 2){
                                this.tabEnseignesFinal.splice(i,1);
                            }
                        }
                    }
                    this.CDNForm = false
                }

                if(this.iEnseigne.enseigne[0] === 3 || this.iEnseigne.enseigne[1] === 3 || this.iEnseigne.enseigne[2] === 3 ) {
                    this.activeEnseigne = 'BPF'
                    this.BPFForm = true
                }else{
                    if(this.tabEnseignesFinal.length > 0){
                        for(let i =0; i < this.tabEnseignesFinal.length; i++){
                            if(this.tabEnseignesFinal[i].enseigne_id === 3){
                                this.tabEnseignesFinal.splice(i,1);
                            }
                        }
                    }
                    this.BPFForm = false
                }
            }
        },
        setImpactE(payload){
            
                switch(payload.ienseigne[0].enseigne_id){
                    case 1:
                            console.log(this.tabEnseignesFinal.length)
                        if(this.tabEnseignesFinal.length === 0){
                            this.tabEnseignesFinal.push(payload.ienseigne[0])
                        }else{
                            this.tabEnseignesFinal.forEach(el => {
                                if(el.enseigne_id === 1){
                                    this.sortEnseigneImpactee(1, payload.ienseigne[0] )
                                }else{
                                    if(this.tabEnseignesFinal.length <3){
                                        this.tabEnseignesFinal.push(payload.ienseigne[0])
                                    }
                                }
                            })
                        }
                        break;
                        case 2:
                            console.log(this.tabEnseignesFinal.length)
                        if(this.tabEnseignesFinal.length === 0){
                            this.tabEnseignesFinal.push(payload.ienseigne[0])
                        }else{
                            this.tabEnseignesFinal.forEach(el => {
                                if(el.enseigne_id === 2){
                                    this.sortEnseigneImpactee(2, payload.ienseigne[0] )
                                }else{
                                    if(this.tabEnseignesFinal.length <3){
                                        this.tabEnseignesFinal.push(payload.ienseigne[0])
                                    }
                                }
                            })
                        }
                        break;
                        case 3:
                            console.log(this.tabEnseignesFinal.length)
                        if(this.tabEnseignesFinal.length === 0){
                            this.tabEnseignesFinal.push(payload.ienseigne[0])
                        }else{
                            this.tabEnseignesFinal.forEach(el => {
                                if(el.enseigne_id === 3){
                                    this.sortEnseigneImpactee(3, payload.ienseigne[0] )
                                }else{
                                    if(this.tabEnseignesFinal.length <3){
                                        this.tabEnseignesFinal.push(payload.ienseigne[0])
                                    }
                                    
                                }
                            })
                        }
                        break;
                    }
                    console.log("Tab final : ", this.tabEnseignesFinal)
                    this.incident.inicident_enseigne_impactee = this.tabEnseignesFinal
            
        },
        setAppImpactee(payload) {
            this.incident.incident_application_impactee = payload.app;
            this.$emit('emit-impactE', { inc :this.incident, ienseigne: this.tabEnseignesTemp})
        },
                // Permet le tri du tableau impact enseigne en focntion des modification 
        sortEnseigneImpactee(ens_id, data){
            for(let i=0; i <= this.tabEnseignesFinal.length; i++){
                if(this.tabEnseignesFinal[i].enseigne_id === ens_id){
                    this.tabEnseignesFinal.splice(i,1)
                    this.tabEnseignesFinal.push(data)
                    return this.tabEnseignesFinal
                }
            }
        },
        //Récupére les données de l'incident par rapport à l'id dans les paramètres 
       async getIncident(){
            console.log("L'id ",this.$route.params.id)
            let id = this.$route.params.id
            const response = await this.$api_agipro.main_courante.getOneIncident(id);
            console.log("Data ", response.data)
            if(response.data){
                console.log(response.data)
                this.incident.references = response.data.incident_references;
                this.incident.statut_id = response.data.statut_id;
                this.incident.priorite_id = response.data.priorite_id;
                this.incident.description = response.data.description;
                this.incident.date_debut = response.data.incident_impact_enseignes[0].date_debut;
                //Date de début set Mois et semain cosip 
                this.setMonthAndWeek(this.incident.date_debut);
                response.data.incident_impact_enseignes[0].date_fin ? this.iEnseigne.date_fin = response.data.incident_impact_enseignes[0].date_fin : this.iEnseigne.date_fin ="";
                this.incident.cause = response.data.cause;
                this.incident.origine = response.data.origine;
                this.incident.action_retablissement = response.data.action_retablissement;
                this.incident.plan_action = response.data.plan_action;

                //Les enseignes impactéés : 
                response.data.incident_impact_enseignes.forEach((el) => {
                    this.iEnseigne.enseigne.push(el.enseigne_id)
                })
                this.incident.incident_application_impactees = response.data.incident_application_impactees

            }else{
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message:
                        "<h2 style='font-family: arial'>Impossible de trouver l'incident</h2> <p style='font-family: arial'>==> L'incident n'as pas pu être récupéré vérifier votre connexion ou essayer ultérieurement </p>",
                    type: 'error',
                });
            }
       },
       setMonthAndWeek(date){
            const dateDebut = new Date(date)
            let numeroMois = dateDebut.getMonth()+1
           
            
            //Ajout d'un 0 devant le mois si inférieur a 10
            if(numeroMois <10){
                numeroMois="0"+numeroMois
            }
            this.mois_cosip = dateDebut.getFullYear()+"/"+numeroMois
            //Calcul du numéro de la semaine en fonction de la date de début
            let jour = dateDebut.getDay();
            dateDebut.setDate(dateDebut.getDate() - (jour + 6) % 7 + 3);
            let ms = dateDebut.valueOf();
            dateDebut.setMonth(0)
            dateDebut.setDate(4)
            let semaineCosip = Math.round((ms - dateDebut.valueOf()) / (7*864e5))+1

            this.cosip.semaine_cosip = dateDebut.getFullYear()+"/S"+semaineCosip
        },
        cancel(){
            this.$router.push("/MainCourante")
        }
    }
}
</script>

<style lang="scss" scoped>

</style>