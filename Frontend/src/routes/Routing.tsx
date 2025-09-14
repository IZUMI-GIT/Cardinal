import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Register } from "../components/auth/Register"
import { LogInModal } from "../components/auth/LogInModal"
import { Home } from "../components/Home"

export const Routing = () => {

    return(
        <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LogInModal />} />
        </Routes>
      </BrowserRouter>
        </>
    )
}