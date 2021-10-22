import DataClass from "../Class/DataClass";
import serviceApi from "../services/serviceApi";
import Rule from "../models/Rule";

export default {

    // async getFieldsOptions(){	
    //     let datas = new DataClass();

	// 	datas.priorites = await GetData.getPriorite();
	// 	datas.statut = await GetData.getStatut();
	// 	datas.enseignes = await GetData.getEnseigne();
    //     datas.application_impactee = await GetData.getAllApp();
        
    //     return datas;
    // },
    


    // Avec la fonction lambda / Récupération des Options diposnible ( Priorite, status, enseignes etc ) pour les afficher sur le formulaire 
    async getFieldsOptions(){	
        let datas = new DataClass();

		datas.priorites = await serviceApi.getDatas('incident/priorite');
		datas.statut = await serviceApi.getDatas('incident/statut');
		datas.enseignes = await serviceApi.getDatas('enseigne');
        datas.application_impactee = await serviceApi.getDatas('applications');
        datas.gravite = await serviceApi.getDatas('gravite');
        datas.cause_racines = await serviceApi.getDatas('cause-racine');
        datas.entite_responsable = await serviceApi.getDatas('entite-responsable');
        
        return datas;
    },



    
}