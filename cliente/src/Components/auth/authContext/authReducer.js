

import {type} from '../../../types/index';

const {authSingUpUser} = type;

const authReducer = (state, action) => {

  switch (action.type){

    case authSingUpUser:
  
      return{
        ...state,
        userAuth : action.payload
      }

    default:
      return state;
  }
  
  
  
}
 
export default authReducer;