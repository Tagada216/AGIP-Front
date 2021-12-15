

export default axios =>({
    getOneIncident(id_incident){
        return axios.get("incident/"+id_incident)
    }
})