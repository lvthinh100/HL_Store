import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout.js";

import Product from "../pages/Product.js";
import Home from "../pages/Home.js";
import Payment from "../pages/Payment.js";
import Orders from "../pages/Orders.js";
import ProtectedRoute from "./ProtectedRoute.js";
import ProductsManager from "../pages/ProductsManager.js";
import AllProducts from "../pages/AllProducts.js";
import Collection from "../pages/Collection.js";
import NotFound from "../pages/NotFound.js";

export default function MyRouter() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/products/" element={<AllProducts />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route exact path="/products-manager" element={<ProductsManager />} />
        <Route exact path="/collection/:category" element={<Collection />} />
        <Route exact path="/error" element={<NotFound />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
