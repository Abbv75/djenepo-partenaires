import { useState, useMemo } from 'react'
import type { BlogPost } from '../../../types'

export interface CategoryCount {
  name: string
  count: number
}

export function useBlogFilters(posts: BlogPost[]) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Décompte automatique par catégorie
  const categoriesWithCount = useMemo<CategoryCount[]>(() => {
    const counts: Record<string, number> = {}

    posts.forEach((post) => {
      const cat = post.category?.name?.trim()
      if (cat) {
        counts[cat] = (counts[cat] || 0) + 1
      }
    })

    const list = Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }))

    return [
      { name: 'Toutes', count: posts.length },
      ...list.sort((a, b) => b.count - a.count),
    ]
  }, [posts])

  // Filtrage combiné catégorie + recherche
  const filteredPosts = useMemo<BlogPost[]>(() => {
    const query = searchQuery.toLowerCase().trim()

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'Toutes' ||
        post.category?.name?.trim() === selectedCategory

      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author_name.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [posts, selectedCategory, searchQuery])

  const resetFilters = () => {
    setSelectedCategory('Toutes')
    setSearchQuery('')
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    categoriesWithCount,
    filteredPosts,
    resetFilters,
    clearSearch,
  }
}
