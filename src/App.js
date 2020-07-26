import React from 'react';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import Test from './component/stepper/index'
import Table from './component/tabel/index'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./component/login/index";
import PrivateRoute from './component/auth/PrivateRoute'
import { AuthProvider } from './component/auth/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
            <Switch>
              <PrivateRoute exact path='/' component={Table} />
              <Route path="/sign-in" component={Login} />
            </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;