import { useState, useMemo } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Badge,
  Grid,
  GridItem,
  Image,
  Avatar,
  Icon,
  useDisclosure,
  Spinner,
  Alert,
  AlertIcon,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowRight, FiSearch, FiBookOpen } from 'react-icons/fi';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { useBlogs } from '../api/useBlogsQuery';
import { resolveImageUrl } from '../utils/imageUrl';
import type { BlogPost } from '../types';
import { BlogDetailModal } from './HomePage/components/BlogDetailModal';

dayjs.locale('fr');

const MotionGridItem = motion(GridItem);

export default function BlogPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts = [], isLoading, isError } = useBlogs();

  // Extraction des catégories avec décompte
  const categoriesWithCount = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((post) => {
      const cat = post.category?.name?.trim();
      if (cat) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    const categoryList = Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));

    return [
      { name: 'Toutes', count: posts.length },
      ...categoryList.sort((a, b) => b.count - a.count),
    ];
  }, [posts]);

  // Filtrage combiné (catégorie + recherche texte)
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'Toutes' ||
        post.category?.name?.trim() === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author_name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    onOpen();
  };

  if (isLoading) {
    return (
      <Box pt="72px" minH="calc(100vh - 72px)" display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="3px" speed="0.75s" />
          <Text fontSize="14px" color="gray.500" fontWeight={500}>
            Chargement des articles...
          </Text>
        </VStack>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box pt="72px" p={8}>
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
    );
  }

  return (
    <Box pt="72px" bg="#fafbfc" minH="100vh">
      {/* Header Héro */}
      <Box
        position="relative"
        bg="linear-gradient(135deg, #f4f7fc 0%, #edf2f9 100%)"
        py={{ base: 14, md: 20 }}
        borderBottom="1px solid"
        borderColor="gray.100"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-40%"
          right="-10%"
          w="500px"
          h="500px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(63,124,226,0.08) 0%, rgba(255,255,255,0) 70%)"
          pointerEvents="none"
        />

        <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative">
          <VStack textAlign="center" spacing={4} maxW="720px" mx="auto">
            <Badge
              bg="brand.50"
              color="brand.600"
              px={4}
              py={1.5}
              borderRadius="full"
              fontSize="12px"
              fontWeight={700}
              letterSpacing="0.05em"
              textTransform="uppercase"
              border="1px solid"
              borderColor="brand.100"
            >
              Actualités & Méthodologies
            </Badge>
            <Text
              as="h1"
              fontFamily="heading"
              fontWeight={800}
              fontSize={{ base: '32px', md: '48px' }}
              color="gray.900"
              lineHeight={1.15}
            >
              Le Blog de l'Impact
            </Text>
            <Text fontSize={{ base: '15px', md: '17px' }} color="gray.600" lineHeight={1.8}>
              Analyses stratégiques, études de cas et guides méthodologiques conçus par nos consultants experts en planification et suivi-évaluation de projets.
            </Text>

            {/* Barre de recherche */}
            <Box w="full" maxW="480px" pt={2}>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Rechercher par titre, thème ou auteur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  bg="white"
                  borderRadius="16px"
                  fontSize="14px"
                  border="1px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: 'brand.500',
                    boxShadow: '0 0 0 3px rgba(43,91,196,0.12)',
                  }}
                  boxShadow="0 4px 20px rgba(0,0,0,0.04)"
                />
              </InputGroup>
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Contenu Principal */}
      <Box py={{ base: 10, md: 16 }}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          {/* Filtres par Catégorie */}
          <HStack
            wrap="wrap"
            justify="center"
            spacing={2}
            mb={10}
            overflowX="auto"
            py={1}
          >
            {categoriesWithCount.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <Box
                  key={cat.name}
                  as="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontSize="13px"
                  fontWeight={600}
                  bg={isSelected ? 'brand.600' : 'white'}
                  color={isSelected ? 'white' : 'gray.600'}
                  border="1px solid"
                  borderColor={isSelected ? 'brand.600' : 'gray.200'}
                  boxShadow={isSelected ? '0 4px 12px rgba(43,91,196,0.25)' : 'none'}
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
                    bg={isSelected ? 'whiteAlpha.300' : 'gray.100'}
                    color={isSelected ? 'white' : 'gray.500'}
                  >
                    {cat.count}
                  </Box>
                </Box>
              );
            })}
          </HStack>

          {/* État vide si aucun résultat */}
          {filteredPosts.length === 0 ? (
            <VStack
              py={16}
              px={6}
              spacing={4}
              bg="white"
              borderRadius="24px"
              border="1px dashed"
              borderColor="gray.200"
              textAlign="center"
              maxW="500px"
              mx="auto"
            >
              <Icon as={FiBookOpen} boxSize={12} color="gray.300" />
              <Text fontFamily="heading" fontWeight={700} fontSize="18px" color="gray.800">
                Aucun article trouvé
              </Text>
              <Text fontSize="14px" color="gray.500">
                {searchQuery
                  ? `Aucun résultat ne correspond à "${searchQuery}".`
                  : 'Aucun article disponible dans cette catégorie.'}
              </Text>
              {(searchQuery || selectedCategory !== 'Toutes') && (
                <Button
                  size="sm"
                  variant="outline_brand"
                  borderRadius="12px"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Toutes');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </VStack>
          ) : (
            /* Bento Grid 12 Colonnes */
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(12, 1fr)' }}
              gap={6}
              alignItems="stretch"
            >
              {filteredPosts.map((post, i) => {
                // Modulo 7 pour définir le rythme organique du Bento Grid
                const pattern = i % 7;

                // Configuration Bento :
                // 0 -> Hero Vedette (8 colonnes sur lg)
                // 1 -> Carte Élevée latérale (4 colonnes sur lg)
                // 2, 3, 4 -> Trio Standard (4 colonnes chacun sur lg)
                // 5, 6 -> Duo Paysage Large (6 colonnes chacun sur lg)
                const isHero = pattern === 0;
                const isTall = pattern === 1;
                const isWide = pattern === 5 || pattern === 6;

                let colSpan = { base: 1, md: 1, lg: 4 };
                if (isHero) colSpan = { base: 1, md: 2, lg: 8 };
                else if (isWide) colSpan = { base: 1, md: 2, lg: 6 };

                return (
                  <MotionGridItem
                    key={post.id}
                    colSpan={colSpan}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 7) * 0.06 }}
                    role="group"
                    onClick={() => handlePostClick(post)}
                    cursor="pointer"
                    display="flex"
                  >
                    <Box
                      w="full"
                      bg="white"
                      borderRadius="24px"
                      overflow="hidden"
                      border="1px solid"
                      borderColor="gray.150"
                      boxShadow="0 4px 20px rgba(0, 0, 0, 0.03)"
                      transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 40px -10px rgba(43,91,196,0.14)',
                        borderColor: 'brand.300',
                      }}
                      display="flex"
                      flexDirection={
                        isHero
                          ? { base: 'column', md: 'row' }
                          : isWide
                          ? { base: 'column', sm: 'row' }
                          : 'column'
                      }
                    >
                      {/* Section Image */}
                      <Box
                        position="relative"
                        w={
                          isHero
                            ? { base: 'full', md: '50%' }
                            : isWide
                            ? { base: 'full', sm: '42%' }
                            : 'full'
                        }
                        h={
                          isHero
                            ? { base: '240px', md: 'auto' }
                            : isTall
                            ? '250px'
                            : isWide
                            ? { base: '200px', sm: 'auto' }
                            : '200px'
                        }
                        minH={
                          isHero
                            ? { md: '340px' }
                            : isWide
                            ? { sm: '230px' }
                            : undefined
                        }
                        overflow="hidden"
                        bg="gray.100"
                      >
                        <Image
                          src={resolveImageUrl(post.image_url)}
                          alt={post.title}
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
                        >
                          {post.category?.name && (
                            <Badge
                              bg="white"
                              color="brand.700"
                              px={3}
                              py={1}
                              borderRadius="full"
                              fontSize="11px"
                              fontWeight={700}
                              boxShadow="0 2px 8px rgba(0,0,0,0.12)"
                            >
                              {post.category.name}
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
                              boxShadow="0 2px 8px rgba(200,134,26,0.3)"
                            >
                              ★ À la une
                            </Badge>
                          )}
                        </HStack>
                      </Box>

                      {/* Section Contenu */}
                      <Box
                        p={{ base: 5, md: isHero ? 7 : 6 }}
                        flex={1}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Box>
                          {/* Métadonnées (Date + Temps de lecture) */}
                          <HStack spacing={4} mb={3} color="gray.400" fontSize="12px" fontWeight={500}>
                            <HStack spacing={1.5}>
                              <Icon as={FiCalendar} />
                              <Text>{dayjs(post.date).format('D MMMM YYYY')}</Text>
                            </HStack>
                            <HStack spacing={1.5}>
                              <Icon as={FiClock} />
                              <Text>{post.read_time}</Text>
                            </HStack>
                          </HStack>

                          {/* Titre */}
                          <Text
                            fontFamily="heading"
                            fontWeight={800}
                            fontSize={
                              isHero
                                ? { base: '18px', md: '22px' }
                                : isTall || isWide
                                ? '17px'
                                : '16px'
                            }
                            color="gray.900"
                            lineHeight={1.35}
                            mb={3}
                            _groupHover={{ color: 'brand.600' }}
                            transition="color 0.2s"
                            noOfLines={isHero ? 3 : 2}
                          >
                            {post.title}
                          </Text>

                          {/* Extrait */}
                          <Text
                            fontSize="13px"
                            color="gray.600"
                            lineHeight={1.65}
                            mb={4}
                            noOfLines={isHero ? 4 : isWide ? 3 : 2}
                          >
                            {post.excerpt}
                          </Text>
                        </Box>

                        {/* Footer de la carte (Auteur + Action) */}
                        <HStack
                          justify="space-between"
                          align="center"
                          pt={4}
                          borderTop="1px solid"
                          borderColor="gray.100"
                        >
                          <HStack spacing={2.5}>
                            <Avatar size="xs" name={post.author_name} bg="brand.500" color="white" />
                            <Text fontSize="12px" fontWeight={600} color="gray.700" noOfLines={1}>
                              {post.author_name}
                            </Text>
                          </HStack>

                          <HStack
                            spacing={1.5}
                            color="brand.600"
                            fontWeight={700}
                            fontSize="12px"
                            transition="transform 0.2s"
                            _groupHover={{ transform: 'translateX(3px)' }}
                          >
                            <Text>Lire</Text>
                            <Icon as={FiArrowRight} />
                          </HStack>
                        </HStack>
                      </Box>
                    </Box>
                  </MotionGridItem>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Modal de détail d'article */}
      <BlogDetailModal isOpen={isOpen} onClose={onClose} post={selectedPost} />
    </Box>
  );
}
