import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/app' element={<App/>} />
      </Routes>
    </Router>
  </React.StrictMode>
)
