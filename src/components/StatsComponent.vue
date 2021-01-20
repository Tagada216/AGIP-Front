<template>

    <div>

        <base-header title="Statistiques" />
            <el-card>
				<div slot="header">
					<h4 class="card-header">Statistiques des priorités</h4>
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
            <div slot="header">
				<h4 class="card-header">Incidence des applications</h4>
			</div>
            <div class="wrapper">
                <div class="enseigne-row">Application : 
                    <div 
                    v-for="item in display_incidence"
                    :key="item.nom"
                    >{{item.nom}}</div>
                </div>
                <div class="enseigne-row"> Nombres d'incidents Majeur :
                    
                </div>
            </div>
        </el-card>
    </div>

    
</template>
<script>
export default {
    created(){
        this.getIncPriorite(),
        this.getnbrAppIncidence()
    },
    data(){
        return {
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
                    console.log("Les incidences : ",this.appIncidence)
                    for(let y=0; y<this.appIncidence.length; y++){
                        if(this.appIncidence[y].nb_occurence > 2){
                            this.display_incidence.push({
                                nom: this.appIncidence[y].nom_appli,
                                nb: this.appIncidence[y].nb_occurence
                            })
                        }
                    }
                    console.log("Display", this.display_incidence)
                })
        },

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
