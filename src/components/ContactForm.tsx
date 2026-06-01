"use client";
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Phone } from 'lucide-react';

export default function ContactForm({ keyword }: { keyword?: string }) {
  const currentKeyword = keyword || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: '',
    accidentType: '교통사고',
    status: '합의 전',
    content: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.content) {
      alert('성함, 연락처, 문의내용은 필수 입력 사항입니다.');
      return;
    }

    if (!formData.consent) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    // 전송 데이터 구성
    const submissionData = {
      ...formData,
      currentKeyword,
      submittedAt: new Date().toLocaleString('ko-KR'),
    };

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_IzJ-x7OA9vNlnFhGw_wlRiRXUegKd9Mf8GzP4ruz5ez4HZklW8lOgBgKTXMC6_DfbA/exec';

    try {
      // 구글 앱 스크립트로 데이터 전송
      // mode: 'no-cors'를 사용하는 이유는 구글 스크립트의 CORS 정책 때문입니다.
      // 이 모드에서는 응답 내용을 읽을 수 없지만 데이터는 정상적으로 전송됩니다.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      // 전송 성공 처리
      alert('상담 신청이 완료되었습니다. 확인 후 순차적으로 연락드리겠습니다.');
      
      // 폼 초기화
      setFormData({
        name: '',
        phone: '',
        region: '',
        accidentType: '교통사고',
        status: '합의 전',
        content: '',
        consent: false
      });
    } catch (error) {
      console.error('전송 오류:', error);
      alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-brand-primary mb-2">성함 (필수)</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력해주세요"
            required
            className="w-full px-5 py-4 bg-white border border-brand-line rounded-xl focus:outline-none focus:border-brand-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-brand-primary mb-2">연락처 (필수)</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
            required
            className="w-full px-5 py-4 bg-white border border-brand-line rounded-xl focus:outline-none focus:border-brand-gold transition-colors"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-brand-primary mb-2">거주지역</label>
          <input 
            type="text" 
            name="region"
            value={formData.region}
            onChange={handleChange}
            placeholder="예: 서울 강남구, 경기 수원시"
            className="w-full px-5 py-4 bg-white border border-brand-line rounded-xl focus:outline-none focus:border-brand-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-brand-primary mb-2">사고유형</label>
          <select 
            name="accidentType"
            value={formData.accidentType}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-white border border-brand-line rounded-xl focus:outline-none focus:border-brand-gold transition-colors appearance-none"
          >
            <option value="교통사고">교통사고</option>
            <option value="산재 사고">산재 사고</option>
            <option value="보험금 분쟁">보험금 분쟁</option>
            <option value="기타">기타</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-brand-primary mb-2">현재 진행상태</label>
        <select 
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-5 py-4 bg-white border border-brand-line rounded-xl focus:outline-none focus:border-brand-gold transition-colors appearance-none"
        >
          <option value="합의 전">합의 전</option>
          <option value="보험사 제시금 확인">보험사 제시금 확인</option>
          <option value="산재 신청 전">산재 신청 전</option>
          <option value="산재 불승인 후">산재 불승인 후</option>
          <option value="장해등급 확인 후">장해등급 확인 후</option>
          <option value="보험금 부지급 후">보험금 부지급 후</option>
          <option value="기타">기타</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-brand-primary mb-2">문의내용 (병원 정보 필수*)</label>
        <textarea 
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={4}
          placeholder="현재 입원 중이신 병원 정보와 검토가 필요한 내용을 상세히 남겨 주시면 더 정확한 상담이 가능합니다."
          required
          className="w-full px-5 py-4 bg-white border border-brand-line rounded-xl focus:outline-none focus:border-brand-gold transition-colors resize-none"
        ></textarea>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="privacy" 
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
              className="w-4 h-4 accent-brand-gold cursor-pointer" 
            />
            <label htmlFor="privacy" className="text-sm font-bold text-brand-primary cursor-pointer select-none">
              개인정보수집 및 이용동의
            </label>
          </div>
          <button 
            type="button" 
            onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
            className="text-sm text-brand-muted underline hover:text-brand-primary"
          >
            보기
          </button>
        </div>
        
        {isPrivacyOpen && (
          <div className="p-4 bg-gray-50 border border-brand-line rounded-xl text-xs text-brand-muted leading-relaxed space-y-1">
            <p>1. 수집 항목: 이름, 연락처, 상담내용</p>
            <p>2. 이용 목적: 이용자의 신청이 접수된 손해사정사와의 상담 연결 및 이력 관리</p>
            <p>3. 보유 및 이용 기간: 상담 완료일로부터 3개월 후 파기 (단, 관련 법령에 따라 보관 가능)</p>
            <p>4. 제3자 제공: 이용자의 신청이 접수된 손해사정사에게만 제공되며, 상담 목적 외 사용되지 않음</p>
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4">
        <button 
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full py-5 text-white font-black text-xl rounded-2xl transition-all shadow-xl active:scale-95",
            isSubmitting ? "bg-brand-muted cursor-not-allowed" : "bg-brand-primary hover:bg-brand-deep"
          )}
        >
          {isSubmitting ? "전송 중..." : "사전 검토 상담 신청하기"}
        </button>

        <a 
          href="tel:050-7871-3550" 
          className="flex items-center justify-center gap-2 w-full py-5 border-2 border-brand-primary text-brand-primary font-black text-xl rounded-2xl hover:bg-brand-primary/5 transition-all active:scale-95"
        >
          <Phone className="w-5 h-5" /> 빠른 전화 상담
        </a>
      </div>
    </form>
  );
}

