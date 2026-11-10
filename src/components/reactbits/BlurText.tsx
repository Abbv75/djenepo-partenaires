import { motion } from 'framer-motion';
import { Box, type BoxProps } from '@chakra-ui/react';

interface BlurTextProps extends BoxProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  duration?: number;
}

export const BlurText = ({
  text,
  delay = 0.08,
  animateBy = 'words',
  duration = 0.5,
  ...boxProps
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: 12,
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <Box
      as={motion.span}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      display="inline-block"
      {...boxProps}
    >
      {elements.map((el, i) => (
        <span key={i} style={{ display: 'inline-block' }}>
          <motion.span
            variants={childVariants}
            style={{ display: 'inline-block' }}
          >
            {el}
          </motion.span>
          {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Box>
  );
};
