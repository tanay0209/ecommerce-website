import {API} from "../../backend"


export const signup = async (user) => {
  return await fetch(`${API}/signup`,{
    method:"POST",
    headers :{
        Accept: "application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  })
  .then(response =>{
    return response.json()
  })
  .catch(error => console.log(error))
}

export const signin = async (user) => {
  return await fetch(`${API}/signin`,{
    method:"POST",
    headers :{
        Accept: "application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  })
  .then(response =>{
    return response.json()
  })
  .catch(error => console.log(error))
}

export const authenticate = (data,next) =>{
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const signout = async (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt")
        next()
        return fetch(`${API}/signout`,{
            method:"GET"
        })
        .then(response => console.log("signout success"))
        .catch(error => console.log(error))
    }
}

export const isAuthenticated = () =>{
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}
  