import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Register } from "../auth/Register"
import { LogIn } from "../auth/LogIn"
import { Home } from "../components/Home"

export const Routing = () => {

    return(
        <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LogIn />} />
        </Routes>
      </BrowserRouter>
        </>
    )
}