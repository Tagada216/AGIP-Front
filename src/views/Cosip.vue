<template>
    <div style="100vh">
        <base-header title="COSIP" >
            <el-tooltip class="item" effect="light" content="Export Excel" placement="bottom-end">
                <button class="header-btn">
                    <download-excel
                        :fetch="fetchCosip"
                        :before-generate="startDownload"
						:name="exportFileName"
                    >
                        <i class="fas fa-file-excel"></i>
                    </download-excel>
                </button>
            </el-tooltip>
        </base-header>
        <div>
            <CosipWeek />
        </div>

        <splitpanes watch-slots class="default-theme" horizontal>
            <div splitpanes-size="0" splitpanes-max="2"></div>
            <grid
                splitpanes-size="50"
                splitpanes-min="15"
                splitpanes-max="100"
                style="height: 100%"
                @CosipSelected="updateRef"
				:dataLink="cosip_url"
            />
            <CosipForm
                :idCos="curId"
                splitpanes-size="50"
                splitpanes-min="20"
                splitpanes-max="100"
            />
        </splitpanes>

    </div>
</template>
<script>

import Vue from 'vue';
import { AgGridVue } from 'ag-grid-vue';
import CosipWeek from '@/components/CosipWeek.vue'
import Splitpanes from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import CosipForm from '@/components/CosipForm.vue';
import methods from '@/components/CosipForm';
import JsonExcel from 'vue-json-excel';
import Axios from 'axios';
import Grid from '@/components/Grid.vue';
import { constants } from 'crypto';



export default {
    created(){
        this.cosip_url = localStorage.getItem('URL_COSIP')
    },
    data(){
        return{
            curId: '',
            exportFileName: "Référentiel Incidents Majeurs",
            displaySemaineCosip:'',
            cosip_url:"",
        }
    },

    components: {
        Grid,
        Splitpanes,
        CosipForm,
        CosipWeek,
        'download-excel': JsonExcel,
    },

    methods:{
        //Récupération de l'id COSIP courant
        updateRef(id) {
            this.curId = id;
            console.log("Id actuel : " + this.curId)
        },
        async fetchCosip() {
            const response = await this.$http.get(
                this.cosip_url
            )
            return response.data;
        },
		startDownload(){
            this.exportFileName = this.getExportTitle()
		},

		getExportTitle(){
			const now = new Date()
			return `Référentiel Incidents Majeurs ${now.toLocaleDateString().replace(/\//g,'-')} ${now.toLocaleTimeString()}`
        },
    },


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