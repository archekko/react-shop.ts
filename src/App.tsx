import React, {Suspense} from "react";
import "./scss/app.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Main from "./layouts/Main";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const NotFounded = React.lazy(() => import(/* webpackChunkName: "NotFounded" */ "./pages/NotFounded"));
const Product = React.lazy(() => import(/* webpackChunkName: "Product" */ "./pages/Product"));


function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
          }/>
        <Route path="product/:id" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Product />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<div>Loading...</div>}>
            <NotFounded />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;
