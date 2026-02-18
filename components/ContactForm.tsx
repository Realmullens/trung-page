import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { X, LoaderCircle, ArrowRight } from './Icons';
import { N8N_WEBHOOK_URL } from '../constants';

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [error, setError] = useState('');

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
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const isValidEmail = (emailToTest: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToTest);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); 

    if (!name || !email) {
      setError('Please fill in your name and email.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (status === 'loading') return;
    
    setStatus('loading');

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone: phone.replace(/[^\d]/g, ''), message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      
      setStatus('success');
      setTimeout(onClose, 2000); 

    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again.');
      console.error('Failed to submit form:', err);
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

      {/* Form Modal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="relative w-full max-w-lg bg-white dark:bg-[#0a0a0a] ring-1 ring-zinc-200 dark:ring-white/10 md:rounded-2xl rounded-t-3xl p-8 text-zinc-900 dark:text-white shadow-2xl overflow-hidden"
      >
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

        <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl uppercase tracking-wide">Exchange Contact</h2>
            <button
                onClick={onClose}
                className="p-2 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-gray-400 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors ring-1 ring-zinc-200 dark:ring-white/5"
                aria-label="Close form"
            >
                <X className="w-5 h-5" />
            </button>
            </div>
            
            {status === 'success' ? (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500 mb-4 ring-1 ring-green-500/40">
                    <ArrowRight className="w-8 h-8 -rotate-45" />
                </div>
                <h3 className="font-heading text-3xl uppercase tracking-wide text-zinc-900 dark:text-white">Sent</h3>
                <p className="font-ui text-xs tracking-widest text-zinc-500 mt-2">We'll be in touch shortly.</p>
            </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                    <label htmlFor="name" className="block font-ui text-[10px] uppercase tracking-widest text-zinc-500 mb-2 pl-1">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-zinc-50 dark:bg-[#111] rounded-2xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none ring-1 ring-zinc-200 dark:ring-white/10 focus:ring-zinc-400 dark:focus:ring-white/30 transition-all font-body"
                        placeholder="JOHN DOE"
                    />
                    </div>
                    <div>
                    <label htmlFor="email" className="block font-ui text-[10px] uppercase tracking-widest text-zinc-500 mb-2 pl-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-zinc-50 dark:bg-[#111] rounded-2xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none ring-1 ring-zinc-200 dark:ring-white/10 focus:ring-zinc-400 dark:focus:ring-white/30 transition-all font-body"
                        placeholder="HELLO@EXAMPLE.COM"
                    />
                    </div>
                </div>
                <div>
                <label htmlFor="phone" className="block font-ui text-[10px] uppercase tracking-widest text-zinc-500 mb-2 pl-1">Phone (Optional)</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={14}
                    className="w-full bg-zinc-50 dark:bg-[#111] rounded-2xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none ring-1 ring-zinc-200 dark:ring-white/10 focus:ring-zinc-400 dark:focus:ring-white/30 transition-all font-body"
                    placeholder="(555) 000-0000"
                />
                </div>
                <div>
                <label htmlFor="message" className="block font-ui text-[10px] uppercase tracking-widest text-zinc-500 mb-2 pl-1">Message (Optional)</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full bg-zinc-50 dark:bg-[#111] rounded-2xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none ring-1 ring-zinc-200 dark:ring-white/10 focus:ring-zinc-400 dark:focus:ring-white/30 transition-all font-body resize-none"
                    placeholder="HOW CAN WE HELP?"
                />
                </div>

                {error && <p className="font-ui text-[10px] text-red-500 dark:text-red-400 uppercase tracking-wider">{error}</p>}
                
                <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                {status === 'loading' && <LoaderCircle className="w-4 h-4 animate-spin" />}
                <span className="font-ui text-xs font-bold tracking-[0.15em] uppercase">{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
                {!status && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </button>
            </form>
            )}
        </div>
      </motion.div>
    </div>
  );
}