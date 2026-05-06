import { Phone, MessageCircle } from 'lucide-react';
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
  phone = '010-4861-3226',
  kakaoUrl = '#' // Placeholder
}: CTAButtonProps) {
  if (variant === 'sticky') {
    return (
      <div className="fixed bottom-0 left-0 z-50 w-full flex bg-white border-t border-brand-line md:hidden animate-fade-up shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        <a 
          href={`tel:${phone}`}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-4 bg-white text-brand-primary active:bg-brand-ivory transition-colors border-r border-brand-line"
        >
          <Phone className="w-5 h-5 text-brand-gold" />
          <span className="text-[10px] font-bold">전화상담</span>
        </a>
        <a 
          href="#contact"
          className="flex-[1.5] flex items-center justify-center gap-2 py-4 bg-[#FAE100] text-[#3C1E1E] font-black text-lg active:bg-[#F7D600] transition-colors"
        >
          <MessageCircle className="w-6 h-6 fill-[#3C1E1E]" />
          카톡 상담
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
