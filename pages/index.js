import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// Animation hook for fade/slide-in
function useInViewAnimation() {
  const ref = useRef();
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

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
    },
    {
      title: 'WakeyWakey – Smart Alarm App',
      description: `WakeyWakey is a smart Android alarm app that requires users to solve a math challenge to dismiss the alarm, ensuring you actually wake up! Features include one-time/repeating alarms, full-screen lock, power resilience, custom ringtones, and more.`,
      features: [
        'Math Challenge Alarm Dismissal: Solve a random math problem to stop the alarm',
        'Set One-Time or Repeating Alarms',
        'Full-Screen Alarm Lock (over lock screen)',
        'Power-Resilient: Survives device restarts',
        'Foreground Service & Wake Lock',
        'Custom Ringtone & Vibration',
        'Auto-Dismiss Timeout (configurable)'
      ],
      tech: ['Android', 'Java', 'AlarmManager', 'Room DB', 'ForegroundService', 'Firebase', 'Cloudinary'],
      image: '/logo.png',
      github: 'https://github.com/4ryanwalia/wakey-wakey'
    },
    {
      title: 'Zepto Clone – E-Commerce Android App',
      description: `A modern, feature-rich e-commerce app for small shop owners, inspired by Zepto. Provides seamless product browsing, cart, order history, wallet, and more. Integrates Firebase for real-time sync and Cloudinary for image storage.`,
      features: [
        'User Authentication (Firebase)',
        'Product Browsing & Search',
        'Cart System with Persistence',
        'Checkout & Order Confirmation',
        'Order History & Account Management',
        'Cloudinary Image Storage',
        'Dark UI Theme',
        'Wallet Top-up: add500 / add1000',
        'Discount Code: GET10 for 10% off'
      ],
      tech: ['Android', 'Java', 'XML', 'Firebase', 'Firestore', 'Realtime DB', 'Cloudinary', 'Git', 'GitHub'],
      image: '/logo1.png',
      github: '#' // Add your repo link here if available
    }
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setContactStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: contactForm.email, message: contactForm.message })
      });
      if (res.ok) {
        setContactStatus('success');
        setContactForm({ email: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const typewriterText = useTypewriter([
    '> Ethical Hacker in progress...',
    '> AI Integrator',
    '> Android App Builder'
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

  return (
    <>
      <Head>
        <title>Aryan Walia - Full-Stack Developer</title>
        <meta name="description" content="Full-Stack Developer specializing in Android, Web, and AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[#363636]">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8">
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
            <h2 className="text-lg font-bold tracking-tight">Aryan Walia</h2>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <a href="#about" className="text-sm font-medium hover:text-gray-300 transition-colors">About</a>
              <a href="#skills" className="text-sm font-medium hover:text-gray-300 transition-colors">Skills</a>
              <a href="#projects" className="text-sm font-medium hover:text-gray-300 transition-colors">Projects</a>
              <a href="#contact" className="text-sm font-medium hover:text-gray-300 transition-colors">Contact</a>
            </nav>
            <Link href="/resume" className="bg-[#363636] hover:bg-[#555] text-white text-sm font-bold px-4 py-2 rounded-full transition-colors">
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
          {/* Hero Section */}
          <section className="relative min-h-[480px] rounded-xl overflow-hidden mb-16 flex items-center justify-center" style={{background: 'radial-gradient(ellipse at center, #0f0f0f 0%, #000 100%)'}}>
            {/* Matrix code rain animation */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <canvas id="matrix-canvas" className="w-full h-full" />
            </div>
            {/* Optional fog/noise overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[url('/noise.png')] opacity-10" />
            <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto px-4 py-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                {/* Optional cyber shield SVG */}
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400"><path d="M18 3L33 9V18C33 26.2843 26.2843 33 18 33C9.71573 33 3 26.2843 3 18V9L18 3Z" stroke="currentColor" strokeWidth="2.5"/></svg>
                <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">Aryan Walia</h1>
              </div>
              <p className="text-[#adadad] text-lg md:text-xl max-w-[600px] leading-relaxed mt-2">
                Exploring Cybersecurity, AI & Android Development — on a mission to build secure, smart tech. 🚀
              </p>
              <span className="block mt-6 text-green-400 font-mono text-lg md:text-xl min-h-[32px]">{typewriterText}&nbsp;</span>
              <a href="#projects" className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300 ring-2 ring-green-400/40 hover:ring-green-400/80 animate-glow">
                🔐 Explore My Work
              </a>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mb-16">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-base leading-relaxed max-w-3xl">
             I'm Aryan Walia — a tech enthusiast with a strong interest in AI, Machine Learning, and Cybersecurity. I'm currently pursuing my MCA at NMIMS and have worked on several real-world projects across Android development, web technologies, and cloud services.
             <br></br>
             I’ve developed apps in Java and Kotlin, built websites using React and Firebase, and integrated tools like SQL, NoSQL, and Cloudinary. My focus is on creating practical, user-friendly solutions with clean and efficient code.
             <br></br>
             <br></br>
             Outside of tech, I'm into fitness, play badminton regularly, and enjoy learning about emerging technologies and digital security.
             </p>
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
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Main Project</h2>
            <div className="bg-[#363636] rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold">Coming Soon</h3>
                  <p className="text-gray-300">Launching soon on Play Store</p>
                  <button className="bg-black hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-full transition-colors">
                    Learn More
                  </button>
                </div>
                <div className="w-full md:w-64 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <p className="text-white font-medium">Play Store</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-16 relative">
            {/* Animated Gradient Bar */}
            <div className="hidden md:block absolute left-0 top-0 h-full w-2 rounded-full bg-gradient-to-b from-[#7f5af0] via-[#2cb67d] to-[#00c6fb] animate-gradientMove" style={{zIndex:1}} />
            <h2 className="text-2xl font-bold mb-6 pl-0 md:pl-6">Projects</h2>
            <div className="space-y-12 md:space-y-10 relative z-10">
              {projects.map((project, index) => {
                const [cardRef, inView] = useInViewAnimation();
                return (
                  <div
                    key={index}
                    ref={cardRef}
                    className={`flex flex-col md:flex-row gap-6 items-start bg-[#232323] border border-[#363636] rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-700 ease-out
                      ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                    style={{ minHeight: '220px' }}
                  >
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
                        {/* Tech stack badges for all projects */}
                        {project.tech && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.tech.map((tech, i) => (
                              <span key={i} className="bg-[#222] text-xs px-2 py-1 rounded-full text-gray-200 border border-[#363636]">{tech}</span>
                            ))}
                          </div>
                        )}
                        {/* Features for all projects */}
                        {project.features && (
                          <ul className="list-disc list-inside text-xs text-gray-400 mt-2 space-y-1">
                            {project.features.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {/* View Project / GitHub button */}
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] hover:from-[#2cb67d] hover:to-[#7f5af0] text-white font-medium px-5 py-2 rounded-full transition-all duration-300 shadow-md inline-block"
                        >
                          View on GitHub
                        </a>
                      ) : (
                        <button className="bg-[#363636] hover:bg-[#555] text-white font-medium px-4 py-2 rounded-full transition-colors">
                          View Project
                        </button>
                      )}
                    </div>
                    <div
                      className="w-full md:w-64 h-48 bg-cover bg-center rounded-xl flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                  </div>
                );
              })}
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
