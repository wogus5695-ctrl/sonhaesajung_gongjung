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

  // [손해사정사 비용·선임]
  createKeyword("손해사정사 선임 비용", "손해사정사", "비용 상담"),
  createKeyword("독립손해사정사 비용", "손해사정사", "비용 확인"),
  createKeyword("보험사 손해사정사 소비자 선임", "손해사정사", "소비자 선임권"),
  createKeyword("소비자 손해사정사 선임", "손해사정사", "선임 방법"),
  createKeyword("손해사정사 무료상담", "손해사정사", "무료 상담"),
  createKeyword("손해사정사 상담비용", "손해사정사", "상담료 확인"),
  createKeyword("보험금 청구 손해사정사 비용", "손해사정사", "청구 비용"),
  createKeyword("후유장해 손해사정사 비용", "손해사정사", "장해 상담 비용"),

  // [교통사고 합의 전후]
  createKeyword("교통사고 합의 전 상담", "교통사고", "합의 전 검토"),
  createKeyword("교통사고 합의 전 확인사항", "교통사고", "합의 체크리스트"),
  createKeyword("교통사고 합의 후 후유증", "교통사고", "합의 후 문제"),
  createKeyword("교통사고 합의 후 통증", "교통사고", "합의 후 통증"),
  createKeyword("교통사고 합의 후 추가청구", "교통사고", "추가 청구 가능성"),
  createKeyword("보험사 합의금 제시", "교통사고", "제시액 검토"),
  createKeyword("교통사고 합의금 문의", "교통사고", "합의금 상담"),
  createKeyword("교통사고 보험사 합의 전", "교통사고", "합의 전 대응"),
  createKeyword("교통사고 치료 종결 후 합의", "교통사고", "치료 종결 합의"),
  createKeyword("교통사고 입원 합의금", "교통사고", "입원 합의금"),
  createKeyword("교통사고 통원치료 합의금", "교통사고", "통원 합의금"),

  // [교통사고 부상별 합의금]
  createKeyword("교통사고 무릎골절 합의금", "교통사고", "무릎 골절"),
  createKeyword("교통사고 쇄골골절 합의금", "교통사고", "쇄골 골절"),
  createKeyword("교통사고 갈비뼈골절 합의금", "교통사고", "갈비뼈 골절"),
  createKeyword("교통사고 척추골절 합의금", "교통사고", "척추 골절"),
  createKeyword("교통사고 압박골절 합의금", "교통사고", "압박 골절"),
  createKeyword("교통사고 어깨인대파열 합의금", "교통사고", "어깨 인대파열"),
  createKeyword("교통사고 회전근개파열 합의금", "교통사고", "회전근개"),
  createKeyword("교통사고 반월상연골파열 합의금", "교통사고", "반월상 연골"),
  createKeyword("교통사고 신경손상 합의금", "교통사고", "신경 손상"),
  createKeyword("교통사고 흉터 보상", "교통사고", "흉터 보상"),
  createKeyword("교통사고 치아손상 보상", "교통사고", "치아 보상"),
  createKeyword("교통사고 안면골절 합의금", "교통사고", "안면 골절"),

  // [후유장해 진단·평가]
  createKeyword("후유장해 진단서 발급", "후유장해", "진단서 발급"),
  createKeyword("후유장해 진단서 병원", "후유장해", "병원 확인"),
  createKeyword("후유장해 평가", "후유장해", "장해 평가"),
  createKeyword("후유장해 평가 기준", "후유장해", "평가 기준"),
  createKeyword("후유장해 분류표", "후유장해", "장해 분류표"),
  createKeyword("후유장해 지급기준", "후유장해", "지급 기준"),
  createKeyword("후유장해 청구 방법", "후유장해", "청구 방법"),
  createKeyword("후유장해 보험금 청구서류", "후유장해", "청구 서류"),
  createKeyword("후유장해 보험금 지급기준", "후유장해", "지급 기준"),
  createKeyword("후유장해 보험금 지급률", "후유장해", "지급률 확인"),
  createKeyword("상해후유장해 지급률", "후유장해", "상해 지급률"),
  createKeyword("질병후유장해 지급률", "후유장해", "질병 지급률"),
  createKeyword("교통사고 후유장해 진단서", "후유장해", "교통사고 장해"),
  createKeyword("산재 후유장해 진단서", "후유장해", "산재 장해"),

  // [보험금 부지급 대응]
  createKeyword("보험금 청구서류", "보험금 분쟁", "청구 서류"),
  createKeyword("보험금 청구 조사", "보험금 분쟁", "지급 심사"),
  createKeyword("보험금 심사 오래 걸림", "보험금 분쟁", "지급 지연"),
  createKeyword("보험금 지급 지연 대응", "보험금 분쟁", "지연 대응"),
  createKeyword("보험사 조사 대응", "보험금 분쟁", "조사 대응"),
  createKeyword("보험사 현장조사 대응", "보험금 분쟁", "현장 조사"),
  createKeyword("보험사 의료자문 동의", "보험금 분쟁", "의료자문 동의"),
  createKeyword("보험사 의료자문 거부", "보험금 분쟁", "의료자문 거절"),
  createKeyword("보험사 자문 결과 불리", "보험금 분쟁", "자문 결과 대응"),
  createKeyword("보험금 부지급 이의제기", "보험금 분쟁", "이의 제기"),
  createKeyword("보험금 부지급 대응", "보험금 분쟁", "부지급 대응"),
  createKeyword("보험금 분쟁 조정", "보험금 분쟁", "분쟁 조정"),
  createKeyword("보험분쟁조정 신청", "보험금 분쟁", "조정 신청"),
  createKeyword("금융감독원 보험분쟁", "보험금 분쟁", "금감원 민원"),
  createKeyword("보험금 청구 손해사정", "보험금 분쟁", "청구 상담"),

  // [고지의무·계약해지]
  createKeyword("계약 전 알릴의무 위반", "보험금 분쟁", "고지의무 위반"),
  createKeyword("보험 계약 전 알릴의무", "보험금 분쟁", "알릴 의무"),
  createKeyword("보험 고지의무 해지", "보험금 분쟁", "계약 해지"),
  createKeyword("고지의무 위반 해지 통보", "보험금 분쟁", "해지 대응"),
  createKeyword("고지의무 위반 부담보", "보험금 분쟁", "부담보 설정"),
  createKeyword("보험 부담보 보험금", "보험금 분쟁", "부담보 보험금"),
  createKeyword("부담보 보험금 청구", "보험금 분쟁", "부담보 청구"),
  createKeyword("보험 가입 전 병력 고지", "보험금 분쟁", "병력 고지"),
  createKeyword("보험금 청구 후 계약해지", "보험금 분쟁", "사후 해지"),
  createKeyword("보험사 계약해지 통보", "보험금 분쟁", "해지 통보"),
  createKeyword("고지의무 위반 암보험금", "보험금 분쟁", "암보험 고지"),
  createKeyword("고지의무 위반 실비보험", "보험금 분쟁", "실비 고지"),

  // [암·진단비 보험금]
  createKeyword("암진단비 지급기준", "보험금 분쟁", "진단비 기준"),
  createKeyword("암보험금 지급기준", "보험금 분쟁", "보험금 기준"),
  createKeyword("암보험금 청구서류", "보험금 분쟁", "청구 서류"),
  createKeyword("유사암 진단비", "보험금 분쟁", "유사암"),
  createKeyword("소액암 진단비", "보험금 분쟁", "소액암"),
  createKeyword("경계성종양 보험금", "보험금 분쟁", "경계성 종양"),
  createKeyword("제자리암 보험금", "보험금 분쟁", "제자리암"),
  createKeyword("갑상선암 보험금", "보험금 분쟁", "갑상선암"),
  createKeyword("대장점막내암 보험금", "보험금 분쟁", "대장점막내암"),
  createKeyword("뇌졸중 진단비 거절", "보험금 분쟁", "뇌졸중"),
  createKeyword("뇌출혈 진단비 거절", "보험금 분쟁", "뇌출혈"),
  createKeyword("급성심근경색 진단비 거절", "보험금 분쟁", "심근경색"),
  createKeyword("허혈성심장질환 진단비 거절", "보험금 분쟁", "허혈성 심장질환"),
  createKeyword("질병진단비 보험금 거절", "보험금 분쟁", "진단비 거절"),

  // [실손·수술비·입원비]
  createKeyword("실손보험금 거절", "보험금 분쟁", "실손 거절"),
  createKeyword("실비보험금 거절", "보험금 분쟁", "실비 거절"),
  createKeyword("실비보험 부지급", "보험금 분쟁", "실비 부지급"),
  createKeyword("실손보험 부지급", "보험금 분쟁", "실손 부지급"),
  createKeyword("수술비 보험금 거절", "보험금 분쟁", "수술비 거절"),
  createKeyword("입원비 보험금 거절", "보험금 분쟁", "입원비 거절"),
  createKeyword("통원비 보험금 거절", "보험금 분쟁", "통원비 거절"),
  createKeyword("보험금 삭감 대응", "보험금 분쟁", "삭감 대응"),

  // [산재 신청·치료종결]
  createKeyword("산재 신청 전 상담", "산재", "신청 전 검토"),
  createKeyword("산재 신청 서류", "산재", "신청 서류"),
  createKeyword("산재 신청 대행", "산재", "신청 대행"),
  createKeyword("산재 신청 거절", "산재", "신청 거절"),
  createKeyword("산재 승인 기간", "산재", "승인 기간"),
  createKeyword("산재 처리 기간", "산재", "처리 기간"),
  createKeyword("산재 치료 종결", "산재", "치료 종결"),
  createKeyword("산재 종결 후 장해", "산재", "종결 후 장해"),
  createKeyword("산재 장해진단", "산재", "장해 진단"),
  createKeyword("산재 장해진단서", "산재", "장해진단서"),
  createKeyword("산재 요양급여 불승인", "산재", "요양급여"),
  createKeyword("산재 휴업급여 불승인", "산재", "휴업급여"),
  createKeyword("산재 평균임금 정정", "산재", "평균임금"),
  createKeyword("산재 보험급여 결정 통지서", "산재", "결정 통지서"),
  createKeyword("근로복지공단 결정서 검토", "산재", "결정서 검토"),

  // [산재 질환·직업병]
  createKeyword("허리디스크 산재", "산재", "허리 디스크"),
  createKeyword("목디스크 산재", "산재", "목 디스크"),
  createKeyword("회전근개파열 산재", "산재", "회전근개"),
  createKeyword("어깨질환 산재", "산재", "어깨 질환"),
  createKeyword("무릎질환 산재", "산재", "무릎 질환"),
  createKeyword("손목터널증후군 산재", "산재", "손목터널"),
  createKeyword("테니스엘보 산재", "산재", "테니스엘보"),
  createKeyword("근골격계 산재", "산재", "근골격계"),
  createKeyword("과로성 뇌출혈 산재", "산재", "과로사"),
  createKeyword("과로성 심근경색 산재", "산재", "과로사"),

  // [배달·운송 산재]
  createKeyword("배달 라이더 산재", "산재", "배달 라이더"),
  createKeyword("택배기사 산재", "산재", "택배 기사"),
  createKeyword("화물차 기사 산재", "산재", "화물차 기사"),
  createKeyword("대리운전 산재", "산재", "대리 운전"),
  createKeyword("퀵서비스 산재", "산재", "퀵서비스"),
  createKeyword("특수고용직 산재", "산재", "특고 산재"),
  createKeyword("플랫폼 노동자 산재", "산재", "플랫폼 노동"),
];

export const getAllKeywords = (): KeywordItem[] => {
  return keywordItems;
};

export const getKeywordsByCategory = (category: KeywordCategory): KeywordItem[] => {
  return keywordItems.filter(k => k.category === category);
};

