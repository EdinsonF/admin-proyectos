import React, {useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import {type} from '../../types/index';

import { v4 as uuidv4 } from 'uuid';

const {uiShowFormProyecto , eventLoadProyectos, addNewProyect, showProyectSelect, deleteProyect} = type;


const ProyectoState = props => {
  
  let proyectos = [
    {id: 1, nombre: "Proyecto 1"},
    {id: 2,nombre: "Programar"},
    {id: 3,nombre: "Proyecto 3"}
  ];

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
      type: uiShowFormProyecto
    })
  }



 

  const cargarProyectosFn = () => {
    dispatch({
      type: eventLoadProyectos,
      payload: proyectos
    })
  }


  const addProyectoFn = (proyecto) => {
    proyecto.id = uuidv4();
    
    dispatch({
      type: addNewProyect,
      payload: proyecto
    })

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