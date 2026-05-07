"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, MapPin, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAllKeywords, KeywordCategory, KeywordItem } from '@/lib/keywordData';

const SEOUL_REGIONS = [
  "서울", "강남", "서초", "송파", "강동", "마포", "영등포", "구로", "금천", "관악", "동작", "용산", "중구", "종로", "성동", "광진", "동대문", "중랑", "노원", "도봉", "강북", "성북", "은평", "서대문", "양천", "강서"
];

const GYEONGGI_REGIONS = [
  "경기", "수원", "성남", "용인", "고양", "부천", "안산", "안양", "남양주", "화성", "평택", "의정부", "시흥", "파주", "김포", "광명", "군포", "하남", "광주", "이천", "안성", "구리", "오산", "의왕", "양주", "포천", "동두천", "과천", "여주"
];

export default function SitemapContent() {
  const [activeCategory, setActiveCategory] = useState<KeywordCategory | "전체">("전체");
  const [activeRegionGroup, setActiveRegionGroup] = useState<"전체" | "서울" | "경기">("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const allKeywords = useMemo(() => getAllKeywords(), []);

  const filteredKeywords = useMemo(() => {
    return allKeywords.filter(item => {
      const matchCategory = activeCategory === "전체" || item.category === activeCategory;
      const isSeoul = SEOUL_REGIONS.includes(item.region);
      const isGyeonggi = GYEONGGI_REGIONS.includes(item.region);
      const matchRegion = activeRegionGroup === "전체" || 
                          (activeRegionGroup === "서울" && isSeoul) || 
                          (activeRegionGroup === "경기" && isGyeonggi);
      const matchSearch = item.label.includes(searchQuery);
      
      return matchCategory && matchRegion && matchSearch;
    });
  }, [allKeywords, activeCategory, activeRegionGroup, searchQuery]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-brand-primary text-white">
        <div className="section-container">
          <h1 className="text-3xl md:text-5xl font-black mb-8 break-keep">
            서울·경기 교통사고·산재·보험금 손해사정 상담
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed break-keep max-w-4xl mb-10">
            로로손해사정은 서울·경기 지역의 교통사고 합의금, 산재 불승인, 장해등급, 추가상병, 폐암 산재, 보험금 부지급 문제를 사고자료와 의학자료를 기준으로 검토합니다. 
            아래 지역별·사건별 키워드를 선택하면 해당 상황에 맞는 상담 안내를 확인할 수 있습니다.
          </p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="찾으시는 지역이나 사건명을 검색해보세요 (예: 수원 산재)"
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:bg-white/20 transition-all text-white placeholder:text-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 border-b border-brand-line sticky top-[72px] bg-white/90 backdrop-blur-md z-30">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-2 text-sm font-bold text-brand-primary mr-4 bg-brand-ivory px-3 py-1 rounded-lg">
                <Filter className="w-4 h-4" /> 카테고리
              </span>
              {(["전체", "교통사고", "산재", "보험금분쟁"] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-bold transition-all",
                    activeCategory === cat ? "bg-brand-gold text-white shadow-lg" : "bg-brand-ivory text-brand-muted hover:bg-brand-line"
                  )}
                >
                  {cat === "보험금분쟁" ? "보험금 분쟁" : cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-2 text-sm font-bold text-brand-primary mr-4 bg-brand-ivory px-3 py-1 rounded-lg">
                <MapPin className="w-4 h-4" /> 지역 선택
              </span>
              {(["전체", "서울", "경기"] as const).map(group => (
                <button
                  key={group}
                  onClick={() => setActiveRegionGroup(group)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-bold transition-all",
                    activeRegionGroup === group ? "bg-brand-primary text-white shadow-lg" : "bg-brand-ivory text-brand-muted hover:bg-brand-line"
                  )}
                >
                  {group === "전체" ? "전체 지역" : `${group} 주요 지역`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keyword List */}
      <section className="py-20">
        <div className="section-container">
          <div className="flex justify-between items-center mb-10">
            <p className="text-brand-muted">총 <span className="text-brand-gold font-bold">{filteredKeywords.length}</span>개의 상담 키워드가 검색되었습니다.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredKeywords.map((item) => (
              <Link 
                key={item.slug} 
                href={item.url}
                className="group p-5 bg-brand-ivory/50 border border-brand-line rounded-xl hover:bg-white hover:border-brand-gold hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-between"
              >
                <span className="text-sm md:text-base font-bold text-brand-primary group-hover:text-brand-gold transition-colors truncate pr-2">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-brand-line group-hover:text-brand-gold group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>

          {filteredKeywords.length === 0 && (
            <div className="py-40 text-center">
              <Search className="w-16 h-16 text-brand-line mx-auto mb-6" />
              <p className="text-xl text-brand-muted font-bold">찾으시는 키워드가 없습니다.</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("전체"); setActiveRegionGroup("전체");}}
                className="mt-6 text-brand-gold font-bold underline"
              >
                필터 초기화하기
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-brand-ivory">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-primary mb-8 break-keep">
            내 상황에 맞는 손해사정 검토가 필요하다면
          </h2>
          <p className="text-brand-muted text-lg mb-12 max-w-2xl mx-auto break-keep">
            사례를 확인하셨나요? 이제 전문가와 함께 정확한 손해액 산정을 위한 첫걸음을 시작하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="btn-primary text-xl px-12 py-5 shadow-xl">무료 사건 검토 신청</a>
            <a href="#" className="bg-[#FAE100] text-[#3C1E1E] px-12 py-5 rounded-xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-[#F7D600] transition-all">
              카카오 상담
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
