export default class IncidentClass {
    incident_id = "";
    references = [];
    is_faux_incident = false;
    date_debut = "";
    date_fin = "";
    date_detection = "";
    date_communication_TDC = "";
    date_qualification_p01 = "";
    gravite_id = "";
    date_premiere_com = "";
    priorite_id = ""; 
    statut_id = ""; 
    enseignes_impactee=[];
    incident_impact_enseignes = [];
    description = "";
    incident_application_impactees = [];
    cause = "";
    origine="";
    action_retablissement = "";
    plan_action="";
    description_impact = "";
    description_contournement = "Aucun contournement";
    is_contournement = false;
    is_agence = false;
    departement_responsable='';
    changements_id='';
    crise_ITIM='';
    cosip_id = "";

    
    constructor() {};

    //ref,debut,priorite,statut,enseigneImpactee,desc,appImpactee,cause,descImpact

};

