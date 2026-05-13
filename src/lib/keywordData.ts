export type KeywordCategory = "손해사정사" | "교통사고" | "보험금 분쟁" | "후유장해" | "산재" | "지역 상담";

export interface KeywordItem {
  label: string;
  slug: string;
  category: KeywordCategory;
  intent: string;
  url: string;
}

export const categoryDescriptions: Record<KeywordCategory, string> = {
  "손해사정사": "전문 손해사정사 선임 및 상담 비용, 절차 등 기초적인 안내를 제공합니다.",
  "교통사고": "보험사 합의금 제시 전후, 과실비율 및 손해액 산정에 필요한 핵심 검토 사항입니다.",
  "보험금 분쟁": "보험사의 부지급 통보, 고지의무 위반 해지 등 보험금 관련 분쟁 쟁점을 분석합니다.",
  "후유장해": "사고나 질병 후 남는 장해에 대해 객관적인 의학적 평가와 보험금 산정을 지원합니다.",
  "산재": "산재 불승인 이의신청부터 장해등급 상향, 추가상병 신청 등 근로자의 권익을 검토합니다.",
  "지역 상담": "서울 및 경기 주요 지역에서 대면 상담 및 방문 검토가 가능한 지역 안내입니다."
};

const createKeyword = (label: string, category: KeywordCategory, intent: string): KeywordItem => {
  const slug = label.replace(/\s+/g, '-');
  return {
    label,
    slug,
    category,
    intent,
    url: `/?k=${encodeURIComponent(slug)}`
  };
};

export const keywordItems: KeywordItem[] = [
  // [손해사정사 직접 검색]
  createKeyword("손해사정사", "손해사정사", "손해사정사 기본"),
  createKeyword("손해사정사 상담", "손해사정사", "상담 신청"),
  createKeyword("손해사정사 비용", "손해사정사", "비용 안내"),
  createKeyword("손해사정사 수수료", "손해사정사", "수수료 확인"),
  createKeyword("손해사정사 선임", "손해사정사", "선임 절차"),
  createKeyword("독립손해사정사", "손해사정사", "독립손해사정"),
  createKeyword("보험 손해사정사", "손해사정사", "보험금 검토"),
  createKeyword("손해사정사 사무소", "손해사정사", "사무실 찾기"),
  createKeyword("손해사정사 추천", "손해사정사", "전문가 추천"),
  createKeyword("교통사고 손해사정사", "손해사정사", "교통사고 전문"),
  createKeyword("산재 손해사정사", "손해사정사", "산재 전문"),
  createKeyword("보험금 손해사정사", "손해사정사", "보험금 전문"),
  createKeyword("후유장해 손해사정사", "손해사정사", "후유장해 전문"),

  // [교통사고 합의금]
  createKeyword("교통사고 합의금", "교통사고", "합의금 산정"),
  createKeyword("교통사고 합의금 검토", "교통사고", "합의금 적정성"),
  createKeyword("교통사고 합의금 적정한지", "교통사고", "합의금 확인"),
  createKeyword("교통사고 합의금 계산", "교통사고", "합의금 계산기"),
  createKeyword("교통사고 합의금 많이 받는 방법", "교통사고", "합의금 극대화"),
  createKeyword("교통사고 보험사 합의금", "교통사고", "보험사 대응"),
  createKeyword("보험사 합의금 적게", "교통사고", "저가합의 대응"),
  createKeyword("교통사고 손해사정", "교통사고", "손해액 산정"),
  createKeyword("교통사고 손해사정사 상담", "교통사고", "교통사고 상담"),
  createKeyword("교통사고 손해배상", "교통사고", "민사 배상"),
  createKeyword("교통사고 과실비율", "교통사고", "과실 검토"),
  createKeyword("교통사고 향후치료비", "교통사고", "치료비 산정"),
  createKeyword("교통사고 휴업손해", "교통사고", "휴업손해 산정"),
  createKeyword("교통사고 일실수입", "교통사고", "일실수입 산정"),
  createKeyword("교통사고 위자료", "교통사고", "위자료 산정"),

  // [교통사고 후유장해·부상]
  createKeyword("교통사고 후유장해", "후유장해", "교통사고 장해"),
  createKeyword("교통사고 후유장해 보험금", "후유장해", "장해보험금"),
  createKeyword("교통사고 장해진단", "후유장해", "장해진단서"),
  createKeyword("교통사고 골절 합의금", "교통사고", "골절 합의금"),
  createKeyword("교통사고 디스크 합의금", "교통사고", "디스크 합의금"),
  createKeyword("교통사고 목디스크 합의금", "교통사고", "경추 디스크"),
  createKeyword("교통사고 허리디스크 합의금", "교통사고", "요추 디스크"),
  createKeyword("교통사고 인대파열 합의금", "교통사고", "인대 파열"),
  createKeyword("교통사고 십자인대 파열 합의금", "교통사고", "십자인대"),
  createKeyword("교통사고 발목골절 합의금", "교통사고", "발목 골절"),
  createKeyword("교통사고 손목골절 합의금", "교통사고", "손목 골절"),
  createKeyword("후방추돌 합의금", "교통사고", "후방 추돌"),
  createKeyword("오토바이 사고 합의금", "교통사고", "오토바이 합의금"),
  createKeyword("오토바이 사고 손해배상", "교통사고", "오토바이 배상"),
  createKeyword("12대 중과실 교통사고 합의금", "교통사고", "중과실 사고"),

  // [보험금 부지급·분쟁]
  createKeyword("보험금 부지급", "보험금 분쟁", "부지급 대응"),
  createKeyword("보험금 거절", "보험금 분쟁", "지급 거절"),
  createKeyword("보험금 지급 거절", "보험금 분쟁", "지급 거절"),
  createKeyword("보험금 감액", "보험금 분쟁", "보험금 삭감"),
  createKeyword("보험금 분쟁", "보험금 분쟁", "보험사 분쟁"),
  createKeyword("보험금 청구 거절", "보험금 분쟁", "청구 거절"),
  createKeyword("보험금 지급 심사", "보험금 분쟁", "현장 심사"),
  createKeyword("보험금 지급 지연", "보험금 분쟁", "지급 지연"),
  createKeyword("보험금 삭감", "보험금 분쟁", "삭감 대응"),
  createKeyword("보험사 부지급", "보험금 분쟁", "보험사 대응"),
  createKeyword("보험사 지급 거절", "보험금 분쟁", "보험사 대응"),
  createKeyword("보험사 의료자문", "보험금 분쟁", "의료자문 대응"),
  createKeyword("보험사 현장심사", "보험금 분쟁", "현장조사"),
  createKeyword("보험사 손해사정", "보험금 분쟁", "보험사 손사"),
  createKeyword("보험금 손해사정 상담", "보험금 분쟁", "보험금 상담"),

  // [후유장해 보험금]
  createKeyword("후유장해 보험금", "후유장해", "후유장해 청구"),
  createKeyword("상해후유장해 보험금", "후유장해", "상해 장해"),
  createKeyword("질병후유장해 보험금", "후유장해", "질병 장해"),
  createKeyword("후유장해 진단서", "후유장해", "장해 진단"),
  createKeyword("후유장해 지급률", "후유장해", "지급률 확인"),
  createKeyword("장해진단 보험금", "후유장해", "장해 보험금"),
  createKeyword("장해보험금", "후유장해", "장해 보험금"),
  createKeyword("상해 장해보험금", "후유장해", "상해 장해"),
  createKeyword("질병 장해보험금", "후유장해", "질병 장해"),
  createKeyword("후유장해 손해사정사", "후유장해", "후유장해 전문"),
  createKeyword("후유장해 보험금 상담", "후유장해", "장해 상담"),
  createKeyword("후유장해 보험금 청구", "후유장해", "장해 청구"),
  createKeyword("후유장해 보험금 거절", "후유장해", "장해 거절"),
  createKeyword("후유장해 보험금 분쟁", "후유장해", "장해 분쟁"),

  // [고지의무·암보험금]
  createKeyword("고지의무 위반", "보험금 분쟁", "고지의무"),
  createKeyword("고지의무 위반 보험금", "보험금 분쟁", "고지의무 보험금"),
  createKeyword("보험 고지의무 위반", "보험금 분쟁", "계약 전 알릴의무"),
  createKeyword("보험계약 해지 고지의무", "보험금 분쟁", "강제 해지"),
  createKeyword("고지의무 위반 보험금 거절", "보험금 분쟁", "거절 대응"),
  createKeyword("고지의무 위반 손해사정", "보험금 분쟁", "고지의무 검토"),
  createKeyword("암보험금 부지급", "보험금 분쟁", "암보험금"),
  createKeyword("암보험금 거절", "보험금 분쟁", "암보험 거절"),
  createKeyword("암진단비 거절", "보험금 분쟁", "진단비 거절"),
  createKeyword("암진단비 부지급", "보험금 분쟁", "진단비 부지급"),
  createKeyword("뇌혈관 진단비 보험금", "보험금 분쟁", "뇌혈관 질환"),
  createKeyword("심혈관 진단비 보험금", "보험금 분쟁", "심혈관 질환"),
  createKeyword("진단비 보험금 거절", "보험금 분쟁", "진단비 분쟁"),

  // [산재 불승인·재심사]
  createKeyword("산재 불승인", "산재", "산재 불승인"),
  createKeyword("산재 불승인 이의신청", "산재", "이의 신청"),
  createKeyword("산재 불승인 재심사", "산재", "재심사 청구"),
  createKeyword("산재 재심사 청구", "산재", "재심사 청구"),
  createKeyword("근로복지공단 산재 불승인", "산재", "공단 대응"),
  createKeyword("산재 신청 방법", "산재", "산재 신청"),
  createKeyword("산재 승인 방법", "산재", "산재 승인"),
  createKeyword("산재 손해사정", "산재", "산재 손사"),
  createKeyword("산재 손해사정사 상담", "산재", "산재 상담"),
  createKeyword("산재 보상 상담", "산재", "산재 보상"),
  createKeyword("산재 보험금 상담", "산재", "산재 보험금"),
  createKeyword("산재 불승인 상담", "산재", "불승인 상담"),

  // [산재 추가상병·장해등급]
  createKeyword("산재 추가상병", "산재", "추가 상병"),
  createKeyword("산재 추가상병 신청", "산재", "추가상병 신청"),
  createKeyword("산재 추가상병 불승인", "산재", "추가상병 거절"),
  createKeyword("산재 추가상병 인정", "산재", "추가상병 인정"),
  createKeyword("산재 장해등급", "산재", "장해 등급"),
  createKeyword("산재 장해등급 상향", "산재", "등급 상향"),
  createKeyword("산재 장해급여", "산재", "장해 급여"),
  createKeyword("산재 장해급여 신청", "산재", "장해급여 신청"),
  createKeyword("산재 장해등급 낮게 나왔을 때", "산재", "등급 재심사"),
  createKeyword("산재 장해등급 재판정", "산재", "재판정 신청"),
  createKeyword("산재 후유장해", "산재", "산재 장해"),
  createKeyword("산재 장해보상", "산재", "장해 보상"),
  createKeyword("산재 장해등급 상담", "산재", "등급 상담"),

  // [업무상 질병·폐암 산재]
  createKeyword("업무상 질병 산재", "산재", "업무상 질병"),
  createKeyword("폐암 산재", "산재", "폐암"),
  createKeyword("직업병 산재", "산재", "직업병"),
  createKeyword("과로사 산재", "산재", "과로사"),
  createKeyword("뇌출혈 산재", "산재", "뇌출혈"),
  createKeyword("심근경색 산재", "산재", "심근경색"),
  createKeyword("소음성 난청 산재", "산재", "소음성 난청"),
  createKeyword("진폐증 산재", "산재", "진폐증"),
  createKeyword("석면 폐암 산재", "산재", "석면 폐암"),
  createKeyword("용접공 폐암 산재", "산재", "용접공 폐암"),
  createKeyword("건설현장 폐암 산재", "산재", "건설현장 폐암"),
  createKeyword("업무상 질병 불승인", "산재", "질병 불승인"),
  createKeyword("업무상 질병 재심사", "산재", "질병 재심사"),

  // [교통사고 + 산재 교차]
  createKeyword("출퇴근 교통사고 산재", "산재", "출퇴근 재해"),
  createKeyword("업무 중 교통사고 산재", "산재", "업무 중 사고"),
  createKeyword("회사 차량 교통사고 산재", "산재", "회사 차량 사고"),
  createKeyword("배달 오토바이 사고 산재", "산재", "배달 사고"),
  createKeyword("업무 중 사고 산재", "산재", "업무상 사고"),
  createKeyword("출근길 교통사고 산재", "산재", "출근길 사고"),
  createKeyword("퇴근길 교통사고 산재", "산재", "퇴근길 사고"),
  createKeyword("교통사고 산재 처리", "산재", "산재 처리"),
  createKeyword("교통사고 산재 보상", "산재", "산재 보상"),

  // [지역 상담 키워드]
  createKeyword("서울 손해사정사", "지역 상담", "서울 상담"),
  createKeyword("서울 손해사정사 상담", "지역 상담", "서울 상담"),
  createKeyword("서울 교통사고 손해사정사", "지역 상담", "서울 교통사고"),
  createKeyword("서울 교통사고 합의금", "지역 상담", "서울 합의금"),
  createKeyword("서울 산재 손해사정사", "지역 상담", "서울 산재"),
  createKeyword("서울 산재 불승인", "지역 상담", "서울 산재 불승인"),
  createKeyword("서울 보험금 부지급", "지역 상담", "서울 보험금"),
  createKeyword("서울 후유장해 보험금", "지역 상담", "서울 후유장해"),
  createKeyword("서울 보험금 손해사정사", "지역 상담", "서울 보험금"),

  createKeyword("경기 손해사정사", "지역 상담", "경기 상담"),
  createKeyword("경기 손해사정사 상담", "지역 상담", "경기 상담"),
  createKeyword("경기 교통사고 손해사정사", "지역 상담", "경기 교통사고"),
  createKeyword("경기 교통사고 합의금", "지역 상담", "경기 합의금"),
  createKeyword("경기 산재 손해사정사", "지역 상담", "경기 산재"),
  createKeyword("경기 산재 불승인", "지역 상담", "경기 산재 불승인"),
  createKeyword("경기 보험금 부지급", "지역 상담", "경기 보험금"),
  createKeyword("경기 후유장해 보험금", "지역 상담", "경기 후유장해"),
  createKeyword("경기 보험금 손해사정사", "지역 상담", "경기 보험금"),

  createKeyword("강남 손해사정사", "지역 상담", "강남 상담"),
  createKeyword("강남 교통사고 합의금", "지역 상담", "강남 합의금"),
  createKeyword("강남 산재 불승인", "지역 상담", "강남 산재"),
  createKeyword("강남 보험금 부지급", "지역 상담", "강남 보험금"),

  createKeyword("서초 손해사정사", "지역 상담", "서초 상담"),
  createKeyword("서초 교통사고 합의금", "지역 상담", "서초 합의금"),
  createKeyword("서초 산재 불승인", "지역 상담", "서초 산재"),
  createKeyword("서초 보험금 부지급", "지역 상담", "서초 보험금"),

  createKeyword("송파 손해사정사", "지역 상담", "송파 상담"),
  createKeyword("송파 교통사고 합의금", "지역 상담", "송파 합의금"),
  createKeyword("송파 산재 불승인", "지역 상담", "송파 산재"),
  createKeyword("송파 보험금 부지급", "지역 상담", "송파 보험금"),

  createKeyword("수원 손해사정사", "지역 상담", "수원 상담"),
  createKeyword("수원 교통사고 합의금", "지역 상담", "수원 합의금"),
  createKeyword("수원 산재 불승인", "지역 상담", "수원 산재"),
  createKeyword("수원 후유장해 보험금", "지역 상담", "수원 후유장해"),

  createKeyword("성남 손해사정사", "지역 상담", "성남 상담"),
  createKeyword("성남 교통사고 합의금", "지역 상담", "성남 합의금"),
  createKeyword("성남 산재 불승인", "지역 상담", "성남 산재"),
  createKeyword("성남 보험금 부지급", "지역 상담", "성남 보험금"),

  createKeyword("용인 손해사정사", "지역 상담", "용인 상담"),
  createKeyword("용인 교통사고 합의금", "지역 상담", "용인 합의금"),
  createKeyword("용인 산재 불승인", "지역 상담", "용인 산재"),
  createKeyword("용인 보험금 부지급", "지역 상담", "용인 보험금"),

  createKeyword("고양 손해사정사", "지역 상담", "고양 상담"),
  createKeyword("고양 교통사고 합의금", "지역 상담", "고양 합의금"),
  createKeyword("고양 산재 불승인", "지역 상담", "고양 산재"),
  createKeyword("고양 보험금 부지급", "지역 상담", "고양 보험금"),

  createKeyword("부천 손해사정사", "지역 상담", "부천 상담"),
  createKeyword("부천 교통사고 합의금", "지역 상담", "부천 합의금"),
  createKeyword("부천 산재 불승인", "지역 상담", "부천 산재"),
  createKeyword("부천 보험금 부지급", "지역 상담", "부천 보험금"),

  createKeyword("안산 손해사정사", "지역 상담", "안산 상담"),
  createKeyword("안산 교통사고 합의금", "지역 상담", "안산 합의금"),
  createKeyword("안산 산재 불승인", "지역 상담", "안산 산재"),
  createKeyword("안산 후유장해 보험금", "지역 상담", "안산 후유장해"),

  createKeyword("안양 손해사정사", "지역 상담", "안양 상담"),
  createKeyword("안양 교통사고 합의금", "지역 상담", "안양 합의금"),
  createKeyword("안양 산재 불승인", "지역 상담", "안양 산재"),
  createKeyword("안양 보험금 부지급", "지역 상담", "안양 보험금"),

  createKeyword("남양주 손해사정사", "지역 상담", "남양주 상담"),
  createKeyword("남양주 교통사고 합의금", "지역 상담", "남양주 합의금"),
  createKeyword("남양주 산재 불승인", "지역 상담", "남양주 산재"),
  createKeyword("남양주 보험금 부지급", "지역 상담", "남양주 보험금"),

  createKeyword("의정부 손해사정사", "지역 상담", "의정부 상담"),
  createKeyword("의정부 교통사고 합의금", "지역 상담", "의정부 합의금"),
  createKeyword("의정부 산재 불승인", "지역 상담", "의정부 산재"),
  createKeyword("의정부 보험금 부지급", "지역 상담", "의정부 보험금"),

  createKeyword("화성 손해사정사", "지역 상담", "화성 상담"),
  createKeyword("화성 교통사고 합의금", "지역 상담", "화성 합의금"),
  createKeyword("화성 산재 불승인", "지역 상담", "화성 산재"),
  createKeyword("화성 후유장해 보험금", "지역 상담", "화성 후유장해"),

  createKeyword("평택 손해사정사", "지역 상담", "평택 상담"),
  createKeyword("평택 교통사고 합의금", "지역 상담", "평택 합의금"),
  createKeyword("평택 산재 불승인", "지역 상담", "평택 산재"),
  createKeyword("평택 보험금 부지급", "지역 상담", "평택 보험금"),

  createKeyword("시흥 손해사정사", "지역 상담", "시흥 상담"),
  createKeyword("시흥 교통사고 합의금", "지역 상담", "시흥 합의금"),
  createKeyword("시흥 산재 불승인", "지역 상담", "시흥 산재"),
  createKeyword("시흥 보험금 부지급", "지역 상담", "시흥 보험금"),

  createKeyword("김포 손해사정사", "지역 상담", "김포 상담"),
  createKeyword("김포 교통사고 합의금", "지역 상담", "김포 합의금"),
  createKeyword("김포 산재 불승인", "지역 상담", "김포 산재"),
  createKeyword("김포 보험금 부지급", "지역 상담", "김포 보험금"),
];

export const getAllKeywords = (): KeywordItem[] => {
  return keywordItems;
};

export const getKeywordsByCategory = (category: KeywordCategory): KeywordItem[] => {
  return keywordItems.filter(k => k.category === category);
};

