import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children?: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'none';
  duration?: number;
  triggerOnLoad?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  duration = 0.8,
  triggerOnLoad = false,
}) => {
  const yOffset = direction === 'up' ? 40 : direction === 'down' ? -40 : 0;

  const animationTriggerProps = triggerOnLoad
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px" },
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
      style={{ maxWidth: '100%', overflow: 'hidden' }}
      {...animationTriggerProps}
    >
      {children}
    </motion.div>
  );
};