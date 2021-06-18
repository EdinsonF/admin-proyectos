import React, { useReducer} from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import {type} from '../../types/index';

import { v4 as uuidv4 } from 'uuid';

const {showTaskList, addTaskNew} = type;


const TareaState = ({children}) => {



  const initialState = {
    tareas: [{ id: 1, nombre: "Realizar esquema", estado: true, id_proyecto:1},
    {id: 2,nombre: "Realizar esquema2", estado: false, id_proyecto:1},
    {id: 3,nombre: "Realizar esquema3", estado: false, id_proyecto:2},
    {id: 4,nombre: "Realizar esquema4", estado: true, id_proyecto:1}],
    tareasProyecto:[]
    
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
    console.log(task.id);
    dispatch({
      type : addTaskNew,
      payload: task
    })
  }


  return (  
      <tareaContext.Provider 
      value={{
        tareas: state.tareas,
        tareasProyecto:state.tareasProyecto,
        showTaskListFn,
        addTaskNewFn
      }}>

      {children}
    </tareaContext.Provider>

  );
}
 
export default TareaState;