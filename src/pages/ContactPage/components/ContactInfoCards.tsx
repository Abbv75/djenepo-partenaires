import { Box, SimpleGrid, Icon, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { CONTACT_INFO } from '../../../constant/contact'

const MotionBox = motion(Box)

const contactCards = [
  {
    icon: FiMapPin,
    title: 'Adresse',
    content: CONTACT_INFO.address.full,
    color: 'brand.600',
    bg: 'brand.50',
  },
  {
    icon: FiPhone,
    title: 'Téléphone',
    content: CONTACT_INFO.phones.join('\n'),
    color: 'gold.500',
    bg: 'gold.50',
  },
  {
    icon: FiMail,
    title: 'Email',
    content: CONTACT_INFO.emails.join('\n'),
    color: 'teal.500',
    bg: 'teal.50',
  },
  {
    icon: FiClock,
    title: 'Horaires',
    content: CONTACT_INFO.hours.full,
    color: 'purple.500',
    bg: 'purple.50',
  },
]

export const ContactInfoCards = () => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6} mb={16}>
      {contactCards.map((info, i) => (
        <MotionBox
          key={info.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Box
            bg="white"
            borderRadius="16px"
            p={6}
            border="1px solid"
            borderColor="gray.100"
            _hover={{
              boxShadow: '0 8px 30px rgba(43,91,196,0.1)',
              transform: 'translateY(-3px)',
            }}
            transition="all 0.2s"
            h="full"
          >
            <Box
              w="48px"
              h="48px"
              bg={info.bg}
              borderRadius="12px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={4}
            >
              <Icon as={info.icon} color={info.color} fontSize="20px" />
            </Box>
            <Text fontFamily="heading" fontWeight={700} fontSize="15px" color="gray.800" mb={2}>
              {info.title}
            </Text>
            {info.content.split('\n').map((line, j) => (
              <Text key={j} fontSize="13px" color="gray.600" lineHeight={1.7}>
                {line}
              </Text>
            ))}
          </Box>
        </MotionBox>
      ))}
    </SimpleGrid>
  )
}
