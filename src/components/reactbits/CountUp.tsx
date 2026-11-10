import { useEffect, useRef, useState } from 'react';
import { Text, type TextProps } from '@chakra-ui/react';
import { useInView } from 'framer-motion';

interface CountUpProps extends TextProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}

export const CountUp = ({
  to,
  from = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  separator = '',
  ...props
}: CountUpProps) => {
  const [current, setCurrent] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(from + (to - from) * easedProgress);
      setCurrent(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrent(to);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, from, to, duration]);

  const formattedValue = separator ? current.toLocaleString() : current.toString();

  return (
    <Text as="span" ref={ref} {...props}>
      {prefix}
      {formattedValue}
      {suffix}
    </Text>
  );
};
