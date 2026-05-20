"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, Filter, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  getAllKeywords, 
  KeywordCategory, 
  KeywordItem, 
  categoryDescriptions,
  generatedRegionalKeywords
} from '@/lib/keywordData';

export default function SitemapContent() {
  const [activeCategory, setActiveCategory] = useState<KeywordCategory | "전체">("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSeoulExpanded, setIsSeoulExpanded] = useState(false);
  const [isGyeonggiExpanded, setIsGyeonggiExpanded] = useState(false);
  const [isIncheonExpanded, setIsIncheonExpanded] = useState(false);

  const allKeywords = useMemo(() => {
    return getAllKeywords().filter(item => !item.regionGroup);
  }, []);

  const seoulRegionalKeywords = useMemo(() => {
    return generatedRegionalKeywords.filter(k => k.regionGroup === "서울");
  }, []);

  const gyeonggiRegionalKeywords = useMemo(() => {
    return generatedRegionalKeywords.filter(k => k.regionGroup === "경기");
  }, []);

  const incheonRegionalKeywords = useMemo(() => {
    return generatedRegionalKeywords.filter(k => k.regionGroup === "인천");
  }, []);

  const groupByRegion = (items: KeywordItem[]) => {
    const grouped: Record<string, KeywordItem[]> = {};
    items.forEach(item => {
      if (item.region) {
        if (!grouped[item.region]) {
          grouped[item.region] = [];
        }
        grouped[item.region].push(item);
      }
    });
    return grouped;
  };

  const seoulGrouped = useMemo(() => groupByRegion(seoulRegionalKeywords), [seoulRegionalKeywords]);
  const gyeonggiGrouped = useMemo(() => groupByRegion(gyeonggiRegionalKeywords), [gyeonggiRegionalKeywords]);
  const incheonGrouped = useMemo(() => groupByRegion(incheonRegionalKeywords), [incheonRegionalKeywords]);

  const seoulRegionsList = useMemo(() => Object.keys(seoulGrouped), [seoulGrouped]);
  const gyeonggiRegionsList = useMemo(() => Object.keys(gyeonggiGrouped), [gyeonggiGrouped]);
  const incheonRegionsList = useMemo(() => Object.keys(incheonGrouped), [incheonGrouped]);

  const visibleSeoulRegions = useMemo(() => {
    return isSeoulExpanded ? seoulRegionsList : seoulRegionsList.slice(0, 8);
  }, [seoulRegionsList, isSeoulExpanded]);

  const visibleGyeonggiRegions = useMemo(() => {
    return isGyeonggiExpanded ? gyeonggiRegionsList : gyeonggiRegionsList.slice(0, 8);
  }, [gyeonggiRegionsList, isGyeonggiExpanded]);

  const visibleIncheonRegions = useMemo(() => {
    return isIncheonExpanded ? incheonRegionsList : incheonRegionsList.slice(0, 8);
  }, [incheonRegionsList, isIncheonExpanded]);

  const categories: (KeywordCategory | "전체")[] = [
    "전체", 
    "손해사정사 비용·선임",
    "교통사고 합의 전후",
    "교통사고 부상별 합의금",
    "후유장해 진단·평가",
    "보험금 부지급 대응",
    "고지의무·계약해지",
    "암·진단비 보험금",
    "실손·수술비·입원비",
    "산재 신청·치료종결",
    "산재 질환·직업병",
    "배달·운송 산재",
    "지역 상담"
  ];

  const filteredKeywords = useMemo(() => {
    return allKeywords.filter(item => {
      const matchCategory = activeCategory === "전체" || item.category === activeCategory;
      const matchSearch = item.label.includes(searchQuery) || item.intent.includes(searchQuery);
      return matchCategory && matchSearch;
    });
  }, [allKeywords, activeCategory, searchQuery]);

  // Group keywords by category for the "All" view or specific sections
  const groupedKeywords = useMemo(() => {
    const grouped: Record<string, KeywordItem[]> = {};
    const relevantCategories = activeCategory === "전체" 
      ? categories.filter(c => c !== "전체") as KeywordCategory[]
      : [activeCategory as KeywordCategory];

    relevantCategories.forEach(cat => {
      const items = filteredKeywords.filter(k => k.category === cat);
      if (items.length > 0) {
        grouped[cat] = items;
      }
    });
    return grouped;
  }, [filteredKeywords, activeCategory]);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 bg-brand-primary text-white">
        <div className="section-container">
          <h1 className="text-3xl md:text-5xl font-black mb-8 break-keep leading-tight">
            손해사정 키워드 허브: 상황별 상담 안내
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed break-keep max-w-4xl mb-10">
            공정손해사정은 교통사고, 산재, 보험금 분쟁 등 고객님이 처한 구체적인 문제 상황을 자료와 원칙에 근거하여 면밀히 검토합니다. 아래 카테고리에서 본인의 상황과 일치하는 키워드를 확인해 보세요.
          </p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="궁금하신 상황이나 부상명을 검색해보세요 (예: 골절, 부지급)"
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:bg-white/20 transition-all text-white placeholder:text-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* 2. Category Tabs */}
      <section className="py-6 border-b border-brand-line sticky top-[72px] bg-white/90 backdrop-blur-md z-30">
        <div className="section-container overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max pb-2 md:pb-0">
            <span className="flex items-center gap-2 text-sm font-bold text-brand-primary mr-4 bg-brand-ivory px-3 py-1.5 rounded-lg shrink-0">
              <Filter className="w-4 h-4" /> 상황 분류
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-bold transition-all shrink-0",
                  activeCategory === cat 
                    ? "bg-brand-gold text-white shadow-lg" 
                    : "bg-brand-ivory text-brand-muted hover:bg-brand-line"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Keyword Cards List */}
      <section className="py-20 min-h-[600px]">
        <div className="section-container">
          {Object.entries(groupedKeywords).map(([category, items]) => (
            <div key={category} className="mb-20 last:mb-0">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black text-brand-primary mb-3 flex items-center gap-3">
                  {category}
                </h2>
                <div className="flex items-start gap-2 text-brand-muted bg-brand-ivory/50 p-4 rounded-xl border border-brand-line/50">
                  <Info className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base break-keep">
                    {categoryDescriptions[category as KeywordCategory]}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {items.map((item) => (
                  <Link 
                    key={item.slug} 
                    href={`/?k=${encodeURIComponent(item.slug)}`}
                    className="group p-4 bg-white border border-brand-line rounded-xl hover:border-brand-gold hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-between"
                  >
                    <span className="text-[15px] md:text-base font-bold text-brand-primary group-hover:text-brand-gold transition-colors truncate pr-2">
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-brand-line group-hover:text-brand-gold group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {filteredKeywords.length === 0 && (
            <div className="py-40 text-center">
              <Search className="w-16 h-16 text-brand-line mx-auto mb-6" />
              <p className="text-xl text-brand-muted font-bold">검색 결과가 없습니다.</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("전체");}}
                className="mt-6 text-brand-gold font-bold underline"
              >
                필터 초기화하기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3.5 Seoul/Gyeonggi Regional Keywords Section */}
      <section className="py-20 bg-slate-50 border-t border-brand-line">
        <div className="section-container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-brand-primary mb-4 break-keep">
              서울·경기 지역별 손해사정 상담 키워드
            </h2>
            <p className="text-brand-muted text-base md:text-lg max-w-4xl mx-auto break-keep leading-relaxed">
              서울·경기 지역에서 교통사고 합의금, 보험금 부지급, 후유장해 보험금, 산재 불승인, 산재 장해등급 문제로 손해사정 상담을 찾는 사용자를 위한 지역별 키워드입니다. 각 키워드를 선택하면 해당 상황에 맞는 상담 안내 페이지로 이동합니다.
            </p>
          </div>

          {/* Seoul Group */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8 border-b border-brand-line pb-4">
              <span className="w-1.5 h-6 bg-brand-gold rounded-full" />
              <h3 className="text-2xl font-black text-brand-primary">
                서울 구 단위 상담 키워드
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleSeoulRegions.map(regionName => (
                <div key={regionName} className="bg-white border border-brand-line/60 rounded-2xl p-5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300">
                  <h4 className="text-base font-bold text-brand-primary mb-3.5 pb-2 border-b border-brand-line/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                    {regionName} 지역
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {seoulGrouped[regionName].map(item => (
                      <Link
                        key={item.slug}
                        href={`/?k=${encodeURIComponent(item.slug)}`}
                        className="text-xs md:text-sm font-bold bg-slate-50 border border-brand-line/60 text-brand-muted hover:border-brand-gold hover:text-brand-gold px-2.5 py-1.5 rounded-lg transition-colors inline-block"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsSeoulExpanded(!isSeoulExpanded)}
                className="px-6 py-3 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-bold rounded-xl transition-all text-sm inline-flex items-center gap-2 mx-auto focus:outline-none"
              >
                {isSeoulExpanded ? "서울 지역 키워드 접기" : "전체 서울 지역 키워드 보기"}
              </button>
            </div>
          </div>

          {/* Gyeonggi Group */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8 border-b border-brand-line pb-4">
              <span className="w-1.5 h-6 bg-brand-gold rounded-full" />
              <h3 className="text-2xl font-black text-brand-primary">
                경기 시 단위 상담 키워드
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleGyeonggiRegions.map(regionName => (
                <div key={regionName} className="bg-white border border-brand-line/60 rounded-2xl p-5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300">
                  <h4 className="text-base font-bold text-brand-primary mb-3.5 pb-2 border-b border-brand-line/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                    {regionName} 지역
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {gyeonggiGrouped[regionName].map(item => (
                      <Link
                        key={item.slug}
                        href={`/?k=${encodeURIComponent(item.slug)}`}
                        className="text-xs md:text-sm font-bold bg-slate-50 border border-brand-line/60 text-brand-muted hover:border-brand-gold hover:text-brand-gold px-2.5 py-1.5 rounded-lg transition-colors inline-block"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsGyeonggiExpanded(!isGyeonggiExpanded)}
                className="px-6 py-3 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-bold rounded-xl transition-all text-sm inline-flex items-center gap-2 mx-auto focus:outline-none"
              >
                {isGyeonggiExpanded ? "경기 지역 키워드 접기" : "전체 경기 지역 키워드 보기"}
              </button>
            </div>
          </div>

          {/* Incheon Group */}
          <div>
            <div className="flex items-center gap-3 mb-8 border-b border-brand-line pb-4">
              <span className="w-1.5 h-6 bg-brand-gold rounded-full" />
              <h3 className="text-2xl font-black text-brand-primary">
                인천 구 단위 및 주요 지역 상담 키워드
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleIncheonRegions.map(regionName => (
                <div key={regionName} className="bg-white border border-brand-line/60 rounded-2xl p-5 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300">
                  <h4 className="text-base font-bold text-brand-primary mb-3.5 pb-2 border-b border-brand-line/50 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                    {regionName} 지역
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {incheonGrouped[regionName].map(item => (
                      <Link
                        key={item.slug}
                        href={`/?k=${encodeURIComponent(item.slug)}`}
                        className="text-xs md:text-sm font-bold bg-slate-50 border border-brand-line/60 text-brand-muted hover:border-brand-gold hover:text-brand-gold px-2.5 py-1.5 rounded-lg transition-colors inline-block"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsIncheonExpanded(!isIncheonExpanded)}
                className="px-6 py-3 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white font-bold rounded-xl transition-all text-sm inline-flex items-center gap-2 mx-auto focus:outline-none"
              >
                {isIncheonExpanded ? "인천 지역 키워드 접기" : "전체 인천 지역 키워드 보기"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-24 bg-brand-ivory border-t border-brand-line">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-primary mb-8 break-keep">
            내 상황에 맞는 손해사정 검토가 필요하다면
          </h2>
          <p className="text-brand-muted text-lg md:text-xl mb-12 max-w-2xl mx-auto break-keep">
            교통사고 합의금, 보험금 부지급, 산재 불승인 문제는 사고 자료와 의학적 소견을 바탕으로 객관적으로 분석해야 합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/#contact" 
              className="bg-brand-primary text-white text-xl px-12 py-5 rounded-xl font-bold shadow-xl hover:bg-brand-deep transition-all transform active:scale-95"
            >
              무료 사건 검토 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


