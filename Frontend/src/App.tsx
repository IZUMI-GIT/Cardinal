import { lazy, Suspense, useState } from 'react'
import './App.css'
import Spinner from './features/Spinner'

const Routing = lazy(() => import('./routes/Routing'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        <button className='border bg-sky-500 rounded-lg px-2 hover:bg-sky-700' type="button" onClick={() => setCount(c => c+1)}>Click Me! : {count}</button>
      </div>
      <Suspense fallback={<Spinner />}>
        <Routing />
      </Suspense>
    </div>
  )
}

export default App