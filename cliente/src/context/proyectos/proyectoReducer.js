import {type} from '../../types/index';

const {uiShowHideFormProyecto , eventLoadProyectos, addNewProyect, showProyectSelect, deleteProyect} = type;


const proyectoReducer = (state , action) => {

  switch (action.type) {

    case uiShowHideFormProyecto:
      return {
        ...state,
        formulario: !state.formulario
      }
      
    
      case eventLoadProyectos:
        return {
          ...state,
          proyectos: action.payload
        }

      
        case showProyectSelect :
        
          return {
            ...state,
            proyectSelect: state.proyectos.filter(proyect => (proyect.id === action.payload))
          }
        
        case deleteProyect:
          return {
            ...state,
            proyectos: state.proyectos.filter(proyect => (proyect.id !== action.payload)),
            proyectSelect: []
          }


      default:
        return state;
  }
}

export default proyectoReducer;