import axios from '../helpers/axios';
import { userConstants, authConstants } from './constants'

export const signup = (user) => {
    return async (dispatch) => {
        dispatch({
            type: userConstants.REGISTER_REQUEST
        })
        try{
            const res= await axios.post(`/account/register/`, {
                ...user
            })
            console.log(res.data)
            if(res.status == 201){
                const { message, token } = res.data
                localStorage.setItem('token', token)

                dispatch({
                    type: userConstants.REGISTER_SUCCESS,
                    payload: {
                        message
    
                    }
                })
                
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
                    type: userConstants.REGISTER_FAILURE,
                    payload:{
                        error: error.response.data
                    }
                })
            }

        }
        

    }
}