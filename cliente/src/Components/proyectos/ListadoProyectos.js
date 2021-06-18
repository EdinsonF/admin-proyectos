import React, {useContext, useEffect} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoProyectos = () => {

  const {proyectos, cargarProyectosFn, showProyectSelectFn} = useContext(proyectoContext);

  const { showTaskListFn } = useContext(tareaContext);


  useEffect(() => {
    if(proyectos.length === 0){
      cargarProyectosFn();
    }
    
  })


  const selectProyect = (id) => {
    showProyectSelectFn(id);
    showTaskListFn(id);
  }
 
  return ( 
      <ul className="listado-proyectos">
          {proyectos.map(proyecto => (
              <li key={proyecto.id} onClick={() => {selectProyect(proyecto.id)}}>
                  <button type="button" className="btn btn-blank">
                    {proyecto.nombre}
                  </button>
              </li>
          ))}
      </ul>
   );
}
 
export default ListadoProyectos;