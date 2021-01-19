<template>

    <div style="100vh">

        <base-header title="Statistiques" />
            <el-card>
				<div slot="header">
					<h4 class="card-header">Statistiques des priorités par incidents</h4>
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
                <div class="enseigne-row">P3
                    <div class="result">{{P3}}</div>
                </div>
                <div class="enseigne-row">P4
                    <div class="result">{{P4}}</div>
                </div>
            </div>
        </el-card>
    </div>

    
</template>
<script>
export default {
    created(){
        this.getIncPriorite()
    },
    data(){
        return {
            incident_priotites:[],
            P0: 0,
            P1: 0,
            P2: 0,
            P3: 0,
            P4: 0,
            remoteEnum:{
                priorites:[]
            }
        }
    },
    methods:{
        getIncPriorite(){

            this.$http
                .get('http://localhost:5000/api/stat/priorites')
                .then(response => {
                    this.incident_priotites = response.data  
                    for(let i=0; i< this.incident_priotites.length; i++){
                        console.log(this.incident_priotites[i].priorite_id)
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
                });
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