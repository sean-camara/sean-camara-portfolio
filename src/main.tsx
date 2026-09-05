import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./editorial.css";

const root = document.getElementById("root")!;
const application = (
  <React.StrictMode>
    <App path={window.location.pathname} />
  </React.StrictMode>
);
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, application);
else ReactDOM.createRoot(root).render(application);
