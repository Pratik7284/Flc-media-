/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Book, Globe, Zap, Users, MonitorPlay, Menu, X, Mic, Tv, ChevronLeft, ChevronRight, Newspaper, Clapperboard, Smartphone, HeartPulse, Target, Lightbulb, TrendingUp, Send, Check } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import { ServiceItem, TeamMember } from './types';

// Data from FLC Reference
const SERVICES: ServiceItem[] = [
  { 
    id: '1', 
    name: 'TV Campaigns', 
    category: 'Media Solution', 
    tag: 'Broadcast', 
    image: 'https://images.unsplash.com/photo-1590248463999-f2f6230f2c41?q=80&w=1000&auto=format&fit=crop',
    description: 'Prime-time features, panel discussions, and doctor visibility on major networks to reach millions.'
  },
  { 
    id: '2', 
    name: 'Radio & Audio', 
    category: 'Audio Outreach', 
    tag: 'FM & Podcast', 
    image: 'https://images.unsplash.com/photo-1593697972466-9e67a7b8e1a1?q=80&w=1000&auto=format&fit=crop',
    description: 'Doctor bytes, RJ-led talks, and multilingual capsules. Specialized podcasts for expert insights.'
  },
  { 
    id: '3', 
    name: 'Print Media', 
    category: 'Visual & Text', 
    tag: 'Publications', 
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop',
    description: 'Doctor-written articles and thematic features in national publications providing credibility and depth.'
  },
  { 
    id: '4', 
    name: 'Digital & Social', 
    category: 'Online Growth', 
    tag: 'Engagement', 
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    description: 'Geo-targeted ads, Google My Business optimization, and local outreach strategies to boost engagement.'
  },
  { 
    id: '5', 
    name: 'Cinema Activations', 
    category: 'Big Screen', 
    tag: 'Visuals', 
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000&auto=format&fit=crop',
    description: 'Branded videos, standees, and QR codes in cinema halls for high-impact local awareness.'
  },
  { 
    id: '6', 
    name: 'On-Ground', 
    category: 'Community', 
    tag: 'Events', 
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop',
    description: 'Walkathons, yoga days, and CPR training connecting directly with communities for lasting impact.'
  },
];

// Updated Book List based on provided images
const PUBLISHING_ITEMS = [
  { name: 'Finance for Non Finance', author: 'Vishal Thakkar', desc: 'Empower, Enlighten, and Excel in finance basics.', price: 'Book', color: 'white', accent: 'bg-white/5 border-white/20' },
  { name: 'Dr. Moneywise', author: 'Kiran Telang & Amit Trivedi', desc: 'Perspectives for Women Doctors.', price: 'Book', color: 'emerald', accent: 'bg-emerald-400/10 border-emerald-400/30' },
  { name: 'The Personal Finance Book', author: 'Amar Pandit', desc: 'The ultimate financial guide for Doctors.', price: 'Book', color: 'teal', accent: 'bg-teal-400/10 border-teal-400/30' },
  { name: 'Immunize Your Financial Health', author: 'Amit Trivedi et al.', desc: '#Pandemic #Corona special edition.', price: 'Guide', color: 'white', accent: 'bg-white/5 border-white/20' },
  { name: 'Fintegrity', author: 'Keval Bhanushali', desc: 'Integrity in the world of finance.', price: 'Book', color: 'emerald', accent: 'bg-emerald-400/10 border-emerald-400/30' },
  { name: 'Credit Report Screwed Up?', author: 'Aparna Ramachandra', desc: 'Why is it screwed up and how to fix it.', price: 'Guide', color: 'teal', accent: 'bg-teal-400/10 border-teal-400/30' },
  { name: 'The Happy Rich Advisor', author: 'Amar Pandit', desc: 'Build the wealth management firm of the future.', price: 'Book', color: 'white', accent: 'bg-white/5 border-white/20' },
  { name: "Doc, Who's Prescribing Your Investments?", author: 'Shweta Jain', desc: 'An easy-to-follow guide for individuals taking their first step into investments.', price: 'Book', color: 'teal', accent: 'bg-teal-400/10 border-teal-400/30' },
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Anusha Ramani',
    role: 'Founder & CEO',
    // Professional woman
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    bio: 'Visionary leader and strategist who founded FLC to bring rare, breakthrough ideas to healthcare and lifestyle media.'
  },
  {
    id: '2',
    name: 'Alok Dubey',
    role: 'Business Head',
    // Professional man, glasses
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop',
    bio: 'I bring proven sales experience along with a solid media background, having successfully managed and executed diversified campaigns across TV, radio, digital, print, and on-ground events.',
    fullBio: 'I bring proven sales experience along with a solid media background, having successfully managed and executed diversified campaigns across TV, radio, digital, print, and on-ground events. Over the years, I have delivered integrated media solutions ranging from launch campaigns and brand activations to pocket songs, podcasts, and other innovative formats for multiple pharmaceutical companies and brands. My exposure to handling cross-platform campaigns has given me a strong understanding of market trends, client needs, and result-oriented execution. Academically, I hold a degree in Sales and Marketing from JK College, Ghansoli, Navi Mumbai, which has strengthened my foundation and complements my professional journey.'
  },
  {
    id: '3',
    name: 'Pratik Tiwari',
    role: 'Innovation & Tech Lead',
    // Young man, casual/hoodie vibe
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    bio: 'Drives innovation in digital campaigns, backend systems & AI-powered media tools.'
  },
  {
    id: '4',
    name: 'Maharishi Singh',
    role: 'Social Media Manager',
    // Creative professional
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    bio: 'Creative strategist behind FLC\'s social media presence, designing engaging campaigns, thematic rollouts & influencer collaborations.'
  },
  {
    id: '5',
    name: 'Vivek Dubey',
    role: 'Video Editor Intern',
    // Young creative
    image: 'https://images.unsplash.com/photo-1488161628813-99c974a5cd14?q=80&w=800&auto=format&fit=crop',
    bio: 'A young, passionate creative mind assisting in editing, post-production, and design integration. Brings fresh energy to FLC\'s high-quality video outputs.'
  },
  {
    id: '6',
    name: 'Abrar Khan',
    role: 'Books Publisher',
    // Professional man
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    bio: 'Manages the publishing arm of FLC, ensuring the highest quality in educational books and guides for the medical fraternity.'
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedService) return;
      if (e.key === 'ArrowLeft') navigateService('prev');
      if (e.key === 'ArrowRight') navigateService('next');
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateService = (direction: 'next' | 'prev') => {
    if (!selectedService) return;
    const currentIndex = SERVICES.findIndex(s => s.id === selectedService.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % SERVICES.length;
    } else {
      nextIndex = (currentIndex - 1 + SERVICES.length) % SERVICES.length;
    }
    setSelectedService(SERVICES[nextIndex]);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch("https://formspree.io/f/xanrgwda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(contactForm)
      });

      if (response.ok) {
        setFormStatus('success');
        setContactForm({ name: '', email: '', message: '' });

        // Reset status after delay
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        console.error("Formspree submission failed");
        setFormStatus('idle');
        alert("There was a problem sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setFormStatus('idle');
      alert("There was a problem sending your message. Please try again.");
    }
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#4ade80] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference">
        {/* Logo Section */}
        <div className="flex items-center gap-3 z-50 cursor-default">
           {/* Placeholder for real logo image */}
           {/* <img src="/logo.png" alt="FLC Logo" className="w-10 h-10 object-contain" /> */}
           <div className="flex flex-col leading-none font-heading font-bold tracking-tighter text-white">
              <span className="text-xl md:text-2xl">FOUR LEAF</span>
              <div className="flex items-center gap-1">
                 <span className="text-xl md:text-2xl">CL</span>
                 <span className="text-[#4ade80] text-xl md:text-2xl animate-spin-slow">☘</span>
                 <span className="text-xl md:text-2xl">VER</span>
              </div>
           </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Services', 'About', 'Publishing'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#4ade80] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden md:inline-block border border-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Contact Us
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#022c22]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Services', 'About', 'Publishing'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#4ade80] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="mt-8 border border-white px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-black"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#4ade80] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <span>Media Solutions</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#10b981] rounded-full animate-pulse"/>
            <span>Healthcare</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex flex-col justify-center items-center">
             <h1 className="text-[12vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter text-center font-heading">
                FOUR LEAF
             </h1>
            <GradientText 
              text="CLOVER" 
              as="h1" 
              className="text-[12vw] md:text-[10vw] leading-[0.9] font-black tracking-tighter text-center" 
            />
            {/* Optimized Orb */}
            <motion.div 
               className="absolute -z-20 w-[50vw] h-[50vw] bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 6, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4"
          >
            Educate. Empower. Engage.
          </motion.p>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1, duration: 1 }}
             className="text-sm md:text-base text-gray-400 mt-2 max-w-lg"
          >
            Creating breakthrough patient education campaigns that deliver measurable impact.
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-white text-black z-20 overflow-hidden border-y-4 border-[#064e3b] shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-6xl font-heading font-black px-8 flex items-center gap-4">
                    MEDIA IDEAS <span className="text-[#10b981] text-2xl md:text-4xl">☘</span> 
                    BREAKTHROUGH IMPACT <span className="text-[#10b981] text-2xl md:text-4xl">☘</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* SERVICES SECTION */}
      <section id="services" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
              Our <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#10b981]">Solutions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} onClick={() => setSelectedService(service)} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (Story, Mission, Team) */}
      <section id="about" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        {/* Decorative blurred circle */}
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-[#10b981]/20 rounded-full blur-[40px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          
          {/* Intro Grid: Story & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* The Story */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[#4ade80] text-xl">♣</span>
                <h3 className="font-heading text-2xl font-bold tracking-widest text-white">The Story</h3>
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                Rarity in <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#10b981]">Every Idea</span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                The name comes from the rare four-leaf clover — symbolizing rarity and breakthrough creative ideas in media.
                <br/><br/>
                As the Irish legend goes, finding a four-leaf clover is a rare occurrence. For every 10,000 three-leaf clovers, there is only one four-leaf clover. This scarcity and uniqueness perfectly align with our mission. We are the "four leaf clover" in the media ideas business—a rare find for your marketing efforts.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl backdrop-blur-md">
               <div className="flex items-center gap-2 mb-6">
                <Target className="text-[#10b981] w-6 h-6" />
                <h3 className="font-heading text-xl font-bold tracking-widest text-white">Mission & Vision</h3>
              </div>
              <p className="text-xl md:text-2xl text-white font-medium mb-8 leading-relaxed">
                "To Educate, Empower, and Engage through meaningful and lasting communication in healthcare."
              </p>
              <div className="space-y-4">
                 <p className="text-gray-400 text-sm md:text-base">
                   We aim to build campaigns that not only inform but also create meaningful, lasting connections with audiences, helping our clients achieve their marketing goals with creativity and compliance.
                 </p>
                 <div className="flex gap-2">
                    <span className="px-3 py-1 bg-[#10b981]/20 text-[#4ade80] text-xs font-mono rounded-full border border-[#10b981]/30">Impactful</span>
                    <span className="px-3 py-1 bg-[#10b981]/20 text-[#4ade80] text-xs font-mono rounded-full border border-[#10b981]/30">Accessible</span>
                    <span className="px-3 py-1 bg-[#10b981]/20 text-[#4ade80] text-xs font-mono rounded-full border border-[#10b981]/30">Clear</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-32">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Why Choose Us?</h2>
               <div className="w-24 h-1 bg-[#4ade80] mx-auto" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Globe, title: 'Wide Experience', desc: 'Extensive experience across diverse media channels from TV to digital platforms.' },
                  { icon: Lightbulb, title: 'Breakthrough Ideas', desc: 'Tuned to find exciting, breakthrough ideas that stand out.' },
                  { icon: TrendingUp, title: 'Measurable Results', desc: 'Campaigns designed to deliver real, tracking outcomes.' },
                ].map((item, i) => (
                  <div key={i} className="group p-8 border border-white/10 bg-black/40 hover:bg-[#10b981]/10 transition-all duration-300">
                     <item.icon className="w-10 h-10 text-[#4ade80] mb-6 group-hover:scale-110 transition-transform" />
                     <h4 className="text-xl font-bold font-heading mb-4">{item.title}</h4>
                     <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* Meet The Team */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
               <div>
                  <h2 className="text-5xl md:text-7xl font-heading font-bold mb-4">Meet <br/><span className="text-[#4ade80]">Our Team</span></h2>
                  <p className="text-gray-400 max-w-lg">Creative thinkers, healthcare storytellers, and media innovators – the people behind Four Leaf Clover.</p>
               </div>
               <div className="hidden md:block">
                  <div className="text-right">
                     <div className="text-3xl font-bold text-white">5+</div>
                     <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Core Leaders</div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {TEAM_MEMBERS.map((member) => (
                 <motion.div 
                    key={member.id}
                    whileHover={{ y: -10 }}
                    className="group relative bg-white/5 border border-white/10 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                    data-hover="true"
                 >
                    <div className="aspect-[4/5] overflow-hidden">
                       <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6">
                       <p className="text-[#4ade80] font-mono text-xs uppercase tracking-widest mb-1">{member.role}</p>
                       <h3 className="text-2xl font-bold font-heading text-white mb-2">{member.name}</h3>
                       <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                         {member.bio}
                       </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                       <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                 </motion.div>
               ))}
            </div>
          </div>

        </div>
      </section>

      {/* PUBLISHING SECTION */}
      <section id="publishing" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-8xl font-heading font-bold opacity-20 text-white">
               KNOWLEDGE
             </h2>
             <p className="text-[#4ade80] font-mono uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base">
               Educational Publishing & Guides
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PUBLISHING_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -20 }}
                  className={`relative p-8 md:p-8 border border-white/10 backdrop-blur-md flex flex-col min-h-[350px] transition-colors duration-300 ${item.accent} will-change-transform`}
                  data-hover="true"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                        <Book className="w-8 h-8 text-white/50" />
                        <span className="text-xs font-mono border border-white/20 px-2 py-1 rounded">{item.price}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold mb-2 text-white leading-tight">{item.name}</h3>
                    <p className="text-[#4ade80] text-xs font-mono uppercase tracking-wider mb-4">{item.author}</p>
                    <p className="text-gray-300 leading-relaxed text-sm">
                        {item.desc}
                    </p>
                  </div>
                  
                  <button 
                    className={`w-full py-3 text-xs font-bold uppercase tracking-[0.2em] border border-white/20 transition-all duration-300 mt-6 group overflow-hidden relative text-white cursor-pointer hover:bg-white hover:text-black`}
                  >
                    <span className="relative z-10">
                      View Book
                    </span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0" />
                  </button>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Contact <span className="text-[#4ade80]">Us</span></h2>
             <p className="text-gray-400 max-w-lg mx-auto">Ready to start your breakthrough campaign? Reach out to the Four Leaf Clover team today.</p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
             {/* Decorative blob */}
             <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-[#10b981]/10 rounded-full blur-[80px] pointer-events-none" />

             <form onSubmit={handleContactSubmit} className="relative z-10 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2 group">
                   <label className="text-xs font-mono uppercase tracking-widest text-[#4ade80] ml-1 group-focus-within:text-white transition-colors">Name</label>
                   <input 
                     type="text" 
                     required
                     value={contactForm.name}
                     onChange={(e) => setContactForm(prev => ({...prev, name: e.target.value}))}
                     className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#4ade80] focus:bg-black/60 transition-all"
                     placeholder="Your Name"
                   />
                 </div>
                 <div className="space-y-2 group">
                   <label className="text-xs font-mono uppercase tracking-widest text-[#4ade80] ml-1 group-focus-within:text-white transition-colors">Email</label>
                   <input 
                     type="email" 
                     required
                     value={contactForm.email}
                     onChange={(e) => setContactForm(prev => ({...prev, email: e.target.value}))}
                     className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#4ade80] focus:bg-black/60 transition-all"
                     placeholder="your@email.com"
                   />
                 </div>
               </div>

               <div className="space-y-2 group">
                 <label className="text-xs font-mono uppercase tracking-widest text-[#4ade80] ml-1 group-focus-within:text-white transition-colors">Message</label>
                 <textarea 
                   required
                   rows={5}
                   value={contactForm.message}
                   onChange={(e) => setContactForm(prev => ({...prev, message: e.target.value}))}
                   className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#4ade80] focus:bg-black/60 transition-all resize-none"
                   placeholder="How can we help you?"
                 />
               </div>

               <div className="flex justify-end">
                 <button 
                   type="submit"
                   disabled={formStatus === 'submitting' || formStatus === 'success'}
                   className={`
                     relative px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 overflow-hidden group/btn
                     ${formStatus === 'success' ? 'bg-[#10b981] text-white cursor-default' : 'bg-white text-black hover:scale-105 cursor-pointer'}
                   `}
                 >
                   <span className="relative z-10 flex items-center gap-2">
                     {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? (
                       <>Message Sent <Check className="w-4 h-4" /></>
                     ) : (
                       <>Send Message <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>
                     )}
                   </span>
                   {formStatus !== 'success' && (
                     <div className="absolute inset-0 bg-[#4ade80] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300 ease-out z-0" />
                   )}
                 </button>
               </div>
             </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">FOUR LEAF CLOVER</div>
             <p className="text-gray-400 max-w-sm text-sm mb-4">
               We create breakthrough patient education campaigns that deliver measurable impact.
             </p>
             <div className="flex gap-2 text-xs font-mono text-gray-500">
               <span>© 2025 Four Leaf Clover. All rights reserved.</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">Instagram</a>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#022c22] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#10b981]/10 group/modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateService('prev'); }}
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateService('next'); }}
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedService.id}
                    src={selectedService.image} 
                    alt={selectedService.name} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-[#10b981] mb-4">
                     <MonitorPlay className="w-4 h-4" />
                     <span className="font-mono text-sm tracking-widest uppercase">{selectedService.tag}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedService.name}
                  </h3>
                  
                  <p className="text-lg text-[#4ade80] font-medium tracking-widest uppercase mb-6">
                    {selectedService.category}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedService.description}
                  </p>

                  <div className="flex gap-4">
                     <button className="px-6 py-2 border border-[#4ade80] text-[#4ade80] text-sm font-bold uppercase hover:bg-[#4ade80] hover:text-black transition-colors">
                        Get Details
                     </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

       {/* Team Detail Modal */}
       <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#022c22] border border-white/10 overflow-hidden flex flex-col md:flex-row rounded-2xl shadow-2xl"
            >
               <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                 <h3 className="text-3xl font-heading font-bold text-white mb-1">{selectedMember.name}</h3>
                 <p className="text-[#4ade80] font-mono text-sm uppercase tracking-widest mb-6">{selectedMember.role}</p>
                 
                 <div className="h-px w-10 bg-white/20 mb-6" />
                 
                 <div className="text-gray-300 leading-relaxed text-sm md:text-base overflow-y-auto max-h-[50vh] pr-2 custom-scrollbar">
                   {selectedMember.fullBio || selectedMember.bio}
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
       </AnimatePresence>

    </div>
  );
};

export default App;