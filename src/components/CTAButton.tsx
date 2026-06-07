"use client";
import React, { useState, useEffect } from 'react';
import { Phone, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  className?: string;
  variant?: 'primary' | 'outline' | 'sticky';
  text?: string;
  phone?: string;
  kakaoUrl?: string;
}

export default function CTAButton({ 
  className, 
  variant = 'primary', 
  text = '무료 전화상담 신청',
  phone = '010-4875-4972',
  kakaoUrl = '#' // Placeholder
}: CTAButtonProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (variant !== 'sticky') return;

    const handleScroll = () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // Hide if the contact section top is near the viewport bottom
        if (rect.top < window.innerHeight - 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [variant]);

  if (variant === 'sticky') {
    return (
      <div 
        className={cn(
          "fixed bottom-0 left-0 z-50 w-full flex bg-white border-t border-brand-line md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.05)] transition-all duration-300",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <a 
          href={`tel:${phone}`}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-4 bg-white text-brand-primary active:bg-brand-ivory transition-colors border-r border-brand-line"
        >
          <Phone className="w-5 h-5 text-brand-gold" />
          <span className="text-[10px] font-bold">전화상담</span>
        </a>
        <a 
          href="#contact"
          className="flex-[1.5] flex items-center justify-center gap-2 py-4 bg-brand-gold text-white font-black text-lg active:bg-brand-gold/90 transition-colors"
        >
          <FileText className="w-5 h-5" />
          신청서 작성하기
        </a>
      </div>
    );
  }

  const baseStyles = variant === 'primary' ? 'btn-primary' : 'btn-outline';

  return (
    <a 
      href={`tel:${phone}`}
      className={cn(baseStyles, "gap-3", className)}
    >
      <Phone className="w-5 h-5" />
      {text}
    </a>
  );
}
