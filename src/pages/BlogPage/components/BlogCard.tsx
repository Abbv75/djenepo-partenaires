import {
  Box,
  GridItem,
  HStack,
  Text,
  Avatar,
  Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'
import dayjs from 'dayjs'
import type { BlogPost } from '../../../types'
import { SpotlightCard } from '../../../components/reactbits'
import { BlogCardImage } from './BlogCardImage'

const MotionGridItem = motion(GridItem)

interface BlogCardProps {
  post: BlogPost
  index: number
  onClick: (post: BlogPost) => void
}

export const BlogCard = ({ post, index, onClick }: BlogCardProps) => {
  const pattern = index % 7
  const isHero = pattern === 0
  const isTall = pattern === 1
  const isWide = pattern === 5 || pattern === 6

  let colSpan = { base: 1, md: 1, lg: 4 }
  if (isHero) colSpan = { base: 1, md: 2, lg: 8 }
  else if (isWide) colSpan = { base: 1, md: 2, lg: 6 }

  return (
    <MotionGridItem
      colSpan={colSpan}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 7) * 0.05 }}
      role="group"
      onClick={() => onClick(post)}
      cursor="pointer"
      display="flex"
    >
      <SpotlightCard
        spotlightColor="rgba(43, 91, 196, 0.12)"
        spotlightSize={isHero ? 420 : 320}
        w="full"
        bg="white"
        borderRadius="16px"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.150"
        boxShadow="0 4px 20px rgba(0, 0, 0, 0.03)"
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: '0 20px 40px -10px rgba(43, 91, 196, 0.14)',
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
        {/* Section Image & Badges */}
        <BlogCardImage
          imageUrl={post.image_url}
          title={post.title}
          categoryName={post.category?.name}
          isHero={isHero}
          isTall={isTall}
          isWide={isWide}
        />

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
            <HStack
              spacing={4}
              mb={3}
              color="gray.500"
              fontSize="12px"
              fontWeight={500}
            >
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
              <Avatar
                size="xs"
                name={post.author_name}
                bg="brand.500"
                color="white"
              />
              <Text
                fontSize="12px"
                fontWeight={600}
                color="gray.700"
                noOfLines={1}
              >
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
              <Text>Lire l'article</Text>
              <Icon as={FiArrowRight} />
            </HStack>
          </HStack>
        </Box>
      </SpotlightCard>
    </MotionGridItem>
  )
}
