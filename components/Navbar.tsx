// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { Language } from '@/lib/translations';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { t, lang, setLanguage } = useTranslation();
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'sv', label: 'Svenska', native: 'Svenska' },
    { code: 'ku', label: 'Kurdish', native: 'کوردی' },
    { code: 'ar', label: 'Arabic', native: 'العربية' },
  ];

  const currentLanguage = languages.find(l => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinks = session ? [
    { href: '/invoices', label: t.nav.invoices },
    { href: '/invoice/new', label: t.nav.newInvoice },
    { href: '/pricing', label: t.nav.pricing },
    { href: '/about', label: t.nav.about },
  ] : [
    { href: '/pricing', label: t.nav.pricing },
    { href: '/about', label: t.nav.about },
  ];

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
    setIsDropdownOpen(false);
  };

  // Check if language is Arabic or Kurdish for special styling
  const isRtlLanguage = lang === 'ar' || lang === 'ku';

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={session ? '/invoices' : '/'} className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Fatura
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive(link.href)
                    ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                    : 'text-gray-600 hover:text-gray-900'
                } ${
                  // Arabic and Kurdish: bold and bigger
                  lang === 'ar' || lang === 'ku'
                    ? 'text-base font-bold'
                    : 'text-sm font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Language Dropdown and Auth */}
          <div className="flex items-center gap-3">
            {/* Language Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isRtlLanguage
                    ? 'bg-gray-200 hover:bg-gray-300 text-base font-bold'
                    : 'bg-gray-100 hover:bg-gray-200 text-sm font-medium'
                } text-gray-700`}
              >
                <span className="text-lg">🌐</span>
                <span>{currentLanguage.native}</span>
                <svg 
                  className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-300 py-1 z-50">
                  {languages.map(({ code, native }) => {
                    const isRtl = code === 'ar' || code === 'ku';
                    return (
                      <button
                        key={code}
                        onClick={() => handleLanguageSelect(code)}
                        className={`w-full text-left px-4 py-3 transition-colors ${
                          lang === code
                            ? 'bg-indigo-100 text-indigo-700 font-bold'
                            : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                        } ${isRtl ? 'font-bold text-base' : 'font-medium text-sm'}`}
                      >
                        <span className="flex items-center justify-between">
                          <span className={isRtl ? 'font-bold text-base' : 'font-medium'}>
                            {native}
                          </span>
                          {lang === code && (
                            <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Auth */}
            {session ? (
              <button
                onClick={() => signOut()}
                className={`transition-colors text-gray-600 hover:text-gray-900 ${
                  isRtlLanguage ? 'text-base font-bold' : 'text-sm font-medium'
                }`}
              >
                {t.nav.logout}
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className={`transition-colors text-gray-600 hover:text-gray-900 ${
                  isRtlLanguage ? 'text-base font-bold' : 'text-sm font-medium'
                }`}
              >
                {t.nav.login}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="sm:hidden pb-3 pt-1 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-100'
                } ${
                  isRtlLanguage ? 'text-base font-bold' : 'text-sm font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}