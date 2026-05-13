const classifyKeyword = (k) => {
  const kw = k.toLowerCase();
  if (["배달", "택배", "화물차", "대리운전", "퀵서비스", "특수고용직", "플랫폼 노동자"].some(k => kw.includes(k))) return "industrial_delivery";
  if (["허리디스크", "목디스크", "회전근개파열", "어깨질환", "무릎질환", "손목터널증후군", "근골격계", "과로성"].some(k => kw.includes(k))) return "industrial_disease";
  if (kw.includes("산재") || ["신청", "요양급여", "휴업급여", "평균임금", "근로복지공단"].some(k => kw.includes(k))) return "industrial_apply";
  if (["암", "진단비", "경계성종양", "제자리암", "갑상선암", "뇌졸중", "뇌출혈", "심근경색", "허혈성심장질환"].some(k => kw.includes(k))) return "cancer";
  if (["고지의무", "알릴의무", "계약해지", "부담보", "병력 고지"].some(k => kw.includes(k))) return "insurance_duty";
  if (["보험금", "부지급", "거절", "의료자문", "현장조사", "심사", "분쟁", "금융감독원"].some(k => kw.includes(k))) return "insurance_reject";
  if (["후유장해", "진단서", "지급률", "평가", "분류표", "청구서류"].some(k => kw.includes(k))) return "disability";
  if (["골절", "인대파열", "신경손상", "흉터", "치아손상", "안면골절", "회전근개", "반월상연골"].some(k => kw.includes(k))) return "traffic_injury";
  if (["교통사고", "합의 전", "합의 후", "치료 종결", "입원", "통원"].some(k => kw.includes(k))) return "traffic_settle";
  if (["선임", "비용", "무료상담", "상담비용", "소비자 선임"].some(k => kw.includes(k))) return "consulting";
  return "default";
};

const getDKIContent = (keyword, type) => {
  const k = keyword || "손해액과 보험금 산정";
  switch (type) {
    case "consulting": return { heroTitle: `${k}을 알아보고 계신가요?`, ctaText: "손해사정 상담 문의하기" };
    case "traffic_settle": return { heroTitle: `${k} 관련 손해액 검토가 필요하신가요?`, ctaText: "교통사고 손해액 검토 신청" };
    case "traffic_injury": return { heroTitle: `${k} 산정 기준이 궁금하신가요?`, ctaText: "부상별 손해액 검토 신청" };
    case "disability": return { heroTitle: `${k} 관련 검토가 필요하신가요?`, ctaText: "후유장해 검토 신청" };
    case "insurance_reject": return { heroTitle: `${k} 문제로 확인이 필요하신가요?`, ctaText: "보험금 분쟁 검토 신청" };
    case "insurance_duty": return { heroTitle: `${k} 관련 보험금 검토가 필요하신가요?`, ctaText: "고지의무 분쟁 검토 신청" };
    case "cancer": return { heroTitle: `${k} 지급 여부를 확인하고 계신가요?`, ctaText: "진단비 보험금 검토 신청" };
    case "industrial_apply": return { heroTitle: `${k} 관련 산재 검토가 필요하신가요?`, ctaText: "산재 자료 검토 신청" };
    case "industrial_disease": return { heroTitle: `${k} 인정 가능성을 검토하고 계신가요?`, ctaText: "질환성 산재 검토 신청" };
    case "industrial_delivery": return { heroTitle: `${k} 관련 산재 상담이 필요하신가요?`, ctaText: "운송·배달 산재 검토 신청" };
    default: return { heroTitle: `${k} 정확한 검토와 산정`, ctaText: "무료 사건 검토 신청" };
  }
};

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
  "산재 보험급여 결정 통지서",
  "교통사고 합의 후 추가청구"
];

testKeywords.forEach(k => {
  const type = classifyKeyword(k);
  const content = getDKIContent(k, type);
  console.log(`Keyword: ${k} | Type: ${type}`);
  console.log(`H1: ${content.heroTitle}`);
  console.log('---');
});
