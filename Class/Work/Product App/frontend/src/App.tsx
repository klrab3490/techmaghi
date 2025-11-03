import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from '@/components/custom/Navbar'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/dark/theme-provider.tsx'


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
