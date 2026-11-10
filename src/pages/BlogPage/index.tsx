import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  useDisclosure,
} from '@chakra-ui/react'
import { useBlogs } from '../../api/useBlogsQuery'
import type { BlogPost } from '../../types'
import { useBlogFilters } from './hooks/useBlogFilters'
import { BlogHero } from './components/BlogHero'
import { BlogFilters } from './components/BlogFilters'
import { BlogBentoGrid } from './components/BlogBentoGrid'
import { BlogEmptyState } from './components/BlogEmptyState'
import { BlogNewsletterCTA } from './components/BlogNewsletterCTA'
import { BlogDetailModal } from './components/BlogDetailModal'

export default function BlogPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const { data: posts = [], isLoading, isError } = useBlogs()

  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    categoriesWithCount,
    filteredPosts,
    resetFilters,
    clearSearch,
  } = useBlogFilters(posts)

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
    onOpen()
  }

  if (isLoading) {
    return (
      <Box
        pt="72px"
        minH="calc(100vh - 72px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="#fafbfc"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="3px" speed="0.75s" />
          <Text fontSize="14px" color="gray.500" fontWeight={500}>
            Chargement des actualités...
          </Text>
        </VStack>
      </Box>
    )
  }

  if (isError) {
    return (
      <Box pt="72px" p={8} bg="#fafbfc" minH="100vh">
        <Container maxW="800px">
          <Alert status="error" borderRadius="16px" p={6}>
            <AlertIcon />
            <Box>
              <Text fontWeight={700}>Erreur de connexion</Text>
              <Text fontSize="14px" color="gray.700">
                Impossible de charger les articles pour le moment. Veuillez vérifier votre connexion ou réessayer plus tard.
              </Text>
            </Box>
          </Alert>
        </Container>
      </Box>
    )
  }

  return (
    <Box pt="72px" bg="#fafbfc" minH="100vh">
      {/* Hero avec recherche et métriques */}
      <BlogHero
        postsCount={posts.length}
        categoriesCount={
          categoriesWithCount.length > 1
            ? categoriesWithCount.length - 1
            : categoriesWithCount.length
        }
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={clearSearch}
      />

      {/* Grille Bento & Filtres */}
      <Box py={{ base: 10, md: 16 }}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <BlogFilters
            categories={categoriesWithCount}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {filteredPosts.length === 0 ? (
            <BlogEmptyState
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onReset={resetFilters}
            />
          ) : (
            <BlogBentoGrid
              posts={filteredPosts}
              onPostClick={handlePostClick}
            />
          )}
        </Container>
      </Box>

      {/* Section Newsletter & Veille */}
      <BlogNewsletterCTA />

      {/* Modal de lecture complète */}
      <BlogDetailModal
        isOpen={isOpen}
        onClose={onClose}
        post={selectedPost}
      />
    </Box>
  )
}
