import { Metadata } from "next";
import MainPageContent from "@/components/MainPageContent";
import { commonFaqs } from "@/lib/faqData";

interface PageProps {
  searchParams: { k?: string };
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const k = searchParams.k;
  const keyword = k ? k.replace(/-/g, ' ').replace(/[<>]/g, '') : "";
  
  const baseUrl = "https://www.gongjungsh.co.kr";
  const baseTitle = "로로손해사정 | 서울·경기 교통사고 산재 보험금 손해사정 상담";
  const baseDesc = "서울·경기 교통사고 합의금, 산재 불승인, 장해등급, 추가상병, 폐암 산재, 보험금 부지급 문제를 사고자료와 의학자료 기준으로 검토하는 손해사정 상담.";

  const title = keyword ? `${keyword} 상담 - 로로손해사정` : baseTitle;
  const description = keyword 
    ? `${keyword} 관련 합의금, 손해액 산정, 보험금 분쟁 문제를 사고자료와 의학자료를 기준으로 정밀 검토해드립니다.` 
    : baseDesc;

  const canonicalUrl = k ? `${baseUrl}/?k=${encodeURIComponent(k)}` : baseUrl;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "로로손해사정 로고",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default function Page({ searchParams }: PageProps) {
  const baseUrl = "https://www.gongjungsh.co.kr";
  
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "로로손해사정",
    "image": `${baseUrl}/og-image.png`,
    "@id": baseUrl,
    "url": baseUrl,
    "telephone": "010-4861-3226",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "경기도 고양시 덕양구 향기로 30",
      "addressLocality": "서울·경기",
      "postalCode": "00000",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.5665,
      "longitude": 126.9780
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://blog.naver.com/placeholder"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": commonFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MainPageContent k={searchParams.k} />
    </>
  );
}
