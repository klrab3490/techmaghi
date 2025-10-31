import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from '@/components/custom/Navbar'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
