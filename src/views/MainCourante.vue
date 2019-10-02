<template>
    <div style="100vh">
        <base-header title="Main Courante">
            <el-tooltip
                class="item"
                effect="light"
                content="Export Excel"
                placement="bottom-end"
            >
                <button class="header-btn" @click="csvExport(csvData)">
                    <i class="fas fa-file-excel"></i>
                </button>
            </el-tooltip>
            <el-tooltip
                class="item"
                effect="light"
                content="Dupliquer"
                placement="bottom-end"
            >
                <button class="header-btn" @click="dupliquer()">
                    <i class="fas fa-file"></i>
                </button>
            </el-tooltip>
        </base-header>
        <splitpanes watch-slots class="default-theme" horizontal>
            <div splitpanes-size="0" splitpanes-max="0"></div>

            <grid
                splitpanes-size="50"
                splitpanes-min="15"
                splitpanes-max="100"
                style="height: 100%"
                @incidentSelected="updateID"
            />

            <update-incident-form
                :incident_id="curID"
                splitpanes-size="50"
                splitpanes-min="20"
                splitpanes-max="100"
            />
        </splitpanes>
    </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue';
import Splitpanes from 'splitpanes';
import UpdateIncidentForm from '@/components/MyUpdateIncidentForm';
import 'splitpanes/dist/splitpanes.css';
import Axios from 'axios';

export default {
    data() {
        return { curID: 1 };
    },

    ////////Empêche d'afficher les propriétés de l'incident sélectionné
    /*data:{
        users:[],
    },*/

    components: {
        Grid,
        Splitpanes,
        UpdateIncidentForm,
    },
    
    computed:{
        csvData(){
            return this.users.map(item=>({
                ...item
            }));
        }
    },

    methods: {
        updateID(id) {
            this.curID = id;
        },

        csvExport(arrData){
            let csvContent="data:text/csv;charset=utf-8,";
            csvContent+=[
                Object.keys(arrData[0]).join(";"),
                ...arrData.map(item=>
                Object.values(item).join(";"))
            ]
                .join("\n")
                .replace(/(^\[)|(\]$)/gm, "");

            const data = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", "mainCourante.csv");
            link.click();
        },
        
        dupliquer(){
            window.location.href="/#/new-incident"
        },
    },

    mounted(){
        fetch("http://localhost:5000/api/main-courante")
            .then(resp=>resp.json())
            .then(json=>(this.users=json));
    }
};
</script>

<style lang="sass">

div.splitpanes
  height: calc(100vh - 71px)

div.splitpanes__pane
  overflow: auto

#pane_1
  &div
    height: 100%

#pane_2
    background-color: white

div.default-theme.splitpanes--horizontal
    >div.splitpanes__splitter
        background-color: #2a2a2e
        border: none
        height: 12px
        &::before
            background-color: white
        &::after
            background-color: white

.header-btn
    line-height: 70px
    height: 70px
    width: 70px
    padding: 0
    margin: 0
    float: right
    border: none
    color: white
    font-size: 50px
    background-color: #2a2a2e
    &:hover
        background-color: #b7011d
        cursor: pointer
    &:focus
        border: none
</style>