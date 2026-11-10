import { Box, HStack, Text } from '@chakra-ui/react'
import type { CategoryCount } from '../hooks/useBlogFilters'

interface BlogFiltersProps {
  categories: CategoryCount[]
  selectedCategory: string
  onSelectCategory: (name: string) => void
}

export const BlogFilters = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: BlogFiltersProps) => {
  return (
    <HStack
      wrap="wrap"
      justify="center"
      spacing={2.5}
      mb={10}
      overflowX="auto"
      py={1}
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.name
        return (
          <Box
            key={cat.name}
            as="button"
            onClick={() => onSelectCategory(cat.name)}
            px={4}
            py={2}
            borderRadius="full"
            fontSize="13px"
            fontWeight={600}
            bg={isSelected ? 'brand.600' : 'white'}
            color={isSelected ? 'white' : 'gray.700'}
            border="1px solid"
            borderColor={isSelected ? 'brand.600' : 'gray.200'}
            boxShadow={
              isSelected
                ? '0 4px 14px rgba(43, 91, 196, 0.28)'
                : '0 1px 3px rgba(0, 0, 0, 0.03)'
            }
            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
              bg: isSelected ? 'brand.700' : 'gray.50',
              borderColor: isSelected ? 'brand.700' : 'gray.300',
              transform: 'translateY(-1px)',
            }}
            display="inline-flex"
            alignItems="center"
            gap={2}
          >
            <Text>{cat.name}</Text>
            <Box
              as="span"
              px={1.5}
              py={0.5}
              borderRadius="full"
              fontSize="11px"
              fontWeight={700}
              bg={isSelected ? 'whiteAlpha.300' : 'gray.100'}
              color={isSelected ? 'white' : 'gray.600'}
            >
              {cat.count}
            </Box>
          </Box>
        )
      })}
    </HStack>
  )
}
