import { 
  createRootRoute, 
  createRoute, 
  createRouter,
} from '@tanstack/react-router'
import App from './App'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import RealisationsPage from './pages/RealisationsPage'

// Root Route which acts as our layout container
export const rootRoute = createRootRoute({
  component: App,
})

// Define individual routes
export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

export const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: ServicesPage,
})

export const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
})

export const realisationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/realisations',
  component: RealisationsPage,
})

// Register all routes into a route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  contactRoute,
  realisationsRoute,
])

// Create and export the router instance
export const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
