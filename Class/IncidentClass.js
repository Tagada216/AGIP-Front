export default class IncidentClass {
    references = [];
    is_faux_incedent = false;
    date_debut = "";
    date_fin = "";
    priorite_id = ""; 
    statut_id = ""; 
    enseigne_impactee = [];
    description = "";
    application_impactee = [];
    cause = "";
    action_retablissement = "";
    plan_action="";
    description_impact = "";
    description_contournement = "Aucun contournement";
    is_contournement = false;
    is_agence = false;
    departement_responsable='';

    constructor() {};

    //ref,debut,priorite,statut,enseigneImpactee,desc,appImpactee,cause,descImpact

};

