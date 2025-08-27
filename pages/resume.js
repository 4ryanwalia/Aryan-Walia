import Head from 'next/head';
import Link from 'next/link';

export default function Resume() {
  return (
    <>
      <Head>
        <title>Aryan Walia - Resume</title>
        <meta name="description" content="Aryan Walia's professional resume" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-[#1a1a1a] text-white font-sans">
        {/* Minimal Header */}
        <header className="flex items-center justify-between px-6 md:px-10 py-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
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
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
          
          <a 
            href="/Aryan_Walia/Aryan_Walia.pdf" 
            download
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Download PDF
          </a>
        </header>

        <main className="max-w-5xl mx-auto px-6 md:px-10">
          {/* PDF Viewer */}
          <div className="w-full h-[90vh] rounded-lg overflow-hidden">
            <iframe
              src="/Aryan_Walia/Aryan_Walia.pdf"
              className="w-full h-full border-0"
              title="Aryan Walia Resume"
            />
          </div>
        </main>
      </div>
    </>
  );
} 