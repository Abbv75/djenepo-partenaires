import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import RealisationsPage from './pages/RealisationsPage'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <ScrollToTop />
      <Navbar />
      <Box flex={1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/realisations" element={<RealisationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}
