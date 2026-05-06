export type DKITheme = "traffic" | "industrial" | "insurance" | "default";

export interface DKIContent {
  theme: DKITheme;
  heroSubtitle: string;
  contactTitle: string;
}

export const classifyKeyword = (k: string): DKITheme => {
  const trafficKws = ["교통사고", "오토바이", "12대 중과실", "합의금", "후유장해"];
  const industrialKws = ["산재", "근로복지공단", "추가상병", "장해등급", "폐암", "직업병"];
  const insuranceKws = ["보험금", "부지급", "고지의무", "상해후유장해", "질병후유장해", "보험사 분쟁"];

  if (trafficKws.some(kw => k.includes(kw))) return "traffic";
  if (industrialKws.some(kw => k.includes(kw))) return "industrial";
  if (insuranceKws.some(kw => k.includes(kw))) return "insurance";
  
  return "default";
};

export const getDKIContent = (keyword: string, theme: DKITheme): DKIContent => {
  const displayKw = keyword || "손해액과 보험금 산정";
  
  let heroSubtitle = "";
  let contactTitle = `${displayKw} 무료 검토 신청`;

  switch (theme) {
    case "traffic":
      heroSubtitle = `${displayKw} 관련 합의금, 과실비율, 소득자료, 후유장해, 향후치료비 항목을 <u>사고자료와 의학자료를 기준으로 검토</u>합니다.`;
      break;
    case "industrial":
      heroSubtitle = `${displayKw} 관련 불승인 사유, 업무관련성, 의무기록, 추가상병, 장해등급 가능성을 <u>자료 기준으로 검토</u>합니다.`;
      break;
    case "insurance":
      heroSubtitle = `${displayKw} 관련 보험금 부지급 사유, 약관 적용, 고지의무, 후유장해 평가, 손해액 산정 쟁점을 <u>검토</u>합니다.`;
      break;
    default:
      heroSubtitle = `보험금 산정 관련 손해액과 보험사의 산정 문제를 \n<u>사고자료와 진단자료를 기준으로 검토</u>합니다.`;
      break;
  }

  return { theme, heroSubtitle, contactTitle };
};

export const getProblemSituationsByTheme = (theme: DKITheme) => {
  const allSituations = [
    { text: "보험사가 제시한 <u>교통사고 합의금이 적게</u> 느껴질 때", theme: "traffic" },
    { text: "12대 중과실 사고로 <u>과실비율 검토</u>가 필요할 때", theme: "traffic" },
    { text: "오토바이 사고 후 <u>정당한 손해배상액 산정</u>이 필요할 때", theme: "traffic" },
    { text: "근로복지공단으로부터 <u>산재 불승인</u>을 받았을 때", theme: "industrial" },
    { text: "산재 장해등급이 <u>실제 상태보다 낮게</u> 나온 것 같을 때", theme: "industrial" },
    { text: "질병·상해 보험금이 <u>정당한 사유 없이 거절</u>되었을 때", theme: "insurance" }
  ];

  if (theme === "default") return allSituations;

  // 관련 테마가 먼저 나오도록 정렬
  return [...allSituations].sort((a, b) => {
    if (a.theme === theme && b.theme !== theme) return -1;
    if (a.theme !== theme && b.theme === theme) return 1;
    return 0;
  });
};

export const getFAQByTheme = (theme: DKITheme, keyword: string) => {
  const displayKw = keyword || "해당";
  
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
