import React from 'react';

const ListadoProyectos = () => {

  const proyectos = [
    {nombre: "Proyecto 1"},
    {nombre: "Proyecto 2"},
    {nombre: "Proyecto 3"}
  ];
  return ( 
      <ul className="listado-proyectos">
          {proyectos.map((proyecto, index) => (
              <li key={index}>
                  <button type="button" className="btn btn-blank">
                    {proyecto.nombre}
                  </button>
              </li>
          ))}
      </ul>
   );
}
 
export default ListadoProyectos;