import DataClass from "../Class/DataClass";
import GetData from "../models/GetData";
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
    
    HeaderMainCourante = ['Réference', 'Date de début', 'Enseigne', 'Application','Description', 'Priorité','Statut','Date de fin', 'Impact','Contournement','Cause','Origine','Action de rétablissement', "Plan d'action",'Détection', 'Communication TDC','Qualification P0 P1', "1ere Communication à l'enseigne"],

    // Avec la fonction lambda / Récupération des Options diposnible ( Priorite, status, enseignes etc ) pour les afficher sur le formulaire 
    async getFieldsOptions(){	
        let datas = new DataClass();

		datas.priorites = await GetData.getDatas('incident/priorite');
		datas.statut = await GetData.getDatas('incident/statut');
		datas.enseignes = await GetData.getDatas('enseigne');
        datas.application_impactee = await GetData.getDatas('applications');
        
        return datas;
    },



    
}