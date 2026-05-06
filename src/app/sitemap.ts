import { MetadataRoute } from 'next';
import { getAllKeywords } from '@/lib/keywordData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.gongjungsh.co.kr';
  
  // 기본 페이지
  const routes = [
    '',
    '/sitemap-seoul-gyeonggi',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.9,
  }));

  // 키워드 동적 URL 추출 및 추가
  const keywords = getAllKeywords();
  const keywordRoutes = keywords.map((item) => ({
    url: `${baseUrl}/?k=${encodeURIComponent(item.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...keywordRoutes];
}
