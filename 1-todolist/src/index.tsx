import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppWithReducer from "./AppWithReducers";
import { store } from "./model/store";
import { Provider } from "react-redux";
import AppWithRedux from "./AppWithRedux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App />
    <AppWithReducer /> */}
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
