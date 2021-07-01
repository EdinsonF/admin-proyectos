import React, { useReducer, useEffect} from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import {type} from '../../types/index';

import { db } from '../../firebase';

const {showTaskList, addTaskNew, showMessage, eventDeleteTask, eventChangeStatus, eventHandleName, eventChangeUpdating, updateTask,deleteAllTask, eventLoadTask} = type;


const TareaState = ({children}) => {


  useEffect(() => {
    loadTaskUser();
  }, [])

  const initialState = {
    tareas: [],
    nombreTask: {nombre: ""},
    tareasProyecto:[],
    mensajeError: false,
    formUpdating:false
    
  }

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  //funciones - disparadores

  const loadTaskUser = () => {
    db.collection('tasks').onSnapshot((rs) => {
      let tasks = [];
      rs.forEach(doc => {
        tasks.push({...doc.data(), id: doc.id})
      })

      dispatch({
        type : eventLoadTask,
        payload: tasks
      })
    })
    
  }

  const showTaskListFn = (id_proyect) => {

    dispatch({
      type: showTaskList,
      payload: id_proyect
    })
  }

  const addTaskNewFn = async (task) => {
    
    await db.collection('tasks').doc().set(task);
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