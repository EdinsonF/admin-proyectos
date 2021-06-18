import {type} from '../../types/index';

const {uiShowFormProyecto , eventLoadProyectos, addNewProyect, showProyectSelect} = type;


const proyectoReducer = (state , action) => {

  switch (action.type) {
    case uiShowFormProyecto:
      return {
        ...state,
        formulario: true
      }
      
    
      case eventLoadProyectos:
        return {
          ...state,
          proyectos: action.payload
        }

      case addNewProyect :
        return {
          ...state,
          proyectos: [...state.proyectos, action.payload],
          formulario : false
        }
      
        case showProyectSelect :
        
          return {
            ...state,
            proyectSelect: state.proyectos.filter(proyect => (proyect.id === action.payload))
          }


      default:
        return state;
  }
}

export default proyectoReducer;