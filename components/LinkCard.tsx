import React, { useRef } from 'react';
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

  const baseDelay = 0.3;
  const staggerDelay = index < 3 ? 0 : (index - 2) * 0.08;

  return (
    <FadeIn delay={baseDelay + staggerDelay} duration={0.6} triggerOnLoad={index < 3}>
      <a
        ref={ref}
        href={link.href}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 md:gap-5 w-full p-4 md:p-5 bg-white dark:bg-[#111] ring-1 ring-zinc-200 dark:ring-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:ring-zinc-300 dark:hover:ring-white/20 shadow-sm dark:shadow-none"
      >
          {/* Background noise overlay */}
          <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/50 via-zinc-100/80 to-zinc-100/50 dark:from-white/0 dark:via-white/[0.02] dark:to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex-shrink-0 p-3 bg-zinc-100 dark:bg-black/50 ring-1 ring-zinc-200 dark:ring-white/10 rounded-xl">
          {Icon ? <Icon className={cn("w-5 h-5 md:w-6 md:h-6 transition-colors text-zinc-900 dark:text-white", link.color)} /> : <Globe className="w-5 h-5 md:w-6 md:h-6 text-zinc-900 dark:text-white" />}
        </div>

        <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center">
          <p className="font-heading text-base md:text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wide truncate group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">{link.title}</p>
          <p className="font-ui text-[9px] md:text-[10px] tracking-widest text-zinc-500 truncate mt-0.5 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">{link.url}</p>
        </div>

        <div className="relative z-10 hidden md:block flex-shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-white/5 ring-1 ring-zinc-200 dark:ring-white/10 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:-rotate-45" />
          </div>
        </div>
      </a>
    </FadeIn>
  );
};