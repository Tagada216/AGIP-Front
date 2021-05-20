<template>
    <div style="100vh " >
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
			<el-tooltip class="item" effect="light" content="Cosip" placement="bottom-end">
                <button class="header-btn" @click="cosip()">
					C
                </button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="Importer Main courante" placement="bottom-end">
                <button class="header-btn" @click="mainCouranteImport()" >
					+
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
        <!-- Modal d'upload MainCourante -->

        <modal class="modal" name="importModal"  >
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" v-if="error">
                <strong class="font-bold">Import erreur </strong>
                <span class="block sm:inline">{{errorMessage}}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" @click="error = !error"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>            
				<div  class="fileupload" :class="{ 'fileupload--slim': slim }">
					<div>
						<slot :files="files">
							<span class="flex justify-center text-center mt-8 font-bold text-xl">Importer le fichier Main Courante</span>
						</slot>
					</div>
					<input 
                        :disabled="disabledAction"
						multiple
						:slim="true"
						accept=".xlsx, .xls, .xlsm, .csv"
						type="file"
						ref="excel-upload-input"
						class="mt-12"
						@change="fileSelected"
			        />
                        <div class="flex justify-center">
                            <div ref="formContainer"></div>
                        </div>                    
				</div>
				<el-button  :disabled="disabledAction" type="primary" class="rounded mt-8" @click="startImport()">Importer</el-button>
		</modal>
        <modal class=modal name="loaderModal">
            <div class="flex justify-center">
                <div ref="formContainer"></div>
            </div>
        </modal>
    </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import VModal from 'vue-js-modal';
import Grid from '@/components/Grid.vue';
import { AgGridVue } from 'ag-grid-vue';
import Splitpanes from 'splitpanes';
import UpdateIncidentForm from '@/components/MyUpdateIncidentForm';
import 'splitpanes/dist/splitpanes.css';
import Axios from 'axios';
import readXlsxFile from 'read-excel-file';
import JsonExcel from 'vue-json-excel';
import { constants } from 'crypto';
import methods from '@/components/MyUpdateIncidentForm';
import Loading from 'vue-loading-overlay';

Vue.use(Loading);
Vue.use(VModal, { componentName: 'modal' });


export default {
    props: {
		slim: { type: Boolean, default: false },
		title: { type: String, default: '' },
	},
    name: 'mainCourante',
    data() {
        return { 
			curID: 1,
            exportFileName: "Main Courante",
            files:null,
            error:false,
            errorMessage:null,
            loader:null,
            fullPage:false,
            disabledAction:false,
		}
    },
    mounted(){
    },
    components: {
        Grid,
        Splitpanes,
        UpdateIncidentForm,
        'download-excel': JsonExcel,
    },
    methods: {
        mainCouranteImport() {
			this.$modal.show('importModal');
			var confirmed = false;
		},
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
        fileSelected(e){
            const files = e.target.files;
            this.files = [...files];
            readXlsxFile(this.files[0]).then((row)=>{
                console.log("Row: ",row);
                this.importFile(row);
            }).catch((err)=>{
                this.errorMessage = err;
            })
        },
        importFile(file){
            console.log("Methods import: ", file)
        },
        startImport(){
            this.disabledAction = !this.disabledAction

            //Vue loader et la consfiguration 
            this.loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel(),
                color: "#E60028",
                opacity: 0.5,
            })


        },
        onCancel(){
            console.log('User cancelled the loader')
        }
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