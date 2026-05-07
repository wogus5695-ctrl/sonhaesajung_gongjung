import { getAllKeywords } from '@/lib/keywordData';

export async function GET() {
  const baseUrl = 'https://www.gongjungsh.co.kr';
  const now = new Date().toUTCString();

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
    <item>
      <title>공정손해사정 | 정당한 보상의 기준</title>
      <link>${baseUrl}</link>
      <description>보험사 제시 합의금, 객관적 검토 없이는 서명하지 마십시오. 교통사고, 산재, 보험금 부지급 전문 상담.</description>
      <pubDate>${now}</pubDate>
      <guid isPermaLink="true">${baseUrl}</guid>
    </item>
    <item>
      <title>서울·경기 지역별 손해사정 상담 키워드 안내</title>
      <link>${baseUrl}/sitemap-seoul-gyeonggi</link>
      <description>서울 및 경기 전 지역 교통사고, 산재, 보험금 부지급 관련 전문 상담 내용을 확인하세요.</description>
      <pubDate>${now}</pubDate>
      <guid isPermaLink="true">${baseUrl}/sitemap-seoul-gyeonggi</guid>
    </item>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
