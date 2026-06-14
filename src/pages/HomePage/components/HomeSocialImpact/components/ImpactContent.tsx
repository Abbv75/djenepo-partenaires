import { VStack, Badge, Text, HStack, Box } from '@chakra-ui/react'


export const ImpactContent = () => {
  return (
    <VStack align="flex-start" spacing={6}>
      <Badge bg="gold.50" color="gold.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={700}>
        Notre Mission
      </Badge>
      <Text
        as="h2"
        fontFamily="heading"
        fontWeight={800}
        fontSize={{ base: '32px', md: '46px' }}
        color="gray.900"
        lineHeight={1.15}
      >
        Maximiser la performance, la redevabilité et{' '}
        <Text as="span" color="brand.500">
          l'impact
        </Text>
      </Text>
      <Text fontSize="18px" color="gray.600" lineHeight={1.8}>
        Accompagner les organisations, ONG, institutions publiques et partenaires techniques et financiers dans la conception, la mise en œuvre, le suivi et l'évaluation de leurs projets.
      </Text>

      <VStack align="flex-start" spacing={2} pt={4} w="full">
        <Badge bg="brand.50" color="brand.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={700}>
          Notre Vision
        </Badge>
        <Text fontSize="16px" color="gray.700" lineHeight={1.7} fontStyle="italic">
          « Contribuer à des systèmes de développement plus performants, fondés sur des décisions éclairées par des données fiables et orientés vers des résultats durables. »
        </Text>
      </VStack>

      <VStack align="flex-start" spacing={3} pt={4} w="full">
        <Badge bg="gold.50" color="gold.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={700}>
          Pourquoi nous choisir ?
        </Badge>
        <VStack align="flex-start" spacing={2} pl={1}>
          {[
            'Une expertise terrain éprouvée',
            'Des solutions adaptées aux contextes locaux',
            'Une méthodologie rigoureuse et transparente',
          ].map((text, idx) => (
            <HStack key={idx} spacing={2} align="center">
              <Box w="6px" h="6px" borderRadius="full" bg="brand.500" />
              <Text fontSize="15px" color="gray.700" fontWeight={600}>
                {text}
              </Text>
            </HStack>
          ))}
        </VStack>
      </VStack>

      <VStack align="flex-start" spacing={2} pt={4} w="full">
        <Badge bg="brand.50" color="brand.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={700}>
          Zones d'intervention
        </Badge>
        <Text fontSize="15px" color="gray.700" fontWeight={600}>
          Afrique de l'Ouest (Mali et sous-région)
        </Text>
        <Text fontSize="13px" color="gray.500" fontStyle="italic">
          * Extension possible selon les besoins et la nature des projets.
        </Text>
      </VStack>
    </VStack>
  )
}




