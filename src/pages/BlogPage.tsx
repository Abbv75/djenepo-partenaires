import { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Badge,
  SimpleGrid,
  Image,
  Avatar,
  Icon,
  useDisclosure
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'
import { BLOG_POSTS } from '../constant/blog'
import { IMAGES } from '../constant/image';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');
import type { BlogPost } from '../constant/blog'
import { BlogDetailModal } from './HomePage/components/BlogDetailModal'


const MotionBox = motion(Box)

export default function BlogPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('Toutes')

  const categories = ['Toutes', ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))]

  const filteredPosts = selectedCategory === 'Toutes' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedCategory)

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
    onOpen()
  }

  return (
    <Box pt="72px">
      {/* Header */}
      <Box
        bg="linear-gradient(135deg, #f8f9ff 0%, #eff3fb 100%)"
        py={{ base: 16, md: 24 }}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack textAlign="center" spacing={5} maxW="700px" mx="auto">
            <Badge bg="brand.50" color="brand.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={600}>
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
            <Text fontSize="17px" color="gray.600" lineHeight={1.8}>
              Découvrez nos articles, analyses, études de cas et conseils méthodologiques rédigés par nos consultants experts en planification et suivi-évaluation de projets.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Box py={20}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <HStack wrap="wrap" justify="center" spacing={3} mb={12}>
            {categories.map((category) => (
              <Box
                key={category}
                as="button"
                onClick={() => setSelectedCategory(category)}
                px={5}
                py={2}
                borderRadius="full"
                fontSize="14px"
                fontWeight={600}
                bg={selectedCategory === category ? 'brand.600' : 'white'}
                color={selectedCategory === category ? 'white' : 'gray.600'}
                border="1px solid"
                borderColor={selectedCategory === category ? 'brand.600' : 'gray.200'}
                transition="all 0.2s"
                _hover={{
                  bg: selectedCategory === category ? 'brand.700' : 'gray.50',
                  borderColor: selectedCategory === category ? 'brand.700' : 'gray.300',
                }}
              >
                {category}
              </Box>
            ))}
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {filteredPosts.map((post, i) => (
              <MotionBox
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handlePostClick(post)}
                role="group"
              >
                <Box
                  bg="white"
                  borderRadius="24px"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.100"
                  h="full"
                  display="flex"
                  flexDirection="column"
                  cursor="pointer"
                  _hover={{
                    boxShadow: '0 20px 40px rgba(43,91,196,0.1)',
                    transform: 'translateY(-4px)',
                    borderColor: 'brand.200',
                  }}
                  transition="all 0.3s ease"
                >
                  <Box position="relative" h="240px" overflow="hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      transition="transform 0.5s ease"
                      _groupHover={{ transform: 'scale(1.05)' }}
                    />
                    <Badge
                      position="absolute"
                      top="4"
                      left="4"
                      bg="brand.600"
                      color="white"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="11px"
                      fontWeight={600}
                    >
                      {post.category}
                    </Badge>
                  </Box>

                  <Box p={6} flex={1} display="flex" flexDirection="column">
                    <HStack spacing={4} mb={3} color="gray.400" fontSize="12px">
                      <HStack spacing={1}>
                        <Icon as={FiCalendar} />
                        <Text>{dayjs(post.date).format('D MMMM YYYY')}</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon as={FiClock} />
                        <Text>{post.readTime}</Text>
                      </HStack>
                    </HStack>

                    <Text
                      fontFamily="heading"
                      fontWeight={700}
                      fontSize="16px"
                      color="gray.900"
                      lineHeight={1.4}
                      mb={3}
                      _hover={{ color: 'brand.600' }}
                      transition="color 0.2s"
                    >
                      {post.title}
                    </Text>

                    <Text fontSize="13px" color="gray.600" lineHeight={1.6} mb={5} flex={1}>
                      {post.excerpt}
                    </Text>

                    <HStack justify="space-between" align="center" pt={4} borderTop="1px solid" borderColor="gray.50">
                      <HStack spacing={2.5}>
                        <Avatar size="xs" name={post.author.name} src={post.author.avatar} />
                        <Text fontSize="12px" fontWeight={600} color="gray.700">
                          {post.author.name}
                        </Text>
                      </HStack>
                      <HStack spacing={1} color="brand.600" fontWeight={700} fontSize="12px">
                        <Text>Lire</Text>
                        <Icon as={FiArrowRight} />
                      </HStack>
                    </HStack>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <BlogDetailModal isOpen={isOpen} onClose={onClose} post={selectedPost} />
    </Box>
  )
}
