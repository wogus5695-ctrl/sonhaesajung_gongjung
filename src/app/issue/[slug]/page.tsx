import { Metadata } from "next";
import MainPageContent from "@/components/MainPageContent";
import { commonFaqs } from "@/lib/faqData";
import { classifyKeyword, getDKIContent } from "@/lib/dkiUtils";
import { getAllKeywords } from "@/lib/keywordData";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const keywords = getAllKeywords();
  return keywords.map((item) => ({
    slug: item.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = params.slug;
  const decodedSlug = decodeURIComponent(slug);
  const keyword = decodedSlug.replace(/-/g, ' ').replace(/[<>]/g, '').trim();
  
  const baseUrl = "https://www.gongjungsh.co.kr";
  const baseTitle = "공정손해사정 | 서울·경기 교통사고 산재 보험금 상담";
  const baseDesc = "교통사고 합의금, 산재 불승인, 보험금 부지급 문제를 사고자료와 의학자료 기준으로 전문 검토하는 공정손해사정입니다.";

  const type = classifyKeyword(keyword);
  const dki = getDKIContent(keyword, type);

  const title = keyword ? dki.metaTitle : baseTitle;
  const description = keyword ? dki.metaDesc : baseDesc;

  const canonicalUrl = `${baseUrl}/issue/${slug}`;

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
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "공정손해사정 전문가 상담",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default function Page({ params }: PageProps) {
  const baseUrl = "https://www.gongjungsh.co.kr";
  const slug = params.slug;
  const decodedSlug = decodeURIComponent(slug);
  const keyword = decodedSlug.replace(/-/g, ' ').replace(/[<>]/g, '');
  
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "공정손해사정",
    "image": `${baseUrl}/og-image.png`,
    "@id": baseUrl,
    "url": baseUrl,
    "telephone": "010-4861-3226",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "경기도 고양시 덕양구 향기로 30",
      "addressLocality": "서울·경기",
      "postalCode": "10555",
      "addressCountry": "KR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.6441,
      "longitude": 126.9015
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "키워드 상담",
        "item": `${baseUrl}/sitemap-seoul-gyeonggi`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": keyword,
        "item": `${baseUrl}/issue/${slug}`
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MainPageContent k={decodedSlug} />
    </>
  );
}
