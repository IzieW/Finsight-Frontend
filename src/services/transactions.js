import axios from "axios"

const baseUrl = "/api/transactions"

let token = null 



const setToken = newToken => {
    console.log("Setting token:", newToken)
    token = `bearer ${newToken}`
}

const getAll = () => {
    return axios.get(baseUrl)

}

const create = async newObject => {
    const config = {
        headers: {Authorization: token},
    }
    console.log(config)
    const response = await axios.post(baseUrl, newObject, config)
    return response
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteTransaction = (id) => {
    const config = {
        headers: {Authorization: token},
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

export default {
    getAll, 
    create, 
    update,
    deleteTransaction,
    setToken
}