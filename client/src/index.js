import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthenticatedContextProvider} from './Contexts/AuthenticatedContext'

ReactDOM.render(
  <AuthenticatedContextProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </AuthenticatedContextProvider>,
  document.getElementById('root')
);

