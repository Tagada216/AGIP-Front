<template>

    <div>
        <div id="screenImg">
        <base-header title="Statistiques" />
            <el-card>
                <div slot="header">
					<h4 class="card-header"> {{current_month}} {{current_year}}</h4>
				</div>
				<div slot="header">
					<h5 class="card-header">Statistiques des priorités</h5>
				</div>
			
            <div class="wrapper">
                <div class="enseigne-row">P0
                    <div class="result">{{P0}}</div>
                </div>
                <div class="enseigne-row">P1
                    <div class="result">{{P1}}</div>
                </div>
                <div class="enseigne-row">P2
                    <div class="result">{{P2}}</div>
                </div>
                <!-- <div class="enseigne-row">P3
                    <div class="result">{{P3}}</div>
                </div>
                <div class="enseigne-row">P4
                    <div class="result">{{P4}}</div>
                </div> -->
                                <div class="enseigne-row">
                    <vc-donut has-legend legend-placement="top" :sections="sections" :total="total" >Incidents/pritorité</vc-donut>
                </div>
            </div>
        </el-card>
        <el-card>

            <div class="wrapper">
                <div class="enseigne-row"> <h4> Incidence Application : </h4>
                    <div 
                    v-for="item in display_incidence"
                    :key="item.nom"
                    >{{item.nom}} <br> <br> <h3> Nombres d'incidents:</h3> <h4>{{item.nb}}</h4> </div>
                </div>
                <div class="enseigne-row"> <h4> Nombres d'incidents Majeur: </h4>
                      <h4> {{nb_majeur}} </h4> 
                </div>
            </div>
        </el-card>
        </div>
        <el-button type="primary" class="button" @click="exportPDF()">Exporter en PDF</el-button>
    </div>

    
</template>
<script>
//Utilisation de html2cnvas pourscreen la page et ajouter l'image en PDF grace à jspdf
import {jsPDF} from "jspdf";
import html2canvas from 'html2canvas';

export default {
    created(){
        this.getIncPriorite(),
        this.getnbrAppIncidence(),
        this.getIncMajeur(),
        this.getCurrentMonth()
    },
    data(){
        return {
            current_year:"",
            current_month:"",
            nb_majeur:0,
            display_incidence:[],
            appIncidence:[],
            incident_priotites:[],
            P0: 0,
            P1: 0,
            P2: 0,
            P3: 0,
            P4: 0,
            AllPriorite:0,
            P0per: 0,
            P1per: 0,
            P2per: 0,
            P3per: 0,
            P4per: 0,
            sections: [],
            total: 0
        }
    },
    methods:{
        getIncPriorite(){

            this.$http
                .get('http://localhost:5000/api/stat/priorites')
                .then(response => {
                    this.incident_priotites = response.data  
                    this.AllPriorite = this.incident_priotites.length
                    for(let i=0; i< this.incident_priotites.length; i++){
                        switch(this.incident_priotites[i].priorite_id){
                            case 1:
                                this.P0++ 
                                break;
                            case 2:
                                this.P1++
                                break;
                            case 3:
                                this.P2++
                                break;
                            case 4:
                                this.P3++
                                break;
                            case 5:
                                this.P4++
                                break;
                        }
                        
                    }
                    //Calcul du pourcentage :
                    this.P0per = Math.round((this.P0 / this.AllPriorite)*100)
                    this.P1per = Math.round((this.P1 / this.AllPriorite)*100)
                    this.P2per = Math.round((this.P2 / this.AllPriorite)*100)
                    this.P3per = Math.round((this.P3 / this.AllPriorite)*100)
                    this.P4per = Math.round((this.P4 / this.AllPriorite)*100)
                    this.total = this.P0per + this.P1per + this.P2per + this.P3per+this.P4per
                    this.sections.push( { label:'P0', value: this.P0per  }, { label:'P1', value: this.P1per },{ label:'P2', value: this.P2per },{ label:'P3', value: this.P3per },{ label:'P4',value: this.P4per })
                });
        },

        getnbrAppIncidence(){
            this.$http
                .get('http://localhost:5000/api/stat/applications')
                .then(response =>{
                    this.appIncidence = response.data
                    for(let y=0; y<this.appIncidence.length; y++){
                        if(this.appIncidence[y].nb_occurence > 2){
                            this.display_incidence.push({
                                nom: this.appIncidence[y].nom_appli,
                                nb: this.appIncidence[y].nb_occurence
                            })
                        }
                    }
                })
        },

        getIncMajeur(){
            this.$http
                .get('http://localhost:5000/api/stat/majeur')
                .then(response =>{
                    this.nb_majeur = response.data
                    this.nb_majeur = this.nb_majeur[0].nb_majeur
                    console.log("Nb majeur : ",this.nb_majeur)


                })
        },
        getCurrentMonth(){
            var currentDate = new Date()
            const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                                "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"
                                ];
 
            this.current_month  = monthNames[currentDate.getMonth()]
            this.current_year = currentDate.getFullYear()
        },

        exportPDF(){
            let fileName = "Statistiques_"+this.current_month+"_"+this.current_year+".pdf"
            html2canvas(document.querySelector('#screenImg')).then(canvas =>{
                const statPDF = new jsPDF({
                                            orientation: 'l'})
                statPDF.addImage(canvas, 30, 10, 250, 150)
                statPDF.save(fileName)
            })

        }

    }

}
</script>
<style lang="sass">
.wrapper
    display: grid
    grid-gap: 10px
    grid-auto-rows: minmax(100px, auto)
.enseigne-row
    grid-row: 1
.priorite
    grid-colum: 1
.result
    font-weight: bold
</style>

}
