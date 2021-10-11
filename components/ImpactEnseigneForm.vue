<template>
    
        <el-form-item>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Impact Avéré" >
                        <el-select
                            id="impact_avere"
                            v-model="iEnseigne.gravite_id"
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
                                <el-input placeholder="HH:MM" v-model="iEnseigne.duree_indispo_reseau"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="14">
                                Nombre d'utilisateurs
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="iEnseigne.nombre_utilisateurs"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="14">
                                Taux d'indisponibilité
                            </el-col>
                            <el-col :span="14">
                                <el-input placeholder="%" v-model="iEnseigne.taux_indispo_redeau"></el-input>
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
                                <el-input v-model="iEnseigne.logitelnet_cust"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="12">
                                3955/3933
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="iEnseigne.chiffre_cust"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="12">
                                DAB
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="iEnseigne.dab_cust"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="12">
                                Progeliance net/EIPRO
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="iEnseigne.progeliance_cust"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-bottom:10px;">
                            <el-col :span="12">
                                ETECE
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="iEnseigne.etece_cust"></el-input>
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
            ></el-input>
        </el-form-item>
        <el-table  border style="margin-bottom:20px;">
            <el-table-column
                label="Application(s) impactée(s)"
                prop="application_impactee"
            >
                <template slot-scope="scope">
                    <el-autocomplete
                        placeholder="Application impactée"
                        v-model="
                            incident.application_impactee[scope.$index]
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
        </el-form-item>

</template>

<script>
import ImpactEnseigne from "../Class/ImpactEnseigneClass";
import IncidentClass from "../Class/IncidentClass";
import GeneralMethod from '../models/GeneralMethod';
import DataClass from "../Class/DataClass";
export default {
data(){
    return{
        incident: new IncidentClass(),
        iEnseigne: new ImpactEnseigne(),
        datas: new DataClass(),
        
        //Gestion des impact reseau et client 
        impactReseau: false,
        impactClient: false
    }

},
    beforeCreate() {
        GeneralMethod.getFieldsOptions().then(res => {
        this.datas = res
        })
    },

}
</script>

<style>

</style>