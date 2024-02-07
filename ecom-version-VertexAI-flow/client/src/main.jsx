import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './store/user.jsx'
import { Toaster } from "@/components/ui/toaster"
ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
    <Toaster />
  </UserProvider>
)
