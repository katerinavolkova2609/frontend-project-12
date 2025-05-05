import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import store from './store/index.js';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
