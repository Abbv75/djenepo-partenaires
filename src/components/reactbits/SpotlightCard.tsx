import { useRef, useState, type MouseEvent } from 'react';
import { Box, type BoxProps } from '@chakra-ui/react';

interface SpotlightCardProps extends BoxProps {
  children: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
}

export const SpotlightCard = ({
  children,
  spotlightColor = 'rgba(63, 124, 226, 0.12)',
  spotlightSize = 350,
  ...props
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Box
      ref={cardRef}
      position="relative"
      overflow="hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition(null);
      }}
      transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
      {...props}
    >
      {/* Radial Spotlight Overlay */}
      {isHovered && mousePosition && (
        <Box
          position="absolute"
          pointerEvents="none"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
          transition="opacity 0.2s ease"
          opacity={1}
          style={{
            background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Content */}
      <Box position="relative" zIndex={2} h="full">
        {children}
      </Box>
    </Box>
  );
};
