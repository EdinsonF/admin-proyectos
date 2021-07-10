import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/auth/Login';
import NuevaCuenta from './Components/auth/NuevaCuenta';
import Proyectos from './Components/proyectos/Proyectos';
import AuthProvider from './Components/auth/authContext/authProvider';
import AuthRoutePrivate from './Components/auth/AuthRoutePrivate';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';


function App() {

  return (
      <AuthProvider>
            <TareaState>
              <ProyectoState>
                <Router>
                  <Switch>
                  
                    <Route exact path="/" component={Login} />
                    <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                    <AuthRoutePrivate exact path="/proyectos" component={Proyectos} />
                  
                  </Switch>

                </Router>
              </ProyectoState>
            </TareaState>
      </AuthProvider>
  );
}

export default App;
