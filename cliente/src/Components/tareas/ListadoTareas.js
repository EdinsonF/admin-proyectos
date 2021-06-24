import React, { useContext, useState } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

  const ListadoTareas = () => {

  const [mensajeDellTask, setMensajeDellTask] = useState(false);
  const [msjDellProyect, setMsjDellProyect] = useState(false);

  

  const {proyectSelect,deleteProyectFn} = useContext(proyectoContext);

  const {
      tareasProyecto, deleteTaskFn, showTaskListFn,ChangeStatusFn, handleNameTaksFn, cambiarEditarFn,deleteAllTaskFn
    } = useContext(tareaContext);


  if(proyectSelect.length === 0) return <h2>Selecciona un Proyecto</h2>;

    const [proyecto] = proyectSelect;

    const eleiminarProyect = () =>{

      if(tareasProyecto.length !== 0){
        const taskFalse = tareasProyecto.filter(task => (task.estado === false ));

        if(taskFalse.length > 0){
          setMsjDellProyect(true);
          setTimeout(() => {
          setMsjDellProyect(false);
          },2000)
          return;
        }   
      }
      
      if(tareasProyecto.length !== 0){
        deleteAllTaskFn(proyecto.id);
      }
        deleteProyectFn(proyecto.id);
    }

  
  const deleteTask = ({estado, id}) => {

    if(estado === false){
      setMensajeDellTask(true);
      setTimeout(() => {
        setMensajeDellTask(false);
      }, 2000)
      return;
    }
    deleteTaskFn(id);
    resetForm();
  }


  const changeStatus = (tarea) =>{

    ChangeStatusFn(tarea, !tarea.estado);
    showTaskListFn(proyecto.id);
 
  }

  const selectTask = (task) => {

    cambiarEditarFn(true);
    handleNameTaksFn(task); 

  }

  const resetForm = () => {

    showTaskListFn(proyecto.id);
    cambiarEditarFn(false);
    handleNameTaksFn({
      nombre: ""
    })

  }
 
  return (  
    <> 
          <h2>{proyecto.nombre}</h2>
          { mensajeDellTask && <p className="mensaje error">Una tarea incompleta no se puede eliminar</p> }
              
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
                                  className="completo"
                                  onClick={() => {changeStatus(tarea)}}
                                >
                                    Completa
                                </button>
                              )
                            :     
                              (
                                <button 
                                  type="button" 
                                  className="incompleto"
                                  onClick={() => {changeStatus(tarea)}}
                                  >
                                    Pendiente
                                </button>
                              )
                          }
                          </div>
                          <div className="acciones">
                              <button 
                                type="button" 
                                className="btn btn-primario"
                                onClick={() => {selectTask(tarea)}}  
                              >
                                  Editar
                              </button>

                              <button 
                                type="button" 
                                className="btn btn-secundario" onClick={() => {deleteTask(tarea)}}>
                                  Eliminar
                              </button>

                          </div>
                      </li>
                    ))
                }
            </ul>
            { msjDellProyect &&
                      <p className="mensaje error">El Proyecto aun tiene tareas Pendiente</p>
            }
            
            <button type="button" className="btn btn-eliminar" onClick={() => eleiminarProyect()}>
              Eliminar Proyecto
            </button>
    </>
    
  );
}
 
export default ListadoTareas;