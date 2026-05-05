import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useServiceHash = () => {
  const { hash } = useLocation()

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
