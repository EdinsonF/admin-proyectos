import React, { useContext, useState} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

  const {proyectSelect} = useContext(proyectoContext);
  const {addTaskNewFn, showTaskListFn}  = useContext(tareaContext);

  const [task, setTask] = useState({
    nombre: '',
  })

  const {nombre} = task;
  if(proyectSelect.length === 0) return null;

  const [proyecto] = proyectSelect;

  
  const handleInput = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    
    })
  }

  const enviarTarea = (e) => {
    e.preventDefault();
    if(nombre === ""){
      console.log("Campos vacios");
      return
    }

    task.id_proyecto= proyecto.id;
    task.estado=false;

    addTaskNewFn(task);
    showTaskListFn(proyecto.id);
    
    setTask({
      nombre:""
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
                value="Registrar Tarea"
            />
          </div>
          
        </form>
      </div>
   );
}
 
export default FormTarea;