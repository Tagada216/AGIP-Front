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
            <grid v-if="date_cosip_selec"
                splitpanes-size="50"
                splitpanes-min="15"
                splitpanes-max="100"
                style="height: 100%"
                @CosipSelected="updateRef"
				:dataLink="date_cosip_selec"
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
        this.getWeekURL()
    },
    data(){
        return{
            curId: '',
            exportFileName: "Référentiel Incidents Majeurs",
            displaySemaineCosip:'',
            date_cosip_selec:"",
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
                'http://localhost:5000/api/cosip'
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
        async getWeekURL(){
        const rep = await this.$http
            .get('http://localhost:5000/api/cosip/url/week')
            
            this.date_cosip_selec = rep.data[0].url_cosip;
        },

    }
};
</script>

<style lang="sass">

div.splitpanes
  height: calc(100vh - 71px)

div.splitpanes__pane
  overflow: auto
</style>