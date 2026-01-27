import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ✅ Import Redux Provider and store
import { Provider } from 'react-redux'
import { store } from './redux/store.js'  // make sure path is correct

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>   {/* Wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>,
)
