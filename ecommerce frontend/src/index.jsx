import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 4000,
  position: positions.BOTTOM_CENTER,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider template={AlertTemplate} {...options}>

    <App />
    </Provider>
  </React.StrictMode>,
)
