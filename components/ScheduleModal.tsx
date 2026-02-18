import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, LoaderCircle } from './Icons';

const SCHEDULE_URL = "https://cal.com/baileymullens?embed=true";

export function ScheduleModal({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center md:items-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="relative w-full max-w-3xl h-[85vh] bg-white dark:bg-[#0a0a0a] ring-1 ring-zinc-200 dark:ring-white/10 md:rounded-2xl rounded-t-3xl p-1 text-zinc-900 dark:text-white shadow-2xl flex flex-col overflow-hidden"
      >
         {/* Noise Overlay */}
         <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

        <div className="relative z-10 flex justify-between items-center p-5 bg-white dark:bg-[#0a0a0a] border-b border-zinc-100 dark:border-white/5">
          <h2 className="font-heading text-xl uppercase tracking-wide">Schedule a Call</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors ring-1 ring-zinc-200 dark:ring-white/5"
            aria-label="Close scheduling modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="relative flex-grow bg-zinc-50 dark:bg-[#111]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoaderCircle className="w-8 h-8 text-zinc-300 dark:text-white/20 animate-spin" />
            </div>
          )}
           <iframe
              src={SCHEDULE_URL}
              onLoad={() => setIsLoading(false)}
              className={`w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              frameBorder="0"
              title="Schedule a Call"
           ></iframe>
        </div>
      </motion.div>
    </div>
  );
}