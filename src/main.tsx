import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import './theme.css'
import AppRoutes from './App'
import store from './store'
import { ToasterProvider } from './components/common/ToasterContext'
import ErrorBoundary from './components/error/ErrorBoundary'
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById('root')!).render(
  <ToasterProvider>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
           <Toaster position="top-right" />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </ToasterProvider>
)
