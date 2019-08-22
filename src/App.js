import React from 'react';
import logo from './logo.svg';
import keycloaklogo from './keycloak.png';
import love from './heart.png';

import './App.css';
//import { withCookies } from 'react-cookie';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Welcome to your Secure React App with Keycloak</h1>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <img src={love} className="Love-logo" alt="heart" />
        <img src={keycloaklogo} className="Keycloak-logo" alt="keycloaklogo" />
        </div>
       
        <a
          className="App-link"
          href="https://medium.com/keycloak"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Keycloak
        </a>
        <a
          className="App-link"
          href="https://keycloak.internal.rhapsodynonprod.com/auth/realms/development/account"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit Profile
        </a>
        <a
          className="App-link"
          href="https://keycloak.internal.rhapsodynonprod.com/auth/realms/development/protocol/openid-connect/logout?redirect_uri=https://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
        >
          Logout
        </a>
      </header>
    </div>
  );
}

//export default withCookies(App);
export default App;
