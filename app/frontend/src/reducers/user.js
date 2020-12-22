import { userConstants } from '../actions/constants';

const initState={
    loading: false,
    message: '',
    error: null
}

export default(state=initState, action) => {
    switch(action.type){
        case userConstants.REGISTER_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case userConstants.REGISTER_SUCCESS:
            state={
                ...state,
                message: action.payload.message
            }
            break;
        case userConstants.REGISTER_FAILURE:
            state={
                ...state,
                error: action.payload.error
            }
            break;

    

        
    }
    return state;

}