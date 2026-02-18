import React from 'react';
import { motion } from 'framer-motion';
import { X, MessageCircle } from './Icons';

interface ContactOptionsModalProps {
  onClose: () => void;
  phoneNumber: string; // e.g., "5129752930"
}

export function ContactOptionsModal({ onClose, phoneNumber }: ContactOptionsModalProps) {
  
  const options = [
    {
      label: 'Text',
      icon: MessageCircle,
      href: `sms:${phoneNumber}`,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
      delay: 0.1
    }
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
        className="relative w-full max-w-sm mx-auto md:mb-0 bg-white dark:bg-[#0a0a0a] ring-1 ring-zinc-200 dark:ring-white/10 md:rounded-2xl rounded-t-3xl p-6 text-zinc-900 dark:text-white shadow-2xl overflow-hidden"
      >
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl uppercase tracking-wide">Contact Options</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors ring-1 ring-zinc-200 dark:ring-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid gap-3">
            {options.map((option) => {
              const Component = option.href ? motion.a : motion.button;
              return (
                <Component
                  key={option.label}
                  href={option.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: option.delay }}
                  download={option.download}
                  className={`flex items-center gap-4 p-4 rounded-xl border ${option.color} transition-transform active:scale-[0.98] w-full text-left`}
                >
                  <div className="p-2 rounded-full bg-white/50 dark:bg-black/20">
                      <option.icon className="w-5 h-5" />
                  </div>
                  <span className="font-heading text-lg uppercase tracking-wide flex-1">{option.label}</span>
                </Component>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}