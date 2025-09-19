// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import './components/auth/test.ts'; // path to the file with your dispatch/logs
import { store } from './app/store.ts'
import { Provider } from "react-redux"


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>,
)
