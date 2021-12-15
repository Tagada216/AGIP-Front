

export default axios =>({
    addNewCosip(incident){
        return axios.post('cosip', incident)
    }
})