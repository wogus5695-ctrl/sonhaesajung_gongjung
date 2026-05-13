import { getAllKeywords } from '@/lib/keywordData';

export async function GET() {
  const baseUrl = 'https://www.gongjungsh.co.kr';
  const now = new Date().toUTCString();
  const keywords = getAllKeywords();
  
  // 주요 카테고리별 핵심 키워드 추출 (RSS용)
  const topKeywords = [
    ...keywords.filter(k => k.category === "교통사고 합의 전후").slice(0, 5),
    ...keywords.filter(k => k.category === "산재 신청·치료종결").slice(0, 5),
    ...keywords.filter(k => k.category === "보험금 부지급 대응").slice(0, 5),
    ...keywords.filter(k => k.category === "후유장해 진단·평가").slice(0, 5),
  ];

  const rssItems = [
    {
      title: "공정손해사정 | 정당한 보상의 기준",
      link: baseUrl,
      description: "보험사 제시 합의금, 객관적 검토 없이는 서명하지 마십시오. 교통사고, 산재, 보험금 부지급 전문 상담.",
      pubDate: now,
      guid: baseUrl
    },
    ...topKeywords.map(k => ({
      title: `${k.label} 전문 상담 안내 - 공정손해사정`,
      link: `${baseUrl}/?k=${encodeURIComponent(k.slug)}`,
      description: `${k.label} 관련 합의금 산정, 보험금 부지급, 산재 불승인 등 손해사정 쟁점을 의학자료 기준으로 검토합니다.`,
      pubDate: now,
      guid: `${baseUrl}/?k=${encodeURIComponent(k.slug)}`
    }))
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>공정손해사정</title>
    <link>${baseUrl}</link>
    <description>서울·경기 교통사고·산재·보험금 분쟁 전문 손해사정 상담</description>
    <language>ko-kr</language>
    <pubDate>${now}</pubDate>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems.map(item => `
    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
