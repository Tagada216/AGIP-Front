<template>
        <el-form-item class="w-2/3">
            <el-row :gutter="20">
                <el-col >
                    <el-form-item label="Impact Avéré" >
                        <el-select
                            id="impact_avere"
                            v-model="iEnseigne.gravite_id"
                            @change="emitToCosipForm(enseigne)"
                        >
                            <el-option
                                v-for="item in datas.gravite"
                                :key="item.id"
                                :label="item.nom"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Criticité">
                    {{classification}}
                    </el-form-item>
                </el-col>
            </el-row>
        <el-row :gutter="0">
            <el-col :span="10">
                <template>
                    <el-checkbox @change="impactReseau =  !impactReseau" >Impact Réseau</el-checkbox>
                </template>
                    <el-card v-if="impactReseau">
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="14">
                                Durée d'indisponibilité
                            </el-col>
                            <el-col :span="14">
                                <el-input placeholder="HH:MM" 
                                v-model="iEnseigne.duree_indispo_reseau"
                                @change="emitToCosipForm(enseigne)"
                                ></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="14">
                                Nombre d'utilisateurs
                            </el-col>
                            <el-col :span="14">
                                <el-input 
                                v-model="iEnseigne.nombre_utilisateurs"
                                @change="emitToCosipForm(enseigne)"
                                ></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="14">
                                Taux d'indisponibilité
                            </el-col>
                            <el-col :span="14">
                                <el-input placeholder="%" 
                                v-model="iEnseigne.taux_indispo_redeau"
                                @change="emitToCosipForm(enseigne)"
                                ></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="14">
                                JFS : 
                            </el-col>
                        </el-row>
                    </el-card>
            </el-col>
            <el-col :span="10">
                <template>
                    <el-checkbox @change="impactClient = !impactClient" class="ml-14">Impact Client</el-checkbox>
                </template>
                    <el-card v-if="impactClient">
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col style="text-align:center">Durées d'indisponibilité (HH:MM)</el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="12">
                                Logitelnet/SCAD
                            </el-col>
                            <el-col :span="12">
                                <el-input 
                                v-model="iEnseigne.logitelnet_cust"
                                @change="emitToCosipForm(enseigne)"
                                ></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="12">
                                3955/3933
                            </el-col>
                            <el-col :span="12">
                                <el-input 
                                v-model="iEnseigne.chiffre_cust"
                                @change="emitToCosipForm(enseigne)"
                                ></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="12">
                                DAB
                            </el-col>
                            <el-col :span="12">
                                <el-input 
                                v-model="iEnseigne.dab_cust"
                                @change="emitToCosipForm(enseigne)"
                                ></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="12">
                                Progeliance net/EIPRO
                            </el-col>
                            <el-col :span="12">
                                <el-input 
                                v-model="iEnseigne.progeliance_cust"
                                @change="emitToCosipForm(enseigne)"
                                ></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="12">
                                ETECE
                            </el-col>
                            <el-col :span="12">
                                <el-input 
                                v-model="iEnseigne.etece_cust"
                                @change="emitToCosipForm(enseigne)"
                                ></el-input>
                            </el-col>
                        </el-row>
                    </el-card>
            </el-col>
        </el-row>
        <el-form-item label="Impact" prop="description_impact" style="margin-bottom:20px;">
            <el-input
                id="description_impact"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="Impact"
                v-model="iEnseigne.description_impact"
                @change="emitToCosipForm(enseigne)"
            ></el-input>
        </el-form-item>
        <ApplicationImpactee 
            @emit-appImpactee="setAppImpactee"
            class="w-full">
        </ApplicationImpactee>
        </el-form-item>

</template>

<script>
import ImpactEnseigne from "../Class/ImpactEnseigneClass";
import IncidentClass from "../Class/IncidentClass";
import GeneralMethod from '../models/GeneralMethod';
import DataClass from "../Class/DataClass";
export default {

    props:{
        classification: String,
        enseigne: String
    },
    data(){
        return{
            incident: new IncidentClass(),
            iEnseigne: new ImpactEnseigne(),
            datas: new DataClass(),
            //Gestion des impact reseau et client 
            impactReseau: false,
            impactClient: false,
            tabEnseignesTemp:[]
        }

},
    beforeCreate() {
        GeneralMethod.getFieldsOptions().then(res => {
        this.datas = res
        
        })
    },
    methods:{
        emitToCosipForm(ens){
            console.log("before:", this.incident.enseigne_impactee, " Ens: ",ens)

            switch (ens){
                case 'BDDF':
                    this.iEnseigne.enseigne_id = 1; 

                    if(this.tabEnseignesTemp.length === 0){
                        console.log("Je n'existe pas encore je suis créé car tableau vide")
                        this.tabEnseignesTemp.push(this.iEnseigne)
                    }else{
                            this.tabEnseignesTemp.forEach(el => {
                            console.log(el)
                            if(el.enseigne_id === this.iEnseigne.enseigne_id){
                                console.log("Je suis dans la if donc j'existe go modifcation")
                                this.sortEnseigneImpactee(this.iEnseigne.enseigne_id)
                                
                            }else{
                                console.log("Je n'existe pas encore je suis créé mais tableau non vide ")
                                this.tabEnseignesTemp.push(this.iEnseigne)
                            }
                        });
                    }
                break;
                case 'CDN':
                    this.iEnseigne.enseigne_id = 2;
                    if(this.tabEnseignesTemp.length === 0){
                        console.log("Je n'existe pas encore je suis créé car tableau vide")
                        this.tabEnseignesTemp.push(this.iEnseigne)
                    }else{
                            this.tabEnseignesTemp.forEach(el => {
                            console.log(el)
                            if(el.enseigne_id === this.iEnseigne.enseigne_id){
                                console.log("Je suis dans la if donc j'existe go modifcation")
                                this.sortEnseigneImpactee(this.iEnseigne.enseigne_id)
                            }else{
                                console.log("Je n'existe pas encore je suis créé mais tableau non vide ")
                                this.tabEnseignesTemp.push(this.iEnseigne)
                            }
                        });
                    }
                break;

                case 'BPF':
                    this.iEnseigne.enseigne_id = 3;
                    if(this.tabEnseignesTemp.length === 0){
                        console.log("Je n'existe pas encore je suis créé car tableau vide")
                        this.tabEnseignesTemp.push(this.iEnseigne)
                    }else{
                            this.tabEnseignesTemp.forEach(el => {
                            console.log(el)
                            if(el.enseigne_id === this.iEnseigne.enseigne_id){
                                console.log("Je suis dans la if donc j'existe go modifcation")
                                this.sortEnseigneImpactee(this.iEnseigne.enseigne_id)
                                
                            }else{
                                console.log("Je n'existe pas encore je suis créé mais tableau non vide ")
                                this.tabEnseignesTemp.push(this.iEnseigne)
                            }
                        });
                    }
                break;
            }
            console.log("after:", this.tabEnseignesTemp)
            this.$emit('emit-impactE', {ens: ens, inc :this.incident, ienseigne: this.tabEnseignesTemp})
        },
        setAppImpactee(payload) {
            console.log("App: ", payload);
            this.incident.application_impactee = payload.app;
        },
        sortEnseigneImpactee(id_enseigne){
            
            for( let i =0; i<= this.tabEnseignesTemp.length; i++){
                if(this.tabEnseignesTemp[i].enseigne_id === id_enseigne){
                    console.log('Je suis dans le if de suppression ', i)
                    this.tabEnseignesTemp.splice(i, 1)
                    this.tabEnseignesTemp.push(this.iEnseigne)
                    return this.tabEnseignesTemp
                }
            }

        }
    }

}
</script>

<style>

</style>