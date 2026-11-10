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
  Box,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { FiCalendar, FiClock, FiShare2, FiCheck } from 'react-icons/fi'
import { useState } from 'react'
import type { BlogPost } from '../../../types'
import { resolveImageUrl } from '../../../utils/imageUrl'
import dayjs from 'dayjs'

interface BlogDetailModalProps {
  isOpen: boolean
  onClose: () => void
  post: BlogPost | null
}

export const BlogDetailModal = ({
  isOpen,
  onClose,
  post,
}: BlogDetailModalProps) => {
  const [copied, setCopied] = useState(false)
  const toast = useToast()

  if (!post) return null

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    toast({
      title: 'Lien copié !',
      description: "Le lien de l'article a été copié dans votre presse-papier.",
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.700" />
      <ModalContent borderRadius="20px" overflow="hidden" my={8}>
        {/* Image de couverture avec Badge */}
        <Box position="relative">
          <Image
            src={resolveImageUrl(post.image_url)}
            alt={post.title}
            w="full"
            h={{ base: '220px', md: '320px' }}
            objectFit="cover"
          />
          {post.category?.name && (
            <Badge
              position="absolute"
              top={4}
              left={4}
              bg="brand.600"
              color="white"
              px={3.5}
              py={1.5}
              borderRadius="full"
              fontSize="12px"
              fontWeight={700}
              boxShadow="0 4px 12px rgba(0, 0, 0, 0.25)"
            >
              {post.category.name}
            </Badge>
          )}
          <ModalCloseButton
            color="white"
            bg="blackAlpha.600"
            borderRadius="full"
            top={4}
            right={4}
            _hover={{ bg: 'blackAlpha.800' }}
          />
        </Box>

        {/* En-tête de l'article */}
        <ModalHeader pt={6} pb={2}>
          <Text
            fontFamily="heading"
            fontWeight={800}
            fontSize={{ base: '22px', md: '28px' }}
            color="gray.900"
            lineHeight={1.3}
            mb={4}
          >
            {post.title}
          </Text>

          {/* Auteur + Métadonnées */}
          <HStack
            spacing={4}
            py={3}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="gray.150"
            wrap="wrap"
            justify="space-between"
          >
            <HStack spacing={3}>
              <Avatar size="sm" name={post.author_name} bg="brand.500" color="white" />
              <VStack align="flex-start" spacing={0}>
                <Text fontSize="13px" fontWeight={700} color="gray.800">
                  {post.author_name}
                </Text>
                <Text fontSize="11px" color="gray.500">
                  Consultant Analyste
                </Text>
              </VStack>
            </HStack>

            <HStack spacing={4} color="gray.500" fontSize="12px" fontWeight={500}>
              <HStack spacing={1.5}>
                <Icon as={FiCalendar} />
                <Text>{dayjs(post.date).format('D MMMM YYYY')}</Text>
              </HStack>
              <HStack spacing={1.5}>
                <Icon as={FiClock} />
                <Text>{post.read_time}</Text>
              </HStack>
            </HStack>
          </HStack>
        </ModalHeader>

        {/* Corps de l'article */}
        <ModalBody py={5}>
          <Text
            fontSize={{ base: '15px', md: '16px' }}
            color="gray.700"
            lineHeight={1.85}
            whiteSpace="pre-line"
          >
            {post.content}
          </Text>
        </ModalBody>

        {/* Pied de la modale */}
        <ModalFooter
          bg="gray.50"
          borderTop="1px solid"
          borderColor="gray.150"
          py={4}
          px={6}
          justifyContent="space-between"
        >
          <Button
            size="sm"
            variant="outline"
            borderColor="gray.300"
            borderRadius="10px"
            leftIcon={<Icon as={copied ? FiCheck : FiShare2} />}
            onClick={handleCopyLink}
            color={copied ? 'green.600' : 'gray.700'}
          >
            {copied ? 'Lien copié' : 'Partager'}
          </Button>

          <Button
            size="sm"
            bg="brand.600"
            color="white"
            borderRadius="10px"
            _hover={{ bg: 'brand.700' }}
            onClick={onClose}
          >
            Fermer la lecture
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
