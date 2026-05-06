export type KeywordCategory = "교통사고" | "산재" | "보험금분쟁";

export interface ServiceKeyword {
  name: string;
  category: KeywordCategory;
}

export interface KeywordItem {
  label: string;
  slug: string;
  category: KeywordCategory;
  region: string;
  service: string;
  url: string;
}

export const regions: string[] = [
  "서울", "경기", "강남", "서초", "송파", "강동", "마포", "영등포", "구로", "금천", "관악", "동작", "용산", "중구", "종로", "성동", "광진", "동대문", "중랑", "노원", "도봉", "강북", "성북", "은평", "서대문", "양천", "강서", "수원", "성남", "용인", "고양", "부천", "안산", "안양", "남양주", "화성", "평택", "의정부", "시흥", "파주", "김포", "광명", "군포", "하남", "광주", "이천", "안성", "구리", "오산", "의왕", "양주", "포천", "동두천", "과천", "여주"
];

export const services: ServiceKeyword[] = [
  { name: "교통사고 손해사정사", category: "교통사고" },
  { name: "교통사고 합의금 검토", category: "교통사고" },
  { name: "12대 중과실 교통사고", category: "교통사고" },
  { name: "오토바이 사고 손해배상", category: "교통사고" },
  { name: "교통사고 후유장해", category: "교통사고" },
  { name: "교통사고 보험금", category: "교통사고" },
  { name: "산재 손해사정사", category: "산재" },
  { name: "산재 불승인 이의신청", category: "산재" },
  { name: "근로복지공단 재심사 청구", category: "산재" },
  { name: "산재 추가상병 인정", category: "산재" },
  { name: "산재 장해등급 상향", category: "산재" },
  { name: "산재 장해급여", category: "산재" },
  { name: "폐암 산재", category: "산재" },
  { name: "직업병 산재", category: "산재" },
  { name: "보험금 청구 손해사정사", category: "보험금분쟁" },
  { name: "보험금 부지급", category: "보험금분쟁" },
  { name: "후유장해 보험금", category: "보험금분쟁" },
  { name: "상해후유장해 보험금", category: "보험금분쟁" },
  { name: "질병후유장해 보험금", category: "보험금분쟁" },
  { name: "고지의무 위반 보험금", category: "보험금분쟁" },
  { name: "보험사 분쟁 상담", category: "보험금분쟁" }
];

/**
 * 모든 지역과 서비스의 조합을 생성합니다.
 */
export const getAllKeywords = (): KeywordItem[] => {
  const result: KeywordItem[] = [];
  
  regions.forEach(region => {
    services.forEach(service => {
      const slug = `${region}-${service.name.replace(/\s+/g, '-')}`;
      result.push({
        label: `${region} ${service.name}`,
        slug: slug,
        category: service.category,
        region: region,
        service: service.name,
        url: `/?k=${slug}`
      });
    });
  });
  
  return result;
};

/**
 * 특정 카테고리별로 키워드를 필터링합니다.
 */
export const getKeywordsByCategory = (category: KeywordCategory): KeywordItem[] => {
  return getAllKeywords().filter(k => k.category === category);
};

/**
 * 특정 지역별로 키워드를 필터링합니다.
 */
export const getKeywordsByRegion = (region: string): KeywordItem[] => {
  return getAllKeywords().filter(k => k.region === region);
};
