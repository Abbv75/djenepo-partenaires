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
import { BLOG_POSTS } from '../../../constant/blog'
import type { BlogPost } from '../../../constant/blog'

import { BlogDetailModal } from './BlogDetailModal'

const MotionBox = motion(Box)

export const HomeBlogSection = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
    onOpen()
  }

  return (
    <Box py={{ base: 16, md: 24 }} bg="transparent">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack mb={12} spacing={4} textAlign="center">
          <Badge bg="brand.50" color="brand.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={600}>
            Notre actualité & blog
          </Badge>
          <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '28px', md: '38px' }} color="gray.900">
            Dernières publications
          </Text>
          <Text fontSize="16px" color="gray.600" maxW="560px" lineHeight={1.8}>
            Suivez l'actualité de notre cabinet, nos analyses et conseils méthodologiques sur le développement et le suivi-évaluation.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {BLOG_POSTS.map((post, i) => (
            <MotionBox
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handlePostClick(post)}
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
                <Box position="relative" overflow="hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    w="full"
                    h="200px"
                    objectFit="cover"
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
                      <Text>{post.date}</Text>
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

      <BlogDetailModal isOpen={isOpen} onClose={onClose} post={selectedPost} />
    </Box>
  )
}
