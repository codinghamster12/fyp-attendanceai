import axios from 'axios';
import { authConstants } from "./constants"

export const login = (user) =>{
    console.log(user)
    return async (dispatch) => {

        dispatch({
            type: authConstants.LOGIN_REQUEST
        })
        try{
            const res= await axios.post(`http://127.0.0.1:8000/api/account/login/`, {
            ...user

        })
        console.log(res.data)
        if(res.status == 200){
            const { token } = res.data;
            localStorage.setItem('token', token)
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token,
                    authenticate:true,
                    authenticating: false

                }
            })
        }
    }
        catch(error){
            if(error.response.status == 400){
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload:{
                        error: error.response.data,
                        
                    }
                })
            }
           

        }

        
        
        
       
       
    }
}

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const token= localStorage.getItem('token')
        if(token){
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload:{
                    token
    
                }
            })

        }
        else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload:{
                    error: 'Failed to login'
                }
            })

        }
        


      

    }
}