import { lazy, Suspense } from 'react'
import './App.css'
import Spinner from './features/Spinner'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { useMeQuery, useRefreshMutation } from "./api/apiSlice"
import { clearAuth, setAuthStatus, setAuthUser } from "./components/auth/authSlice"
import { WrapperRoute } from "./routes/WrapperRoute"
const Home = lazy(() => import('./components/Home'))
const Board = lazy(() => import('./components/boards/Board'))
const Register = lazy(() => import('./components/auth/Register'))
const LoginModal = lazy(() =>  import('./components/auth/LogInModal'))
import { useAppDispatch } from './app/hooks'


function App() {

  const dispatch = useAppDispatch();

  const {
    data: me,
    isSuccess : meSucces,
    isError : meError,
    error: meErrorObj,
    refetch
  } = useMeQuery();

  const [refresh] = useRefreshMutation();

  // const [refresh, {isLoading: isRefreshing}] = useRefreshMutation();

  useEffect(() => {
    if( me && meSucces){
      dispatch(setAuthUser({
        id: me.id,
        email: me.email,
        username: me.username,
        role: me.role || "User"
      }))

      dispatch(setAuthStatus("authenticated"))
    }
  }, [me, meSucces, dispatch])

  useEffect(() => {
    if(meError && (meErrorObj as FetchBaseQueryError).status ===  401){
      let cancelled = false;
      (async () => {
        try{
          await refresh().unwrap();
          if(!cancelled){
            await refetch();
          }
        }catch{
          if(!cancelled){
            dispatch(clearAuth())
            dispatch(setAuthStatus("unauthenticated"))
          }
        }
      })();
      return () => {cancelled = true};
    }

  },[meError, meErrorObj, refresh, refetch, dispatch])

      

  return(
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
      <Routes>
        <Route element={<WrapperRoute />} >
          <Route path="/boards" element={<Board />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LoginModal />} />
      </Routes>
      </BrowserRouter>
    </Suspense>
  )
}


export default App