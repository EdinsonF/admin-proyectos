
import {type} from '../../types/index';

const {showTaskList, showMessage, eventDeleteTask, eventChangeStatus, eventHandleName, eventChangeUpdating, updateTask, deleteAllTask, eventLoadTask} = type;

const tareaReducer = (state,  action) =>{

  switch (action.type) {
    
    case eventLoadTask :
      return {
        ...state,
        tareas : action.payload
      }

    case showTaskList :
      return{
          ...state,
          tareasProyecto: state.tareas.filter(task => task.id_proyecto === action.payload)
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