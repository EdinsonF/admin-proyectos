import {useState, React} from 'react';
import { Link } from 'react-router-dom'

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });


  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }

  const enviarForm = (e) => {
    e.preventDefault();

    console.log("enviando");

    if(user.email === "" || user.password === ""){
      console.log("campos vacios");
      return;
    }

    console.log("consultando");
  }


  return ( 
    
    <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h1>Iniciar Sesión</h1>
          <form onSubmit={enviarForm}>
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
                  <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión"/>
              </div>
          </form>
            <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                Registrate!
            </Link>
        </div>
    </div>
   );
}
 
export default Login;