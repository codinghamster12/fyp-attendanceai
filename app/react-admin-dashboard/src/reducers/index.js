import { combineReducers } from 'redux';
import studentReducer from './students'
import authReducer from './auth'


const initialState = {
    sidebarShow: 'responsive'
  }
  
  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return {...state, ...rest }
      default:
        return state
    }
  }
  

const rootReducer= combineReducers({
    nav: changeState,
    student: studentReducer,
    auth: authReducer
    
})

export default rootReducer;
