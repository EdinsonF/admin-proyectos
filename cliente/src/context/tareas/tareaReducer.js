
import {type} from '../../types/index';

const {showTaskList, addTaskNew} = type;

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
        tareas: [...state.tareas, action.payload]
        
      }
      
      

      default:
        return state;
  }

}

export default tareaReducer;