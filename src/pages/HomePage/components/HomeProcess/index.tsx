import { Box, Container, VStack, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { PROCESS_STEPS } from './constants/steps'
import { containerVariants } from './animations/variants'
import { ProcessHeader } from './components/ProcessHeader'
import { ProcessStep } from './components/ProcessStep'
import { ConnectorLine } from './components/ConnectorLine'

export const HomeProcess = () => {
  return (
    <Box py={{ base: 20, md: 32 }} bg="brand.600" overflow="hidden">
      <Container maxW="1200px" px={{ base: 4, md: 6 }}>
        <VStack spacing={16}>
          <ProcessHeader />

          <Box position="relative" w="full">
            <ConnectorLine />

            <SimpleGrid
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={8}
            >
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep key={i} step={step} index={i} />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
