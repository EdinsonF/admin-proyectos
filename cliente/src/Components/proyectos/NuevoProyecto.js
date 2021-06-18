import React, {useContext, useState} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

  const {formulario, mostrarFormularioFn, addProyectoFn} = useContext(proyectoContext);


const [proyecto, setProyecto] = useState({
  nombre : ""
})

const {nombre} = proyecto;

const handleInput = (e) =>{
  setProyecto({
    ...proyecto,
    [e.target.name] : e.target.value 
  })
}

  const addProyecto = (e) => {
    e.preventDefault();
    if(nombre === ""){
      return;
    }
    addProyectoFn(proyecto);

    setProyecto({
      nombre: ""
    })
    
  }

  return ( 
      <>
          <button 
            type="button" 
            className="btn btn-block btn-primario" 
            onClick={ () => {mostrarFormularioFn()}}>
            Nuevo Proyecto
          </button>

          { formulario ? (
              <form className="formulario-nuevo-proyecto">
                <input
                      type="text"
                      className="input-text"
                      placeholder="Nombre Proyecto"
                        name="nombre"
                        value={proyecto.nombre}
                        onChange={handleInput}
                  />

                <input
                      type="submit"
                      className="btn btn-primario btn-block"
                      value="Agregar"
                      onClick={addProyecto}
                />

              </form>
          ) : null

          }

          
      </>

   );
}
 
export default NuevoProyecto;