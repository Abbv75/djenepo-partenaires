import { Outlet, useLocation } from '@tanstack/react-router'
import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CursorFollower } from './components/CursorFollower'

export default function App() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login'

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <CursorFollower />
      {!isAuthPage && <Navbar />}
      <Box flex={1}>
        <Outlet />
      </Box>
      {!isAuthPage && <Footer />}
    </Box>
  )
}

