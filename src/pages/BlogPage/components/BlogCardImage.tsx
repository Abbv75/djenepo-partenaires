import { Box, Image, HStack, Badge, Text, Icon } from '@chakra-ui/react'
import { FiStar } from 'react-icons/fi'
import { resolveImageUrl } from '../../../utils/imageUrl'

interface BlogCardImageProps {
  imageUrl: string
  title: string
  categoryName?: string
  isHero: boolean
  isTall: boolean
  isWide: boolean
}

export const BlogCardImage = ({
  imageUrl,
  title,
  categoryName,
  isHero,
  isTall,
  isWide,
}: BlogCardImageProps) => {
  return (
    <Box
      position="relative"
      w={
        isHero
          ? { base: 'full', md: '50%' }
          : isWide
          ? { base: 'full', md: '44%' }
          : 'full'
      }
      h={
        isHero
          ? { base: '240px', md: 'auto' }
          : isTall
          ? '250px'
          : isWide
          ? { base: '220px', md: 'auto' }
          : '200px'
      }
      minH={
        isHero ? { md: '320px' } : isWide ? { md: '230px' } : undefined
      }
      overflow="hidden"
      bg="gray.100"
      flexShrink={0}
    >
      <Image
        src={resolveImageUrl(imageUrl)}
        alt={title}
        w="full"
        h="full"
        objectFit="cover"
        transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        _groupHover={{ transform: 'scale(1.06)' }}
      />

      {/* Badges sur l'image */}
      <HStack
        position="absolute"
        top={3.5}
        left={3.5}
        spacing={2}
        wrap="wrap"
        zIndex={2}
      >
        {categoryName && (
          <Badge
            bg="white"
            color="brand.700"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="11px"
            fontWeight={700}
            boxShadow="0 2px 8px rgba(0, 0, 0, 0.12)"
          >
            {categoryName}
          </Badge>
        )}
        {isHero && (
          <Badge
            bg="gold.500"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="11px"
            fontWeight={700}
            boxShadow="0 2px 8px rgba(200, 134, 26, 0.3)"
            display="inline-flex"
            alignItems="center"
            gap={1}
          >
            <Icon as={FiStar} />
            <Text>À la une</Text>
          </Badge>
        )}
      </HStack>
    </Box>
  )
}
