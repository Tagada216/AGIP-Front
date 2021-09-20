import DataClass from "../Class/DataClass";
import GetData from "../models/GetData";

export default {

    // async getFieldsOptions(){	
    //     let datas = new DataClass();

	// 	datas.priorites = await GetData.getPriorite();
	// 	datas.statut = await GetData.getStatut();
	// 	datas.enseignes = await GetData.getEnseigne();
    //     datas.application_impactee = await GetData.getAllApp();
        
    //     return datas;
    // },
    


    // Avec la fonction lambda
    async getFieldsOptions(){	
        let datas = new DataClass();

		datas.priorites = await GetData.getDatas('incident/priorite');
		datas.statut = await GetData.getDatas('incident/statut');
		datas.enseignes = await GetData.getDatas('enseigne');
        datas.application_impactee = await GetData.getDatas('applications');
        
        return datas;
    },

    
}