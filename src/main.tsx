import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import './theme.css'
import AppRoutes from './App'
import store from './store'
import { ToasterProvider } from './components/common/ToasterContext'
import ErrorBoundary from './components/error/ErrorBoundary'
createRoot(document.getElementById('root')!).render(
  <ToasterProvider>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </ToasterProvider>
)
