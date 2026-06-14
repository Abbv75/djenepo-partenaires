import { Outlet } from '@tanstack/react-router'
import { Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CursorFollower } from './components/CursorFollower'

export default function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <CursorFollower />
      <Navbar />
      <Box flex={1}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

