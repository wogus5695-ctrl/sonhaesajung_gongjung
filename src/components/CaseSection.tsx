"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, FileText, CheckCircle2, ArrowRight, Quote } from 'lucide-react';
import { caseStudies } from '@/lib/caseData';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { classifyKeyword } from '@/lib/dkiUtils';

export default function CaseSection({ keyword }: { keyword?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const theme = classifyKeyword(keyword || "");

  const sortedCases = React.useMemo(() => {
    if (!keyword) return caseStudies;
    
    return [...caseStudies].sort((a, b) => {
      let aMatch = false;
      let bMatch = false;
      
      if (theme === "traffic_settle" || theme === "traffic_injury") {
        aMatch = ["교통사고", "오토바이 사고"].includes(a.category);
        bMatch = ["교통사고", "오토바이 사고"].includes(b.category);
      } else if (theme.startsWith("industrial")) {
        aMatch = ["산재", "추가상병", "장해등급", "폐암 산재"].includes(a.category);
        bMatch = ["산재", "추가상병", "장해등급", "폐암 산재"].includes(b.category);
      } else if (theme === "cancer") {
        aMatch = a.category === "암보험금";
        bMatch = b.category === "암보험금";
      } else if (theme === "disability") {
        aMatch = a.category === "후유장해";
        bMatch = b.category === "후유장해";
      } else if (theme.startsWith("insurance")) {
        aMatch = ["보험금 분쟁", "고지의무"].includes(a.category);
        bMatch = ["보험금 분쟁", "고지의무"].includes(b.category);
      }
      
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [keyword, theme]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="cases" className="section-py relative overflow-hidden text-white">
      {/* Background Image & Decor */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/consulting-bg.png" 
          alt="상담 배경 이미지" 
          fill 
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-deep/70 backdrop-blur-[2px]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-primary/60 to-transparent pointer-events-none" />
      </div>
      
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6 break-keep leading-tight text-white">
              <span className="relative inline-block z-10">
                주요 보상 검토 사례
                <span className="absolute bottom-0 left-0 w-full h-3 md:h-4 bg-brand-gold/80 -z-10 rounded-sm"></span>
              </span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed break-keep">
              교통사고·산재·보험금 분쟁은 <br />
              사고 경위, 의무기록, 장해 여부, 약관 적용에 따라 검토 방향이 달라집니다.<br />
              <strong className="text-brand-gold font-black">공정손해사정</strong>은 각 사건의 자료를 기준으로 손해액과 보험금 산정 쟁점을 확인합니다.
            </p>
          </div>
          
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all group"
              aria-label="이전 사례 보기"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all group"
              aria-label="다음 사례 보기"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sortedCases.map((item) => (
            <div 
              key={item.id} 
              className="flex-shrink-0 w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-[2rem] p-8 md:p-10 text-brand-primary h-full flex flex-col shadow-2xl border border-white/40">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-brand-gold rounded-full" />
                    <span className="text-brand-gold font-black text-sm tracking-widest">{item.category}</span>
                  </div>
                  <FileText className="w-6 h-6 text-brand-primary/20" />
                </div>

                <h3 className="text-xl md:text-2xl font-black mb-8 break-keep leading-snug">
                  {item.title}
                </h3>

                {/* Situation (Quote style) */}
                <div className="relative bg-brand-primary/5 rounded-2xl p-6 mb-8">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-brand-primary/10 rotate-180" />
                  <p className="text-brand-primary font-bold text-sm mb-2">상황 요약</p>
                  <p className="text-brand-muted text-sm leading-relaxed break-keep relative z-10 font-medium">
                    "{item.situation}"
                  </p>
                </div>

                {/* Key Issues (Tags) */}
                <div className="mb-8 flex-1">
                  <p className="text-xs font-black text-brand-primary/40 uppercase tracking-widest mb-3">주요 검토 쟁점</p>
                  <div className="flex flex-wrap gap-2">
                    {item.keyIssues.map((issue, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white border border-brand-line/50 rounded-lg text-xs font-bold text-brand-primary shadow-sm">
                        #{issue}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direction (Highlighted Solution Box) */}
                <div className="mt-auto bg-brand-gold/10 rounded-2xl p-6 border border-brand-gold/20 relative overflow-hidden group-hover:bg-brand-gold/20 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                    <p className="text-sm font-black text-brand-primary">공정손해사정의 솔루션</p>
                  </div>
                  <p className="text-sm text-brand-primary/80 leading-relaxed break-keep font-medium">
                    {item.direction}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        <p className="mt-8 text-[11px] text-white/30 leading-relaxed text-center break-keep max-w-4xl mx-auto">
          ※ 위 내용은 이해를 돕기 위한 {keyword ? `${keyword} 관련 ` : ""}대표 상담 예시이며, 실제 사건 결과를 보장하지 않습니다. 
          {keyword ? `${keyword} ` : ""}손해사정 검토 결과는 사고자료, 의무기록, 약관, 장해평가, 업무관련성 등 개별 사정에 따라 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
