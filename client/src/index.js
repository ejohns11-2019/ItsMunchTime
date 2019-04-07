import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';
import 'semantic-ui-css/semantic.min.css';
import { initMiddleware, } from 'devise-axios';
import RestaurantProvider from "./providers/RestaurantProvider";

initMiddleware();

ReactDOM.render(
  <AuthProvider>
  <RestaurantProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RestaurantProvider>
  </AuthProvider>,
  document.getElementById('root')
);
