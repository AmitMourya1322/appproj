import axios from "axios"

const API_URL = 'http://localhost:8080/controller/'


const register = async(userData)=>{
    const response = await axios.post(API_URL+'signup',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}


const login = async(userData)=>{
    const response = await axios.post(API_URL+'login',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
//logout
const logout =()=>{
    localStorage.removeItem('user')
}

const authService ={
    register,
    logout,
    login
}

export default authService
