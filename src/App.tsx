import {  Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserForm from "./pages/form"
import Marketplace from "./pages/marketplace/page"
import Events from "./pages/events/page"

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
      </Routes>
    </>
  )
}