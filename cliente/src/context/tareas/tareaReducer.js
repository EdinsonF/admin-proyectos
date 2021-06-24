
import {type} from '../../types/index';

const {showTaskList, addTaskNew, showMessage, eventDeleteTask, eventChangeStatus, eventHandleName, eventChangeUpdating, updateTask, deleteAllTask} = type;

const tareaReducer = (state,  action) =>{

  switch (action.type) {
    
    case showTaskList :
      return{
          ...state,
          tareasProyecto: state.tareas.filter(task => (task.id_proyecto === action.payload))
      }

    case addTaskNew :
      return{
        ...state,
        tareas: [...state.tareas, action.payload],
        mensajeError: false
        
      }

    case eventChangeUpdating: 
      return {
        ...state,
        formUpdating : action.payload
      }

    case updateTask:

      return{
        ...state,
        tareas: state.tareas.map(task => (task.id === action.payload.id ? action.payload : task)),
        mensajeError: false

      }

      case eventHandleName:
        return {
          ...state,
          nombreTask: action.payload
        }

    case eventDeleteTask:
        return {
          ...state,
          tareas: state.tareas.filter(task => (task.id !== action.payload)),
        mensajeError: false

        }
        
      case eventChangeStatus:

            return {
              ...state,
              tareas: state.tareas.map((task) => ((task.id === action.payload.task.id) ? {...task, estado: action.payload.estadoCambio} : task ))
              
            }
          

      case showMessage:
         return {
           ...state,
          mensajeError: true
         }
      
      case deleteAllTask:
        return {
          ...state,
          tareas: state.tareas.filter(task => (task.id_proyecto !== action.payload))
        }

      default:
        return state;
  }

}

export default tareaReducer;