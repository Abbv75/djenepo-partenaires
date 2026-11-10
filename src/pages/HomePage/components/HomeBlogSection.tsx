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
  useDisclosure,
  Spinner,
  Button,
  Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'
import type { BlogPost } from '../../../types'
import { useBlogs } from '../../../api/useBlogsQuery'
import { resolveImageUrl } from '../../../utils/imageUrl'
import { formatBlogDate } from '../../../utils/formatDate'
import { SpotlightCard } from '../../../components/reactbits'

import { BlogDetailModal } from './BlogDetailModal'

const MotionBox = motion(Box)

export const HomeBlogSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const { data: posts = [], isLoading } = useBlogs()
  // 3 articles les plus récents pour la page d'accueil
  const recentPosts = posts.slice(0, 3)

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
    onOpen()
  }

  return (
    <Box py={{ base: 16, md: 24 }} bg="#fafbfc" position="relative">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack mb={{ base: 10, md: 14 }} spacing={4} textAlign="center">
          <Badge
            bg="brand.50"
            color="brand.600"
            px={4}
            py={1.5}
            borderRadius="full"
            fontSize="12px"
            fontWeight={700}
            border="1px solid"
            borderColor="brand.100"
            letterSpacing="0.04em"
            textTransform="uppercase"
          >
            Actualités & Savoirs
          </Badge>
          <Text
            as="h2"
            fontFamily="heading"
            fontWeight={800}
            fontSize={{ base: '28px', md: '40px' }}
            color="gray.900"
            lineHeight={1.2}
            letterSpacing="-0.02em"
          >
            Dernières publications
          </Text>
          <Text fontSize={{ base: '15px', md: '17px' }} color="gray.600" maxW="580px" lineHeight={1.8}>
            Analyses méthodologiques, guides pratiques et retours d'expérience rédigés par nos consultants en suivi-évaluation.
          </Text>
        </VStack>

        {isLoading ? (
          <Box display="flex" justifyContent="center" py={12}>
            <Spinner size="xl" color="brand.500" thickness="3px" />
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={7}>
            {recentPosts.map((post, i) => (
              <MotionBox
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => handlePostClick(post)}
                role="group"
                cursor="pointer"
                display="flex"
              >
                <SpotlightCard
                  spotlightColor="rgba(43, 91, 196, 0.12)"
                  spotlightSize={280}
                  w="full"
                  bg="white"
                  borderRadius="24px"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="gray.150"
                  boxShadow="0 4px 20px rgba(0, 0, 0, 0.03)"
                  _hover={{
                    boxShadow: '0 20px 40px -10px rgba(43,91,196,0.14)',
                    transform: 'translateY(-5px)',
                    borderColor: 'brand.300',
                  }}
                  display="flex"
                  flexDirection="column"
                >
                  {/* Image avec Badge */}
                  <Box position="relative" h="210px" overflow="hidden" bg="gray.100">
                    <Image
                      src={resolveImageUrl(post.image_url)}
                      alt={post.title}
                      w="full"
                      h="full"
                      objectFit="cover"
                      transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                      _groupHover={{ transform: 'scale(1.06)' }}
                    />
                    {post.category?.name && (
                      <Badge
                        position="absolute"
                        top={3.5}
                        left={3.5}
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
                  </Box>

                  {/* Contenu */}
                  <Box p={6} flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                    <Box>
                      <HStack spacing={3.5} mb={3} color="gray.500" fontSize="12px" fontWeight={500}>
                        {formatBlogDate(post.date) && (
                          <HStack spacing={1.5}>
                            <Icon as={FiCalendar} />
                            <Text>{formatBlogDate(post.date)}</Text>
                          </HStack>
                        )}
                        <HStack spacing={1.5}>
                          <Icon as={FiClock} />
                          <Text>{post.read_time}</Text>
                        </HStack>
                      </HStack>

                      <Text
                        fontFamily="heading"
                        fontWeight={800}
                        fontSize="17px"
                        color="gray.900"
                        lineHeight={1.35}
                        mb={3}
                        _groupHover={{ color: 'brand.600' }}
                        transition="color 0.2s"
                        noOfLines={2}
                      >
                        {post.title}
                      </Text>

                      <Text fontSize="13px" color="gray.600" lineHeight={1.65} mb={4} noOfLines={3}>
                        {post.excerpt}
                      </Text>
                    </Box>

                    {/* Footer */}
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
                </SpotlightCard>
              </MotionBox>
            ))}
          </SimpleGrid>
        )}

        {/* Bouton voir toutes les actualités */}
        <Flex justify="center" mt={12}>
          <Link to="/actualites">
            <Button
              variant="outline_brand"
              size="lg"
              px={8}
              h="52px"
              borderRadius="16px"
              fontWeight={700}
              rightIcon={<FiArrowRight />}
            >
              Consulter toutes les actualités
            </Button>
          </Link>
        </Flex>
      </Container>

      <BlogDetailModal isOpen={isOpen} onClose={onClose} post={selectedPost} />
    </Box>
  )
}
