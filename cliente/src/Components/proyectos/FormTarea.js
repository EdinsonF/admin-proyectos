import React, { useCallback, useContext, useEffect, useState} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

  const {proyectSelect} = useContext(proyectoContext);

  const {
          addTaskNewFn, showTaskListFn, mensajeError,showMessageFn,             handleNameTaksFn, nombreTask, formUpdating, updateTaskFn, cambiarEditarFn
        }  = useContext(tareaContext);


  const {id,nombre,estado,id_proyecto} = nombreTask;

  const [infoUpdate, setInfoUpdate] = useState({})
  
  const llenarStateEdit = useCallback(() => {
    if(nombreTask?.id){
      setInfoUpdate({
        id:id,
        estado:estado,
        id_proyecto:id_proyecto
      });
    }
    
  },[id,estado,id_proyecto, nombreTask])

  
  useEffect(() => {
   
    if(formUpdating){
      console.log("entro");
      llenarStateEdit();
      }

  }, [formUpdating, llenarStateEdit])
 
  

  if(proyectSelect.length === 0) return null;

  const [proyecto] = proyectSelect;

  const handleInput = (e) => {
    handleNameTaksFn({
      [e.target.name]: e.target.value
    })
  }

  const enviarTarea = (e) => {
    e.preventDefault();
    if(nombreTask.nombre === ""){
      showMessageFn();
      return
    }

    if(formUpdating){
      //editar
      infoUpdate.nombre = nombre;
      
      updateTaskFn(infoUpdate);
      
    }else{
      //registrar
      nombreTask.id_proyecto= proyecto.id;
      nombreTask.estado=false;

      addTaskNewFn(nombreTask);
 
    }
    showTaskListFn(proyecto.id);
    cambiarEditarFn(false);
    handleNameTaksFn({
      nombre: ""
    })
   
  }


  return ( 

      <div className="formulario" onSubmit={enviarTarea}>
        <form>
          <div className="contenedor-input">
            <input
                type="text"
                className="input-text"
                placeholder="Nombre Tarea"
                name="nombre"
                value={nombre}
                onChange= {handleInput}

            />
          </div>
          <div className="contenedor-input">
            <input 
                type="submit" 
                className="btn btn-primario btn-submit btn-block"
                value={ formUpdating ? "Actualizar Tarea" : "Registrar Tarea"}
            />
          </div>
          
        </form>
        { mensajeError 
                      &&
            <p className="mensaje error">El nombre de la tarea es obligatorio</p>
        }
      </div>
   );
}
 
export default FormTarea;