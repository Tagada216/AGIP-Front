export default class IncidentClass {
    references = [];
    is_faux_incident = false;
    priorite_id = ""; 
    statut_id = ""; 
    date_debut="";
    date_fin="";
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
    constructor() {};

    //ref,debut,priorite,statut,enseigneImpactee,desc,appImpactee,cause,descImpact

};

