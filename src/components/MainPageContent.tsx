"use client";
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  Phone,
  FileSearch,
  Scale,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import CTAButton from '@/components/CTAButton';
import { classifyKeyword, getDKIContent, getProblemSituationsByTheme } from '@/lib/dkiUtils';
import CaseSection from '@/components/CaseSection';
import { commonFaqs } from '@/lib/faqData';
import { getExpertContent } from '@/lib/expertContent';
import { Quote, Lightbulb } from 'lucide-react';

// --- Data ---
const mainServices = [
  {
    title: "교통사고 손해사정",
    desc: "사고 과실 비율부터 소득 상실액, 후유장해 평가까지 사고 자료를 바탕으로 정당한 손해액을 산정합니다.",
    issues: ["12대 중과실 사고 과실 검토", "소득자료 및 휴업손해 산정", "후유장해 적정성 평가"],
    tag: "교통사고 합의금"
  },
  {
    title: "산재 손해사정",
    desc: "근로복지공단 재심사 청구부터 추가상병, 장해등급 재검토 등 근로자의 권익 보호를 위해 조력합니다.",
    issues: ["산재 불승인 재심사 청구", "폐암 등 직업성 질환 검토", "산재 장해등급 재판정"],
    tag: "산재·장해"
  },
  {
    title: "보험금 분쟁 손해사정",
    desc: "암보험금, 고지의무 위반, 상해·질병 후유장해 등 보험사와 발생하는 전문적인 분쟁 쟁점을 검토합니다.",
    issues: ["고지의무 위반 해지 대응", "암·뇌·심혈관 진단비 검토", "후유장해 보험금 산정"],
    tag: "보험금 부지급"
  }
];

const processSteps = [
  { step: "01", title: "무상 기초 상담", desc: "사고 상황 및 보험 가입 내역 확인" },
  { step: "02", title: "의학자료 검토", desc: "진단서 및 의무기록 정밀 분석" },
  { step: "03", title: "보상 쟁점 분석", desc: "판례 및 유사 사례를 통한 분석" },
  { step: "04", title: "손해액 산출", desc: "객관적 기준에 따른 보상액 산정" },
  { step: "05", title: "의견서 제출", desc: "근거 자료 정리 및 의견서 작성" },
  { step: "06", title: "결과 안내", desc: "검토 결과에 따른 향후 절차 안내" }
];


// --- Components ---

const SectionTitle = ({ title, sub }: { title: string, sub?: string }) => (
  <div className="mb-12 md:mb-16 text-center">
    <div className="inline-block px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-sm font-bold rounded-full mb-4">공정손해사정</div>
    <h2 className="text-3xl md:text-5xl font-black text-brand-primary mb-4 break-keep leading-[1.4] md:leading-[1.4]">{title}</h2>
    {sub && <p className="text-brand-muted text-lg md:text-xl break-keep max-w-3xl mx-auto">{sub}</p>}
  </div>
);

export default function MainPageContent({ k }: { k?: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [caseCount, setCaseCount] = useState(1098);

  useEffect(() => {
    // Base date: 2026-05-05
    const baseDate = new Date('2026-05-05T00:00:00+09:00');
    const now = new Date();
    const diffTime = now.getTime() - baseDate.getTime();
    const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    
    setCaseCount(1098 + diffDays);
  }, []);

  // Keyword & Theme Processing
  const rawKeyword = k ? k.replace(/-/g, ' ').replace(/[<>]/g, '').trim() : "";
  const hasKeyword = rawKeyword.length > 0;
  const keyword = hasKeyword ? rawKeyword : "";
  const theme = classifyKeyword(keyword);
  const dki = getDKIContent(keyword, theme);
  const problemSituations = getProblemSituationsByTheme(theme);

  return (
    <div className="bg-white">
      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-brand-deep text-white">
        <div className="absolute inset-0 opacity-40">
          <Image 
            src="/hero-bg.png" 
            alt="손해사정 업무 이미지" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/80 via-brand-deep/60 to-transparent" />
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl animate-fade-up">
            <div className="mb-6">
              <span className="inline-block bg-brand-gold text-white px-6 py-2.5 rounded-full font-black tracking-widest text-lg md:text-2xl shadow-lg shadow-brand-gold/20">
                <span className="text-brand-primary">손해사정</span>부터 <span className="text-brand-primary">변호사</span> 협업까지 한번에!
              </span>
            </div>
            <h1 className="text-[1.65rem] sm:text-3xl md:text-5xl lg:text-6xl font-black mb-14 break-keep text-white">
              {hasKeyword ? (
                <>
                  <span 
                    className="block mb-3 md:mb-5 leading-tight"
                    dangerouslySetInnerHTML={{ __html: dki.heroTitle }}
                  />
                </>
              ) : (
                <>
                  <span className="block mb-3 md:mb-5 text-white sm:whitespace-nowrap">
                    <span className="text-brand-gold">손해사정사</span>와 <span className="text-brand-gold">변호사</span>를 한번에!
                  </span>
                  <span className="block mb-3 md:mb-5 text-white sm:whitespace-nowrap">보험사 제시 합의금,</span>
                  <span className="block text-white sm:whitespace-nowrap">
                    <span className="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">객관적 검토</span> 후 서명하십시오.
                  </span>
                </>
              )}
            </h1>
            <p 
              className="text-lg md:text-2xl text-white/70 mb-12 leading-loose max-w-3xl whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: hasKeyword ? dki.heroSubtitle : `<strong class="font-bold text-white">손해사정사</strong>의 정밀 분석과 <strong class="font-bold text-white">협업 변호사</strong>의 법률 검토를 연계하여 \n<span class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">합의금 산정부터 법적 분쟁 대비까지</span> 빈틈없이 조력합니다.` }}
            />
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a href="#contact" className="btn-primary text-xl px-10 py-5 text-center shadow-2xl shadow-brand-gold/20 active:scale-95 transition-transform">
                사전 검토 상담
              </a>
              <a href="tel:010-4875-4972" className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-xl font-bold text-xl hover:bg-white/20 active:scale-95 transition-all">
                <Phone className="w-6 h-6" /> 빠른 전화 상담
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["손해사정사X변호사 공동조력", "의학자료 정밀 분석", hasKeyword ? `${keyword} 판례 기반 검토` : "판례 기반 검토", "변호사 상담 연계 지원"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-white/80 font-medium text-sm md:text-base">
                  <ShieldCheck className="w-5 h-5 text-brand-gold" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem Situation Section */}
      <section className="section-py bg-white">
        <div className="section-container">
          <SectionTitle 
            title="나의 상황에 맞는 정당한 보상 기준을 확인하세요" 
            sub="손해사정사와 협업 변호사가 함께 분석하여, 대형 보험사를 상대로 정당한 보상 기준을 확실하게 찾아드립니다."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemSituations.map((item, idx) => (
              <div key={idx} className="card-premium flex flex-col items-center text-center group hover:-translate-y-1">
                <div className="w-14 h-14 bg-brand-ivory rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-gold/10 transition-colors">
                  <AlertCircle className="w-7 h-7 text-brand-gold" />
                </div>
                <p 
                  className="text-xl font-bold text-brand-primary break-keep leading-relaxed [&_u]:text-brand-gold [&_u]:decoration-brand-gold/30 [&_u]:underline-offset-4"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 Expert Deep Dive (Only for Core Keywords) */}
      {hasKeyword && getExpertContent(k || "") && (
        <section className="section-py bg-brand-primary/5">
          <div className="section-container">
            <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-brand-line relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Quote className="w-32 h-32 text-brand-primary rotate-180" />
              </div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-sm font-black mb-8">
                  <Lightbulb className="w-4 h-4" /> 전문가 어드바이스
                </div>
                
                <h3 className="text-2xl md:text-4xl font-black text-brand-primary mb-6 break-keep">
                  {getExpertContent(k || "")?.deepDiveTitle}
                </h3>
                
                <p className="text-brand-muted text-lg md:text-xl mb-10 leading-relaxed break-keep border-l-4 border-brand-gold pl-6">
                  {getExpertContent(k || "")?.summary}
                </p>
                
                <div className="grid gap-4 mb-12">
                  {getExpertContent(k || "")?.deepDiveContent.map((text, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-brand-ivory rounded-2xl">
                      <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                      <p className="text-brand-primary font-bold leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
                
                <div className="p-8 bg-brand-primary text-white rounded-3xl text-center">
                  <p className="text-lg md:text-xl font-bold break-keep">
                    "{getExpertContent(k || "")?.keyPoint}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Key Services Section */}
      <section id="traffic" className="section-py bg-brand-ivory">
        <div className="section-container">
          <SectionTitle title="전문 분야별 핵심 검토 서비스" sub="보험사 출신 등 실무 경험을 바탕으로 사건의 핵심 쟁점을 파악합니다." />
          <div className="grid lg:grid-cols-3 gap-8">
            {mainServices.map((service, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-brand-line shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className="p-8 md:p-10 flex-1">
                  <span className="inline-block px-3 py-1 bg-brand-gold/10 text-brand-gold text-xs font-bold rounded-full mb-4">{service.tag}</span>
                  <h3 className="text-2xl font-black mb-6">{service.title}</h3>
                  <p className="text-brand-muted mb-8 leading-relaxed break-keep">{service.desc}</p>
                  
                  <div className="space-y-3 mb-10 bg-brand-ivory/50 p-6 rounded-2xl">
                    <p className="text-xs font-bold text-brand-gold uppercase tracking-widest mb-1">핵심 검토 쟁점</p>
                    {service.issues.map((issue, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-bold text-brand-primary">
                        <div className="w-1 h-1 bg-brand-gold rounded-full" />
                        {issue}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <a href="#contact" className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2">
                    {service.title} 상담 <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Case Section (Integrated after Services) */}
      <CaseSection keyword={keyword} />


      {/* 5. Why Section */}
      <section className="section-py bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative h-full min-h-[400px] lg:min-h-0 rounded-[3rem] overflow-hidden shadow-2xl">
              <Image 
                src="/analysis-desk.png" 
                alt="전문가 자료 분석 이미지" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand-primary/10" />
            </div>
            <div>
              <SectionTitle 
                title="보험사가 알려주지 않는 보상의 이면을 분석합니다" 
              />
              <div className="space-y-6">
                {[
                  { 
                    icon: FileSearch, 
                    title: "객관적인 의학적 근거 중심", 
                    desc: <>주관적인 주장이 아닌, 진단서와 검사결과지 등 <strong className="text-brand-primary">의학적 자료</strong>를 바탕으로 장해 여부와 손해액을 논리적으로 입증합니다.</> 
                  },
                  { 
                    icon: Scale, 
                    title: "최신 판례 및 사례 데이터 분석", 
                    desc: <>유사한 사고의 최신 판례와 당사의 수많은 보상 검토 데이터를 대조하여 <strong className="text-brand-primary">가장 유리한 산정 기준</strong>을 제시합니다.</> 
                  },
                  { 
                    icon: Users, 
                    title: "손해사정사 X 변호사 공동 조력", 
                    desc: <>단순 손해액 산정을 넘어 법률 검토나 소송 대비가 필요할 경우, 연계된 협업 변호사의 법률 자문과 상담을 연계하여 <strong className="text-brand-primary">시작부터 법적 문제까지 한번에 대응</strong>해 드립니다.</> 
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="group bg-slate-50 border border-slate-100 rounded-2xl p-6 flex gap-6 items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/5 hover:border-brand-gold/30"
                  >
                    <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 text-brand-gold rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="text-xl font-bold mb-3 text-brand-primary">{item.title}</h4>
                      <p className="text-brand-muted leading-relaxed break-keep text-[15px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Process Section */}
      <section id="process" className="section-py bg-brand-ivory">
        <div className="section-container">
          <SectionTitle title="투명한 업무 절차" sub="의뢰인이 안심할 수 있도록 전 과정을 체계적으로 공유합니다." />
          
          <div className="relative max-w-6xl mx-auto mt-8">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] border-t border-dashed border-brand-gold/30 z-0" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-brand-gold/20 shadow-sm flex items-center justify-center mb-5 group-hover:border-brand-gold group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-300">
                    <span className="text-brand-gold font-black text-xl">{step.step}</span>
                  </div>
                  <h4 className="text-[17px] font-bold text-brand-primary mb-2">{step.title}</h4>
                  <p className="text-brand-muted text-[13px] break-keep leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Banner Section */}
      <section className="w-full bg-brand-deep/5">
        <div className="w-full">
          <Image 
            src="/middle-banner.png" 
            alt="보험금 분쟁 안내 배너" 
            width={1920}
            height={1080}
            className="w-full h-auto shadow-sm"
            priority={false}
          />
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="section-py bg-brand-ivory">
        <div className="section-container max-w-4xl">
          <SectionTitle 
            title="자주 묻는 질문 (FAQ)" 
            sub="교통사고, 산재, 보험금 분쟁은 사건마다 쟁점이 다릅니다. 상담 전 자주 궁금해하시는 내용을 먼저 확인해보세요."
          />
          <div className="space-y-4 mb-20">
            {commonFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-line/50 hover:border-brand-gold/30 transition-all group">
                <button 
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <div className="flex items-center gap-4 pr-8">
                    <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                      <span className="text-brand-gold group-hover:text-white font-black">Q</span>
                    </div>
                    <span className="text-lg font-bold text-brand-primary break-keep">
                      {faq.q}
                    </span>
                  </div>
                  <div className={cn(
                    "w-8 h-8 rounded-full bg-brand-ivory flex items-center justify-center transition-all duration-300", 
                    openFaq === idx && "rotate-180 bg-brand-gold text-white"
                  )}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  openFaq === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}>
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8 pt-2">
                      <div className="h-px bg-brand-line/50 mb-6" />
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-brand-primary/5 flex items-center justify-center shrink-0">
                          <span className="text-brand-primary/40 font-black">A</span>
                        </div>
                        <p className="text-brand-muted leading-[1.8] break-keep pt-0.5">
                          {hasKeyword && (idx === 0 || idx === 5) ? (
                            idx === 0 
                              ? faq.a.replace("보험약관 등을", `보험약관 및 ${keyword} 관련 자료를`)
                              : faq.a.replace("가능합니다.", `가능합니다. ${keyword} 관련`)
                          ) : faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* 9. Contact Section */}
      <section id="contact" className="section-py bg-brand-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent scale-150" />
        </div>
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-6xl font-black mb-8 break-keep text-white leading-[1.4] md:leading-[1.5]">
                망설이는 순간에도<br />
                <span className="text-brand-gold">보상의 골든타임</span>은<br />
                지나가고 있습니다.
              </h2>
              <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed break-keep">
                복잡한 자료 준비부터 변호사 협업 자문까지 한번에! 손해사정사와 변호사의 공동 지원 시스템으로 의뢰인의 정당한 보상 권리를 든든히 지켜드립니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <p className="text-brand-gold font-bold text-2xl mb-1">{caseCount.toLocaleString()}건+</p>
                    <p className="text-xs text-white/40">누적 상담 및 검토 건수</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <p className="text-brand-gold font-bold text-2xl mb-1">98%</p>
                    <p className="text-xs text-white/40">의뢰인 서비스 만족도</p>
                 </div>
              </div>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-brand-primary">
              <h3 className="text-2xl font-black mb-8 text-center">무료 검토 신청서</h3>
              <ContactForm keyword={keyword} />
              <p className="mt-8 text-[10px] text-brand-muted leading-relaxed text-center break-keep">
                공정손해사정은 손해액 산정, 보험금 검토, 사고자료 및 의학자료 분석을 중심으로 상담을 진행합니다. 
                법률 대리, 소송 대리, 형사사건 대응은 변호사 업무에 해당할 수 있으며, 필요한 경우 관련 전문가와의 협업을 안내할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
