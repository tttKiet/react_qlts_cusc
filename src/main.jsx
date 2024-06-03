import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SWRConfig } from "swr"; 
import axios from "./axios/customize-axios.js"; 

import { Provider } from "react-redux";
 
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NextUIProvider>
        <SWRConfig
          value={{
            fetcher: (url) =>
              axios
                .get(url)
                .then((res) => {
                  return res.data;
                })
                .catch((err) => {
                  return Promise.reject(err);
                }),
          }}
        >
          <App />
        </SWRConfig>
      </NextUIProvider>
    </PersistGate>
  </Provider>
 
import { store } from "./redux/store.js";
import { SWRConfig } from "swr";
import axios from "./axios/customize-axios.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  // </React.StrictMode>
  <NextUIProvider>
    <Provider store={store}>
      <SWRConfig value={{
        fetcher: (url) => axios.get(url).then((res) => { return res.data })
          .catch((err) => {
            return Promise.reject(err);
          }),
        // shouldRetryOnError: false,
      }}>
        <App />
      </SWRConfig>
    </Provider>
  </NextUIProvider>
 
);
