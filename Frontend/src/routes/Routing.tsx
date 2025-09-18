import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Register } from "../components/auth/Register"
import { LogInModal } from "../components/auth/LogInModal"
import { Home } from "../components/Home"
import { WrapperRoute } from "./WrapperRoute"
import { Board } from "../components/boards/Board"

export const Routing = () => {

    return(
        <>
        <BrowserRouter>
        <Routes>
          <Route element={<WrapperRoute />} >
            <Route path="/boards" element={<Board />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LogInModal />} />
        </Routes>
      </BrowserRouter>
        </>
    )
}