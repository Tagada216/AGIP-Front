import DataClass from "../Class/DataClass";
import serviceApi from "../services/serviceApi";
import IncidentModel from "../models/IncidentModel";


export default {

  // Avec la fonction lambda / Récupération des Options diposnible ( Priorite, status, enseignes etc ) pour les afficher sur le formulaire 
  async getFieldsOptions() {
    let datas = new DataClass();

    datas.priorites = await serviceApi.getDatas('incident/priorite');
    datas.statut = await serviceApi.getDatas('incident/statut');
    datas.enseignes = await serviceApi.getDatas('enseigne');
    datas.application_impactee = await serviceApi.getDatas('applications');

    return datas;
  },


  transformDatasForGrid(data, setHeader) {
    // console.log(data.length)
    let tableData = [];
    let i = 0;
    let incident = IncidentModel.model.incident;

    do {


      if (data[i].incident_references.length > 1) {

        incident.ref = data[i].incident_references.map(function (elem) {
          return elem.reference;
        }).join("/");


      } else {
        incident.ref = data[i].incident_references[0].reference
      }

      console.log(incident.ref)

      let getDatedeb = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_debut
      });

      incident.date_deb = this.getFormatDates(getDatedeb[0])



      let getEnseigne = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.enseigne_id
      });

      if (getEnseigne.length == 0) {

        incident.enseignes_impactee = ""

      } else if (getEnseigne.length > 1) {
        let getEnseigneCell = getEnseigne.map(function (elem) {

          let enseigne = ["BDDF", "CDN", "BPF", "GTPS"];
          let newValue;
          if (elem == 1) {
            newValue = enseigne[0]
          } else if (elem == 2) {
            newValue = enseigne[1]
          } else if (elem == 3) {
            newValue = enseigne[2]
          } else if (elem == 4) {
            newValue = enseigne[3]
          }
          return newValue
        });

        incident.enseignes_impactee = getEnseigneCell

      } else {
        if (getEnseigne == 1) {
          incident.enseignes_impactee = "BDDF"
        } else if (getEnseigne == 2) {
          incident.enseignes_impactee = "CDN"
        } else if (getEnseigne == 3) {
          incident.enseignes_impactee = "BPF"
        } else if (getEnseigne == 4) {
          incident.enseignes_impactee = "GTPS"
        }

      }

      incident.application_impactee = data[i].incident_application_impactees.map(function (elem) {
        return elem.nom_appli
      }).join("/")

      incident.description = data[i].description


      if (data[i].priorite_id == 1) {
        incident.prio = "P0"
      } else if (data[i].priorite_id == 2) {
        incident.prio = "P1"
      } else if (data[i].priorite_id == 3) {
        incident.prio = "P2"
      } else if (data[i].priorite_id == 4) {
        incident.prio = "P3"
      } else if (data[i].priorite_id == 5) {
        incident.prio = "P4"
      }

      if (data[i].statut_id == 1) {
        incident.statut = "Ouvert"
      } else if (data[i].statut_id == 2) {
        incident.statut = "En cours de traitement"
      } else if (data[i].statut_id == 3) {
        incident.statut = "Correctif identifié"
      } else if (data[i].statut_id == 4) {
        incident.statut = "Observation"
      } else if (data[i].statut_id == 5) {
        incident.statut = "Résolu"
      } else if (data[i].statut_id == 5) {
        incident.statut = "Faux incident"
      }

      let getDatefin = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_fin
      });

      incident.date_fin = this.getFormatDates(getDatefin[0])


      incident.description_impact_enseigne = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.description_impact
      });


      incident.description_contournement = data[i].description_contournement

      incident.cause = data[i].cause


      incident.origine = data[i].origine

      incident.action_retablissement = data[i].action_retablissement



      incident.plan_action = data[i].plan_action



      let getDateDetection = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_detection
      });

      incident.date_detection = this.getFormatDates(getDateDetection[0])


      let getDateComTDC = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_com_tdc
      });

      incident.date_communication_TDC = this.getFormatDates(getDateComTDC[0])


      let getDateQualifP01 = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_qualif_p01
      });

      incident.date_qualification_p01 = this.getFormatDates(getDateQualifP01[0])


      let getDatePremiereCom = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_premier_com
      });

      incident.date_premiere_com = this.getFormatDates(getDatePremiereCom[0])


      incident.is_contournement = data[i].is_contournement

      incident.is_agence = data[i].is_agence

      incident.is_faux_incident = data[i].is_faux_incident

      incident.cosip_id = data[i].cosip_id


      let getGravite = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.gravite_id
      });

      if (getGravite == 1) {
        incident.gravite_id = "Faible/Autre"
      } else if (getGravite == 2) {
        incident.gravite_id = "Moyen/Significatif"
      } else if (getGravite == 3) {
        incident.gravite_id = "Eleve/Majeur"
      }



      let getDateFinCom = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_fin_com
      });

      incident.date_fin_com = this.getFormatDates(getDateFinCom[0])

      let getDateRetablissement = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_retablissement
      });

      incident.date_retablissement = this.getFormatDates(getDateRetablissement[0])

      let getDateSolution = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_solution
      });

      incident.date_solution = this.getFormatDates(getDateSolution[0])

      let getNbUser = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.nombre_utilisateurs
      });

      incident.nbUtilisateur = getNbUser[0]

      incident.id = data[i].id


      let newIncident = this.setNewKeysForIncidentGrid(incident, setHeader)


      tableData.push(newIncident)


      incident = {};



      i++
    } while (i < data.length)

    console.log(tableData)
    return tableData
  },

  getFormatDates(date) {

    if (date == undefined || null) {
      return date = ""
    }


    const setDate = new Date(date);
    let mois = setDate.getMonth() + 1

    let numeroMois = this.setZeroUnderTen(mois);

    let jour = this.setZeroUnderTen(setDate.getDate());

    let hours = this.setZeroUnderTen(setDate.getUTCHours());

    let minutes = this.setZeroUnderTen(setDate.getUTCMinutes());

    let second = this.setZeroUnderTen(setDate.getUTCSeconds());

    let returnDate = `${jour}/${numeroMois}/${setDate.getFullYear()}  ${hours}:${minutes}:${second}  `

    return returnDate

  },


  setZeroUnderTen(param) {
    if (param < 10) {
      return param = "0" + param
    } else {
      return param
    }
  },

  setNewKeysForIncidentGrid(incident, header) {


    var getKeys = Object.keys(incident)
    var str = JSON.stringify(incident)

    for (let i = 0; i < header.length; i++) {
      var newKeys = header[i].split(":")

      var oldKeys = getKeys[i].split(':')

      if (Object.keys(getKeys)[i] == Object.keys(header)[i]) {
        str = str.replace(oldKeys[0], newKeys[0])
      }

    }

    incident = JSON.parse(str)

    return incident
  },

  transformDatasForm(data, incident, incidentId) {
    // console.log(data)
    incident.incident_id = incidentId;
    incident.description = data.description;
    incident.date_debut = data.incident_impact_enseignes[0].date_debut
    incident.date_fin = data.incident_impact_enseignes[0].date_fin;
    incident.description_impact =
      data.incident_impact_enseignes[0].description_impact;
    incident.statut_id = data.statut_id;
    incident.priorite_id = data.priorite_id;
    incident.date_detection = data.incident_impact_enseignes[0].date_detection;
    incident.date_communication_TDC =
      data.incident_impact_enseignes[0].date_com_tdc;
    incident.date_qualification_p01 =
      data.incident_impact_enseignes[0].date_qualif_p01;
    incident.gravite_id = data.gravite_id;
    incident.date_premiere_com = data.incident_impact_enseignes[0].date_premier_com;
    incident.cause = data.cause;
    incident.action_retablissement = data.action_retablissement;
    incident.origine = data.origine;
    incident.plan_action = data.plan_action;

    incident.is_faux_incident = data.is_faux_incident ?
      true :
      false;
    incident.is_contournement = data.is_contournement ?
      true :
      false;
    incident.description_contournement =
      data.description_contournement;
    incident.enseignes_impactee = [];
    incident.references = [];
    incident.incident_application_impactees = [];
    incident.cosip_id = data.cosip_id

    // console.log("Nb ref ", response.data[0].reference_id.split('/').length)
    //Gestion pour la récupération des référence 
    for (
      let index = 0; index < data.incident_references.length; // récupération de la référence et stop séparation au caractère / 
      index++
    ) {
      // console.log()
      const id = data.incident_references[index].id;
      const ref = data.incident_references[index].reference;
      incident.references.push({
        id: id,
        reference: ref,
      });
    }

    //Récupération des applications
    for (
      let index = 0; 
      index < data.incident_application_impactees.length; 
      index++
    ) {
      // console.log(data.incident_application_impactees[index].Application_code_irt)
      const itr = data.incident_application_impactees[index].Application_code_irt;
      const app = data.incident_application_impactees[index].nom_appli;
      const tri = data.incident_application_impactees[index].Application_trigramme;


      const appli  = {
          code_irt: itr,
          display_name: app,
          trigramme: tri
        };
      //  console.log(app)
      incident.incident_application_impactees.push(appli);
    }
   
    // console.log(incident.application_impactee[0])
    //Récupération des enseignes et affichage des cards
    // if ((data.cosip_id !== "") && (data.cosip_id !== null)) {
      for (
        let index = 0; index <  data.incident_impact_enseignes.length; index++
      ) {
        const idEns =  data.incident_impact_enseignes[index].enseigne_id;
        incident.enseignes_impactee.push(parseInt(idEns));

    //     const desImpact = data.incident_impact_enseignes[index].description_impact;
    //     const graviteA = data.incident_impact_enseignes[index].gravite_id;
    //     const graviteNom = response.data[0].gravite_nom.split('/')[
    //       index
    //     ];
    //     const criticite = response.data[0].classification.split(
    //       '/'
    //     )[index];
    //     this.tab_enseignes.push({
    //       enseigne_id: idEns,
    //       desc: desImpact,
    //       gravite: graviteNom,
    //       id_grav: graviteA,
    //       class: criticite,
    //     }); // Switch case pour récupérer les données qui sont indépendantes en fonction de l'enseigne
    //     switch (this.tab_enseignes[index].enseigne_id) {
    //       case '1':
    //         this.form.description_impactBDDF = this.tab_enseignes[
    //           index
    //         ].desc;
    //         this.form.impact_avereBDDF = this.tab_enseignes[
    //           index
    //         ].gravite;
    //         this.classificationBDDF = this.tab_enseignes[
    //           index
    //         ].class;
    //         this.form.gravite_idBDDF = this.tab_enseignes[
    //           index
    //         ].id_grav;
    //         break;
    //       case '2':
    //         this.form.description_impactCDN = this.tab_enseignes[
    //           index
    //         ].desc;
    //         this.form.impact_avereCDN = this.tab_enseignes[
    //           index
    //         ].gravite;
    //         this.classificationCDN = this.tab_enseignes[
    //           index
    //         ].class;
    //         this.form.gravite_idCDN = this.tab_enseignes[
    //           index
    //         ].id_grav;
    //         break;
    //       case '3':
    //         this.form.impact_avereBPF = this.tab_enseignes[
    //           index
    //         ].gravite;
    //         this.form.description_impactBPF = this.tab_enseignes[
    //           index
    //         ].desc;
    //         this.classificationBPF = this.tab_enseignes[
    //           index
    //         ].class;
    //         this.form.gravite_idBPF = this.tab_enseignes[
    //           index
    //         ].id_grav;
    //         break;
    //     }
    //   }
    }
    return incident
  }
}