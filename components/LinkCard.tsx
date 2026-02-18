import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn';
import { ArrowRight, Globe } from './Icons';
import { LinkItem } from '../types';
import { cn } from '../utils/cn';

interface LinkCardProps {
  link: LinkItem;
  index: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, index, onClick }) => {
  const Icon = link.icon;
  const ref = useRef<HTMLAnchorElement>(null);
  
  // Motion values for the tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 300,
    damping: 30
  });
  const mouseYSpring = useSpring(y, {
    stiffness: 300,
    damping: 30
  });

  // Transform mouse position to rotation values (tilt effect)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseDelay = 0.3;
  const staggerDelay = index < 3 ? 0 : (index - 2) * 0.08;
  
  return (
    <FadeIn delay={baseDelay + staggerDelay} duration={0.6} triggerOnLoad={index < 3}>
      <motion.div
        style={{ perspective: 1000 }}
        className="w-full"
      >
        <motion.a
          ref={ref}
          href={link.href}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="group relative flex items-center gap-5 w-full p-5 bg-white dark:bg-[#111] ring-1 ring-zinc-200 dark:ring-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:ring-zinc-300 dark:hover:ring-white/20 shadow-sm dark:shadow-none"
        >
            {/* Background noise overlay */}
            <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/50 via-zinc-100/80 to-zinc-100/50 dark:from-white/0 dark:via-white/[0.02] dark:to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Inner elements translated on Z axis for parallax depth */}
          <div style={{ transform: "translateZ(25px)" }} className="relative z-10 flex-shrink-0 p-3 bg-zinc-100 dark:bg-black/50 ring-1 ring-zinc-200 dark:ring-white/10 rounded-xl">
            {Icon ? <Icon className={cn("w-6 h-6 transition-colors text-zinc-900 dark:text-white", link.color)} /> : <Globe className="w-6 h-6 text-zinc-900 dark:text-white" />}
          </div>
          
          <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex-1 min-w-0 flex flex-col justify-center">
            <p className="font-heading text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wide truncate group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">{link.title}</p>
            <p className="font-ui text-[10px] tracking-widest text-zinc-500 truncate mt-0.5 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">{link.url}</p>
          </div>
          
          <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-white/5 ring-1 ring-zinc-200 dark:ring-white/10 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:-rotate-45" />
            </div>
          </div>
        </motion.a>
      </motion.div>
    </FadeIn>
  );
};