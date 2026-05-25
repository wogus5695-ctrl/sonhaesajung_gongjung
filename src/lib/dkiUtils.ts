export type DKIType = 
  | "consulting"        // 1. 손해사정사 비용·선임
  | "traffic_settle"    // 2. 교통사고 합의 전후
  | "traffic_injury"    // 3. 교통사고 부상별 합의금
  | "disability"        // 4. 후유장해 진단·평가
  | "insurance_reject"  // 5. 보험금 부지급 대응
  | "insurance_duty"    // 6. 고지의무·계약해지
  | "cancer"            // 7. 암·진단비 보험금
  | "industrial_apply"  // 8. 산재 신청·치료종결
  | "industrial_disease" // 9. 산재 질환·직업병
  | "industrial_delivery" // 10. 배달·운송 산재
  | "default";

export interface DKIContent {
  type: DKIType;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  metaTitle: string;
  metaDesc: string;
}

export const classifyKeyword = (k: string): DKIType => {
  const kw = k.toLowerCase();
  
  // 1. Specific diagnosis/types (Highest priority)
  if (["암", "진단비", "경계성종양", "제자리암", "갑상선암", "뇌졸중", "뇌출혈", "심근경색", "허혈성심장질환"].some(k => kw.includes(k))) return "cancer";
  if (["고지의무", "알릴의무", "계약해지", "부담보", "병력 고지"].some(k => kw.includes(k))) return "insurance_duty";
  if (["후유장해", "진단서", "지급률", "평가", "분류표", "청구서류"].some(k => kw.includes(k))) return "disability";

  // 2. Traffic related (Check specific first, then general)
  if (kw.includes("교통사고") || ["합의", "입원", "통원", "12대 과실", "12대 중과실"].some(k => kw.includes(k))) {
    if (["골절", "인대파열", "신경손상", "흉터", "치아손상", "안면골절", "회전근개", "반월상연골"].some(k => kw.includes(k))) return "traffic_injury";
    return "traffic_settle";
  }

  // 3. Industrial related (Check specific first, then general)
  if (kw.includes("산재") || ["신청", "요양급여", "휴업급여", "평균임금", "근로복지공단"].some(k => kw.includes(k))) {
    if (["배달", "택배", "화물차", "대리운전", "퀵서비스", "특수고용직", "플랫폼 노동자"].some(k => kw.includes(k))) return "industrial_delivery";
    if (["허리디스크", "목디스크", "회전근개파열", "어깨질환", "무릎질환", "손목터널증후군", "근골격계", "과로성"].some(k => kw.includes(k))) return "industrial_disease";
    return "industrial_apply";
  }

  // 4. General Insurance disputes
  if (["보험금", "부지급", "거절", "의료자문", "현장조사", "심사", "분쟁", "금융감독원"].some(k => kw.includes(k))) return "insurance_reject";

  // 5. Consulting/Costs
  if (["선임", "비용", "무료상담", "상담비용", "소비자 선임"].some(k => kw.includes(k))) return "consulting";

  // 6. Injury keywords without specific context
  if (["골절", "인대파열", "신경손상", "흉터", "치아손상", "안면골절", "회전근개", "반월상연골"].some(k => kw.includes(k))) return "traffic_injury";

  // 7. General catch-all for "치료 종결" (Defaults to traffic as it's more common in that context)
  if (kw.includes("치료 종결")) return "traffic_settle";
  
  return "default";
};

export const getDKIContent = (keyword: string, type: DKIType): DKIContent => {
  const k = keyword || "손해액과 보험금 산정";
  const brand = "공정손해사정";

  const regions = [
    "서울", "강남", "서초", "송파", "강동", "영등포", "마포", "강서", "구로", "금천", "관악", "동작", "성동", "광진", "노원", "은평", "동대문", "중랑", "용산", "중구", "종로", "성북", "강북", "도봉", "서대문", "양천", 
    "경기", "수원", "성남", "용인", "고양", "일산", "부천", "안산", "안양", "화성", "평택", "시흥", "김포", "남양주", "의정부", "광명", "하남", "파주", "군포", "광주", "이천", "안성", "양주", "구리", "오산", "의왕", "포천", "동두천", "과천", "여주",
    "인천", "인천 중구", "인천 동구", "미추홀", "연수", "남동", "부평", "계양", "인천 서구", "강화", "옹진", "송도", "청라"
  ];
  const sortedRegions = [...regions].sort((a, b) => b.length - a.length);

  let matchedRegion = "";
  for (const r of sortedRegions) {
    if (k.startsWith(r)) {
      matchedRegion = r;
      break;
    }
  }

  if (matchedRegion) {
    const service = k.substring(matchedRegion.length).trim();
    
    // H1 (heroTitle)
    let heroTitle = "";
    if (service === "손해사정사" || service === "손해사정사 상담") {
      heroTitle = `${matchedRegion} ${service} 상담이 필요하신가요?`;
    } else if (service.includes("합의금") || service.includes("손해사정사")) {
      heroTitle = `${matchedRegion} ${service} 검토가 필요하신가요?`;
    } else if (service.includes("불승인") || service.includes("부지급") || service.includes("장해등급") || service.includes("보험금") || service.includes("치료 종결") || service.includes("직업병") || service.includes("폐암") || service.includes("장해진단서")) {
      heroTitle = `${matchedRegion} ${service} 관련 검토가 필요하신가요?`;
    } else {
      heroTitle = `${matchedRegion} ${service} 검토가 필요하신가요?`;
    }

    // Subtitle (heroSubtitle)
    let heroSubtitle = "";
    if (service.includes("교통사고") || service.includes("합의금") || service.includes("12대 과실") || service.includes("12대 중과실")) {
      heroSubtitle = `${matchedRegion} 지역의 교통사고 합의금, 후유장해, 과실비율, 향후치료비, 휴업손해 문제를 사고자료와 의무기록을 기준으로 검토합니다.`;
    } else if (service.includes("보험금") || service.includes("부지급") || service.includes("후유장해")) {
      heroSubtitle = `${matchedRegion} 지역의 보험금 부지급, 후유장해 보험금, 보험사 의료자문, 고지의무 위반 문제를 약관과 의무기록, 보험사 안내문을 기준으로 검토합니다.`;
    } else if (service.includes("산재") || service.includes("직업병") || service.includes("폐암") || service.includes("장해등급") || service.includes("치료 종결") || service.includes("장해진단서")) {
      heroSubtitle = `${matchedRegion} 지역의 산재 불승인, 장해등급, 치료 종결, 직업병 산재 문제는 재해경위, 의무기록, 업무관련성 자료를 기준으로 검토합니다.`;
    } else {
      heroSubtitle = `${matchedRegion} 지역의 ${service} 관련 문제는 사고자료, 의무기록, 보험약관, 산재 결정서 등 개별 자료를 기준으로 확인해야 합니다.`;
    }

    const ctaText = `${matchedRegion} ${service} 검토 신청`;
    const metaTitle = `${matchedRegion} ${service} 상담 - ${brand}`;
    const metaDesc = `${matchedRegion} 지역에서 ${service} 문제로 손해사정 상담을 찾으신다면, ${brand}에서 사고 자료와 객관적 기준을 바탕으로 세밀하게 검토해 드립니다.`;

    return { type, heroTitle, heroSubtitle, ctaText, metaTitle, metaDesc };
  }
  
  let heroTitle = "";
  let heroSubtitle = "";
  let ctaText = "무료 사건 검토 신청";
  let metaTitle = `${k} 상담 - ${brand}`;
  let metaDesc = `${k} 관련 손해액 산정 및 보험금 분쟁 문제를 의학자료 기준으로 정밀 검토해드립니다.`;


  switch (type) {
    case "consulting":
      heroTitle = `${k}을 알아보고 계신가요?`;
      heroSubtitle = "손해사정사 상담과 선임 전에는 비용 구조, 검토 범위, 필요한 자료를 먼저 확인하는 것이 중요합니다.";
      ctaText = "손해사정 상담 문의하기";
      metaTitle = `${k} 안내 및 상담 - ${brand}`;
      metaDesc = `${k} 관련 손해사정사 상담 및 선임 비용 구조를 사고 자료를 바탕으로 투명하게 안내해드립니다.`;
      break;
    case "traffic_settle":
      heroTitle = `${k} 관련 손해액 검토가 필요하신가요?`;
      heroSubtitle = "교통사고 합의 전후에는 치료기록, 휴업손해, 향후치료비, 후유장해 가능성 등 손해항목이 적정하게 반영되었는지 확인해야 합니다.";
      ctaText = "교통사고 손해액 검토 신청";
      metaTitle = `${k} 관련 손해액 산정 및 상담 - ${brand}`;
      metaDesc = `${k} 관련 교통사고 합의금, 과실비율, 후유장해 가능성을 사고자료 기준으로 전문 검토해드립니다.`;
      break;
    case "traffic_injury":
      heroTitle = `${k} 산정 기준이 궁금하신가요?`;
      heroSubtitle = "부상 부위와 치료기록, 장해 가능성, 소득자료에 따라 교통사고 손해액 산정 결과가 달라질 수 있습니다.";
      ctaText = "부상별 손해액 검토 신청";
      metaTitle = `${k} 합의금 산정 기준 상담 - ${brand}`;
      metaDesc = `${k} 부상에 따른 교통사고 합의금 및 후유장해 가능성을 의학적 자료를 근거로 정밀 검토합니다.`;
      break;
    case "disability":
      heroTitle = `${k} 관련 검토가 필요하신가요?`;
      heroSubtitle = "후유장해 보험금은 진단서, 장해평가, 지급률, 약관 기준에 따라 결과가 달라질 수 있으므로 자료 기준 검토가 필요합니다.";
      ctaText = "후유장해 검토 신청";
      metaTitle = `${k} 관련 후유장해 평가 상담 - ${brand}`;
      metaDesc = `${k} 관련 후유장해 보험금 산정 및 약관 기준 적용 여부를 의무기록을 바탕으로 전문 검토해드립니다.`;
      break;
    case "insurance_reject":
      heroTitle = `${k} 문제로 확인이 필요하신가요?`;
      heroSubtitle = "보험금 지급 거절, 감액, 의료자문, 현장조사 과정에서는 보험사의 사유와 약관 적용이 타당한지 자료 기준으로 검토해야 합니다.";
      ctaText = "보험금 분쟁 검토 신청";
      metaTitle = `${k} 보험금 분쟁 및 부지급 대응 - ${brand}`;
      metaDesc = `${k} 관련 보험사의 부지급 사유 및 의료자문 결과가 약관상 타당한지 자료를 근거로 검토합니다.`;
      break;
    case "insurance_duty":
      heroTitle = `${k} 관련 보험금 검토가 필요하신가요?`;
      heroSubtitle = "고지의무 위반이나 계약해지 통보가 있는 경우, 가입 당시 고지 내용과 현재 보험금 청구 사유의 관련성을 확인해야 합니다.";
      ctaText = "고지의무 분쟁 검토 신청";
      metaTitle = `${k} 고지의무 및 계약해지 상담 - ${brand}`;
      metaDesc = `${k} 관련 고지의무 위반 사유가 정당한지, 보험금 지급과의 인과관계를 의무기록 기준으로 분석합니다.`;
      break;
    case "cancer":
      heroTitle = `${k} 지급 여부를 확인하고 계신가요?`;
      heroSubtitle = "진단비 보험금은 진단명, 병리결과, 약관상 분류 기준에 따라 지급 여부가 달라질 수 있습니다.";
      ctaText = "진단비 보험금 검토 신청";
      metaTitle = `${k} 암·진단비 보험금 검토 - ${brand}`;
      metaDesc = `${k} 관련 병리 조직 검사결과와 약관상 암 분류 기준을 대조하여 정당한 보험금 지급 여부를 확인합니다.`;
      break;
    case "industrial_apply":
      heroTitle = `${k} 관련 산재 검토가 필요하신가요?`;
      heroSubtitle = "산재 신청, 치료 종결, 장해진단, 급여 결정은 재해경위, 의무기록, 업무관련성 자료를 기준으로 검토해야 합니다.";
      ctaText = "산재 자료 검토 신청";
      metaTitle = `${k} 산재 신청 및 장해 상담 - ${brand}`;
      metaDesc = `${k} 관련 산재 불승인 대응 및 장해등급 재심사 청구 문제를 사고 자료를 근거로 전문 검토합니다.`;
      break;
    case "industrial_disease":
      heroTitle = `${k} 인정 가능성을 검토하고 계신가요?`;
      heroSubtitle = "질환성 산재는 업무내용, 반복동작, 작업환경, 의무기록, 기존 질환 여부를 종합적으로 확인해야 합니다.";
      ctaText = "질환성 산재 검토 신청";
      metaTitle = `${k} 직업병 및 질환 산재 상담 - ${brand}`;
      metaDesc = `${k} 등 업무상 질환에 대한 업무관련성 입증 및 산재 승인 가능성을 자료 기준으로 분석해드립니다.`;
      break;
    case "industrial_delivery":
      heroTitle = `${k} 관련 산재 상담이 필요하신가요?`;
      heroSubtitle = "배달·운송·특수고용 산재는 업무 수행 중 사고 여부, 계약 형태, 사고 경위, 치료기록을 기준으로 검토해야 합니다.";
      ctaText = "운송·배달 산재 검토 신청";
      metaTitle = `${k} 배달·운송 특고직 산재 상담 - ${brand}`;
      metaDesc = `${k} 관련 산재 신청 및 보상 가능 여부를 사고 경위와 계약 형태를 분석하여 전문 검토해드립니다.`;
      break;
    default:
      heroTitle = `${k} 정확한 검토와 산정`;
      heroSubtitle = "보험금 산정 관련 손해액과 보험사의 산정 문제를 사고자료와 진단자료를 기준으로 검토합니다.";
      ctaText = "무료 사건 검토 신청";
      metaTitle = `${k} 상담 - ${brand}`;
      metaDesc = `${k} 관련 손해액 산정 및 보험금 분쟁 문제를 자료 기준으로 정밀 검토해드립니다.`;
      break;
  }

  return { type, heroTitle, heroSubtitle, ctaText, metaTitle, metaDesc };
};

export const getProblemSituationsByTheme = (type: DKIType) => {
  const allSituations = [
    { text: "보험사가 제시한 <u>교통사고 합의금이 적게</u> 느껴질 때", theme: "traffic" },
    { text: "12대 중과실 사고로 <u>과실비율 검토</u>가 필요할 때", theme: "traffic" },
    { text: "오토바이 사고 후 <u>정당한 손해배상액 산정</u>이 필요할 때", theme: "traffic" },
    { text: "근로복지공단으로부터 <u>산재 불승인</u>을 받았을 때", theme: "industrial" },
    { text: "산재 장해등급이 <u>실제 상태보다 낮게</u> 나온 것 같을 때", theme: "industrial" },
    { text: "질병·상해 보험금이 <u>정당한 사유 없이 거절</u>되었을 때", theme: "insurance" }
  ];

  // Map DKIType to old DKITheme for compatibility with this function
  let theme: string = "default";
  if (type.startsWith("traffic")) theme = "traffic";
  if (type.startsWith("industrial")) theme = "industrial";
  if (type.startsWith("insurance") || type === "cancer" || type === "disability") theme = "insurance";

  if (theme === "default") return allSituations;

  // 관련 테마가 먼저 나오도록 정렬
  return [...allSituations].sort((a, b) => {
    if (a.theme === theme && b.theme !== theme) return -1;
    if (a.theme !== theme && b.theme === theme) return 1;
    return 0;
  });
};

export const getFAQByTheme = (type: DKIType, keyword: string) => {
  const displayKw = keyword || "해당";
  
  // Map DKIType to old DKITheme for compatibility
  let theme: string = "default";
  if (type.startsWith("traffic")) theme = "traffic";
  if (type.startsWith("industrial")) theme = "industrial";
  if (type.startsWith("insurance") || type === "cancer" || type === "disability" || type === "insurance_duty") theme = "insurance";

  const baseFaqs = [
    { q: "손해사정 상담은 언제 받는 것이 가장 좋은가요?", a: "가장 좋은 시점은 '보험사로부터 안내를 받기 전' 또는 '합의서에 서명하기 전'입니다. 이미 결정된 사안을 뒤집는 것보다, 초기 단계에서 객관적인 자료를 준비하는 것이 훨씬 효율적입니다." },
    { q: "보험금이 거절되었는데 소송을 해야만 하나요?", a: "무조건 소송이 답은 아닙니다. 보험사의 거절 사유가 약관이나 판례에 비추어 타당한지 먼저 검토해야 합니다. 손해사정사의 의견서 제출을 통해 원만한 해결을 시도해 볼 수 있습니다." }
  ];

  let themeFaq = { q: "", a: "" };

  switch (theme) {
    case "traffic":
      themeFaq = { 
        q: `${displayKw} 합의 전에 전문가 상담이 꼭 필요한가요?`, 
        a: "네, 보험사가 제시하는 과실비율과 후유장해 인정 범위가 객관적인 자료에 기반했는지 확인해야 합니다. 한 번 서명하면 번복이 어렵기 때문에 사전 검토가 필수적입니다." 
      };
      break;
    case "industrial":
      themeFaq = { 
        q: `${displayKw} 불승인 통보를 받았는데 다시 청구할 수 있나요?`, 
        a: "네, 가능합니다. 불승인 사유를 분석하여 업무관련성을 입증할 수 있는 추가 의무기록이나 동료 진술 등을 확보하여 심사청구나 재심사청구를 진행할 수 있습니다." 
      };
      break;
    case "insurance":
      themeFaq = { 
        q: `${displayKw} 부지급 통보 시 어떤 서류를 준비해야 하나요?`, 
        a: "보험사의 부지급 안내문, 가입 시 약관, 진단서 및 검사결과지가 기본입니다. 특히 고지의무 위반 여부가 쟁점이라면 당시 병원 방문 기록 전체를 검토해야 합니다." 
      };
      break;
    default:
      themeFaq = { 
        q: `${displayKw} 관련 상담 시 비용이 발생하나요?`, 
        a: "기초적인 자료 검토와 방향성 안내는 무상으로 진행됩니다. 구체적인 손해사정서 작성이 필요한 경우에만 별도의 수수료가 발생하며, 이는 사전에 투명하게 안내해 드립니다." 
      };
      break;
  }

  return [themeFaq, ...baseFaqs];
};
