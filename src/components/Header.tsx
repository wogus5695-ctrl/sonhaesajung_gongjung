"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import CTAButton from './CTAButton';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '상담 절차', href: '#process' },
    { name: '사례', href: '#cases' },
    { name: 'FAQ', href: '#faq' },
    { name: '상담 신청', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-sm py-3">
      <div className="section-container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center transition-transform group-hover:rotate-6">
            <span className="text-brand-gold font-black text-xl">路</span>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-[10px] text-brand-muted font-bold tracking-tight">교통사고·산재·보험금 손해사정 상담</span>
            <span className={cn(
              "text-2xl font-black tracking-tighter",
              "text-brand-primary"
            )}>로로<span className="text-brand-gold">손해사정</span></span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-brand-primary/80 hover:text-brand-gold font-bold transition-colors text-sm"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <CTAButton text="전화상담" className="px-4 py-2 rounded-lg text-xs" />
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-brand-primary p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="메뉴 열기"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "fixed inset-0 top-[72px] bg-white z-40 lg:hidden transition-transform duration-500 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col items-center gap-6 pt-12 overflow-y-auto h-full pb-32">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-xl font-bold text-brand-primary hover:text-brand-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-8 px-6 w-full space-y-4">
            <CTAButton className="w-full py-4 rounded-xl" />
          </div>
        </nav>
      </div>
    </header>
  );
}
