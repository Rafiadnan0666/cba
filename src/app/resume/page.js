"use client";
import Head from 'next/head';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

export default function Resume() {
  const resumeRef = useRef();

  const handleDownload = useReactToPrint({
    content: () => resumeRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 1.5cm;
      }
      @media print {
        body {
          color: #333;
          background: white;
          font-size: 12pt;
          line-height: 1.5;
        }
        .no-print {
          display: none !important;
        }
        .print-section {
          padding: 0 !important;
          margin: 0 !important;
        }
        section {
          page-break-inside: avoid;
        }
        h2 {
          page-break-after: avoid;
        }
      }
    `,
    documentTitle: 'Rafi_Adnan_Resume',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Rafi Adnan - Resume</title>
        <meta name="description" content="Resume of Rafi Adnan - Full Stack Developer & Game Developer" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 no-print">
          <h1 className="text-3xl font-bold text-gray-900">Rafi Adnan</h1>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Download PDF
          </button>
        </div>

        <div ref={resumeRef} className="bg-white shadow-sm rounded-lg overflow-hidden print-section border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Rafi Adnan</h1>
                <h2 className="text-xl text-gray-600 mt-1">Full Stack Developer & Game Developer</h2>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-gray-700">fn234561@gmail.com</p>
                <p className="text-gray-700">Portfolio: rafiadnan.my.id</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-8">
                {/* Summary */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">PROFILE</h2>
                  <p className="text-gray-700">
                    Versatile developer with experience in web and game development. Passionate about building efficient, 
                    user-friendly applications and immersive game experiences. Strong problem-solving skills and ability 
                    to quickly adapt to new technologies.
                  </p>
                </section>

                {/* Experience */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">EXPERIENCE</h2>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800">Web Developer Intern</h3>
                      <span className="text-sm text-gray-600">Feb 2024 – Jul 2024</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">YBM PLN</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 text-sm">
                      <li>Developed landing pages with SEO optimization for business initiatives</li>
                      <li>Built WordPress-based marketing sites for product campaigns</li>
                      <li>Collaborated with cross-functional teams to deliver projects on tight deadlines</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800">Freelance Full-Stack Developer</h3>
                      <span className="text-sm text-gray-600">2023 – Present</span>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 text-sm">
                      <li>Developed full-stack applications using Laravel, Next.js, and Supabase</li>
                      <li>Created interactive UIs, real-time dashboards, and custom backend solutions</li>
                      <li>Built various tools including link hubs and idea management systems</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800">Indie Game Developer</h3>
                      <span className="text-sm text-gray-600">2022 – Present</span>
                    </div>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700 text-sm">
                      <li>Developed Unity-based games including FPS horror and roguelike shooters</li>
                      <li>Implemented procedural generation, AI systems, and custom gameplay mechanics</li>
                      <li>Published projects on Itch.io with growing community engagement</li>
                    </ul>
                  </div>
                </section>

                {/* Projects */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">PROJECTS</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">SignalDeck</h3>
                      <p className="text-sm text-gray-600 mb-2">Real-time event listener dashboard (Next.js + Supabase)</p>
                      <p className="text-xs text-gray-500">Features: WebSocket integration, real-time updates, user authentication</p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">Vaultify</h3>
                      <p className="text-sm text-gray-600 mb-2">Idea management system with tagging and search</p>
                      <p className="text-xs text-gray-500">Built with: Laravel, MySQL, Tailwind CSS</p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">Artifact Fetching For Dummies</h3>
                      <p className="text-sm text-gray-600 mb-2">Unity horror parkour game</p>
                      <p className="text-xs text-gray-500">Features: Custom physics, enemy AI, dynamic lighting</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Skills */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">SKILLS</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Frontend</h3>
                      <p className="text-sm text-gray-600">React, Next.js, Tailwind CSS, JavaScript/TypeScript</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Backend</h3>
                      <p className="text-sm text-gray-600">Node.js, Laravel, Supabase, REST APIs, MySQL</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Game Development</h3>
                      <p className="text-sm text-gray-600">Unity, C#, Shader Graph, AI Navigation</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Tools</h3>
                      <p className="text-sm text-gray-600">Git, Vercel, DigitalOcean, Figma</p>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">EDUCATION</h2>
                  <div>
                    <h3 className="font-medium text-gray-700">[University Name]</h3>
                    <p className="text-sm text-gray-600">Informatics Engineering</p>
                    <p className="text-sm text-gray-600">2023 - Present (GPA: 4.00)</p>
                  </div>
                </section>

                {/* Certifications */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">CERTIFICATIONS</h2>
                  <div>
                    <h3 className="font-medium text-gray-700">BNSP Certified Web Developer</h3>
                    <p className="text-sm text-gray-600">2024</p>
                  </div>
                </section>

                {/* Links */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">LINKS</h2>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="text-gray-700 w-24">Portfolio:</span>
                      <a href="https://rafiadnan.my.id" className="text-blue-600 hover:underline">rafiadnan.my.id</a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-700 w-24">GitHub:</span>
                      <a href="https://github.com/Rafiadnan0666" className="text-blue-600 hover:underline">github.com/Rafiadnan0666</a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-700 w-24">LinkedIn:</span>
                      <a href="https://linkedin.com/in/rafi-adnan" className="text-blue-600 hover:underline">linkedin.com/in/rafi-adnan</a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-700 w-24">Itch.io:</span>
                      <a href="https://gregrsea-975.itch.io" className="text-blue-600 hover:underline">gregrsea-975.itch.io</a>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}