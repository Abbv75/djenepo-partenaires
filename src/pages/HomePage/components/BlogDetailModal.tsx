import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Avatar,
  Badge,
  Box
} from '@chakra-ui/react'

import type { BlogPost } from '../../../types'
import { resolveImageUrl } from '../../../utils/imageUrl'
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');


interface BlogDetailModalProps {
  isOpen: boolean
  onClose: () => void
  post: BlogPost | null
}

export const BlogDetailModal = ({ isOpen, onClose, post }: BlogDetailModalProps) => {
  if (!post) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
      <ModalContent borderRadius="24px" overflow="hidden">
        <Box position="relative">
          <Image
            src={resolveImageUrl(post.image_url)}
            alt={post.title}
            w="full"
            h="280px"
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
            fontSize="12px"
            fontWeight={600}
          >
            {post.category?.name}
          </Badge>
        </Box>
        <ModalCloseButton color="white" bg="blackAlpha.600" borderRadius="full" _hover={{ bg: 'blackAlpha.800' }} />
        
        <ModalHeader pt={6}>
          <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '20px', md: '26px' }} color="gray.900" lineHeight={1.3}>
            {post.title}
          </Text>
          <HStack mt={4} spacing={3} align="center">
            <Avatar size="sm" name={post.author_name} />
            <VStack align="flex-start" spacing={0}>
              <Text fontSize="13px" fontWeight={700} color="gray.800">
                {post.author_name}
              </Text>
            </VStack>
            <Text fontSize="12px" color="gray.400" ml="auto">
              {dayjs(post.date).format('D MMMM YYYY')} • {post.read_time} de lecture
            </Text>
          </HStack>
        </ModalHeader>

        <ModalBody py={4}>
          <Text fontSize="15px" color="gray.700" lineHeight={1.8} whiteSpace="pre-line">
            {post.content}
          </Text>
        </ModalBody>

        <ModalFooter bg="gray.50" borderTop="1px solid" borderColor="gray.100" py={4}>
          <Button variant="brand" onClick={onClose} borderRadius="12px">
            Fermer la lecture
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
