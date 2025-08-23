import { useState } from 'react'
import './App.css'
import { Routing } from './routes/Routing'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <button className='border bg-sky-500 rounded-sm px-2 hover:bg-sky-700' type="button" onClick={() => setCount(c => c+1)}>Click Me! : {count}</button>
      </div>
      <Routing />
    </>
  )
}

export default App
