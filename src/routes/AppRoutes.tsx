import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "../pages/Layout";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

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
    <Route
      path="/piechart"
      element={
        <Layout>
          <PieChart />
        </Layout>
      }
    />
  </Routes>
);

export default AppRoutes;
