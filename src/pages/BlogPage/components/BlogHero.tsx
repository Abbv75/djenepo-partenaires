import {
  Box,
  Container,
  VStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import { FiSearch, FiX } from 'react-icons/fi'
import {
  GridBackground,
  ShinyBadge,
  BlurText,
} from '../../../components/reactbits'
import { BlogHeroStats } from './BlogHeroStats'

interface BlogHeroProps {
  postsCount: number
  categoriesCount: number
  searchQuery: string
  onSearchChange: (value: string) => void
  onClearSearch: () => void
}

export const BlogHero = ({
  postsCount,
  categoriesCount,
  searchQuery,
  onSearchChange,
  onClearSearch,
}: BlogHeroProps) => {
  return (
    <Box
      position="relative"
      bg="linear-gradient(135deg, #0b1530 0%, #152d6b 50%, #0d1b3e 100%)"
      py={{ base: 16, md: 22 }}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      overflow="hidden"
    >
      {/* ReactBits Grid Background */}
      <GridBackground
        color="rgba(255, 255, 255, 0.08)"
        size={32}
        opacity={0.7}
      />

      {/* Halos d'ambiance */}
      <Box
        position="absolute"
        top="-30%"
        right="-10%"
        w="500px"
        h="500px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(200, 134, 26, 0.18) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-20%"
        left="-10%"
        w="450px"
        h="450px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(63, 124, 226, 0.22) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container
        maxW="1200px"
        px={{ base: 4, md: 6 }}
        position="relative"
        zIndex={1}
      >
        <VStack textAlign="center" spacing={5} maxW="780px" mx="auto">
          {/* ReactBits ShinyBadge */}
          <ShinyBadge
            text="Veille, Analyses & Guides Méthodologiques"
            dotColor="gold.400"
          />

          {/* Titre avec ReactBits BlurText */}
          <Text
            as="h1"
            fontFamily="heading"
            fontWeight={800}
            fontSize={{ base: '32px', md: '50px' }}
            color="white"
            lineHeight={1.15}
            letterSpacing="-0.02em"
          >
            <BlurText text="Le Blog de l'Impact" delay={0.05} />{' '}
            <Text
              as="span"
              display="block"
              color="gold.400"
              textShadow="0 0 30px rgba(200,134,26,0.35)"
            >
              <BlurText text="Analyses & Retours d'Expérience" delay={0.08} />
            </Text>
          </Text>

          <Text
            fontSize={{ base: '15px', md: '17px' }}
            color="blue.100"
            lineHeight={1.8}
          >
            Analyses stratégiques, études de cas et guides méthodologiques conçus
            par nos consultants experts en planification, suivi-évaluation et
            gestion de projets en Afrique de l'Ouest.
          </Text>

          {/* Barre de recherche avec Glassmorphism */}
          <Box w="full" maxW="520px" pt={3}>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none" h="54px">
                <Icon as={FiSearch} color="blue.200" boxSize={5} />
              </InputLeftElement>
              <Input
                placeholder="Rechercher par titre, mot-clé ou auteur..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                h="54px"
                bg="whiteAlpha.150"
                backdropFilter="blur(14px)"
                borderRadius="16px"
                fontSize="15px"
                color="white"
                border="1px solid"
                borderColor="whiteAlpha.300"
                _placeholder={{ color: 'blue.200' }}
                _focus={{
                  borderColor: 'gold.400',
                  boxShadow: '0 0 0 3px rgba(200, 134, 26, 0.3)',
                  bg: 'whiteAlpha.200',
                }}
                boxShadow="0 8px 32px rgba(0, 0, 0, 0.2)"
              />
              {searchQuery && (
                <InputRightElement h="54px">
                  <IconButton
                    aria-label="Effacer la recherche"
                    icon={<FiX />}
                    size="sm"
                    variant="ghost"
                    color="blue.200"
                    _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
                    onClick={onClearSearch}
                  />
                </InputRightElement>
              )}
            </InputGroup>
          </Box>

          {/* Métriques d'articles avec CountUp */}
          <BlogHeroStats
            postsCount={postsCount}
            categoriesCount={categoriesCount}
          />
        </VStack>
      </Container>
    </Box>
  )
}
