import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Theme from './assets/material_ui/Theme';
import RTL from './assets/material_ui/RTL';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Theme>
        <RTL>
          <App />
        </RTL>
      </Theme>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
