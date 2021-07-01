import React, {useEffect, useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import {type} from '../../types/index';

import { v4 as uuidv4 } from 'uuid';
import { db } from '../../firebase';

const {uiShowHideFormProyecto , eventLoadProyectos, showProyectSelect, deleteProyect} = type;


const ProyectoState = props => {

  useEffect(() => {
    cargarProyectosFn();
  }, [])
  

  const initialState = {
     proyectos:[],
    formulario : false,
    proyectSelect:[]
  }

  //Dispathpara ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState)

  //Serie de funciones ppara el CRUD
  const mostrarFormularioFn = () => {
    dispatch({
      type: uiShowHideFormProyecto
    })
  }

  const cargarProyectosFn = async () => {
    /* const result = await db.collection('proyects').get();
    result.forEach(doc => {
      proyectos.push(doc.data())
    })

    dispatch({
      type: eventLoadProyectos,
      payload: proyectos
    }) */

    db.collection('proyects').onSnapshot((result) => {
      let proyectos = [];
      result.forEach(doc => {
        
        proyectos.push({...doc.data(), id: doc.id})
      })
      console.log(proyectos);
      dispatch({
        type: eventLoadProyectos,
        payload: proyectos
      })
    });
  
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


  const deleteProyectFn = (id) => {
    dispatch({
      type: deleteProyect,
      payload: id
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
        deleteProyectFn
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  )
  

}

export default ProyectoState;