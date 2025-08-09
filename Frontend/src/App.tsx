import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h3>Hello World</h3>
        <button onClick={() => setCount(c=>c+1)}>Count: {count}</button>
      </div>
    </>
  )
}

export default App
