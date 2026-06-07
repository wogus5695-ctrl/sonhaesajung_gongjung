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
  pcHeroTitle: string;
  mobileHeroTitle: string;
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
    let matchEndIndex = matchedRegion.length;
    let nextIndex = matchedRegion.length;
    while (nextIndex < k.length && k.charAt(nextIndex) === ' ') {
      nextIndex++;
    }
    if (nextIndex < k.length) {
      const nextChar = k.charAt(nextIndex);
      if (nextChar === '구' || nextChar === '시' || nextChar === '군') {
        matchedRegion += nextChar;
        matchEndIndex = nextIndex + 1;
      }
    }

    const service = k.substring(matchEndIndex).trim();
    const displayService = (service === "손해사정사" || service === "손해사정사 상담") ? "손해사정" : service;
    
    // H1 (heroTitle)
    let heroTitle = "";
    if (service === "손해사정사" || service === "손해사정사 상담") {
      const suffix = service.endsWith("상담") ? "이 필요하신가요?" : "상담이 필요하신가요?";
      heroTitle = `<span class="text-white">${matchedRegion}</span> <span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${service}</span> <span class="text-white">${suffix}</span>`;
    } else if (service.includes("합의금") || service.includes("손해사정사")) {
      heroTitle = `<span class="text-white">${matchedRegion}</span> <span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${service}</span> <span class="text-white">검토가 필요하신가요?</span>`;
    } else if (service.includes("불승인") || service.includes("부지급") || service.includes("장해등급") || service.includes("보험금") || service.includes("치료 종결") || service.includes("직업병") || service.includes("폐암") || service.includes("장해진단서")) {
      heroTitle = `<span class="text-white">${matchedRegion}</span> <span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${service}</span> <span class="text-white">관련 검토가 필요하신가요?</span>`;
    } else {
      heroTitle = `<span class="text-white">${matchedRegion}</span> <span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${service}</span> <span class="text-white">검토가 필요하신가요?</span>`;
    }

    // Subtitle (heroSubtitle)
    let heroSubtitle = "";
    if (service.includes("교통사고") || service.includes("합의금") || service.includes("12대 과실") || service.includes("12대 중과실")) {
      heroSubtitle = `<strong class="font-bold text-white">손해사정사</strong>의 정밀 분석과 <strong class="font-bold text-white">협업 변호사</strong>의 법률 검토를 연계하여, ${matchedRegion} 지역의 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">교통사고 합의금, 후유장해 문제를 사고자료 기준</strong>으로 면밀히 분석합니다.`;
    } else if (service.includes("보험금") || service.includes("부지급") || service.includes("후유장해")) {
      heroSubtitle = `<strong class="font-bold text-white">손해사정사</strong> 분석부터 <strong class="font-bold text-white">협업 변호사</strong> 공동 조력까지! ${matchedRegion} 지역의 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">보험금 부지급, 후유장해 분쟁 문제를 약관과 의무기록</strong>을 바탕으로 통합 검토합니다.`;
    } else if (service.includes("산재") || service.includes("직업병") || service.includes("폐암") || service.includes("장해등급") || service.includes("치료 종결") || service.includes("장해진단서")) {
      heroSubtitle = `<strong class="font-bold text-white">손해사정사</strong>와 <strong class="font-bold text-white">협업 변호사</strong>가 함께 대응하여, ${matchedRegion} 지역의 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">산재 불승인, 장해등급 재심사 문제를 자료 기준</strong>으로 명쾌하게 풀어냅니다.`;
    } else {
      heroSubtitle = `<strong class="font-bold text-white">손해사정사</strong>의 세밀한 분석과 <strong class="font-bold text-white">협업 변호사</strong>의 법률 자문을 연계하여, ${matchedRegion} 지역의 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${displayService} 관련 보상 문제를 개별 사고 자료 기준</strong>으로 입증합니다.`;
    }

    const ctaText = `${matchedRegion} ${service} 검토 신청`;
    const metaTitle = `${matchedRegion} ${appendCounselingSuffix(service, " 상담")} - ${brand}`;
    const metaDesc = `${matchedRegion} 지역에서 ${service} 문제로 손해사정 상담을 찾으신다면, ${brand}에서 사고 자료와 객관적 기준을 바탕으로 세밀하게 검토해 드립니다.`;
    const pcHeroTitle = `<span class="text-white">${matchedRegion}</span> <span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${appendCounselingSuffix(service, " 상담")}</span><span class="text-white">,</span><br /><span class="text-white">보험사 제시금 그대로 서명하기 전 확인하세요</span>`;
    
    let mobileHeroSubText = "합의 전 필수 확인";
    if (service.includes("산재") || service.includes("질환") || service.includes("직업병") || service.includes("근로")) {
      mobileHeroSubText = "서명 전 무료 검토";
    } else if (service.includes("보험금") || service.includes("부지급") || service.includes("거절") || service.includes("진단비") || service.includes("암")) {
      mobileHeroSubText = "보험사 제시금 검토";
    }
    const mobileHeroTitle = `<span class="text-white">${matchedRegion}</span> <span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${appendCounselingSuffix(service, " 상담")}</span><br /><span class="text-white">${mobileHeroSubText}</span>`;

    const finalMetaDesc = keyword
      ? `${appendCounselingSuffix(keyword, " 상담")}이 필요하다면 보험사 제시금, 교통사고 합의금, 산재 불승인, 보험금 부지급 문제를 사고자료·의무기록·약관 기준으로 검토하세요. 합의서 서명 전 무료 사전 검토를 안내합니다.`
      : metaDesc;

    return { type, heroTitle, heroSubtitle, ctaText, metaTitle, metaDesc: finalMetaDesc, pcHeroTitle, mobileHeroTitle };
  }
  
  let heroTitle = "";
  let heroSubtitle = "";
  let ctaText = "무료 사건 검토 신청";
  let metaTitle = `${appendCounselingSuffix(k, " 상담")} - ${brand}`;
  let metaDesc = `${k} 관련 손해액 산정 및 보험금 분쟁 문제를 의학자료 기준으로 정밀 검토해드립니다.`;


  switch (type) {
    case "consulting":
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white">을 알아보고 계신가요?</span>`;
      heroSubtitle = `<strong class="font-bold text-white">손해사정사</strong> 분석부터 <strong class="font-bold text-white">협업 변호사</strong> 상담까지 한번에! 선임 전 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">검토 범위와 필요한 서류</strong>를 투명하게 안내해 드립니다.`;
      ctaText = "손해사정 상담 문의하기";
      metaTitle = `${k.endsWith("상담") ? `${k} 안내` : `${k} 안내 및 상담`} - ${brand}`;
      metaDesc = `${k} 관련 손해사정사 상담 및 선임 비용 구조를 사고 자료를 바탕으로 투명하게 안내해드립니다.`;
      break;
    case "traffic_settle":
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white"> 관련 손해액 검토가 필요하신가요?</span>`;
      heroSubtitle = `<strong class="font-bold text-white">손해사정사</strong>의 정밀 분석과 <strong class="font-bold text-white">협업 변호사</strong>의 법률 검토를 연계하여, 교통사고 합의 전후 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">적정 손해액을 확실하게 검증</strong>합니다.`;
      ctaText = "교통사고 손해액 검토 신청";
      metaTitle = `${k.endsWith("상담") ? `${k} 관련 손해액 산정` : `${k} 관련 손해액 산정 및 상담`} - ${brand}`;
      metaDesc = `${k} 관련 교통사고 합의금, 과실비율, 후유장해 가능성을 사고자료 기준으로 전문 검토해드립니다.`;
      break;
    case "traffic_injury":
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white"> 산정 기준이 궁금하신가요?</span>`;
      heroSubtitle = `<strong class="font-bold text-white">손해사정사</strong>와 <strong class="font-bold text-white">협업 변호사</strong>가 함께하는 공동 지원으로, 부상 상태와 치료기록에 따른 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">정당한 보상 산정 기준</strong>을 제시합니다.`;
      ctaText = "부상별 손해액 검토 신청";
      metaTitle = `${k.endsWith("상담") ? `${k} 합의금 산정 기준` : `${k} 합의금 산정 기준 상담`} - ${brand}`;
      metaDesc = `${k} 부상에 따른 교통사고 합의금 및 후유장해 가능성을 의학적 자료를 근거로 정밀 검토합니다.`;
      break;
    case "disability":
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white"> 관련 검토가 필요하신가요?</span>`;
      heroSubtitle = `약관 분석부터 법률 검토까지 한번에! 후유장해 보험금 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">장해평가 및 지급률의 적정성</strong>을 <strong class="font-bold text-white">손해사정사</strong> 분석과 <strong class="font-bold text-white">협업 변호사</strong>의 공동 검토로 세밀하게 진단합니다.`;
      ctaText = "후유장해 검토 신청";
      metaTitle = `${k.endsWith("상담") ? `${k} 관련 후유장해 평가` : `${k} 관련 후유장해 평가 상담`} - ${brand}`;
      metaDesc = `${k} 관련 후유장해 보험금 산정 및 약관 기준 적용 여부를 의무기록을 바탕으로 전문 검토해드립니다.`;
      break;
    case "insurance_reject":
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white"> 문제로 확인이 필요하신가요?</span>`;
      heroSubtitle = `보험사 지급 거절 및 의료자문 과정에 대응하기 위해, <strong class="font-bold text-white">손해사정사</strong>와 <strong class="font-bold text-white">협업 변호사</strong>가 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">공동 조력하여 입증 자료를 마련</strong>합니다.`;
      ctaText = "보험금 분쟁 검토 신청";
      metaTitle = `${k} 보험금 분쟁 및 부지급 대응 - ${brand}`;
      metaDesc = `${k} 관련 보험사의 부지급 사유 및 의료자문 결과가 약관상 타당한지 자료를 근거로 검토합니다.`;
      break;
    case "insurance_duty":
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white"> 관련 보험금 검토가 필요하신가요?</span>`;
      heroSubtitle = `고지의무 위반 및 보험 계약해지 통보에 직면했을 때, 가입 내역과 의무기록을 <strong class="font-bold text-white">손해사정사</strong> 분석과 <strong class="font-bold text-white">협업 변호사</strong>의 공동 검토를 통해 철저히 방어합니다.`;
      ctaText = "고지의무 분쟁 검토 신청";
      metaTitle = `${k.endsWith("상담") ? `${k} 고지의무 및 계약해지` : `${k} 고지의무 및 계약해지 상담`} - ${brand}`;
      metaDesc = `${k} 관련 고지의무 위반 사유가 정당한지, 보험금 지급과의 인과관계를 의무기록 기준으로 분석합니다.`;
      break;
    case "cancer":
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white"> 지급 여부를 확인하고 계신가요?</span>`;
      heroSubtitle = `<strong class="font-bold text-white">손해사정사</strong>의 의학자료 분석과 <strong class="font-bold text-white">협업 변호사</strong>의 법률 검토로, 진단명 및 병리결과에 따른 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">정당한 암 진단비 지급 여부</strong>를 확인합니다.`;
      ctaText = "진단비 보험금 검토 신청";
      metaTitle = `${k} 암·진단비 보험금 검토 - ${brand}`;
      metaDesc = `${k} 관련 병리 조직 검사결과와 약관상 암 분류 기준을 대조하여 정당한 보험금 지급 여부를 확인합니다.`;
      break;
    case "industrial_apply":
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white"> 관련 산재 검토가 필요하신가요?</span>`;
      heroSubtitle = `산재 신청부터 불승인 시 소송 대비까지! <strong class="font-bold text-white">손해사정사</strong>의 정밀 분석과 <strong class="font-bold text-white">협업 변호사</strong>의 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">공동 지원으로 정당한 권리를 복원</strong>합니다.`;
      ctaText = "산재 자료 검토 신청";
      metaTitle = `${k.endsWith("상담") ? `${k} 산재 신청 및 장해` : `${k} 산재 신청 및 장해 상담`} - ${brand}`;
      metaDesc = `${k} 관련 산재 불승인 대응 및 장해등급 재심사 청구 문제를 사고 자료를 근거로 전문 검토합니다.`;
      break;
    case "industrial_disease":
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white"> 인정 가능성을 검토하고 계신가요?</span>`;
      heroSubtitle = `업무상 질환 및 직업병의 인과관계 입증을 위해, <strong class="font-bold text-white">손해사정사</strong>와 <strong class="font-bold text-white">협업 변호사</strong>가 <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">함께 의무기록과 작업환경 자료를 검증</strong>합니다.`;
      ctaText = "질환성 산재 검토 신청";
      metaTitle = `${k.endsWith("상담") ? `${k} 직업병 및 질환 산재` : `${k} 직업병 및 질환 산재 상담`} - ${brand}`;
      metaDesc = `${k} 등 업무상 질환에 대한 업무관련성 입증 및 산재 승인 가능성을 자료 기준으로 분석해드립니다.`;
      break;
    case "industrial_delivery":
      const deliverySuffix = k.endsWith("상담") ? " 관련 산재 검토가 필요하신가요?" : " 관련 산재 상담이 필요하신가요?";
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white">${deliverySuffix}</span>`;
      heroSubtitle = `배달 및 특고직 산재의 사고 경위와 계약 형태를 <strong class="font-bold text-white">손해사정사</strong>와 <strong class="font-bold text-white">협업 변호사</strong>가 공동 분석하여, <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">복잡한 업무상 재해 인정 절차</strong>를 확실하게 지원합니다.`;
      ctaText = "운송·배달 산재 검토 신청";
      metaTitle = `${k.endsWith("상담") ? `${k} 배달·운송 특고직 산재` : `${k} 배달·운송 특고직 산재 상담`} - ${brand}`;
      metaDesc = `${k} 관련 산재 신청 및 보상 가능 여부를 사고 경위와 계약 형태를 분석하여 전문 검토해드립니다.`;
      break;
    default:
      heroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${k}</span> <span class="text-white"> 정확한 검토와 산정</span>`;
      heroSubtitle = `<strong class="font-bold text-white">손해사정사</strong>의 정밀 분석과 <strong class="font-bold text-white">협업 변호사</strong>의 법률 검토를 연계하여, <strong class="text-white underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">정당한 손해액 산정을 객관적 자료 기준</strong>으로 조력합니다.`;
      ctaText = "무료 사건 검토 신청";
      metaTitle = `${appendCounselingSuffix(k, " 상담")} - ${brand}`;
      metaDesc = `${k} 관련 손해액 산정 및 보험금 분쟁 문제를 자료 기준으로 정밀 검토해드립니다.`;
      break;
  }

  const updatedMetaTitle = metaTitle.includes(` - ${brand}`) 
    ? metaTitle.replace(` - ${brand}`, ` | 변호사 협업까지 한번에! - ${brand}`)
    : `${metaTitle} | 변호사 협업까지 한번에!`;

  const pcHeroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${appendCounselingSuffix(k, " 상담")}</span><span class="text-white">,</span><br /><span class="text-white">보험사 제시금 그대로 서명하기 전 확인하세요</span>`;
  
  let mobileHeroSubText = "합의 전 필수 확인";
  if (type.startsWith("industrial")) {
    mobileHeroSubText = "서명 전 무료 검토";
  } else if (type.startsWith("insurance") || type === "cancer" || type === "disability") {
    mobileHeroSubText = "보험사 제시금 검토";
  }
  const mobileHeroTitle = `<span class="text-brand-gold underline decoration-brand-gold decoration-2 underline-offset-8 font-bold">${appendCounselingSuffix(k, " 상담")}</span><br /><span class="text-white">${mobileHeroSubText}</span>`;

  const finalMetaDesc = keyword
    ? `${appendCounselingSuffix(keyword, " 상담")}이 필요하다면 보험사 제시금, 교통사고 합의금, 산재 불승인, 보험금 부지급 문제를 사고자료·의무기록·약관 기준으로 검토하세요. 합의서 서명 전 무료 사전 검토를 안내합니다.`
    : metaDesc;

  return { type, heroTitle, heroSubtitle, ctaText, metaTitle: updatedMetaTitle, metaDesc: finalMetaDesc, pcHeroTitle, mobileHeroTitle };
};

export const getProblemSituationsByTheme = (type: DKIType) => {
  const allSituations = [
    { text: "교통사고 <u>합의금이 적게</u> 느껴질 때", theme: "traffic" },
    { text: "12대 중과실 사고로 <u>과실비율 검토</u>가 필요할 때", theme: "traffic" },
    { text: "오토바이 사고 후 <u>손해배상액 산정</u>이 필요할 때", theme: "traffic" },
    { text: "산재 <u>불승인 통보</u>를 받았을 때", theme: "industrial" },
    { text: "산재 <u>장해등급이 낮게</u> 나온 것 같을 때", theme: "industrial" },
    { text: "보험금이 <u>정당한 사유 없이 거절</u>되었을 때", theme: "insurance" }
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
      const faqSuffix = displayKw.endsWith("상담") ? " 관련 검토 시 비용이 발생하나요?" : " 관련 상담 시 비용이 발생하나요?";
      themeFaq = { 
        q: `${displayKw}${faqSuffix}`, 
        a: "기초적인 자료 검토와 방향성 안내는 무상으로 진행됩니다. 구체적인 손해사정서 작성이 필요한 경우에만 별도의 수수료가 발생하며, 이는 사전에 투명하게 안내해 드립니다." 
      };
      break;
  }

  return [themeFaq, ...baseFaqs];
};

/**
 * Prevent double "상담" when appending a suffix to a text.
 * If the text ends with "상담" and the suffix starts with "상담",
 * we remove the "상담" prefix from the suffix to avoid duplication.
 */
export function appendCounselingSuffix(text: string, suffix: string): string {
  if (!text) return suffix;
  const trimmedText = text.trim();
  if (trimmedText.endsWith("상담")) {
    const matchSpace = suffix.match(/^\s*상담(\s*)/);
    if (matchSpace) {
      const trailingSpace = matchSpace[1];
      const strippedSuffix = suffix.substring(matchSpace[0].length);
      return text + trailingSpace + strippedSuffix;
    }
  }
  return text + suffix;
}

