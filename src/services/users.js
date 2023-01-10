import axios from "axios"
const baseUrl = "/api/users"

const getAll =  () => {
    return  axios.get(baseUrl)
}

const getOne = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {getAll, getOne, create, update}