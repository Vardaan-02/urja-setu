import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/marketplace/page";
import Events from "./pages/events/page";
import Login from "./pages/login";
import About from "./pages/about";
import Dashboard from "./pages/dashboard/page";
import OrderDetails from "./pages/order-details/page";

import Cart from "./pages/cart/cart";
import ParentProductPage from "./pages/product/page";
import BuyGarbage from "./pages/buy-garbage/page.tsx";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/marketplace" element={<Marketplace />}>
          <Route path="/marketplace/" element={<Marketplace />} />
          <Route
            path="/marketplace/category/:category"
            element={<Marketplace />}
          />
          <Route
            path="/marketplace/category/:category/page/:page"
            element={<Marketplace />}
          />
        </Route>
        <Route path="/product/:id" element={<ParentProductPage />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="role" element={<Role/>} /> */}
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy-garbage" element={<BuyGarbage />} />
      </Routes>
    </>
  );
}
