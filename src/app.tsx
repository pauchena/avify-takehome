import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export { App };
