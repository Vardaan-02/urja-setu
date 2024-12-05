import {  Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Marketplace from "./pages/marketplace/page"

import Dashboard from "./pages/dashboard/page"
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/form" element={<UserForm />} /> */}
        <Route path="/marketplace" element={<Marketplace />}>
          <Route path="/marketplace/" element={<Marketplace />} />
          <Route path="/marketplace/category/:category" element={<Marketplace />} />
          <Route path="/marketplace/category/:category/page/:page" element={<Marketplace />} />
        </Route>
        <Route path="dashboard" element={<Dashboard/>} />
      </Routes>
    </>
  )
}