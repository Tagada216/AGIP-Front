import axios from "axios";

const baseURL = 'http://localhost:5000/api/';

export default {

  // Fonction lambda pour récupérer les datas

  getDatas(endURL){
    let data;
    return axios.get(baseURL + endURL).then(response =>{
      data = response.data
      return data
    })
  },


  // Appel des datas une par une

  getRef() {
    let ref;
    return axios.get(`${baseURL}reference`).then(response => {
      ref = response.data
      return ref
    })
  },


  getPriorite(){
    let priorite;
    return axios.get(`${baseURL}incident/priorite`).then(response =>{
      priorite = response.data
      return priorite
    })
  },

  getStatut(){
    let statut;
    return axios.get(`${baseURL}incident/statut`).then(response =>{
      statut = response.data
      return statut
    })
  },

  getEnseigne(){
    let enseignes;
    return axios.get(`${baseURL}enseigne`).then(response =>{
      enseignes = response.data
      return enseignes
    })
  },

  getAllApp(){
    let app;
    return axios.get(`${baseURL}applications`).then(response =>{
      app = response.data
      return app
    })
  },

getCosip(){
    let cosip;
    return axios.get(`${baseURL}cosip`).then(response =>{
      cosip = response.data
      return cosip
    })
  },

  getOneIncidentCosip(id){
    let incidentCosip;
    return axios.get(`${baseURL}cosip/${id}`).then(response =>{
      incidentCosip = response.data
      return incidentCosip
    })
  },
  
}
