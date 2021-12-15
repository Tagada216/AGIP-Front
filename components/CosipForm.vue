<template>
    <div>
        <div v-if="part=='horodatage'">
            <el-form-item label="Mois" >
                <el-input
                    disabled
                    :getStartDate="setMonthAndWeek(date)"
                    id="mois_cosip"
                    placeholder="Mois"
                    v-model="cosipMonth"
                    @change="emitToParent"
                ></el-input>
                </el-form-item>

                <el-form-item label="Semaine COSIP" >
                    <el-input
                        disabled
                        id="semaine_cosip"
                        placeholder="Semaine COSIP"
                        v-model="cosip.semaine_cosip"
                        @change="emitToParent"
                    ></el-input>
            </el-form-item>

            <el-form-item label="Date de fin" >
                    <el-date-picker
                        v-model="iEnseigne.date_fin"
                        @change="emitToParent"
                        id="date_fin"
                        type="datetime"
                        placeholder="Selectionnez l'horodatage"
                        format="dd/MM/yyyy HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
            </el-form-item>
        </div>

        <div v-if="part=='info-generale'">
            <el-form-item label="Résumé" >
                <el-input
                    id="cosip_resume"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8 }"
                    placeholder="Résumé"
                    v-model="incident.description"
                    @change="emitToParent"
                ></el-input>
            </el-form-item>

            <el-form-item label="Cause"
            >
                <el-input
                    id="cause"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8 }"
                    placeholder="Cause"
                    v-model="incident.cause"
                    @change="emitToParent"
                ></el-input>
            </el-form-item>
            <el-row :span="3" >
                    <el-form-item label="Cause Racine" >
                        <el-select
                            id="cause_racine_id"
                            v-model="cosip.cause_racine_id"
                            @change="emitToParent"
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
                
            >
                <el-input 
                    id="numChangement"
                    placeholder="Numéro de changement"
                    v-model="incident.changements_id"
                    @change="emitToParent"
                ></el-input>
                <el-input
                    id="origine"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8 }"
                    placeholder="Origine"
                    v-model="incident.origine"
                    @change="emitToParent"
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
                            @change="emitToParent"
                            >Crise
                            </el-checkbox>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="6">
                        <el-form-item 
                            label="Problème ?"
                            prop="probleme"
                        >
                            <el-input id="probleme" placeholder="Problème" ></el-input>
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="Détection"
                            prop="date_detection"
                        >
                            <el-date-picker
                                id="date_detection"
                                v-model="iEnseigne.date_detection"
                                @change="emitToParent"
                                type="datetime"
                                placeholder="Sélectionnez l'horodatage"
                                format="dd/MM/yyyy HH:mm:ss"
                                value-format="yyyy-MM-dd HH:mm:ss"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Première communication à l'enseigne"
                            prop="date_premiere_com"
                        >
                            <el-date-picker
                                id="date_premiere_com"
                                v-model="iEnseigne.date_premier_com"
                                @change="emitToParent"
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
                        @change="emitToParent"
                    ></el-input>
                </el-form-item>
                
                <el-form-item label="Plan d'action" prop="plan_action">
                    <el-input
                        id="plan_action"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 8 }"
                        placeholder="Plan d'action"
                        v-model="incident.plan_action"
                        @change="emitToParent"
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


                <el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="Responsabilité" prop="entite_responsable_id">
								<el-select 
                                    v-model="incident.departement_responsable"
                                    @change="emitToParent
                                ">
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
								<el-input 
                                v-model="cosip.other_entite_responsable"
                                @change="emitToParent"
                                ></el-input>
							</el-form-item>
						</el-col>
					</el-row>
                    <el-form-item label="Commentaire" prop="commentaire">
						<el-input
						    id="commentaire"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8 }"
                            placeholder="Commentaire"
							v-model="cosip.comment"
                            @change="emitToParent"
						></el-input>
					</el-form-item>
            </el-card>
        </div>
    </div>
    
</template>

<script>
import IncidentClass from "../Class/IncidentClass";
import Cosip from "../Class/CosipClass";
import GeneralMethod from '../models/GeneralMethod'
import DataClass from "../Class/DataClass";
import Rule from "../models/Rule";
import ImpactEnseigne from "../Class/ImpactEnseigneClass";
export default {
    beforeCreate() {
        this.$api_agipro.enum_form_fields.getFielsOptions().then((res) =>{
            this.datas = res
        })
        
    },
    props:{
        part: String,
        enseignes : [],
        nom:"",
        date: ""
    },


        data() {
    return {

        cosipMonth: "",
        cosip: new Cosip(),
        iEnseigne : new ImpactEnseigne(),
        incident: new IncidentClass(),
        datas: new DataClass(),


        //Gestion des diférent formulaire impact enseigne 
        BDDFForm:false,
        CDNForm: false,
        BPFForm:false,
        activeEnseigne:'',

        // Variables à Généraliser
        // Les lignes suivantes sont des variables nécessaires au modal de suppression
        delConfirmationModalVisible: false,
        delConfirmationModalVisibleApp: false,
        messageConfirmation: true,
        indexRefToDelete: 0,
        indexRefToDeleteApp: 0,
        refToDelete: "",
        refToDeleteApp: "",
        ajoutIncidentsAgencesVisible: false,

        // Règles de validation pour le formulaire
        rules: Rule.rules,
        tabEnseignesFinal:[]
        };
        
    },

    methods:{
        // Récupération de la date via la props date 
        setMonthAndWeek(date){
            const dateDebut = new Date(date)
            let numeroMois = dateDebut.getMonth()+1
           
            
            //Ajout d'un 0 devant le mois si inférieur a 10
            if(numeroMois <10){
                numeroMois="0"+numeroMois
            }
            this.cosipMonth = dateDebut.getFullYear()+"/"+numeroMois
            //Calcul du numéro de la semaine en fonction de la date de début
            let jour = dateDebut.getDay();
            dateDebut.setDate(dateDebut.getDate() - (jour + 6) % 7 + 3);
            let ms = dateDebut.valueOf();
            dateDebut.setMonth(0)
            dateDebut.setDate(4)
            let semaineCosip = Math.round((ms - dateDebut.valueOf()) / (7*864e5))+1

            this.cosip.semaine_cosip = dateDebut.getFullYear()+"/S"+semaineCosip
        },

        // Vérification des enseigne impacté et update en temp réel lors de la modifcation de l'utilisateur
        verifCheckEnseignesImpactees(){

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
        },

        // Envoi du formulaire COSIP vers sont parent  Incident Form 
        emitToParent(){
            this.$emit('emitCosip', {inc: this.incident, ienseigne: this.iEnseigne, cosip: this.cosip, impact: this.incident.inicident_enseigne_impactee})
        },

        //Récupération des enseigne impacté et prise en compte des modification sans incrémenté a l'infini
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
                    this.emitToParent()
            
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
        }
    }
}
</script>

<style lang="scss" scoped>


</style>