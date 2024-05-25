import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../pages/Layout";
import BarChart from "../components/BarChart";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Layout>
          <BarChart />
        </Layout>
      }
    />
  </Routes>
);

export default AppRoutes;
