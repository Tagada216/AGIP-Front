<template>
  <div style="100vh">
    <Header title="Main Courante" headerName = 'mainCourante' @importMC="openModal">
    </Header>
    <splitpanes watch-slots class="default-theme" horizontal>
      <div splitpanes-size="0" splitpanes-max="0"></div>

      <Grid
        usedIn="mainCourante"
        splitpanes-size="50"
        splitpanes-min="15"
        splitpanes-max="100"
        style="height: 100%"
        @incidentSelected="updateID"
        :rowId = updateID
        dataLink="http://localhost:5000/api/incident"
      />

      <IncidentForm
        pageName="UpdateIncident"
        :incident_id="curID"
        splitpanes-size="50"
        splitpanes-min="20"
        splitpanes-max="100"
      />
    </splitpanes>
    <div>
        <!-- Modal d'upload MainCourante -->
        <modal name="importMainCourante" :width="500" :height="300" >
          <div  class="flex flex-col items-center  " >
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
          
            <button  :disabled="disabledAction" type="primary" class=" mt-8 border-2 p-2 border-black hover:bg-black hover:text-white transition-colors duration-300 delay-150 focus:bg-grey focus:border-grey "  @click="startImport()">Importer</button>
                <p v-if="waiting && !repeatMax">Veuillez patienter l'import peut durer quelques minutes.</p>
                <p v-if="waiting && !repeatMax">Récupération des données du fichier....</p>
                <p v-if="waiting && repeatMax" >Import des incidents en base de données....</p>
                <p v-if="waiting && repeatMax" >{{tabIndex}} / <span class="text-bold"> {{repeatMax}}</span></p>
          </div>
        </modal>
        <modal class=modal name="loaderModal">
            <div class="flex justify-center">
                <div ref="formContainer"></div>
            </div>
        </modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from "../components/Grid";
import Splitpanes from "splitpanes";
import "splitpanes/dist/splitpanes.css";
// import '@fortawesome/fontawesome-free/css/all.css'
import methods from "../components/UpdateIncidentForm";
import readXlsxFile from 'read-excel-file'; 
export default {
  data() {
    return {
      curID: 1,
      rowId : 1,
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
      cleanTab : [], // Tableau vérifier et nettoyé => bon pour envoi au Back
      refs : [], // Réréférences existante pour comparaison avant insertion Main Courante
      tempTabImport : [], // Tableau temporaire avant importation 

      oneIncident:{ //  Un modéle d'incident à insérer en BDD 
        is_imported:true,
				references: null, //
				is_faux_incident: false, //
				description: null, //
				cause: null,
				origine: null,
				gravite_id: null,
				action_retablissement: null,
				plan_action: null, //
				description_contournement: 'Aucun contournement', //
				is_contournement: false, //
				priorite_id: null, //
				statut_id: null, //
				incident_application_impactees: [],
				incident_impact_enseignes: [],
        description_impact: null, //
        date_fin : null ,
      }
    };
  },
  props:{
    slim: { type: Boolean, default: false },
    title: { type: String, default: '' },
  },
  components: {
    Grid,
    Splitpanes
    // UpdateIncidentForm,
    // 'download-excel': JsonExcel,
  },
 

  methods: {
    updateID(id) {
      this.curID = id;
    // console.log("L'id est " + this.curID);
    this.rowId = this.curID
	  return this.curID
    },

    // Ouverture du modal puis récupération des références pour ne pas importer de doublon 
   async openModal(payload){
      if(payload.open){
        this.refs = await this.$api_agipro.enum_form_fields.getReferences();
        this.$modal.show('importMainCourante');
      }
    },
    // Change pour récupérer le nom du fichier sélectionné par l'utilisateur 
    fileSelected(e){
      const files = e.target.files;
      this.files = [...files];
    },

    //Démarrage de l'import en démarrant un chargement et démarrage du netoyage du fichier 
    startImport(){
      this.disabledAction = !this.disabledAction;
      this.waiting = !this.waiting;

      //Lecture du fichier et envoi dans la méthode de netoyage 
      //Lecture du fichier 
            readXlsxFile(this.files[0]).then((row)=>{
                this.cleanData(row);
                
                // this.loader.hide();
            }).catch((err)=>{
                this.errorMessage = err;
            });
    },

    cleanData(import_file){
      this.tempTabImport = import_file;

      //Test de validitié des références avec regex isValid
      for(let i=0; i<this.tempTabImport.length; i++){
        if((this.isValid(this.tempTabImport[i][0]) != true)&&(this.tempTabImport[i][0]!=='A venir')){
            this.tempTabImport.splice(i, 1 );
          }
      }

      //Test d'inexistance 
      for(let i=0; i<this.tempTabImport.length; i++){
          for(let y=0; y<this.refs.length; y++){
              if(this.tempTabImport[i][0] === this.refs[y].reference){
                  this.tempTabImport.splice(i,1);
                  
              }
          }
      }

      this.cleanTab = this.tempTabImport
      console.log('Tableau final: ', this.cleanTab)
      this.postMainCourante(this.cleanTab)

    },
    //Regex test de validité des réfrences 
    isValid(value) {
			return /^P\d{2,}[IN|PB|CH|RQ]{2,}[-]{1,}\d{7,}$/.test(value);
    },

    async postMainCourante(cleanFile){

    // Attibution des données formulaire puis post en back 
            this.repeatMax = cleanFile.length - 1;
            console.log(`L'insertion en cours ${this.repeatMax} incidents vont être insérés `)
            let i = 1;
            do{
                console.log("l'index est : ", this.tabIndex)
                
                //Références :
                this.oneIncident.references = [cleanFile[this.tabIndex][0]];
                
                //Description (cleanString afin de supprimer les guillemets impossible d'insérer en BDD):
                console.log(typeof(cleanFile[this.tabIndex][5]))
                if(typeof(cleanFile[this.tabIndex][5]) === 'object'){
                    this.oneIncident.description = " ";
                }else{
                    this.oneIncident.description = this.cleanString(cleanFile[this.tabIndex][5]);
                }
                                //Date de fin 
                if(cleanFile[this.tabIndex][8]){
                    this.oneIncident.date_fin = this.ExcelDateToJSDate(cleanFile[this.tabIndex][8]);
                }

                //Enseignes impactés
                if(cleanFile[this.tabIndex][2] === null ){
                    cleanFile.splice(this.tabIndex, 1)
                }else{
                    this.oneIncident.incident_impact_enseignes= [];
                    const enseigne = cleanFile[this.tabIndex][2].split("-");
                    
                    for(let y=0; y<enseigne.length; y++){
                        switch(enseigne[y].replace(/\s+/g,""))
                        {
                            case 'BDDF':
                                this.oneIncident.incident_impact_enseignes.push(
                                {
                                  enseigne_id : 1,
                                  date_debut : this.ExcelDateToJSDate(cleanFile[this.tabIndex][1]),
                                  date_fin : this.oneIncident.date_fin,
                                  description_impact : this.cleanString(cleanFile[this.tabIndex][9])
                                }) ;
                            break;
                            case 'CDN':
                                this.oneIncident.incident_impact_enseignes.push(2);
                            break;
                            case 'BPF':
                                this.oneIncident.incident_impact_enseignes.push(3);
                            break;
                        }
                    }
                }
                //Priorité :
                switch(cleanFile[this.tabIndex][6])
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
                switch(cleanFile[this.tabIndex][7])
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
                const causeOrigine = cleanFile[this.tabIndex][18].split('_x000D_');
                this.oneIncident.cause = causeOrigine[0];
                
                this.oneIncident.origine = causeOrigine[2];
                

                //Application impactés :
                this.oneIncident.incident_application_impactees.push({nom_appli : cleanFile[this.tabIndex][4]});
                //this.oneIncident.splice(0, 1);
                console.log("Form: ", this.oneIncident);
                const post = await  this.$api_agipro.main_courante.createIncident(this.oneIncident);
                if(post.status === 201 ){
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
                //cleanFile[tabIndex][17];
            //     console.log("Le form : ", this.oneIncident)
        },
        cleanString(str){
            if(str != null){
                return str.replace(/["]+/g, '')
            }
        },
        //Traitement des date car format particulier lors de l'import 
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
    height: 80px
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
