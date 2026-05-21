"use client";
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const searchParams = useSearchParams();
  const k = searchParams.get('k');
  const keyword = k ? k.replace(/-/g, ' ').replace(/[<>]/g, '').trim() : "";

  return (
    <footer className="bg-brand-deep text-white/60 py-16 px-4">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                <span className="text-brand-gold font-black text-sm">公</span>
              </div>
              <span className="text-xl font-black text-white tracking-tighter">공정<span className="text-brand-gold">손해사정</span></span>
            </Link>
            <p className="text-white/40 text-xs mb-6 font-bold tracking-tight">교통사고·산재·보험금 손해사정 상담</p>
            <p className="max-w-md mb-8 break-keep text-sm leading-relaxed">
              보험금 산정의 기준을 바로잡고, 의뢰인의 정당한 권리를 지킵니다. 
              교통사고, 산재, 각종 질병 및 상해 보험금 분쟁 등 객관적인 자료를 바탕으로 최선의 결과를 도출합니다.
            </p>
            <div className="bg-white/5 p-5 rounded-xl border border-white/10 max-w-md">
              <p className="text-[11px] text-white/50 leading-relaxed break-keep">
                공정손해사정은 {keyword ? `${keyword} 관련 ` : ""}손해액 산정, 보험금 검토, 사고자료 및 의학자료 분석을 중심으로 상담을 진행합니다. 
                법률 대리, 소송 대리, 형사사건 대응은 변호사 업무에 해당할 수 있으며, 필요한 경우 관련 전문가와의 협업을 안내할 수 있습니다.
              </p>
            </div>
          </div>



          <div>
            <h4 className="text-white font-bold mb-6">고객 지원</h4>
            <ul className="space-y-4 text-sm">
              <li><span className="block font-bold text-white mb-1">상담센터</span> 010-4875-4972</li>
              <li><span className="block font-bold text-white mb-1">운영시간</span> 평일 09:00 - 18:00 (주말/공휴일 휴무)</li>
              <li><span className="block font-bold text-white mb-1">지역</span> 서울·경기 전 지역 방문 상담</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-xs">
          <div className="space-y-2">
            <p>© {currentYear} 공정손해사정. All Rights Reserved.</p>
            <p>상호명: 공정손해사정 | 대표자: 이영민 | 사업자등록번호: 899-10-02969</p>
            <p>주소: 경기도 고양시 덕양구 향기로 30</p>
          </div>
          <div className="flex gap-6 text-white/40">
            <Link href="/sitemap-seoul-gyeonggi" className="text-white/[0.01] hover:text-white/20 transition-colors">사이트맵</Link>
            <span>개인정보처리방침</span>
            <span>이용약관</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
