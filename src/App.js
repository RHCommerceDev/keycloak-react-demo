import React from 'react';
import logo from './logo.svg';
import keycloaklogo from './keycloak.png';
import love from './heart.png';
import axios from 'axios';

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

initSession () {
  // curl -v -X POST -H "content-type: application/json" -H "user-agent: (iPhone; CPU rh-mobile-internal-only OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1" -d '{"operationName":"SessionConf","variables":{},"query":"query SessionConf {  sessionConf {    sessionConfirmation    sessionId  }}"}' https://stg4-www.restorationhardware.com/rh-experience-layer-v1/graphql
  axios.post('https://stg4-www.restorationhardware.com/rh-experience-layer-v1/graphql',
  {
    headers: {'content-type': 'application/json', 'user-agent': '(iPhone; CPU rh-mobile-internal-only OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'},
    data: {
      operationName: 'SessionConf',
      variables: {},
      query: 'query SessionConf {  sessionConf {    sessionConfirmation    sessionId  }}'
    }
  })
  .then(response => console.log(response))
}

//export default withCookies(App);
export default App;
