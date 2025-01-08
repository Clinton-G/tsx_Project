import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import authConfig from './auth_config.json';

ReactDOM.render(
  <Auth0Provider
    domain={authConfig.domain}
    clientId={authConfig.clientId}
    authorizationParams={{ redirect_uri: authConfig.redirectUri }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
