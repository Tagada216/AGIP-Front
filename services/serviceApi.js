import axios from "axios";

const baseURL = 'http://localhost:5000/api/';

export  default {

  // Fonction lambda pour récupérer les datas

  getDatas(endURL){
    let data;
    return axios.get(baseURL + endURL).then(response =>{
      data = response.data
      return data
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

  updateIncidentMainCoutante(id, data){
    let responsePatchMainCourante;
    return axios.patch(`${baseURL}incident/${id}`, data).then(response =>{
      responsePatchMainCourante = response
      console.log(responsePatchMainCourante)
      return responsePatchMainCourante
    })
  },
  
  //Post 

  //----Création d'un incident 
  createIncident(data){
    let responseCreate
    return axios.post(`${baseURL}incident`, data).then(rep => {
      responseCreate = rep
      return responseCreate
    })
  }

  // Ajout d'un incident au cosip
  
}
