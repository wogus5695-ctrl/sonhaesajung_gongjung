import { Metadata } from "next";
import SitemapContent from "./SitemapContent";

export const metadata: Metadata = {
  title: "교통사고·산재·보험금 손해사정 상담 키워드 안내 | 공정손해사정",
  description: "교통사고 합의금, 후유장해 보험금, 보험금 부지급, 산재 불승인, 산재 장해등급 등 손해사정 상담이 필요한 주요 키워드를 확인하고 공정손해사정 상담 안내를 받을 수 있습니다.",
  openGraph: {
    title: "교통사고·산재·보험금 손해사정 상담 키워드 안내 | 공정손해사정",
    description: "교통사고, 산재, 보험금 부지급 관련 전문 손해사정 상담 키워드 리스트.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.gongjungsh.co.kr/sitemap-seoul-gyeonggi",
  }
};

export default function Page() {
  return <SitemapContent />;
}
