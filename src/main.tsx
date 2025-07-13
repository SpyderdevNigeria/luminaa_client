// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import './theme.css'
import App from './App'
import store from './store'
import { ToasterProvider } from './components/common/ToasterContext'
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
     <ToasterProvider>
        <Provider store={store}>
          <RouterProvider router={App}/>
        </Provider>
     </ToasterProvider>
)
