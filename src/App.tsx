import {  Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Marketplace from "./pages/marketplace/page"
import Events from "./pages/events/page"
import About from "./pages/about"
import Login from "./pages/login"
import { Dashboard } from "./pages/dashboard/page"
import Role from "./pages/role"

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/marketplace" element={<Marketplace />}>
          <Route path="/marketplace/" element={<Marketplace />} />
          <Route path="/marketplace/category/:category" element={<Marketplace />} />
          <Route path="/marketplace/category/:category/page/:page" element={<Marketplace />} />
        </Route>
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="login" element={<Login/>} />
        <Route path="role" element={<Role/>} />
      </Routes>
    </>
  )
}