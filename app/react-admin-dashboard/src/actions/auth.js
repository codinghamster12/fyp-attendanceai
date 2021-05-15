import axios from '../helpers/axios';
import { authConstants } from "./constants"

export const login = (user) =>{
    console.log(user)
    return async (dispatch) => {

        dispatch({
            type: authConstants.LOGIN_REQUEST
        })
        try{
            const res= await axios.post(`/account/login/`, {
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
        
        


      

    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST,
            
        })
        const token= localStorage.getItem('token')
        const headers= {
            'Authorization': `Token ${token}`
        }
        try{
            const res= await axios.post(`/account/logout/`, null, {headers: headers})

            if(res.status == 200){
                localStorage.clear()
                dispatch({
                    type: authConstants.LOGOUT_SUCCESS,
                    
                })
    

            }
            // else{
            //     if(res.status == 401){
            //         dispatch({
            //             type: authConstants.LOGOUT_SUCCESS,
                        
            //         })

            //     }
            // }
          
        }
        catch(error){
            if(error.response.status == 401){
                dispatch({
                    type: authConstants.LOGOUT_FAILURE,
                    payload:{
                        error: error.response.data
                    }
                })

            }
           
        }
        
   
    }
}