import { VStack, Icon, Text, Button } from '@chakra-ui/react'
import { FiBookOpen } from 'react-icons/fi'

interface BlogEmptyStateProps {
  searchQuery: string
  selectedCategory: string
  onReset: () => void
}

export const BlogEmptyState = ({
  searchQuery,
  selectedCategory,
  onReset,
}: BlogEmptyStateProps) => {
  const hasActiveFilters = Boolean(searchQuery || selectedCategory !== 'Toutes')

  return (
    <VStack
      py={16}
      px={6}
      spacing={4}
      bg="white"
      borderRadius="16px"
      border="1px dashed"
      borderColor="gray.200"
      textAlign="center"
      maxW="520px"
      mx="auto"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.02)"
    >
      <Icon as={FiBookOpen} boxSize={12} color="gray.300" />
      <Text fontFamily="heading" fontWeight={700} fontSize="18px" color="gray.800">
        Aucune actualité trouvée
      </Text>
      <Text fontSize="14px" color="gray.500" lineHeight={1.6}>
        {searchQuery
          ? `Aucun résultat ne correspond à "${searchQuery}".`
          : 'Aucune actualité disponible dans cette catégorie actuellement.'}
      </Text>
      {hasActiveFilters && (
        <Button
          size="sm"
          bg="brand.50"
          color="brand.600"
          border="1px solid"
          borderColor="brand.200"
          borderRadius="12px"
          _hover={{ bg: 'brand.100' }}
          onClick={onReset}
        >
          Réinitialiser les filtres
        </Button>
      )}
    </VStack>
  )
}
