import { Box, Container, VStack, Badge, Text, SimpleGrid, Flex, Button, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { SERVICES } from '../../../constant/services'

const MotionBox = motion(Box)

export const HomeServicesGrid = () => {
  const homeServices = SERVICES.slice(0, 4)

  return (
    <Box py={{ base: 16, md: 24 }} bg="gray.50">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack mb={12} spacing={4} textAlign="center">
          <Badge bg="gold.50" color="gold.600" px={4} py={1.5} borderRadius="full" fontSize="13px" fontWeight={600}>
            Nos expertises
          </Badge>
          <Text fontFamily="heading" fontWeight={800} fontSize={{ base: '28px', md: '38px' }} color="gray.900">
            Des services sur mesure pour vos projets
          </Text>
          <Text fontSize="16px" color="gray.600" maxW="560px" lineHeight={1.8}>
            Nous intervenons à chaque étape du cycle de projet pour maximiser votre impact
            sur le terrain.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {homeServices.map((s, i) => (
            <MotionBox
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/services#${s.id}`}>
                <Box
                  bg="white"
                  borderRadius="20px"
                  p={7}
                  h="full"
                  border="1px solid"
                  borderColor="gray.100"
                  _hover={{
                    boxShadow: '0 12px 40px rgba(43,91,196,0.12)',
                    transform: 'translateY(-4px)',
                    borderColor: 'brand.200',
                  }}
                  transition="all 0.3s ease"
                  cursor="pointer"
                >
                  <Box
                    w="52px"
                    h="52px"
                    bg={s.bg}
                    borderRadius="14px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb={5}
                  >
                    <Icon as={s.icon} color={s.color} fontSize="22px" />
                  </Box>
                  <Text fontFamily="heading" fontWeight={700} fontSize="16px" color="gray.900" mb={3}>
                    {s.title}
                  </Text>
                  <Text fontSize="14px" color="gray.600" lineHeight={1.7}>
                    {s.desc}
                  </Text>
                </Box>
              </Link>
            </MotionBox>
          ))}
        </SimpleGrid>

        <Flex justify="center" mt={10}>
          <Link to="/services">
            <Button variant="brand" size="lg" px={8} rightIcon={<FiArrowRight />}>
              Voir tous nos services
            </Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  )
}
