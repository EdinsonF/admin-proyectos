import React, {useEffect, useReducer, useContext} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import {type} from '../../types/index';

import { db } from '../../firebase';
import {authContext}  from '../../Components/auth/authContext/authProvider';

const {uiShowHideFormProyecto , eventLoadProyectos, showProyectSelect, deleteProyect, restoreState} = type;


const ProyectoState = props => {

  const {userAuth} = useContext(authContext)


  const initialState = {
     proyectos:[],
    formulario : false,
    proyectSelect:[]
  }

  useEffect(() => {

    if(userAuth){
      //console.log(state.prueba);
      cargarProyectosFn(userAuth.uid);
    }
    
  }, [userAuth])

  //Dispathpara ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState)

  //Serie de funciones ppara el CRUD
  const mostrarFormularioFn = () => {
    dispatch({
      type: uiShowHideFormProyecto
    })
  }

  const cargarProyectosFn = async (uid) => {
    
    db.collection("proyects").where("userId", "==", uid).onSnapshot((rs) => {
      let proyectos = [];
      rs.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        proyectos.push({...doc.data(), id: doc.id})
    });
    dispatch({
      type: eventLoadProyectos,
      payload: proyectos
    })})
    /* .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            proyectos.push({...doc.data(), id: doc.id})
        });
        dispatch({
          type: eventLoadProyectos,
          payload: proyectos
        }) 
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    }); */
    
  
  }


  const addProyectoFn = async (proyecto) => {

    dispatch({
      type: uiShowHideFormProyecto
    })

    await db.collection('proyects').doc().set(proyecto);    

  }

  const showProyectSelectFn = (id) => {

    dispatch({
      type: showProyectSelect,
      payload: id
    })
  }


  const deleteProyectFn = async (id) => {

  await db.collection('proyects').doc(id).delete();    
    dispatch({
      type: deleteProyect
    })
  }

  const restoreStateFn = () => {
    dispatch({
      type: restoreState
    })
  }

 
  return(
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        proyectSelect: state.proyectSelect,
        mostrarFormularioFn,
        cargarProyectosFn,
        addProyectoFn,
        showProyectSelectFn,
        deleteProyectFn,
        restoreStateFn
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  )
  

}

export default ProyectoState;