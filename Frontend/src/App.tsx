import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './auth/Register'
import { LogIn } from './auth/LogIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
