import {useState, useContext,useEffect} from 'react';

import { Link} from 'react-router-dom';

import {auth} from '../../firebase';

import {authContext} from './authContext/authProvider';

const Login = ({history}) => {

  const {userAuth} = useContext(authContext);

  useEffect(() => {
    if(userAuth){
      console.log("cambio1");
      history.push("/proyectos");
    }
    
  }, [userAuth, history]);


  const [user, setUser] = useState({
    email: "edinjson@gmail.com",
    password: "123456"
  });

  const {email , password} = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }

  const enviarForm = async (e) => {
    e.preventDefault();


    if(user.email === "" || user.password === ""){
      console.log("campos vacios");
      return;
    }

     auth.signInWithEmailAndPassword(email, password)
      .then((userCredential)  => {

     })
       .catch((error) => {
          console.log(error);
        /* var errorCode = error.code;
        var errorMessage = error.message; */
      });
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
                    value={email}
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
                    value={password}
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