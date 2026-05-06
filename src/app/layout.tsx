import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const sCoreDream = localFont({
  src: [
    { path: '../fonts/SCDream1.otf', weight: '100', style: 'normal' },
    { path: '../fonts/SCDream2.otf', weight: '200', style: 'normal' },
    { path: '../fonts/SCDream3.otf', weight: '300', style: 'normal' },
    { path: '../fonts/SCDream4.otf', weight: '400', style: 'normal' },
    { path: '../fonts/SCDream5.otf', weight: '500', style: 'normal' },
    { path: '../fonts/SCDream6.otf', weight: '600', style: 'normal' },
    { path: '../fonts/SCDream7.otf', weight: '700', style: 'normal' },
    { path: '../fonts/SCDream8.otf', weight: '800', style: 'normal' },
    { path: '../fonts/SCDream9.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-score-dream'
});

export const metadata: Metadata = {
  title: "공정손해사정 | 서울·경기 교통사고·산재·보험금 분쟁 전문",
  description: "정당한 보상을 위한 객관적 검토, 공정손해사정입니다. 교통사고 합의금, 산재 보상금, 보험금 부지급 등 서울·경기 전 지역 무료 상담.",
  keywords: "손해사정사, 교통사고 손해사정, 산재 손해사정, 보험금 분쟁, 서울 손해사정사, 경기 손해사정사",
  openGraph: {
    title: "공정손해사정 | 정당한 보상의 기준",
    description: "보험사 출신 전문가의 객관적 검토로 의뢰인의 권리를 지킵니다.",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "공정손해사정 전문가의 서류 검토 및 상담",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "공정손해사정",
    description: "보험사 출신 전문가의 객관적 검토",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${inter.variable} ${sCoreDream.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CTAButton variant="sticky" />
      </body>
    </html>
  );
}
