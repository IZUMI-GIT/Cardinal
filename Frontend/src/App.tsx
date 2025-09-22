import { Suspense } from 'react'
import './App.css'
import Spinner from './features/Spinner'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useMeQuery, useRefreshMutation } from "./api/apiSlice"
import { clearAuth, setAuthStatus, setAuthUser } from "./components/auth/authSlice"
import { WrapperRoute } from "./routes/WrapperRoute"
import { Board } from "./components/boards/Board"
import { Home } from "./components/Home"
import { Register } from "./components/auth/Register"
import { LogInModal } from "./components/auth/LogInModal"

function App() {
  const {
    data: user,
    isSuccess,
    isError,
    error
  } = useMeQuery();

  if(isSuccess){

    setAuthUser({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    });

    setAuthStatus("authenticated");

    return (
      <BrowserRouter>
      <Routes>
        <Route element={<WrapperRoute />} >
          <Route path="/boards" element={<Board />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    )
  }else if(isError && (error as FetchBaseQueryError).status === 401){
    
    const refresh = useRefreshMutation;
    useEffect(() => {refresh()}, []);

    const {
      data: user,
      isSuccess
    } = useMeQuery();

    if(isSuccess){

      setAuthUser({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      });

      setAuthStatus("authenticated");

      return (
        <BrowserRouter>
        <Routes>
          <Route element={<WrapperRoute />} >
            <Route path="/boards" element={<Board />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
        </BrowserRouter>
      )
    }else{
      clearAuth();
      setAuthStatus("unauthenticated")

      return(
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      )
    }
  }

}


export default App


