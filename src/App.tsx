import {  Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserForm from "./pages/form"
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/form" element={<UserForm />} /> */}
      </Routes>
    </>
  )
}