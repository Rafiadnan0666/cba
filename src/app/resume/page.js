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
                <h2 className="text-xl text-gray-600 mt-1">Full Stack Web, Mobile &amp; Game Developer</h2>
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
                    Versatile developer with experience in web, mobile, and game development. Passionate about building
                    efficient, user-friendly applications, on-device AI features, and immersive game experiences.
                    BNSP Certified Web Developer with 66 repositories (38 public), 334 contributions in the last year,
                    and 39 GitHub stars. 3rd Place Portfolio Competition 2025. Published 9 games on Itch.io as Gregrsea 975.
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
                      <li>Developed full-stack applications using Laravel, CodeIgniter 4, Next.js, SvelteKit, and Supabase</li>
                      <li>Built Flutter mobile apps with on-device machine learning using TensorFlow Lite</li>
                      <li>Created real-time dashboards, POS/e-commerce systems, accessibility tools, and custom backends</li>
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
                      <li>Published 9 projects on Itch.io (Gregrsea 975) with growing community engagement</li>
                    </ul>
                  </div>
                </section>

                {/* Projects */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">SELECTED PROJECTS</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">Awake Alarm</h3>
                      <p className="text-sm text-gray-600 mb-2">Non-dismissable Android alarm that stops only after math or a real-object scan</p>
                      <p className="text-xs text-gray-500">Flutter, Dart, TensorFlow Lite, on-device ML · Beta APK v1.0.2 · <a href="https://github.com/Rafiadnan0666/bangun" className="text-blue-600 hover:underline">Source</a> | <a href="https://github.com/Rafiadnan0666/bangun/releases/download/v1.0.2-beta/app-release.apk" className="text-blue-600 hover:underline">Download APK</a></p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">SIBI Translator</h3>
                      <p className="text-sm text-gray-600 mb-2">Webcam Indonesian sign-language translator with sentence prediction and speech</p>
                      <p className="text-xs text-gray-500">Python, TensorFlow, Text-to-Speech · Recognises SIBI alphabet, builds words and speaks sentences · <a href="https://sibii.vercel.app" className="text-blue-600 hover:underline">Live</a> | <a href="https://github.com/Rafiadnan0666/sibi" className="text-blue-600 hover:underline">Source</a></p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">ABS — Attendance &amp; Employee Management</h3>
                      <p className="text-sm text-gray-600 mb-2">Self-hosted HR and attendance system with GPS check-in and approvals</p>
                      <p className="text-xs text-gray-500">Laravel 13, MySQL, RBAC, MIT · Leave management, reimbursement approvals, GPS check-in · <a href="https://github.com/Rafiadnan0666/absen-laravel" className="text-blue-600 hover:underline">Source</a></p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">ClrBlind</h3>
                      <p className="text-sm text-gray-600 mb-2">Privacy-first AI accessibility app for colour-blind users</p>
                      <p className="text-xs text-gray-500">SvelteKit, ONNX Runtime Web, TensorFlow.js · On-device object, colour, currency, medicine and OCR detection · <a href="https://collind.vercel.app" className="text-blue-600 hover:underline">Live</a> | <a href="https://github.com/Rafiadnan0666/color-blind" className="text-blue-600 hover:underline">Source</a></p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">Tabwise (gugel)</h3>
                      <p className="text-sm text-gray-600 mb-2">Collaborative research platform with AI summaries and real-time co-editing</p>
                      <p className="text-xs text-gray-500">Next.js, TypeScript, Supabase · Shared research tabs, team management, Chrome extension · <a href="https://gugel-ebon.vercel.app" className="text-blue-600 hover:underline">Live</a> | <a href="https://github.com/Rafiadnan0666/gugel" className="text-blue-600 hover:underline">Source</a></p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">Outdoor Gear POS</h3>
                      <p className="text-sm text-gray-600 mb-2">Point-of-sale and e-commerce system for an outdoor gear store</p>
                      <p className="text-xs text-gray-500">CodeIgniter 4, MySQL, Midtrans, Biteship · Multi-attribute variants, walk-in POS dashboard, payment and shipping integrations · <a href="https://github.com/Rafiadnan0666/pos-ci4" className="text-blue-600 hover:underline">Source</a></p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">Wavan Coffee Roastery</h3>
                      <p className="text-sm text-gray-600 mb-2">Corporate and product website for a Lampung coffee roastery</p>
                      <p className="text-xs text-gray-500">Svelte, SEO, responsive product catalogue · <a href="https://wavancoffee.vercel.app" className="text-blue-600 hover:underline">Live</a></p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">CBA Portfolio</h3>
                      <p className="text-sm text-gray-600 mb-2">Windows XP themed portfolio with working games and an on-device AI assistant</p>
                      <p className="text-xs text-gray-500">Next.js 15, React, Chess.js · Minesweeper, Snake, Tetris, Paint, Gemini Nano assistant · <a href="https://www.rafiadnan.my.id" className="text-blue-600 hover:underline">Live</a> | <a href="https://github.com/Rafiadnan0666/cba" className="text-blue-600 hover:underline">Source</a></p>
                    </div>
                    <div className="border border-gray-200 p-4 rounded">
                      <h3 className="font-bold text-gray-800">Itch.io Games (Gregrsea 975)</h3>
                      <p className="text-sm text-gray-600 mb-2">9 published Unity games: Distortion Protocol, Time Loop, END, bear, Ghost, Kaiju Commander, FACTORY, Mabar Rek, Artifact Fetching</p>
                      <p className="text-xs text-gray-500">Unity, C#, Shader Graph, NavMesh AI, Procedural Generation · <a href="https://gregrsea-975.itch.io" className="text-blue-600 hover:underline">Profile</a></p>
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
                      <p className="text-sm text-gray-600">React, Next.js, Tailwind CSS, JavaScript/TypeScript, SvelteKit</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Backend</h3>
                      <p className="text-sm text-gray-600">Node.js, Laravel 13, CodeIgniter 4, Supabase, REST APIs, MySQL, MongoDB</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Mobile &amp; On-device AI</h3>
                      <p className="text-sm text-gray-600">Flutter, Dart, Python, TensorFlow Lite, TensorFlow.js, ONNX Runtime Web</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Game Development</h3>
                      <p className="text-sm text-gray-600">Unity, C#, Shader Graph, AI Navigation, Procedural Generation</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-700">Tools & Cloud</h3>
                      <p className="text-sm text-gray-600">Git, Vercel, DigitalOcean, Figma, Docker, CI/CD</p>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">EDUCATION</h2>
                  <div>
                    <h3 className="font-medium text-gray-700">Informatics Engineering</h3>
                    <p className="text-sm text-gray-600">University in Indonesia</p>
                    <p className="text-sm text-gray-600">2023 – Present (GPA: 4.00)</p>
                  </div>
                </section>

                {/* Certifications */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">CERTIFICATIONS</h2>
                  <div>
                    <h3 className="font-medium text-gray-700">BNSP Certified Web Developer</h3>
                    <p className="text-sm text-gray-600">2024 — National Professional Certification Agency</p>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium text-gray-700">3rd Place Portfolio Competition</h3>
                    <p className="text-sm text-gray-600">2025</p>
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
                      <a href="https://www.linkedin.com/in/rafi-adnan-a52141274/" className="text-blue-600 hover:underline">linkedin.com/in/rafi-adnan</a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-700 w-24">Itch.io:</span>
                      <a href="https://gregrsea-975.itch.io" className="text-blue-600 hover:underline">gregrsea-975.itch.io</a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-700 w-24">Instagram:</span>
                      <a href="https://www.instagram.com/gregrsea_ninesevenfive/" className="text-blue-600 hover:underline">@gregrsea_ninesevenfive</a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-700 w-24">Fastwork:</span>
                      <a href="https://fastwork.id/user/gregrsea" className="text-blue-600 hover:underline">fastwork.id/gregrsea</a>
                    </li>
                    <li className="flex items-center">
                      <span className="text-gray-700 w-24">Fiverr:</span>
                      <a href="https://www.fiverr.com/s/1EA3XQ6" className="text-blue-600 hover:underline">fiverr.com/s/1EA3XQ6</a>
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