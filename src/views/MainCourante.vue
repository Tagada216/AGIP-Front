<template>
    <div style="100vh">
        <base-header title="Main Courante">
            <el-tooltip class="item" effect="light" content="Export Excel" placement="bottom-end">
                <button class="header-btn">
                    <download-excel
                        :fetch="fetchMainCourrante"
                        :before-generate="startDownload"
						:name="exportFileName"
                    >
                        <i class="fas fa-file-excel"></i>
                    </download-excel>
                </button>
            </el-tooltip>
			<el-tooltip class="item" effect="light" content="Dupliquer" placement="bottom-end">
				<button class="header-btn" @click="duplicate()">
					<i class="fas fa-file"></i>
				</button>
			</el-tooltip>
			<el-tooltip class="item" effect="light" content="COSIP" placement="bottom-end">
                <button class="header-btn" @click="cosip()">
					C
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
				dataLink="http://localhost:5000/api/main-courante/formated"
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
import JsonExcel from 'vue-json-excel';
import { constants } from 'crypto';
import methods from '@/components/MyUpdateIncidentForm';
import { AgGridVue } from 'ag-grid-vue';

export default {
    data() {
        return { 
			curID: 1,
			exportFileName: "Main Courante"
		}
	},
    components: {
        Grid,
        Splitpanes,
        UpdateIncidentForm,
        'download-excel': JsonExcel,
    },
    methods: {
        updateID(id) {
            this.curID = id;
            console.log("L'id est " + this.curID)
        },
        async fetchMainCourrante() {
            const response = await this.$http.get(
                'http://localhost:5000/api/main-courante/formated'
            )
            return response.data;
		},
		duplicate(){
			console.log(this.curID)
			window.location.href="/#/new-incident/id="+this.curID
			if (this.curID!=undefined)
			{
				console.log("ID non existant")
			}	
		},
		cosip() {
			window.location.href='/#/cosip/id='+this.curID
			if (this.incident_id==undefined)
			{
				console.log("ID non existant")
			} else {
				console.log(this.incident_id)
			}
		},
		
		startDownload(){
        	this.exportFileName = this.getExportTitle()
		},
		getExportTitle(){
			const now = new Date()
			return `Main Courante ${now.toLocaleDateString().replace(/\//g,'-')} ${now.toLocaleTimeString()}`
			
		},
	},
}
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