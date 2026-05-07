import { Metadata } from "next";
import SitemapContent from "./SitemapContent";

export const metadata: Metadata = {
  title: "서울·경기 손해사정 상담 키워드 안내 | 로로손해사정",
  description: "서울·경기 교통사고, 산재, 보험금 분쟁 손해사정 상담 키워드 안내. 합의금, 산재 불승인, 장해등급, 폐암 산재, 보험금 부지급 문제를 검토합니다.",
  openGraph: {
    title: "서울·경기 손해사정 상담 키워드 안내 | 로로손해사정",
    description: "서울·경기 전 지역 교통사고, 산재, 보험금 부지급 관련 전문 상담 키워드 리스트.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.gongjungsh.co.kr/sitemap-seoul-gyeonggi",
  }
};

export default function Page() {
  return <SitemapContent />;
}
