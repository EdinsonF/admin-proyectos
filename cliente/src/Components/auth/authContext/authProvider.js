import React, { createContext, useEffect, useReducer,useState} from 'react'
import {auth} from '../../../firebase';
import authReducer from './authReducer';

import {type} from '../../../types/index';


const {authSingUpUser} = type;

export const authContext = createContext();


const AuthProvider = ({children}) => {

  const initialState = {
    userAuth: null
  }
   
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [pending, setPending] = useState(true);

  
  useEffect(() => {
    
    auth.onAuthStateChanged((user) => {  
        dispatch({
          type: authSingUpUser,
          payload: user
        }) 

        setPending(false);
    });
  }, [])


  
  if(pending){
    return null
  }

  return ( 
    <authContext.Provider
    value={{
      userAuth : state.userAuth
    }}
    >
      {children}
    </authContext.Provider>
   );
}
 
export default AuthProvider;