import {useState, React} from 'react';
import { Link } from 'react-router-dom'

const NuevaCuenta = () => {

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: ""
  });

  const {nombre , email , password , confirmar} = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }

  const enviarForm = (e) => {
    e.preventDefault();

    console.log("enviando");

    if(nombre === "" ||email === "" || password === "" || confirmar === ""){
      console.log("campos vacios");
      
      return;
    }

    if(password !== confirmar){
      console.log("Contraseñas no coinsiden");
      return;
  }

    console.log("consultando...");
  }


  return ( 
    
    <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h1>Registrate</h1>
          <form onSubmit={enviarForm}>
                <div className="campo-form">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre"
                        onChange={onChange}
                    />
                </div>

                <div className="campo-form">
                    <label htmlFor="email">Correo</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Correo"
                        onChange={onChange}
                    />
                </div>

                <div className="campo-form">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={onChange}
                    />
                </div>

                <div className="campo-form">
                    <label htmlFor="confirmar"></label>
                    <input 
                        type="password"
                        id="confirmar"
                        name="confirmar"
                        placeholder="Confirmar Contraseña"
                        onChange={onChange}
                    />
                </div>

                  <div className="campo-form">
                      <input type="submit" className="btn btn-primario btn-block" value="Registrar"/>
                  </div>
          </form>
            <Link to={'/'} className="enlace-cuenta">
                Iniciar Sesión!
            </Link>
        </div>
    </div>
   );
}
 
export default NuevaCuenta;