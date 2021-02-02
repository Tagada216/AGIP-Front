<template>
    <div style="100vh">
        <el-button class="btnModalWeek" type="info" @click="openWeekModal()" round
            >Sélectionner une ancienne semaine COSIP</el-button
        >
		<div>			
            <h4>Semaine COSIP : {{displaySemaineCosip}}</h4>
        </div>
        <modal class="modal" name="selectWeekModal">
            <h4> Sélectionner une semaine à afficher : </h4>
            <div class="weekSelect">
                <el-date-picker
                    id="date_cosip_select"
                    v-model="date_cosip_select"
                    type="week"
                    placeholder="Sélectionnez la semaine COSIP"
                    format=" WW/yyyy"
                />
            </div>
            <el-button type="info" class="button-ok" plain @click="ok()">Afficher tous les incidents au Cosip</el-button>
            <el-button type="success" class="button-ok" @click="displaySelectWeek(date_cosip_select)">Afficher la semaine sélectionné</el-button>
            <br>
            <el-button type="danger" class="cancelbtn" @click="cancel()">Annuler</el-button>
        </modal>
    </div>
</template>

<script>
import Vue from 'vue';
import methods from '@/components/CosipForm';
import VModal from 'vue-js-modal';

Vue.use(VModal, { componentName: 'modal' });

export default {
    created(){
		this.getCurrentCosipWeek();
    },
    data() {
        return {
            date_cosip_select:"",
            selectCosipWeek:'',
            displaySemaineCosip:"",
            url_api:""
        };
    },

    methods: {

        getCurrentCosipWeek(){
			const dateDebut = new Date()
			var jour = dateDebut.getDay();
			dateDebut.setDate(dateDebut.getDate() - (jour + 6) % 7 + 3);
			var ms = dateDebut.valueOf();
			dateDebut.setMonth(0)
			dateDebut.setDate(4)
            var semaineCosip = Math.round((ms - dateDebut.valueOf()) / (7*864e5))+1
            
            this.displaySemaineCosip = "S"+(semaineCosip-1)+"/"+dateDebut.getFullYear()
        },
        getCosipWeek(selectDate){
            console.log("La semaine sélectionné est: ", selectDate)
            const date = new Date(selectDate);
            var jour = date.getDay();
            date.setDate(date.getDate() - (jour+6)% 7 + 3);
            var ms = date.valueOf();
            date.setMonth(0)
            date.setDate(4)
            var semaineCosip = Math.round((ms - date.valueOf())/(7*864e5))+1
            this.displaySemaineCosip = "S"+(semaineCosip)+"_"+date.getFullYear()

           return this.url_api = "http://localhost:5000/api/cosip/week/" + this.displaySemaineCosip
        },


        //Méthodes de gestion de la fenêtre modal ////////////////////////

        //Ouverture de la Modal : 
        openWeekModal(){
            this.$modal.show('selectWeekModal');
            var confirmed = false;
        },
        //Annulation de l'action de la modal
        cancel(){
            this.$modal.hide('selectWeekModal')
        },
        //Affichage de la semaine sélectionné 
        displaySelectWeek(week){
            this.$modal.hide('selectWeekModal')
            this.confirmed = true;
            this.getCosipWeek(week)
            
        }
    },
};
</script>


<style lang="scss">
$redColor: #ed1a3a;
$blackColor: #2c3e50;

.btnModalWeek{
    margin-top: 10px
}

.vm--modal {
	width: 550px !important;
	height: 380px !important;
	border: 10px solid;
	border-image-slice: 1;
	border-width: 5px;
	border-image-source: linear-gradient(to left, $blackColor, $redColor);
}

.weekSelect {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 4rem 2rem;
	height: 10em;
	cursor: pointer;
}

.cancelbtn{
    margin-top: 2em;
}
</style>
