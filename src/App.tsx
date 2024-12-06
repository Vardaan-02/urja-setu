import {  Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Marketplace from "./pages/marketplace/page"
import Events from "./pages/events/page"
import About from "./pages/about"
import Dashboard from "./pages/dashboard/page"
import OrderDetails from "./pages/order-details/page"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        {/* <Route path="/form" element={<UserForm />} /> */}
        <Route path="/marketplace" element={<Marketplace />}>
          <Route path="/marketplace/" element={<Marketplace />} />
          <Route path="/marketplace/category/:category" element={<Marketplace />} />
          <Route path="/marketplace/category/:category/page/:page" element={<Marketplace />} />
        </Route>
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </>
  )
}