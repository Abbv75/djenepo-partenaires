import { Box, VStack, HStack, Text, Icon } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { CheckIcon } from '@chakra-ui/icons'

const MotionBox = motion(Box)

export default () => {
  return (
    <MotionBox
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Map embed */}
      <Box
        borderRadius="20px"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.100"
        mb={6}
        h="320px"
        bg="gray.100"
        position="relative"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31371.90226764834!2d-8.022082!3d12.6537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51d016e6c8a5a1%3A0xd8a1e8de3f11c47d!2sBamako%2C%20Mali!5e0!3m2!1sfr!2sfr!4v1682345678901!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation DJENEPO PARTNERS - Bamako"
        />
      </Box>

      {/* Why us */}
      <Box
        bg="linear-gradient(135deg, #2B5BC4 0%, #1f3fa0 100%)"
        borderRadius="20px"
        p={8}
        color="white"
      >
        <Text fontFamily="heading" fontWeight={700} fontSize="18px" mb={5}>
          Pourquoi nous choisir ?
        </Text>
        <VStack align="flex-start" spacing={4}>
          {[
            'Expertise locale et connaissance du contexte africain',
            'Approche participative centrée sur les bénéficiaires',
            'Méthodologies rigoureuses et éprouvées sur le terrain',
            'Présence dans 8 pays d\'Afrique de l\'Ouest',
            'Réactivité et flexibilité dans nos interventions',
          ].map((text) => (
            <HStack key={text} spacing={3} align="flex-start">
              <Box 
                w="22px" 
                h="22px" 
                borderRadius="full" 
                bg="whiteAlpha.200" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                flexShrink={0}
                mt="2px"
              >
                <Icon as={CheckIcon} color="gold.400" fontSize="10px" />
              </Box>
              <Text fontSize="14px" color="brand.100" lineHeight={1.6}>
                {text}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </MotionBox>
  )
}
