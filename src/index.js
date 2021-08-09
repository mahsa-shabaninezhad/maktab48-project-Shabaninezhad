import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Theme from './assets/material_ui/Theme';
import RTL from './assets/material_ui/RTL';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { BasketProvider } from './context/BasketContext/BasketContext.jsx';
import { PaymentProvider } from './context/paymentContext/PaymentContext';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PaymentProvider>
        <BasketProvider>
          <Router>
            <Theme>
              <RTL>
                <App />
              </RTL>
            </Theme>
          </Router>
        </BasketProvider>
      </PaymentProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
