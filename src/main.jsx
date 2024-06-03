import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
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
