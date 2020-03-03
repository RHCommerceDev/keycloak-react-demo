import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Keycloak from 'keycloak-js';
import axios from 'axios';

//window.onload = initSession();

//keycloak init options
let initOptions = {
    //url:  'https://auth.rhapsody.restorationhardware.com/auth',
    //url:  'https://auth.rhapsodynonprod.restorationhardware.com/auth',
    url:  'https://keycloak.internal.rhapsodysandbox3.net/auth',
    realm: 'development',
    clientId: 'react-test-app',
    //clientId: 'concierge-app',
    //clientId: 'rh-mobile-frontend',
    onLoad: 'login-required',
    //pkceMethod: 'S256',
    //promiseType: 'native'
}

let keycloak = Keycloak(initOptions);

//keycloak.init({ onLoad: initOptions.onLoad, pkceMethod: 'S256' }).success((auth) => {
keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {

    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    //React Render
    ReactDOM.render(<App />, document.getElementById('root'));

    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);

    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });


    }, 60000)
  }).error(() => {
      console.error("Authenticated Failed");
});

function initSession () {
  console.log("Initializing ATG session");
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


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
