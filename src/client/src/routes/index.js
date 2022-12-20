import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../pages/Product.js";
import Home from "../pages/Home.js";
import Payment from "../pages/Payment.js";
import Login from "../pages/Login.js";
import Layout from "../pages/Layout.js";

export default function MyRouter() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/product/:id" element={<Product />} />
      </Routes>
    </Layout>
  );
}
