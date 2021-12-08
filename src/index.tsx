import { ThemeProvider } from "styled-components";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { lightTheme } from "./theme";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
