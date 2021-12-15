import DataClass from "~/Class/DataClass";
export default axios =>({


    async getFielsOptions(){
        const datas = new DataClass();
        datas.priorites = await this.getPriorites();
        datas.statut = await this.getStatuts();
        datas.enseignes = await this.getEnseignes();
        datas.application_impactee = await this.getApplicationsImpactee();
        datas.gravite = await this.getGravites();
        datas.entite_responsable = await this.getEntiteResponsable();
        datas.causes_racine = await this.getCausesRacine();
        return datas

    },

    getPriorites(){
        return axios.get('incident/priorite');
    },
    getStatuts(){
        return axios.get('incident/statut');
    },
    getEnseignes(){
        return axios.get('enseigne');
    },
    getApplicationsImpactee(){
        return axios.get('applications');
    },
    getGravites(){
        return axios.get('gravite');
    },
    getEntiteResponsable(){
        return axios.get('entite-responsable');
    },
    getCausesRacine(){
        return axios.get('cause-racine');
    },
})