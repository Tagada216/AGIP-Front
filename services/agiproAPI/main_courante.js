

export default axios =>({
    getMainCourante(){
        return axios.get("incident");
    },
    getOneIncident(id_incident){
        return axios.get("incident/"+id_incident);
    },
    createIncident(new_incident){
        return axios.post("incident",new_incident);
    },
    updateOneIncident(incident, id_incident){
        return axios.put('incident/'+id_incident, incident);
    }
})