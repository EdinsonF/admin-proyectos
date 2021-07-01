import React, {useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoProyectos = () => {

  const {proyectos, showProyectSelectFn} = useContext(proyectoContext);

  const { showTaskListFn, handleNameTaksFn,cambiarEditarFn } = useContext(tareaContext);


  const selectProyect = (id) => {
    showProyectSelectFn(id);
    showTaskListFn(id);
    cambiarEditarFn(false);
    handleNameTaksFn({
      nombre: ""
    })
  }
 
  return ( 
      <ul className="listado-proyectos">
          { proyectos.length > 0 ?
            proyectos.map(proyecto => (
                <li  key={proyecto.id} onClick={() => {selectProyect(proyecto.id)}}>
                    <button type="button" className="btn btn-blank resaltarProyect">
                      {proyecto.nombre}
                    </button>
                </li>
                ))
                
                :  <span>No hay proyactos, agrega uno...</span>
          }
      </ul>
   );
}
 
export default ListadoProyectos;