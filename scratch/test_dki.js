const { classifyKeyword, getDKIContent } = require('./src/lib/dkiUtils');

const testKeywords = [
  "교통사고 합의 전 상담",
  "교통사고 치료 종결 후 합의",
  "후유장해 진단서 발급",
  "보험금 부지급 대응",
  "보험사 의료자문 동의",
  "산재 치료 종결",
  "산재 종결 후 장해",
  "근로복지공단 결정서 검토",
  "손해사정사 선임 비용",
  "보험사 의료자문 동의",
  "산재 보험급여 결정 통지서",
  "교통사고 합의 후 추가청구"
];

testKeywords.forEach(k => {
  const type = classifyKeyword(k);
  const content = getDKIContent(k, type);
  console.log(`Keyword: ${k}`);
  console.log(`Type: ${type}`);
  console.log(`H1: ${content.heroTitle}`);
  console.log(`Subtitle: ${content.heroSubtitle}`);
  console.log(`CTA: ${content.ctaText}`);
  console.log('---');
});
