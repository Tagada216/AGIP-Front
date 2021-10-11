import IncidentClass from './IncidentClass';

export default class ImpactEnseigne extends IncidentClass{
    enseigne=[];
    gravite_id="";
    description_impact="";
    date_debut="";
    date_fin="";
    date_fin_com="";
    date_detection="";
    date_com_tdc="";
    date_qualif_p01="";
    date_premier_com="";
    date_solution="";
    date_retablissement="";

    jh_perdu="";
    nombre_utilisateurs="";
    taux_indispo_reseau="";
    duree_indispo_reseau="";
    logitelnet_cust="";
    chiffre_cust="";
    dab_cust="";
    progeliance_cust="";
    net_EIPRO_cust="";
    etece_cust="";

    constructor() {
        super()
    };
};