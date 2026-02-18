import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, ArrowUpRight, LoaderCircle } from './Icons';
import { UPDATES_URL } from '../constants';

export function UpdatesModal({ onClose }: { onClose: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setMobile(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (status === 'loading' || status === 'success') {
        e.preventDefault();
        return;
    }
    // We do NOT prevent default here so the form submits to the iframe
    setStatus('loading');
  };

  const handleIframeLoad = () => {
    if (status === 'loading') {
      setStatus('success');
      setTimeout(onClose, 3000);
    }
  };
  
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
        className="relative w-full max-w-lg bg-white dark:bg-[#0a0a0a] ring-1 ring-zinc-200 dark:ring-white/10 md:rounded-2xl rounded-t-3xl p-8 text-zinc-900 dark:text-white shadow-2xl flex flex-col overflow-hidden max-h-[90vh] overflow-y-auto"
      >
         {/* Noise Overlay */}
         <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

        <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-heading text-2xl uppercase tracking-wide">Receive My Updates</h2>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors ring-1 ring-zinc-200 dark:ring-white/5"
                    aria-label="Close updates modal"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {status === 'success' ? (
              <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500 mb-4 ring-1 ring-green-500/40">
                      <ArrowRight className="w-8 h-8 -rotate-45" />
                  </div>
                  <h3 className="font-heading text-3xl uppercase tracking-wide text-zinc-900 dark:text-white">Subscribed</h3>
                  <p className="font-ui text-xs tracking-widest text-zinc-500 mt-2">Thanks for joining our updates!</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                    <p className="font-body text-zinc-600 dark:text-zinc-400">
                        Fill out the form to receive updates of what God is doing.
                    </p>
                </div>
                
                <form 
                    action="https://opturl.com/h/8ZV0mKwz" 
                    method="post" 
                    target="updates_iframe" 
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="first" className="block font-ui text-[10px] uppercase tracking-widest text-zinc-500 mb-2 pl-1">First Name</label>
                            <input
                                type="text"
                                name="first"
                                id="first"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full bg-zinc-50 dark:bg-[#111] rounded-2xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none ring-1 ring-zinc-200 dark:ring-white/10 focus:ring-zinc-400 dark:focus:ring-white/30 transition-all font-body"
                                placeholder="JANE"
                            />
                        </div>
                        <div>
                            <label htmlFor="last" className="block font-ui text-[10px] uppercase tracking-widest text-zinc-500 mb-2 pl-1">Last Name</label>
                            <input
                                type="text"
                                name="last"
                                id="last"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full bg-zinc-50 dark:bg-[#111] rounded-2xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none ring-1 ring-zinc-200 dark:ring-white/10 focus:ring-zinc-400 dark:focus:ring-white/30 transition-all font-body"
                                placeholder="DOE"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="mobile_number" className="block font-ui text-[10px] uppercase tracking-widest text-zinc-500 mb-2 pl-1">Mobile Number *</label>
                        <input
                            type="tel"
                            name="mobile_number"
                            id="mobile_number"
                            value={mobile}
                            onChange={handlePhoneChange}
                            required
                            data-country="US"
                            className="w-full bg-zinc-50 dark:bg-[#111] rounded-2xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none ring-1 ring-zinc-200 dark:ring-white/10 focus:ring-zinc-400 dark:focus:ring-white/30 transition-all font-body"
                            placeholder="(555) 000-0000"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                         {status === 'loading' ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                <span className="font-ui text-xs font-bold tracking-[0.15em] uppercase">Subscribing...</span>
                            </>
                         ) : (
                            <>
                                <span className="font-ui text-xs font-bold tracking-[0.15em] uppercase">Subscribe</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </>
                         )}
                    </button>

                     <div className="mt-6 text-center">
                        <p className="font-ui text-[9px] leading-relaxed text-zinc-400 dark:text-zinc-600">
                            Message & data rates may apply. Message frequency varies. <br className="hidden md:block"/>
                            <a href="https://clst.io/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-600 dark:hover:text-zinc-400">Terms of Service</a> and <a href="https://clst.io/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-600 dark:hover:text-zinc-400">Privacy Policy</a>. <br className="hidden md:block"/>
                            To opt-out, text STOP at any time.
                        </p>
                    </div>
                </form>
                
                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-white/5 flex justify-center">
                    <a 
                        href={UPDATES_URL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] font-ui uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        <span>Having trouble?</span>
                        <span className="flex items-center gap-1 underline decoration-zinc-300 dark:decoration-white/20 underline-offset-4">Open form in browser <ArrowUpRight className="w-3 h-3" /></span>
                    </a>
                </div>
              </>
            )}
            
            {/* Hidden iframe for handling form submission without redirect */}
            <iframe 
                name="updates_iframe" 
                className="hidden" 
                onLoad={handleIframeLoad} 
                title="submission-target"
            />
        </div>
      </motion.div>
    </div>
  );
}