import React, { useReducer, useEffect} from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import {type} from '../../types/index';

import { db } from '../../firebase';

const {showTaskList, showMessage, eventHandleName, eventChangeUpdating, updateTask,deleteAllTask, eventLoadTask} = type;


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

  const updateTaskFn = async (task) => {
    await db.collection('tasks').doc(task.id).update(task);
    dispatch({
      type: updateTask,
      payload: task
    })
  }

  const deleteTaskFn = async (id) => {
    await db.collection('tasks').doc(id).delete();
 
  }

  const handleNameTaksFn = (name) => {

    dispatch({
      type: eventHandleName,
      payload: name
    })
  }
  const ChangeStatusFn = async (task, estadoCambio) => {
    await db.collection('tasks').doc(task.id).update({estado : estadoCambio}) 
  }

  const showMessageFn = () => {
    dispatch({
      type: showMessage,
    })
  }

  const deleteAllTaskFn = async(tareas) => {

    await tareas.forEach(task => {
      db.collection('tasks').doc(task.id).delete();
    })
    //await db.collection('tasks').doc(id_proyect).delete();
 
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