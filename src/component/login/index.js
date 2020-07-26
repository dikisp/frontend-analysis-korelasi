import React, { useCallback, useContext } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import firebase from '../../config/firebase';
import { AuthContext, AuthProvider } from '../auth/Auth';

 const Login = ({history}) => {
      const handleLogin = useCallback(
        async event => {
          event.preventDefault();
          const {email, password} = event.target.elements;
          try {
            await firebase.auth()
            .signInWithEmailAndPassword(email.value, password.value);
            history.push("/");
          }catch(err) {
            alert(err)
            console.log("Terdapat Error : ", err);
          }
        }, [history]
      )

      const { currentUser } = useContext(AuthContext);

      if (currentUser) {
        return <Redirect to="/" />;
      }


        return (
            <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <Link className="navbar-brand" >Analisis Korelasi Tanah Airku</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>Login</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="auth-wrapper">
        <div className="auth-inner">

        <form onSubmit={handleLogin}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>

        </div>
      </div>
    </div>
        );
}

export default withRouter(Login);