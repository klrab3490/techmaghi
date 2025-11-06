import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from '@/components/custom/Navbar'
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from '@/context/UserContext.tsx'
import { ThemeProvider } from '@/components/dark/theme-provider.tsx'


function App() {
  return (
    <UserProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
