import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { positions, Provider as AlertProvider } from "react-alert";
import store from "./app/store";
import { Provider as ReduxProvider } from "react-redux";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 4000,
  position: positions.BOTTOM_CENTER,
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <ReduxProvider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </ReduxProvider>
);
