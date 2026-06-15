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
import BlogPage from './pages/BlogPage'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './layouts/DashboardLayout'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage'
import AdminBlogsPage from './pages/admin/AdminBlogsPage'
import AdminServicesPage from './pages/admin/AdminServicesPage'

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

export const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogPage,
})

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

export const adminRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: DashboardLayout,
})

export const adminIndexRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/',
  component: AdminHomePage,
})

export const adminCategoriesRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/categories',
  component: AdminCategoriesPage,
})

export const adminBlogsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/blogs',
  component: AdminBlogsPage,
})

export const adminServicesRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/services',
  component: AdminServicesPage,
})

// Register all routes into a route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  servicesRoute,
  contactRoute,
  realisationsRoute,
  blogRoute,
  loginRoute,
  adminRootRoute.addChildren([
    adminIndexRoute,
    adminCategoriesRoute,
    adminBlogsRoute,
    adminServicesRoute,
  ]),
])

// Create and export the router instance
export const router = createRouter({ routeTree })
