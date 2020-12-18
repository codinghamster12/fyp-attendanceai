import { authConstants } from '../actions/constants'
const initState= {
    token: null,
    authenticate: false,
    authenticating: false,
    error: null
    
}

export default(state= initState, action)=>{
    console.log(action)
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state={
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state={
                ...state,
                authenticate: true,
                token: action.payload.token,
                authenticating: false
            }
        
            break;
        case authConstants.LOGIN_FAILURE:
            state={
                ...state,
                error: action.payload.error

            }
            break;
    }

    return state;

}