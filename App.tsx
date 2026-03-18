import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeIn } from './components/FadeIn';
import { LinkCard } from './components/LinkCard';
import { ContactForm } from './components/ContactForm';
import { ContactOptionsModal } from './components/ContactOptionsModal';
import { linksData, HEADSHOT_URL } from './constants';
import { Church, Heart, Settings, ArrowUpRight, Mail } from './components/Icons';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const donationSectionRef = useRef<HTMLDivElement>(null);

  const handleGiveClick = () => {
    donationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black font-body overflow-x-hidden transition-colors duration-300">
      
      {/* Cinematic Dark Background & Texture - Visible only in Dark Mode */}
      <div className="fixed inset-0 z-[-1] hidden dark:block">
         {/* Video Background with heavy overlay */}
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 scale-105">
          <source
            src="https://videos.pexels.com/video-files/32399542/13820720_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Heavy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black"></div>
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay"></div>
      </div>

       {/* Light Mode Background Texture */}
       <div className="fixed inset-0 z-[-1] block dark:hidden bg-zinc-50">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
       </div>
      
      <main className="relative w-full px-4 py-12 md:max-w-6xl md:mx-auto md:flex md:gap-12 md:items-start md:py-20">
        
        {/* Left Column: Profile (Sticky on Desktop) */}
        <div className="md:w-1/3 md:sticky md:top-24 flex flex-col">
          
          {/* Profile Header */}
          <FadeIn delay={0} duration={0.7} className="relative">
            {/* Profile Photo */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden ring-1 ring-zinc-200 dark:ring-white/10 shadow-xl dark:shadow-2xl bg-zinc-100 dark:bg-black group">
              <img
                src={HEADSHOT_URL}
                alt="Trung Nguyên"
                className="w-full h-full object-cover object-[center_25%] scale-105 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10 shadow-sm">
                <Church className="w-3 h-3 text-zinc-700 dark:text-white/70" />
                <span className="font-ui text-[10px] tracking-widest uppercase text-zinc-800 dark:text-white/90">Lead Developer</span>
              </div>
            </div>
          </FadeIn>

          {/* Profile Info - Reduced margin top */}
          <FadeIn delay={0.1} duration={0.7} className="mt-6 pl-2">
            <h1 className="font-heading text-5xl font-bold uppercase leading-[0.9] text-zinc-900 dark:text-white tracking-tight">
              Trung<br/>Nguyên
            </h1>
            <div className="mt-4 space-y-1">
              <p className="font-ui text-xs tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400">
                Lead Developer
              </p>
               <p className="font-body text-sm text-zinc-600 dark:text-zinc-500 leading-relaxed max-w-xs">
                Serving with Divine Creative Ministries. 501c(3) Non-Profit Organization.
              </p>
            </div>
          </FadeIn>

          {/* Action Buttons - Reduced margin top */}
          <FadeIn delay={0.3} duration={0.7} className="flex gap-3 w-full mt-6">
            <button 
              onClick={handleGiveClick}
              className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 group shadow-lg dark:shadow-none"
            >
              <Heart className="w-4 h-4 transition-transform group-hover:scale-110 group-hover:text-red-500 dark:group-hover:text-red-400" />
              <span className="font-ui text-xs font-bold tracking-[0.15em] uppercase">Partner</span>
            </button>
            <button 
              onClick={() => setIsContactMenuOpen(true)}
              aria-label="Contact Options"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-white/5 ring-1 ring-zinc-200 dark:ring-white/10 hover:bg-zinc-50 dark:hover:bg-white/10 transition-all duration-300 text-zinc-900 dark:text-white shadow-lg dark:shadow-none"
            >
              <Mail className="w-5 h-5" />
            </button>
          </FadeIn>
        </div>

        {/* Right Column: Content (Scrollable) */}
        <div className="mt-12 md:mt-0 md:w-2/3 space-y-16">
          
          {/* Links Section */}
          <div>
             <div className="mb-6 flex items-end gap-4 px-2">
                <h2 className="font-heading text-2xl uppercase tracking-wide text-zinc-900 dark:text-white/90">Directory</h2>
                <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-white/10 mb-2"></div>
             </div>
             <div className="grid gap-3">
              {linksData.map((link, i) => (
                <LinkCard 
                  key={link.id} 
                  link={link} 
                  index={i} 
                />
              ))}
             </div>
          </div>

          {/* Video Section */}
          <div>
            <div className="mb-6 flex items-end gap-4 px-2">
              <h2 className="font-heading text-2xl uppercase tracking-wide text-zinc-900 dark:text-white/90">Watch</h2>
              <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-white/10 mb-2"></div>
            </div>
            <FadeIn delay={0.5} duration={0.7}>
              <div className="relative overflow-hidden rounded-3xl bg-black ring-1 ring-zinc-200 dark:ring-white/10 shadow-2xl">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://www.youtube.com/embed/fIlJsWKZ7lk"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube Video"
                  ></iframe>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Donation Section */}
          <div ref={donationSectionRef} className="scroll-mt-24">
            <FadeIn delay={0.66} duration={0.7}>
              <div className="mb-6 flex items-end gap-4 px-2">
                <h2 className="font-heading text-2xl uppercase tracking-wide text-zinc-900 dark:text-white/90">Partner</h2>
                <div className="flex-1 pb-2">
                  <p className="font-ui text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest opacity-70 text-right mb-1">
                    All donations are Tax Deductible
                  </p>
                  <div className="h-[1px] w-full bg-zinc-200 dark:bg-white/10"></div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0a0a0a] ring-1 ring-zinc-200 dark:ring-white/10 shadow-2xl h-[600px]">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
                 <iframe
                    src="https://subsplash.com/u/-FD5WMN/give?fund_id=72fe22bd-6a81-4291-a86d-3c2a10b7dea9&frequency=monthly&embed=true"
                    className="relative z-10 w-full h-full"
                    frameBorder="0"
                    title="Donation Form"
                 ></iframe>
              </div>
              
              <div className="flex justify-center mt-8">
                <a
                  href="https://subsplash.com/u/-FD5WMN/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white dark:bg-zinc-900/80 px-8 py-4 text-zinc-900 dark:text-white ring-1 ring-zinc-200 dark:ring-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group backdrop-blur-md shadow-lg dark:shadow-none"
                >
                  <Settings className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                  <span className="font-ui text-xs tracking-[0.15em] uppercase text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white">Manage Giving Account</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Personal Contact Info */}
          <FadeIn delay={0.75} duration={0.7}>
            <div className="py-8 border-t border-zinc-200 dark:border-white/10">
              <h2 className="font-heading text-xl uppercase tracking-wide text-zinc-900 dark:text-white mb-6 px-2">Personal Contact Info</h2>
              <div className="px-2">
                <div className="flex flex-col gap-3">
                   <p className="font-heading text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">Trung Nguyên</p>
                   <div className="flex flex-col gap-1">
                    <a href="mailto:hello@divinecreative.org" className="font-ui text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">hello@divinecreative.org</a>
                   </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Footer */}
          <FadeIn delay={0.8} className="text-center py-8 opacity-40 hover:opacity-100 transition-opacity duration-500 border-t border-zinc-200 dark:border-white/5 pt-8">
            <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-zinc-900 dark:text-white">
              Divine Creative Ministries © {new Date().getFullYear()}
            </p>
          </FadeIn>

        </div>
      </main>

      <AnimatePresence>
        {isFormOpen && <ContactForm onClose={() => setIsFormOpen(false)} />}
        {isContactMenuOpen && (
          <ContactOptionsModal
            onClose={() => setIsContactMenuOpen(false)}
            email="hello@divinecreative.org"
          />
        )}
      </AnimatePresence>
    </div>
  );
}