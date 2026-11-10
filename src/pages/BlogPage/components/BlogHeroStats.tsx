import { Box, HStack, VStack, Text, Icon } from '@chakra-ui/react'
import { FiBookOpen, FiLayers, FiTrendingUp } from 'react-icons/fi'
import { CountUp } from '../../../components/reactbits'

interface BlogHeroStatsProps {
  postsCount: number
  categoriesCount: number
}

export const BlogHeroStats = ({
  postsCount,
  categoriesCount,
}: BlogHeroStatsProps) => {
  return (
    <HStack
      spacing={{ base: 6, md: 10 }}
      pt={6}
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
      w="full"
      justify="center"
      flexWrap="wrap"
    >
      <VStack spacing={0}>
        <Text
          fontSize={{ base: '22px', md: '28px' }}
          fontWeight={800}
          color="white"
        >
          <CountUp to={postsCount} duration={1.5} />
        </Text>
        <HStack spacing={1} color="blue.200" fontSize="12px" fontWeight={500}>
          <Icon as={FiBookOpen} />
          <Text>Articles publiés</Text>
        </HStack>
      </VStack>

      <Box
        w="1px"
        h="28px"
        bg="whiteAlpha.300"
        display={{ base: 'none', sm: 'block' }}
      />

      <VStack spacing={0}>
        <Text
          fontSize={{ base: '22px', md: '28px' }}
          fontWeight={800}
          color="gold.400"
        >
          <CountUp to={categoriesCount} duration={1.5} />
        </Text>
        <HStack spacing={1} color="blue.200" fontSize="12px" fontWeight={500}>
          <Icon as={FiLayers} />
          <Text>Pôles thématiques</Text>
        </HStack>
      </VStack>

      <Box
        w="1px"
        h="28px"
        bg="whiteAlpha.300"
        display={{ base: 'none', sm: 'block' }}
      />

      <VStack spacing={0}>
        <Text
          fontSize={{ base: '22px', md: '28px' }}
          fontWeight={800}
          color="brand.300"
        >
          <CountUp to={100} suffix="%" duration={1.5} />
        </Text>
        <HStack spacing={1} color="blue.200" fontSize="12px" fontWeight={500}>
          <Icon as={FiTrendingUp} />
          <Text>Libre accès</Text>
        </HStack>
      </VStack>
    </HStack>
  )
}
