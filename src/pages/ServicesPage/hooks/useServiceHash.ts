import { useEffect } from 'react'
import { useRouterState } from '@tanstack/react-router'

export const useServiceHash = () => {
  const routerState = useRouterState()
  const hash = routerState.location.hash

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        // Small delay to ensure everything is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [hash])
}

