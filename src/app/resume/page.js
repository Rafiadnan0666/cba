// pages/resume.js
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
        margin: 1cm;
      }
      @media print {
        body {
          color: black;
          background: white;
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
      }
    `,
    documentTitle: 'Rafi_Adnan_Resume',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Rafi Adnan - Resume</title>
        <meta name="description" content="Resume of Rafi Adnan - Web Developer & Game Developer" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 no-print">
          <h1 className="text-3xl font-bold text-gray-900">Rafi Adnan</h1>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Download Resume
          </button>
        </div>

        <div ref={resumeRef} className="bg-white shadow-md rounded-lg overflow-hidden print-section">
          {/* Header */}
          <div className="bg-gray-800 text-white p-6">
            <h1 className="text-3xl font-bold">Rafi Adnan</h1>
            <h2 className="text-xl text-blue-300 mt-1">Web Developer & Game Developer</h2>
            <p className="mt-2 text-gray-300">Turning ideas into fast, functional, and fun digital experiences.</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-8">
                {/* Experience */}
                <section>
                  <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">💼 Experience</h3>
                  
                  <div className="mb-6">
                    <h4 className="font-bold">Web Developer Intern – YBM PLN</h4>
                    <p className="text-gray-600 text-sm">Feb 2024 – Jul 2024</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Developed landing pages and optimized SEO for business initiatives like Voffee.</li>
                      <li>Built WordPress-based marketing sites for product campaigns.</li>
                      <li>Collaborated with content and marketing teams under tight deadlines.</li>
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold">Freelance Full-Stack Developer</h4>
                    <p className="text-gray-600 text-sm">2023 – Present</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Built dynamic websites and web apps using Laravel, Next.js, Tailwind, and Supabase.</li>
                      <li>Specialized in building interactive UIs, real-time dashboards, and custom backend logic.</li>
                      <li>Created link hub tools, idea vaults, and client-specific landing pages.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Indie Game Developer</h4>
                    <p className="text-gray-600 text-sm">2022 – Present</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Developed several Unity-based games including FPS horror and roguelike shooters.</li>
                      <li>Implemented procedural generation, enemy AI, custom input systems, and player UX polish.</li>
                      <li>Published projects on Itch.io with growing user interest.</li>
                    </ul>
                  </div>
                </section>

                {/* Projects */}
                <section>
                  <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">🚀 Projects Highlight</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold">SignalDeck</h4>
                      <p className="text-sm text-gray-600">Real-time event listener dashboard (Next.js + Supabase)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold">Ey-Ay</h4>
                      <p className="text-sm text-gray-600">AI voice assistant with desktop automation (Node.js)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold">Vaultify (Ideas)</h4>
                      <p className="text-sm text-gray-600">Idea vault for creators with login, tagging, and live DB</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold">Artifact Fetching For Dummies</h4>
                      <p className="text-sm text-gray-600">Unity horror parkour game</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold">Starfall</h4>
                      <p className="text-sm text-gray-600">Procedural sci-fi shooter, inspired by Risk of Rain 2 (In dev)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold">Business Finder</h4>
                      <p className="text-sm text-gray-600">Dynamic listing directory (Next.js)</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded">
                      <h4 className="font-bold">ISBN Labeling</h4>
                      <p className="text-sm text-gray-600">Laravel-based ISBN tool for internal library system</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">(Full project list at rafiadnan.my.id)</p>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Contact */}
                <section>
                  <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">📍 Contact</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">🌐</span>
                      <span>Portfolio: <a href="https://rafiadnan.my.id" className="text-blue-600 hover:underline">rafiadnan.my.id</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">📧</span>
                      <span>Email: <a href="mailto:fn234561@gmail.com" className="text-blue-600 hover:underline">fn234561@gmail.com</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">📞</span>
                      <span>Phone: (+62) [YOUR PHONE HERE]</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">💼</span>
                      <span>LinkedIn: <a href="https://linkedin.com/in/rafi-adnan-a52141274" className="text-blue-600 hover:underline">linkedin.com/in/rafi-adnan</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🎮</span>
                      <span>Itch.io: <a href="https://gregrsea-975.itch.io" className="text-blue-600 hover:underline">gregrsea-975.itch.io</a></span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">🖥</span>
                      <span>GitHub: <a href="https://github.com/Rafiadnan0666" className="text-blue-600 hover:underline">github.com/Rafiadnan0666</a></span>
                    </li>
                  </ul>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">🧠 Skills</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Frontend:</h4>
                      <p className="text-gray-700">React, Next.js, Tailwind CSS, HTML/CSS, JavaScript</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Backend:</h4>
                      <p className="text-gray-700">Laravel (PHP), Supabase, MySQL, REST API, Authentication</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Game Dev:</h4>
                      <p className="text-gray-700">Unity (C#), NavMesh, procedural systems, game UI, gameplay scripting</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Other Tools:</h4>
                      <p className="text-gray-700">Git, Vercel, DigitalOcean, WordPress, Firebase</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Soft Skills:</h4>
                      <p className="text-gray-700">Creative Problem Solving, Independent Learner, Team Collaboration, Strong Focus</p>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">🎓 Education</h3>
                  <div>
                    <p className="text-gray-700">[Your Campus Name Here]</p>
                    <p className="text-sm text-gray-600">Informatics / Computer Engineering – Ongoing (Semester 2)</p>
                    <p className="text-sm text-gray-600 mt-1">GPA 4.00 (Semester 1)</p>
                    <p className="text-sm text-gray-600 mt-1">Active in coding, game dev, and product prototyping projects</p>
                  </div>
                </section>

                {/* Certification */}
                <section>
                  <h3 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">📜 Certification</h3>
                  <div>
                    <p className="font-medium">BNSP Certified Web Developer (2024)</p>
                    <p className="text-sm text-gray-600">Issued by BNSP Indonesia, validating full-stack and WordPress skills.</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}