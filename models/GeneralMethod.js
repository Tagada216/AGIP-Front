import DataClass from "../Class/DataClass";
import GetData from "../models/GetData";
import IncidentModel from "../models/IncidentModel";


export default {

  // Avec la fonction lambda / Récupération des Options diposnible ( Priorite, status, enseignes etc ) pour les afficher sur le formulaire 
  async getFieldsOptions() {
    let datas = new DataClass();

    datas.priorites = await GetData.getDatas('incident/priorite');
    datas.statut = await GetData.getDatas('incident/statut');
    datas.enseignes = await GetData.getDatas('enseigne');
    datas.application_impactee = await GetData.getDatas('applications');

    return datas;
  },


  transformDatas(data, setHeader) {
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


      let getDatedeb = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.date_debut
      });

      incident.date_deb = this.getFormatDates(getDatedeb[0])



      let getEnseigne = data[i].incident_impact_enseignes.map(function (elem) {
        return elem.enseigne_id
      });

      if (getEnseigne.length == 0) {

        incident.enseigne_impactee = ""

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

        incident.enseigne_impactee = getEnseigneCell

      } else {
        if (getEnseigne == 1) {
          incident.enseigne_impactee = "BDDF"
        } else if (getEnseigne == 2) {
          incident.enseigne_impactee = "CDN"
        } else if (getEnseigne == 3) {
          incident.enseigne_impactee = "BPF"
        } else if (getEnseigne == 4) {
          incident.enseigne_impactee = "GTPS"
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
  }
}
