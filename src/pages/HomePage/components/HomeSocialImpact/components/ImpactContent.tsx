import { VStack, Badge, Text } from '@chakra-ui/react'

export const ImpactContent = () => {
  return (
    <VStack align="flex-start" spacing={6}>
      <Badge bg="gold.50" color="gold.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={700}>
        Présence & Engagement
      </Badge>
      <Text
        as="h2"
        fontFamily="heading"
        fontWeight={800}
        fontSize={{ base: '32px', md: '46px' }}
        color="gray.900"
        lineHeight={1.1}
      >
        Une expertise ancrée dans les{' '}
        <Text as="span" color="brand.500">
          réalités locales
        </Text>
      </Text>
      <Text fontSize="18px" color="gray.600" lineHeight={1.8}>
        Nous ne nous contentons pas de fournir des rapports. Nous accompagnons les changements sur le terrain, en travaillant main dans la main avec les communautés et les partenaires locaux pour assurer la pérennité de chaque intervention.
      </Text>
    </VStack>
  )
}
