// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Register from "../components/auth/Register"
// import LogInModal from "../components/auth/LogInModal"
// import Home from "../components/Home"
// import { WrapperRoute } from "./WrapperRoute"
// import Board from "../components/boards/Board"
// import { useMeQuery, useRefreshMutation } from "../api/apiSlice"
// // import Spinner from "../features/Spinner"
// import { clearAuth, setAuthStatus, setAuthUser } from "../components/auth/authSlice"
// import { useEffect } from "react"
// import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"

// const Routing = () => {
  
//   const {
//     data: user,
//     isSuccess,
//     isError,
//     error
//   } = useMeQuery();

//   if(isSuccess){

//     setAuthUser({
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       role: user.role
//     });

//     setAuthStatus("authenticated");

//   }else if(isError && (error as FetchBaseQueryError).status === 401){
    
//     const refresh = useRefreshMutation;
//     useEffect(() => {refresh()}, []);

//     const {
//       data: user,
//       isSuccess
//     } = useMeQuery();

//     if(isSuccess){

//       setAuthUser({
//         id: user.id,
//         email: user.email,
//         username: user.username,
//         role: user.role
//       });

//       setAuthStatus("authenticated");
//     }else{
//       clearAuth();
//       setAuthStatus("unauthenticated")
//     }
//   }

//   return(
//       <>
//       <BrowserRouter>
//       <Routes>
//         <Route element={<WrapperRoute />} >
//           <Route path="/boards" element={<Board />} />
//         </Route>
//         <Route path="/" element={<Home />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/login' element={<LogInModal />} />
//       </Routes>
//     </BrowserRouter>
//       </>
//   )
// }

// export default Routing;