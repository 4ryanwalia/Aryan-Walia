import Head from 'next/head';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';



// Typewriter effect hook
function useTypewriter(strings, speed = 40, backSpeed = 20, loop = true) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= strings.length && !loop) return;
    const current = strings[index % strings.length];
    if (!deleting && subIndex < current.length) {
      setTimeout(() => setSubIndex(subIndex + 1), speed);
    } else if (deleting && subIndex > 0) {
      setTimeout(() => setSubIndex(subIndex - 1), backSpeed);
    } else if (!deleting && subIndex === current.length) {
      setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => i + 1);
    }
    setText(current.substring(0, subIndex));
  }, [subIndex, deleting, index, strings, speed, backSpeed, loop]);
  return text;
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  

  
  // Scroll animations
  const containerRef = useRef(null);

  const projects = [
    {
      title: 'WhisperDesk – Smart Complaint Management System',
      description: `WhisperDesk is a role-based complaint management system built with Spring Boot, JWT Auth, MySQL, and a custom HTML/CSS/JS frontend. It streamlines how employees file complaints and how managers/admins handle them, with support for anonymous submissions, real-time status updates, and role-based dashboards.`,
      features: [
        'Employee: Register/login, file complaints (anonymous option), track status',
        'Manager: View/manage department complaints, update status, add feedback',
        'Admin: View all complaints, manage users, see hidden complaints',
        'Security: JWT authentication, role-based access, encrypted passwords'
      ],
      tech: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'JWT', 'HTML', 'CSS', 'JavaScript', 'Postman'],
      image: 'https://private-user-images.githubusercontent.com/174216567/433117573-210f6549-84d1-4992-95a4-16ef64ad7821.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTIxMTUwMjksIm5iZiI6MTc1MjExNDcyOSwicGF0aCI6Ii8xNzQyMTY1NjcvNDMzMTE3NTczLTIxMGY2NTQ5LTg0ZDEtNDk5Mi05NWE0LTE2ZWY2NGFkNzgyMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNzEwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDcxMFQwMjMyMDlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kZWIzMzAxOTBiMGNjNWIyMmVhYzVjNGQ3MTNiMDllMmM0NjMwZTAwYTNmNzk5NjcyYzljODhhNjUyZDNjMWU4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.2uErFBiaNcSP6snjQA1dWCp3IABXp8hDkcdylJLhwIc',
      github: 'https://github.com/4ryanwalia/WhisperDesk'
    }
    // Add more projects here
  ];

const typewriterText = useTypewriter([
  '> Building the future...',
  '> Code. Create. Innovate.',
  '> Security First.',
  '> AI-Powered Solutions.',
  '> Next-Gen Development.'
], 40, 20, true);

  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + 'px monospace';
      ctx.fillStyle = '#2cb67d';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    let interval = setInterval(draw, 50);
    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    });
    return () => clearInterval(interval);
  }, []);

  // Ultra Advanced cursor trail effect with multiple elements
  useEffect(() => {
    let cursorTrail, cursorTrail2, cursorTrail3, cursorTrail4;
    try {
      cursorTrail = document.getElementById('cursor-trail');
      cursorTrail2 = document.getElementById('cursor-trail-2');
      cursorTrail3 = document.getElementById('cursor-trail-3');
      cursorTrail4 = document.getElementById('cursor-trail-4');
    } catch (e) {
      return;
    }
    if (!cursorTrail || !cursorTrail2 || !cursorTrail3 || !cursorTrail4) return;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Update mouse position state
      setMousePosition({ x, y });
      
      // Main cursor trail
      cursorTrail.style.left = x - 8 + 'px';
      cursorTrail.style.top = y - 8 + 'px';
      
      // Secondary trails with different delays
      cursorTrail2.style.left = x - 4 + 'px';
      cursorTrail2.style.top = y - 4 + 'px';
      
      cursorTrail3.style.left = x - 2 + 'px';
      cursorTrail3.style.top = y - 2 + 'px';
      
      cursorTrail4.style.left = x - 6 + 'px';
      cursorTrail4.style.top = y - 6 + 'px';
      
      // Add magnetic effect to interactive elements
      let interactiveElements;
      try {
        interactiveElements = document.querySelectorAll('a, button, [data-tilt]');
      } catch (e) {
        interactiveElements = [];
      }
      interactiveElements.forEach(el => {
        try {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          if (distance < 100) {
            const angle = Math.atan2(y - centerY, x - centerX);
            const force = (100 - distance) / 100;
            el.style.transform = `translate(${Math.cos(angle) * force * 5}px, ${Math.sin(angle) * force * 5}px)`;
          } else {
            el.style.transform = 'translate(0, 0)';
          }
        } catch (e) {
          // Ignore errors for elements that may not be visible
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Advanced scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      
      // Parallax effect for background elements
      const scrolled = scrollPosition / window.innerHeight;
      let backgroundElements;
      try {
        backgroundElements = document.querySelectorAll('.animate-holographic-matrix');
      } catch (e) {
        backgroundElements = [];
      }
      backgroundElements.forEach((el, index) => {
        try {
          const speed = (index + 1) * 0.5;
          const yPos = scrolled * speed * 100;
          el.style.transform = `translateY(${yPos}px) rotate(${45 + index * 15 + scrolled * 10}deg)`;
        } catch (e) {
          // Ignore errors for elements that may not be visible
        }
      });
      
      // Determine current section
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const currentSectionIndex = Math.floor(scrollPosition / window.innerHeight);
      setCurrentSection(sections[currentSectionIndex] || 'hero');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect for background elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      let holographicElements;
      try {
        holographicElements = document.querySelectorAll('.animate-hologram');
      } catch (e) {
        holographicElements = [];
      }
      holographicElements.forEach((el, index) => {
        try {
          const speed = (index + 1) * 0.5;
          el.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${45 + index * 15}deg)`;
        } catch (e) {
          // Ignore errors for elements that may not be visible
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interactive particle system
  useEffect(() => {
    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
      particle.style.borderRadius = '50%';
      particle.style.position = 'fixed';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        document.body.removeChild(particle);
      }, 2000);
    };

    const handleClick = (e) => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createParticle(e.clientX, e.clientY);
        }, i * 100);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Advanced scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    let elements;
    try {
      elements = document.querySelectorAll('.scroll-reveal');
    } catch (e) {
      elements = [];
    }
    elements.forEach(el => {
      try {
        observer.observe(el);
      } catch (e) {
        // Ignore errors for elements that may not be visible
      }
    });

    return () => observer.disconnect();
  }, []);

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Content loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Aryan Walia - Full-Stack Developer</title>
        <meta name="description" content="Full-Stack Developer specializing in Android, Web, and AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Advanced Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
              />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-cyan-400 mb-2"
              >
                Initializing System
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-400"
              >
                Loading quantum interface...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

              <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] text-white font-sans relative overflow-hidden">
        {/* Ultra Advanced 4D Background System */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Dynamic Neural Network Grid */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,255,255,0.3)" strokeWidth="0.5"/>
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Quantum Field Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60 animate-quantum-field"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40 animate-quantum-field" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50 animate-quantum-field" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-30 animate-quantum-field" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-40 animate-quantum-field" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-30 animate-quantum-field" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute top-1/5 left-2/3 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-35 animate-quantum-field" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse opacity-25 animate-quantum-field" style={{animationDelay: '3.5s'}}></div>
          
          {/* Holographic Matrix */}
          <div className="absolute top-1/6 right-1/6 w-16 h-16 border border-cyan-400/20 rounded-lg rotate-45 animate-holographic-matrix"></div>
          <div className="absolute bottom-1/6 left-1/6 w-12 h-12 border border-purple-400/20 rounded-full animate-holographic-matrix" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-1/3 w-8 h-8 border border-blue-400/20 rotate-12 animate-holographic-matrix" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/4 w-10 h-10 border border-pink-400/20 rotate-30 animate-holographic-matrix" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/4 left-1/3 w-14 h-14 border border-green-400/20 rotate-60 animate-holographic-matrix" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/5 right-1/3 w-6 h-6 border border-yellow-400/20 rotate-90 animate-holographic-matrix" style={{animationDelay: '2.5s'}}></div>
          
          {/* Energy Vortex */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent animate-energy-vortex"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/5 via-transparent to-transparent animate-energy-vortex" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-0 w-32 h-32 bg-gradient-to-r from-blue-400/5 via-transparent to-transparent animate-energy-vortex" style={{animationDelay: '2s'}}></div>
          
          {/* Plasma Field */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-cyan-400/5 animate-plasma-field"></div>
          
          {/* Interactive cursor trail with multiple elements */}
          <div id="cursor-trail" className="fixed w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full pointer-events-none opacity-50 blur-sm z-50 transition-transform duration-100"></div>
          <div id="cursor-trail-2" className="fixed w-2 h-2 bg-pink-400 rounded-full pointer-events-none opacity-30 blur-sm z-50 transition-transform duration-200" style={{animationDelay: '0.1s'}}></div>
          <div id="cursor-trail-3" className="fixed w-1 h-1 bg-blue-400 rounded-full pointer-events-none opacity-20 blur-sm z-50 transition-transform duration-300" style={{animationDelay: '0.2s'}}></div>
          <div id="cursor-trail-4" className="fixed w-3 h-3 bg-green-400 rounded-full pointer-events-none opacity-15 blur-sm z-50 transition-transform duration-150" style={{animationDelay: '0.05s'}}></div>
          
          {/* Magnetic Field Lines */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="magnetic" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0,255,255,0.3)"/>
                  <stop offset="50%" stopColor="rgba(138,43,226,0.3)"/>
                  <stop offset="100%" stopColor="rgba(0,255,255,0.3)"/>
                </linearGradient>
              </defs>
              <path d="M 10 10 Q 50 20 90 10 M 10 30 Q 50 40 90 30 M 10 50 Q 50 60 90 50 M 10 70 Q 50 80 90 70 M 10 90 Q 50 100 90 90" 
                    stroke="url(#magnetic)" strokeWidth="0.5" fill="none" className="animate-magnetic-field"/>
            </svg>
          </div>
        </div>
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[#363636] bg-black/20 backdrop-blur-md relative z-10">
                      <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
                  <g clipPath="url(#clip0_6_535)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_535">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Aryan Walia</h2>
              </div>
            </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <a href="#about" className="text-sm font-medium hover:text-cyan-400 transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#skills" className="text-sm font-medium hover:text-cyan-400 transition-colors relative group">
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#projects" className="text-sm font-medium hover:text-cyan-400 transition-colors relative group">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-cyan-400 transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </nav>
            <Link href="/resume" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-sm font-bold px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Resume
            </Link>
          </div>



          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>





        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#363636] border-b border-[#555]">
            <nav className="flex flex-col px-6 py-4 space-y-4">
              <a 
                href="#about" 
                className="text-sm font-medium hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#skills" 
                className="text-sm font-medium hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Skills
              </a>
              <a 
                href="#projects" 
                className="text-sm font-medium hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="text-sm font-medium hover:text-gray-300 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Link href="/resume" className="bg-black hover:bg-gray-800 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors w-fit">
                Resume
              </Link>
            </nav>
          </div>
        )}

        <main className="max-w-6xl mx-auto px-6 md:px-10 py-8">
          {/* Hero Section with Slide Animations */}
          <motion.section 
            className="relative min-h-[600px] rounded-2xl overflow-hidden mb-16 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] border border-[#333] shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced Matrix code rain animation */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <canvas id="matrix-canvas" className="w-full h-full" />
            </div>
            
            {/* AI Network Grid Overlay */}
            <div className="absolute inset-0 z-5 pointer-events-none opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)`
              }}></div>
            </div>
            
            {/* Glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            
            <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto px-4 py-20">
              <motion.div 
                className="flex items-center justify-center gap-4 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* AI Brain Icon with advanced effects */}
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 animate-pulse"></div>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white relative z-10">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                  </svg>
                </motion.div>
                <motion.h1 
                  className="text-white text-5xl md:text-7xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-text-reveal"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Aryan Walia
                </motion.h1>
              </motion.div>
              
              <p className="text-[#adadad] text-xl md:text-2xl max-w-[700px] leading-relaxed mt-4 font-light animate-text-slide-up">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent font-semibold">Tech Enthusiast</span> & 
                <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent font-semibold"> Developer</span> 
                — Building secure, intelligent applications for the future. 🚀
              </p>
              

              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#projects" className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-300 ring-2 ring-cyan-400/40 hover:ring-cyan-400/80 transform hover:scale-105">
                  🔐 Explore My Work
                </a>
                <a href="#contact" className="inline-block bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                  🤝 Connect With Me
                </a>

              </div>
            </div>
          </motion.section>

          {/* About Section */}
          <section id="about" className="mb-16 scroll-reveal">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-[#333] shadow-xl neural-dots">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">About Me</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-gray-300">
                    I&apos;m <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent font-semibold">Aryan Walia</span> — a forward-thinking developer with expertise in <span className="text-cyan-400 font-semibold">AI, Machine Learning, and Cybersecurity</span>. Currently pursuing my MCA at NMIMS, I specialize in creating intelligent, secure, and user-centric applications.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-300">
                    My technical arsenal includes <span className="text-purple-400 font-semibold">Java, Kotlin, React, Firebase</span>, and advanced database systems. I focus on building practical solutions that leverage cutting-edge AI technologies while maintaining robust security protocols.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#333]">
                    <h3 className="text-cyan-400 font-semibold mb-2">🎯 Current Focus</h3>
                    <p className="text-gray-300 text-sm">AI Integration, Ethical Hacking, Smart Mobile Applications</p>
                  </div>
                  <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#333]">
                    <h3 className="text-purple-400 font-semibold mb-2">🚀 Beyond Tech</h3>
                    <p className="text-gray-300 text-sm">Fitness enthusiast, Badminton player, Emerging tech researcher</p>
                  </div>
                  <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#333]">
                    <h3 className="text-blue-400 font-semibold mb-2">🔐 Mission</h3>
                    <p className="text-gray-300 text-sm">Building secure, intelligent technology for tomorrow&apos;s challenges</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Skills Section */}
          <section id="skills" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">🛠️ Technical Skills</h2>
            
            {/* Languages & Programming */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Languages & Programming</h3>
              <div className="flex flex-wrap gap-3">
                {['Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL', 'NoSQL'].map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-[#363636] hover:bg-[#555] px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Frameworks & Tools */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Frameworks & Tools</h3>
              <div className="flex flex-wrap gap-3">
                {['React', 'Firebase', 'Spring Boot', 'Cloudinary', 'Postman', 'Git'].map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-[#363636] hover:bg-[#555] px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile & Platforms */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Mobile & Platforms</h3>
              <div className="flex flex-wrap gap-3">
                {['Android Studio', 'Room DB', 'Flutter', 'Eclipse'].map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-[#363636] hover:bg-[#555] px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Database */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Database</h3>
              <div className="flex flex-wrap gap-3">
                {['MySQL', 'Firebase Realtime DB', 'Firestore', 'SQL', 'NoSQL'].map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-[#363636] hover:bg-[#555] px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Others */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Others</h3>
              <div className="flex flex-wrap gap-3">
                {['UI/UX Thinking', 'REST APIs', 'Version Control', 'Debugging'].map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-[#363636] hover:bg-[#555] px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </section>

 {/* Main Project Section */}
<section className="mb-16 scroll-reveal">
  <h2 className="text-2xl font-bold mb-6 text-gradient-animated">🚀 Main Project</h2>
  <div className="bg-gradient-to-br from-[#363636] to-[#2a2a2a] rounded-2xl p-6 md:p-8 border border-[#555] shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] backdrop-blur-sm group" style={{
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  }} data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-perspective="1000">
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Wake Me</h3>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">Live on Play Store</span>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            A smart alarm app with sleep detection, quick alarms, and advanced security features. 
            Built with Firebase Realtime Database for seamless data sync.
          </p>
        </div>

     {/* Features Grid */} <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> <div className="bg-[#232323] p-4 rounded-xl border border-[#444] hover:scale-105 transition-all duration-300 cursor-pointer" style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)', }}> <div className="flex items-center gap-3 mb-2"> <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"> <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/> </svg> </div> <h4 className="font-semibold text-white">Smart Sleep Detection</h4> </div> <p className="text-gray-400 text-sm">Phone activity monitoring for intelligent wake-up timing</p> </div> <div className="bg-[#232323] p-4 rounded-lg border border-[#444]"> <div className="flex items-center gap-3 mb-2"> <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center"> <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/> </svg> </div> <h4 className="font-semibold text-white">Quick Alarm</h4> </div> <p className="text-gray-400 text-sm">Instant alarm setting with one-tap functionality</p> </div> <div className="bg-[#232323] p-4 rounded-lg border border-[#444]"> <div className="flex items-center gap-3 mb-2"> <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center"> <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/> </svg> </div> <h4 className="font-semibold text-white">Advanced Security</h4> </div> <p className="text-gray-400 text-sm">Robust security measures to protect user data</p> </div> <div className="bg-[#232323] p-4 rounded-lg border border-[#444]"> <div className="flex items-center gap-3 mb-2"> <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center"> <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/> </svg> </div> <h4 className="font-semibold text-white">Firebase Integration</h4> </div> <p className="text-gray-400 text-sm">Real-time database sync across devices</p> </div> </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {['Android', 'Java/Kotlin', 'Firebase', 'Realtime DB', 'Phone Activity API', 'Security'].map((tech, index) => (
            <span key={index} className="bg-[#1a1a1a] text-xs px-3 py-1 rounded-full text-gray-300 border border-[#444]">
              {tech}
            </span>
          ))}
        </div>

        {/* ✅ Updated Button */}
        <a 
          href="https://play.google.com/store/apps/details?id=makeme.aryan.makeme" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            📲 Live on Play Store
          </button>
        </a>
      </div>

      {/* App Preview Section (same) */}
      <div className="w-full md:w-80 h-64 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Wake Me App Logo" 
              className="w-full h-full object-contain rounded-2xl shadow-lg"
            />
          </div>
          <p className="text-white font-bold text-lg">Wake Me</p>
          <p className="text-white/80 text-sm mt-1">Smart Alarm App</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Projects Section with Slide-Sync Skeleton Loader */}
          <section id="projects" className="mb-16 relative scroll-reveal">
            {/* Animated Gradient Bar */}
            <div className="hidden md:block absolute left-0 top-0 h-full w-2 rounded-full bg-gradient-to-b from-[#7f5af0] via-[#2cb67d] to-[#00c6fb] animate-gradientMove" style={{zIndex:1}} />
            <h2 className="text-2xl font-bold mb-6 pl-0 md:pl-6 text-gradient-animated">Projects</h2>
            
            {/* Skeleton Loader */}
            <AnimatePresence>
              {!isContentLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-12 md:space-y-10"
                >
                  {[1, 2, 3].map((index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="flex flex-col md:flex-row gap-6 items-start bg-[#232323] border border-[#363636] rounded-2xl p-6 md:p-8"
                      style={{ minHeight: '220px' }}
                    >
                      <div className="flex-1 space-y-4">
                        <div className="h-6 bg-[#363636] rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-[#363636] rounded animate-pulse w-full"></div>
                        <div className="h-4 bg-[#363636] rounded animate-pulse w-5/6"></div>
                        <div className="flex flex-wrap gap-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-6 bg-[#363636] rounded-full animate-pulse w-16"></div>
                          ))}
                        </div>
                        <div className="h-10 bg-[#363636] rounded-full animate-pulse w-32"></div>
                      </div>
                      <div className="w-full md:w-64 h-48 bg-[#363636] rounded-xl animate-pulse"></div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            {/* Actual Projects Content */}
            <AnimatePresence>
              {isContentLoaded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12 md:space-y-10 relative z-10"
                >
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1
                      }}
                      whileHover={{ 
                        y: -5, 
                        transition: { duration: 0.2 }
                      }}
                      className="flex flex-col md:flex-row gap-6 items-start bg-gradient-to-br from-[#232323] to-[#1a1a1a] border border-[#363636] rounded-2xl shadow-xl hover:shadow-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden group"
                      style={{ 
                        minHeight: '220px'
                      }}
                    >
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex-1 space-y-4 relative z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
                      >
                        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-500">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">{project.description}</p>
                        
                        {/* Tech stack badges with enhanced styling */}
                        {project.tech && (
                          <motion.div 
                            className="flex flex-wrap gap-2 mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                          >
                            {project.tech.map((tech, i) => (
                              <motion.span 
                                key={i} 
                                className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] text-xs px-3 py-1.5 rounded-full text-gray-200 border border-[#363636] hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 cursor-default"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 + i * 0.05 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </motion.div>
                        )}
                        
                        {/* Features with enhanced styling */}
                        {project.features && (
                          <motion.ul 
                            className="list-none text-xs text-gray-400 space-y-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                          >
                            {project.features.map((f, i) => (
                              <motion.li 
                                key={i}
                                className="flex items-start gap-2 before:content-['▸'] before:text-cyan-400 before:font-bold before:flex-shrink-0 before:mt-0.5"
                                initial={{ opacity: 0, x: -5 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 + i * 0.05 }}
                              >
                                {f}
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </motion.div>
                      {/* View Project / GitHub button with enhanced animations */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                      >
                        {project.github && project.github !== '#' && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] hover:from-[#2cb67d] hover:to-[#7f5af0] text-white font-medium px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 group/btn"
                            whileHover={{ 
                              scale: 1.05, 
                              y: -2,
                              boxShadow: "0 20px 40px rgba(127, 90, 240, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span>View on GitHub</span>
                            <motion.svg 
                              className="w-4 h-4" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              initial={{ x: 0 }}
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </motion.svg>
                          </motion.a>
                        )}
                      </motion.div>
                    </div>
                    <motion.div
                      className="w-full md:w-64 h-48 bg-cover bg-center rounded-xl flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                      style={{ backgroundImage: `url(${project.image})` }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                  </motion.div>
                ))}
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Experience Timeline with Slide Animations */}
          <section id="experience" className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gradient-animated">🚀 Experience Timeline</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600"></div>
              
              {/* Timeline items */}
              <div className="space-y-12">
                {[
                  {
                    year: "2024 - Present",
                    title: "Master of Computer Applications (MCA)",
                    company: "MPSTME, NMIMS University",
                    description: "Latest SGPA: 8.33 (Semester 2) - Focus on AI, Machine Learning, and Advanced Computer Applications",
                    icon: "🎓"
                  },
                  {
                    year: "2021 - 2024",
                    title: "Bachelor of Computer Applications (BCA)",
                    company: "The NorthCap University, Gurugram",
                    description: "CGPA: 7.11 - Comprehensive foundation in computer science and programming",
                    icon: "💻"
                  },
                  {
                    year: "2021",
                    title: "Senior Secondary (Class 12)",
                    company: "CBSE Board",
                    description: "Percentage: 86.8% - Commerce stream",
                    icon: "📚"
                  },
                  {
                    year: "Jul 2022 - Aug 2022",
                    title: "Web Development Intern",
                    company: "Headway, Innov8, Saket, New Delhi",
                    description: "Designed responsive UIs for multiple brand websites using HTML/CSS. Enhanced user experience by developing responsive website layouts and implementing cross-browser compatibility",
                    icon: "🌐"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full border-4 border-[#1a1a1a] z-10"></div>
                    
                    {/* Content */}
                    <div className="ml-16 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 rounded-2xl border border-[#333] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold text-white">{item.title}</h3>
                          <p className="text-cyan-400 font-medium">{item.company}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                      <div className="mt-3">
                        <span className="text-xs text-gray-500 bg-[#0a0a0a] px-2 py-1 rounded-full">{item.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>



          {/* Contact Section */}
          <section id="contact" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Contact Me</h2>
            <div className="flex flex-col items-center gap-8">
              <div className="flex gap-8">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/aryan-w-96aa551bb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-full bg-[#232323] p-5 shadow-lg hover:bg-[#0077b5] transition-all duration-300 flex items-center justify-center animate-glow"
                  title="Connect on LinkedIn"
                >
                  <svg width="36" height="36" fill="none" viewBox="0 0 48 48" className="text-[#0077b5] group-hover:text-white transition-colors duration-300"><rect width="48" height="48" rx="12" fill="currentColor"/><path d="M17.5 19h-3v10h3V19zm-1.5-1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5.5 1.5h-3v10h3v-5.5c0-1.1.9-2 2-2s2 .9 2 2V29h3v-5.5c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5V29h3v-5.5c0-1.1.9-2 2-2s2 .9 2 2V29h3v-5.5c0-2.5-2-4.5-4.5-4.5z" fill="#fff"/></svg>
                </a>
                {/* GitHub */}
                <a
                  href="https://github.com/4ryanwalia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-full bg-[#232323] p-5 shadow-lg hover:bg-[#333] transition-all duration-300 flex items-center justify-center animate-glow"
                  title="View GitHub Profile"
                >
                  <svg width="36" height="36" fill="none" viewBox="0 0 48 48" className="text-[#333] group-hover:text-white transition-colors duration-300"><rect width="48" height="48" rx="12" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M24 12c-6.627 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.019.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.625-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .32.218.694.825.576C32.565 33.796 36 29.299 36 24c0-6.627-5.373-12-12-12z" fill="#fff"/></svg>
                </a>
                {/* Gmail */}
                <a
                  href="mailto:aryanwalia7888@gmail.com?subject=Contact%20from%20Portfolio&body=Hi%20Aryan%2C%0A%0AI%20found%20your%20portfolio%20and..."
                  className="group rounded-full bg-[#232323] p-5 shadow-lg hover:bg-[#ea4335] transition-all duration-300 flex items-center justify-center animate-glow"
                  title="Send Email"
                >
                  <svg width="36" height="36" fill="none" viewBox="0 0 48 48" className="text-[#ea4335] group-hover:text-white transition-colors duration-300"><rect width="48" height="48" rx="12" fill="currentColor"/><path d="M34 16.5v15a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 0114 31.5v-15A1.5 1.5 0 0115.5 15h17A1.5 1.5 0 0134 16.5zm-2.25 1.5l-7.25 5.5-7.25-5.5V30h14.5V18z" fill="#fff"/></svg>
                </a>
              </div>
              <div className="text-center text-gray-400 mt-4">
                <p>Connect with me on LinkedIn, check out my GitHub, or send me an email!</p>
                <p className="mt-2 text-sm">aryanwalia7888@gmail.com</p>
              </div>
            </div>
          </section>
    </main>

        {/* Footer */}
        <footer className="bg-[#363636] mt-16 py-8">
          <div className="max-w-6xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_6_535)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_6_535">
                        <rect width="48" height="48" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span className="text-sm font-medium">Aryan Walia</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="mailto:aryanwalia7888@gmail.com" className="text-sm hover:text-gray-300 transition-colors">
                  aryanwalia7888@gmail.com
                </a>
                <span className="text-sm text-gray-400">© 2024 All rights reserved</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
