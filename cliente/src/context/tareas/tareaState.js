import React, { useReducer} from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import {type} from '../../types/index';

import { v4 as uuidv4 } from 'uuid';

const {showTaskList, addTaskNew, showMessage, eventDeleteTask, eventChangeStatus, eventHandleName, eventChangeUpdating, updateTask,deleteAllTask} = type;


const TareaState = ({children}) => {



  const initialState = {
    tareas: [{ id: 1, nombre: "Realizar esquema", estado: true, id_proyecto:1},
    {id: 2,nombre: "Realizar esquema2", estado: false, id_proyecto:1},
    {id: 3,nombre: "Realizar esquema3", estado: false, id_proyecto:2},
    {id: 4,nombre: "Realizar esquema4", estado: true, id_proyecto:1}],
    nombreTask: {nombre: ""},
    tareasProyecto:[],
    mensajeError: false,
    formUpdating:false
    
  }

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  //funciones - disparadores

  const showTaskListFn = (id_proyect) => {

    dispatch({
      type: showTaskList,
      payload: id_proyect
    })
  }

  const addTaskNewFn = (task) => {
    task.id = uuidv4();

    dispatch({
      type : addTaskNew,
      payload: task
    })
  }

 

  const cambiarEditarFn = (action) => {
    dispatch({
      type: eventChangeUpdating,
      payload: action
    })

  }

  const updateTaskFn = (task) => {
    dispatch({
      type: updateTask,
      payload: task
    })
  }

  const deleteTaskFn = (id) => {
    dispatch({
        type: eventDeleteTask,
        payload: id

    })
  }

  const handleNameTaksFn = (name) => {

    dispatch({
      type: eventHandleName,
      payload: name
    })
  }
  const ChangeStatusFn = (task, estadoCambio) => {
    
    dispatch({
      type: eventChangeStatus,
      payload: {task, estadoCambio}
    })
  }

  const showMessageFn = () => {
    dispatch({
      type: showMessage,
    })
  }

  const deleteAllTaskFn = (id_proyect) => {
    dispatch({
      type: deleteAllTask,
      payload: id_proyect
    })
  }




  return (  
      <tareaContext.Provider 
      value={{
        tareas: state.tareas,
        tareasProyecto:state.tareasProyecto,
        mensajeError: state.mensajeError,
        nombreTask:state.nombreTask,
        formUpdating:state.formUpdating,
        showTaskListFn,
        addTaskNewFn,
        showMessageFn,
        deleteTaskFn,
        ChangeStatusFn,
        handleNameTaksFn,
        cambiarEditarFn,
        updateTaskFn,
        deleteAllTaskFn
      }}>

      {children}
    </tareaContext.Provider>

  );
}
 
export default TareaState;