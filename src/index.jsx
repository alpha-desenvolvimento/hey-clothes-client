import React from "react";
import ReactDOM from "react-dom";
import WebFont from 'webfontloader'

import App from './App'

const rootEl = document.getElementById("root");

WebFont.load({
  google: {
    families: [
      "Raleway:300,400,500,700",
      "Roboto:300,400,500,700"
    ]
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootEl
);
