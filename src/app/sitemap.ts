import { MetadataRoute } from 'next';
import { getAllKeywords } from '@/lib/keywordData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gongjeong-loss.com'; // Placeholder
  
  // 기본 페이지
  const routes = [
    '',
    '/sitemap-seoul-gyeonggi',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 키워드 동적 URL은 너무 많을 수 있으므로 주요 조합만 추가하거나 
  // 허브 페이지가 색인을 돕도록 설정하는 것이 일반적입니다.
  // 여기서는 허브 페이지를 통해 색인되도록 하고 기본 경로만 등록합니다.

  return routes;
}
