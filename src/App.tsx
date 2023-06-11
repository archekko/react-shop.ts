import React from "react";
import "./scss/app.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import NotFounded from "./pages/NotFounded";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Main from "./layouts/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<Product />} />
        <Route path="*" element={<NotFounded />} />
      </Route>
    </Routes>
  );
}

export default App;
