import { Box, HStack, Text, type BoxProps } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const pulseDot = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.6;
  }
`;

interface ShinyBadgeProps extends BoxProps {
  text: string;
  dotColor?: string;
}

export const ShinyBadge = ({ text, dotColor = 'gold.400', ...props }: ShinyBadgeProps) => {
  return (
    <Box
      position="relative"
      display="inline-flex"
      alignItems="center"
      px={4}
      py={1.5}
      borderRadius="full"
      border="1px solid"
      borderColor="whiteAlpha.300"
      bg="rgba(255, 255, 255, 0.05)"
      backdropFilter="blur(16px)"
      overflow="hidden"
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.2)"
      {...props}
    >
      {/* Moving shimmer highlight */}
      <Box
        position="absolute"
        inset={0}
        background="linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)"
        backgroundSize="200% 100%"
        animation={`${shimmer} 3.5s infinite linear`}
        pointerEvents="none"
      />

      <HStack spacing={2} position="relative" zIndex={1}>
        <Box
          w="7px"
          h="7px"
          borderRadius="full"
          bg={dotColor}
          animation={`${pulseDot} 2s infinite ease-in-out`}
          boxShadow={`0 0 10px ${dotColor}`}
        />
        <Text
          fontSize="13px"
          fontWeight={600}
          color="white"
          letterSpacing="0.02em"
        >
          {text}
        </Text>
      </HStack>
    </Box>
  );
};
