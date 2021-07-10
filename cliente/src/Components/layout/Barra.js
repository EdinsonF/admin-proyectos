import React, { useContext} from 'react';


import { auth } from '../../firebase';

import {authContext} from '../auth/authContext/authProvider';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Barra = () => {

  const {userAuth} = useContext(authContext);
  const {restoreStateFn} = useContext(proyectoContext)
 

  const logout = () => {
    auth.signOut().then(() => {
      restoreStateFn();
      console.log('cerrada');
    }).catch((error) => {
      console.log(error);
    });
  }


 
  
  return ( 

        <header className="app-header">
            <p className="nombre-usuario"> Hola <span>{userAuth.email}</span></p>

            <nav className="nav-principal">
              <a href="#!" onClick={() => logout()}>Cerrar Sesión</a>
            </nav>

        </header>
   );
}
 
export default Barra;