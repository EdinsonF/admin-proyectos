import React, { useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {


  const {proyectSelect} = useContext(proyectoContext);
  const {tareasProyecto} = useContext(tareaContext);



  if(proyectSelect.length === 0) return <h2>Selecciona un Proyecto</h2>;

 
  const [proyecto] = proyectSelect;
 
  return (  
    <> 
          
              <h2>{proyecto.nombre}</h2>
                            
          <ul className="listado-tareas">
              { tareasProyecto.length === 0 
                  ? 
                    (<li className="tarea"><p>No hay tareas</p></li>)
                  :  
                  tareasProyecto.map(tarea => (
                      <li key={tarea.id} className="tarea sombra">
                        <p>{tarea.nombre}</p>

                        <div className="estado">
                          {tarea.estado
                            ?
                              (
                                <button 
                                  type="button" 
                                  className="completo">
                                    Completa
                                </button>
                              )
                            :     
                              (
                                <button 
                                  type="button" 
                                  className="incompleto">
                                    En Proceso
                                </button>
                              )
                          }
                          </div>
                          <div className="acciones">
                              <button 
                                type="button" 
                                className="btn btn-primario">
                                  Editar
                              </button>

                              <button 
                                type="button" 
                                className="btn btn-secundario">
                                  Eliminar
                              </button>

                          </div>
                      </li>
                    ))
                }
            </ul>
            <button type="button" className="btn btn-eliminar">
              Eliminar Proyecto
            </button>
    </>
    
  );
}
 
export default ListadoTareas;