'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ExternalLink, ShieldAlert } from 'lucide-react';
import InstallAppButton from '@/components/InstallAppButton';
import { trackContactClick } from '@/lib/tracking';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white border-t border-primary-light no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Brand Slogan */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.jpg"
                alt="MSK Institute Logo"
                width={32}
                height={32}
                loading="lazy"
                className="w-8 h-8 object-contain rounded bg-white shadow-sm"
              />
              <span className="text-lg font-bold tracking-tight text-white">
                MSK<span className="text-secondary font-black">.</span>Institute
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              Leading training center in Shikohabad for computer programming, software engineering, and digital literacy. Empowering students for global opportunities.
            </p>
            <div className="pt-1">
              <InstallAppButton variant="header" className="!bg-white/10 !text-white !border-white/20 hover:!bg-secondary hover:!border-secondary" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-150">Home</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors duration-150">All Courses</Link>
              </li>
              <li>
                <Link href="/live" className="hover:text-white transition-colors duration-150">Live Schedule</Link>
              </li>
              <li>
                <Link href="/live-batches" className="hover:text-white transition-colors duration-150">Upcoming Batches</Link>
              </li>
              <li>
                <Link href="/study-material" className="hover:text-white transition-colors duration-150">Study Material Hub</Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors duration-150">Publications & Blogs</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors duration-150 flex items-center gap-1.5">
                  Careers & Internships
                  <span className="bg-secondary text-primary text-[10px] font-black px-1.5 py-0.5 rounded leading-none">Hiring</span>
                </Link>
              </li>
              <li>
                <Link href="/verify-certificate" className="hover:text-white transition-colors duration-150">Verify Certificates</Link>
              </li>
            </ul>
          </div>

          {/* Resources & Admin */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/playground" className="hover:text-white transition-colors duration-150 flex items-center gap-1.5">
                  MSK Code Editor
                  <span className="bg-emerald-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">Playground</span>
                </Link>
              </li>
              <li>
                <Link href="/study-material?type=tutorial" className="hover:text-white transition-colors duration-150">Interactive Tutorials</Link>
              </li>
              <li>
                <Link href="/study-material?type=cheatsheet" className="hover:text-white transition-colors duration-150">Quick Cheatsheets</Link>
              </li>
              <li>
                <Link href="/study-material?type=handbook" className="hover:text-white transition-colors duration-150">Developer Handbooks</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-secondary">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>
                  Gali No. 3, Near Gyan Jyoti Public School,<br />
                  Shikohabad, Firozabad, UP-283135
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <a 
                  href="tel:+918393042166" 
                  onClick={() => trackContactClick('call', '+918393042166')}
                  className="hover:text-white transition-colors"
                >
                  +91 83930 42166
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <a 
                  href="mailto:mskshikohabad@gmail.com" 
                  onClick={() => trackContactClick('email', 'mskshikohabad@gmail.com')}
                  className="hover:text-white transition-colors"
                >
                  mskshikohabad@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://maps.google.com/?q=MSK+Institute+Shikohabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick('maps', 'MSK Institute Shikohabad')}
                  className="inline-flex items-center gap-1 text-xs text-secondary hover:text-secondary-light font-medium"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-light flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {currentYear} MSK Institute. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            Built with Next.js & Tailwind CSS v4. Approved for AI indexing.
          </p>
        </div>
      </div>
    </footer>
  );
}
