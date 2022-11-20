import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Product from "../pages/Product.js";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";

export default function MyRouter() {
  return (
    <div>
      <h1>This is a simple navigation</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/product/ao">Product: Áo</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/product/:id" element={<Product />} />
      </Routes>
    </div>
  );
}
