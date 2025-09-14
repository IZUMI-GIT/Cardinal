import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Register } from "../components/auth/Register"
import { LogInModal } from "../components/auth/LogInModal"
import { Home } from "../components/Home"
import { DebugAuth } from "../components/auth/DebugAuth"

export const Routing = () => {

    return(
        <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LogInModal />} />
          <Route path="/check" element= {<DebugAuth />} />
        </Routes>
      </BrowserRouter>
        </>
    )
}