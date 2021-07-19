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

        <modal class="modal" name="importModal" :width="500" :height="300" :adaptive="true" >
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
                <p v-if="waiting && !repeatMax">Veuillez patienter l'import peut durer quelques minutes.</p>
                <p v-if="waiting && !repeatMax">Récupération des données du fichier....</p>
                <p v-if="waiting && repeatMax" >Import des incidents en base de données....</p>
                <p v-if="waiting && repeatMax" >{{tabIndex}} / <span class="text-bold"> {{repeatMax}}</span></p>
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
const { getJsDateFromExcel } = require("excel-date-to-js");
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
            waiting: false,
            tabIndex: 1,
            repeatMax: 0,
			curID: 1,
            exportFileName: "Main Courante",
            files:null,
            dataFile:null,
            error:false,
            errorMessage:null,
            loader:null,
            fullPage:false,
            disabledAction:false,
            refs:null,
            tempTab:[],
            finalTab:[],
            oneIncident:{
                is_imported:true,
				references: null, //
				is_faux_incident: false, //
				date_debut: null, //
				date_fin: null, //
				description: null, //
				cause: null,
				origine: null,
				gravite_id: null,
				action_retablissement: null,
				plan_action: null,
				description_impact: null, //
				description_contournement: 'Aucun contournement', //
				is_contournement: false, //
				priorite_id: null, //
				statut_id: null, //
				application_impactee: "",
				date_detection: null,
				date_communication_TDC: null,
				date_qualification_p01: null,
				date_premiere_com: null,
				impact_avereCDN: null,
				impact_avereBDDF: null,
				impact_avereBPF: null,
				enseigne_impactee: [],
				description_impact: null, //
            }
		}
    },
    mounted(){
        this.getRef();
    },
    components: {
        Grid,
        Splitpanes,
        UpdateIncidentForm,
        'download-excel': JsonExcel,
    },
    methods: {
        ExcelDateToJSDate(serial) {
            const utc_days  = Math.floor(serial - 25569);
            const utc_value = utc_days * 86400;                                        
            const date_info = new Date(utc_value * 1000);

            const fractional_day = serial - Math.floor(serial) + 0.0000001;
            
            let total_seconds = Math.floor(86400 * fractional_day);
            
            const seconds = total_seconds % 60;

            total_seconds -= seconds;

            const hours = Math.floor(total_seconds / (60 * 60));
            const minutes = Math.floor(total_seconds / 60) % 60;
            const dd = String(date_info.getDate()).padStart(2, '0');
            const mm = String(date_info.getMonth() + 1).padStart(2, '0');
            const yyyy = date_info.getFullYear();

            const date = yyyy + '-' + mm + "-" + dd +" "+ hours+ ":"+ minutes+":"+ seconds
    
            return new Date(date);
        },

    
        mainCouranteImport() {
            this.getRef();
			this.$modal.show('importModal');
			const confirmed = false;
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
        },
        startImport(){
            this.disabledAction = !this.disabledAction
            this.waiting = !this.waiting
            //Vue loader et la consfiguration 
            this.loader = this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                //onCancel: this.onCancel(),
                color: "#E60028",
                opacity: 0.5,
            });
            //Lecture du fichier 
            readXlsxFile(this.files[0]).then((row)=>{
                this.cleanData(row);
                
                // this.loader.hide();
            }).catch((err)=>{
                this.errorMessage = err;
            });
        },
        isValid(value) {
			return /^P\d{2,}[IN|PB|CH|RQ]{2,}[-]{1,}\d{7,}$/.test(value);
        },
        cleanData(data){
            this.tempTab = data;
            
            //Test de validité 
            for(let i=0; i<this.tempTab.length; i++){
                if((this.isValid(this.tempTab[i][0]) != true)&&(this.tempTab[i][0]!=='A venir')){
                    this.tempTab.splice(i, 1 );
                }
            }
            //Test d'inexistance 
            for(let i=0; i<this.tempTab.length; i++){
                for(let y=0; y<this.refs.length; y++){
                    if(this.tempTab[i][0] === this.refs[y].reference){
                        this.tempTab.splice(i,1);
                        
                    }
                }
            }


            this.finalTab = this.tempTab
            console.log('Tableau final: ', this.finalTab)
            this.postMainCourante(this.finalTab)
        },
        async postMainCourante(cData){
            // Attibution des données formulaire puis post en back 
            this.repeatMax = cData.length - 1;
            console.log(`L'insertion en cours ${this.repeatMax} incidents vont être insérés `)
            let i = 1;
            do{
                console.log("l'index est : ", this.tabIndex)
                
                //Références :
                this.oneIncident.references = [{reference: cData[this.tabIndex][0]}];
                
                //Description (cleanString afin de supprimer les guillemets impossible d'insérer en BDD):
                console.log(typeof(cData[this.tabIndex][5]))
                if(typeof(cData[this.tabIndex][5]) === 'object'){
                    this.oneIncident.description = " ";
                }else{
                    this.oneIncident.description = this.cleanString(cData[this.tabIndex][5]);
                }
                
                
                //description impact (cleanString afin de supprimer les guillemets impossible d'insérer en BDD) :
                this.oneIncident.description_impact = this.cleanString(cData[this.tabIndex][9]);

                //Enseignes impactés
                if(cData[this.tabIndex][2] === null ){
                    cData.splice(this.tabIndex, 1)
                }else{
                    this.oneIncident.enseigne_impactee= [];
                    const enseigne = cData[this.tabIndex][2].split("-");
                    
                    for(let y=0; y<enseigne.length; y++){
                        switch(enseigne[y].replace(/\s+/g,""))
                        {
                            case 'BDDF':
                                this.oneIncident.enseigne_impactee.push(1) ;
                            break;
                            case 'CDN':
                                this.oneIncident.enseigne_impactee.push(2);
                            break;
                            case 'BPF':
                                this.oneIncident.enseigne_impactee.push(3);
                            break;
                        }
                    }
                }

                //Priorité :
                switch(cData[this.tabIndex][6])
                    {
                        case 'P0':
                            this.oneIncident.priorite_id = 1;
                        break;
                        case 'P1':
                            this.oneIncident.priorite_id = 2;
                            break;
                        case 'P2':
                            this.oneIncident.priorite_id = 3;
                        break;
                        case 'P3':
                            this.oneIncident.priorite_id = 4;
                        break;
                        case 'P4':
                            this.oneIncident.priorite_id = 5;
                        break;
                    }

                //Statut :
                switch(cData[this.tabIndex][7])
                    {
                        case 'Ouvert':
                            this.oneIncident.statut_id = 0;
                        break;
                        case 'En cours de traitement':
                            this.oneIncident.statut_id = 1;
                        break;
                        case 'Correctif identifié':
                            this.oneIncident.statut_id = 2;
                        break;
                        case 'Observation':
                            this.oneIncident.statut_id = 3;
                        break;
                        case 'Résolu':
                            this.oneIncident.statut_id = 4;
                        break;
                        case 'Faux Incident':
                            this.oneIncident.statut_id = 5;
                        break;
                    }
                //Cause et origine 
                const causeOrigine = cData[this.tabIndex][18].split('_x000D_');

                this.oneIncident.cause = causeOrigine[0];
                
                this.oneIncident.origine = causeOrigine[2];

                //Date Début 
                this.oneIncident.date_debut = this.ExcelDateToJSDate(cData[this.tabIndex][1]);
                
                //Date de fin 
                if(cData[this.tabIndex][8]){
                    this.oneIncident.date_fin = this.ExcelDateToJSDate(cData[this.tabIndex][8]);
                }
                //Application impactés :
                this.oneIncident.application_impactee = cData[this.tabIndex][4];

                //this.oneIncident.splice(0, 1);
                console.log("Form: ", this.oneIncident);
                const post = await  this.$http.post('http://localhost:5000/api/main-courante', this.oneIncident);
                if(post.status === 200 ){
                    this.tabIndex++
                    if(this.tabIndex === this.repeatMax){
                        this.$modal.hide('importModal');
                        this.$message({
							dangerouslyUseHTMLString: true,
							message:
								"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
							type: 'success',
						});
						window.location.reload();			
                    }
                }else{
                    console.log(post);
                }
            }while(i <= this.repeatMax);

//-------------------------------------------------------------------------------------


           // //Cause racine 
                //cData[tabIndex][17];

            //     console.log("Le form : ", this.oneIncident)

        },
        cleanString(str){
            if(str != null){
                return str.replace(/["]+/g, '')
            }
        },
        getRef(){
            this.$http 
				.get('http://localhost:5000/api/reference')
				.then(response => {
                    this.refs = response.data
				});
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