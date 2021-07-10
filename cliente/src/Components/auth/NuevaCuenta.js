import {useState, React, useContext, useEffect} from 'react';
import { Link} from 'react-router-dom';

import {authContext} from './authContext/authProvider';
import {auth} from '../../firebase';


const NuevaCuenta = ({history}) => {

  const {userAuth} = useContext(authContext);

  useEffect(() => {
    if(userAuth){
      console.log("cambio2");
      history.push("/proyectos");
    }
    
  }, [userAuth, history]);

  const [user, setUser] = useState({
    nombre: "Edinson Figueroa",
    email: "edinjson@gmail.com",
    password: "123456",
    confirmar: "123456"
  });

  const {nombre , email , password , confirmar} = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }

  const enviarForm =  (e) => {
    e.preventDefault();

    if(nombre === "" ||email === "" || password === "" || confirmar === ""){
      console.log("campos vacios");    
      return;
    }

    if(password !== confirmar){
      console.log("Contraseñas no coinsiden");
      return;
  }


   auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {          
            //sesion init
        })
        .catch((error) => {
          
        /* const errorCode = error.code;
        const errorMessage = error.message; */
        console.log(error);

      });
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
                        value={nombre}
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
                        value={email}
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
                        value={password}
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
                        value={confirmar}
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