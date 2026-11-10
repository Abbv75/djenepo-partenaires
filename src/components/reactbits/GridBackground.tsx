import { Box, type BoxProps } from '@chakra-ui/react';

interface GridBackgroundProps extends BoxProps {
  color?: string;
  size?: number;
  opacity?: number;
  fadeMask?: boolean;
}

export const GridBackground = ({
  color = 'rgba(255, 255, 255, 0.08)',
  size = 32,
  opacity = 1,
  fadeMask = true,
  ...props
}: GridBackgroundProps) => {
  return (
    <Box
      position="absolute"
      inset={0}
      pointerEvents="none"
      opacity={opacity}
      backgroundImage={`radial-gradient(${color} 1px, transparent 1px)`}
      backgroundSize={`${size}px ${size}px`}
      style={{
        maskImage: fadeMask
          ? 'radial-gradient(ellipse 65% 65% at 50% 50%, black 30%, transparent 100%)'
          : undefined,
        WebkitMaskImage: fadeMask
          ? 'radial-gradient(ellipse 65% 65% at 50% 50%, black 30%, transparent 100%)'
          : undefined,
      }}
      {...props}
    />
  );
};
