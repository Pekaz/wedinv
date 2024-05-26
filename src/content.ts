export type Content = ContentSpec & {
  photos: { url: string; objectPosition?: string }[];
  orgPhotos: { url: string; objectPosition?: string }[];
};

export type ContentSpec = {
  // meta
  htmlTitle: string;
  htmlDesc: string;
  ogTitle: string;
  ogDesc: string;
  ogImageUrl: string;

  // card
  groomFullName: string;
  brideFullName: string;
  datetime: string;
  venue: {
    desc: string;
    address: string;
    address2?: string;
    kakaoMapUrl: string;
    naverMapUrl: string;
  };
  link?: { label: string; url: string };
  greeting: { title: string; content: string[] };
  groomContact: string;
  brideContact: string;
  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/object-position */
  galleryThumbPosition: { [filename: string]: string };
  groomGive: { name: string; account: string }[];
  brideGive: { name: string; account: string }[];
};

const myContentSpec: ContentSpec = {
  htmlTitle: "박성진 ♡ 권수지",
  htmlDesc: "박성진 ♡ 권수지 7월 20일에 결혼합니다.",
  ogTitle: "박성진 ♡ 권수지 청첩장",
  ogDesc: "7월 20일에 결혼합니다.",
  ogImageUrl:
    "https://drive.google.com/uc?id=1GwfpHwFh5BITIMmX2wgl1TObKLacK_9q",

  groomFullName: "박성진",
  brideFullName: "권수지",
  datetime: "2024년 7월 20일 토요일 오전 11시",
  venue: {
    desc: "양재 엘블레스 다이아몬드홀",
    address: "서울시 서초구 강남대로 213 지하 1층",
    address2: "(지하철 3호선 양재역 9번 출구)",
    kakaoMapUrl: "https://place.map.kakao.com/607282159",
    naverMapUrl: "https://map.naver.com/p/entry/place/37688101",
  },
  link: { label: "", url: "" },
  greeting: {
    title: "결혼합니다.",
    content: [
      `회사 동료로 시작했던 우리의 인연이 
      어느새 친구가 되고, 연인이 되고, 
      이제 부부의 연을 맺고자 합니다.
      
      초록빛 싱그러운 여름,
      보다 크고 깊은 사랑이 완성되는
      그 시작의 자리에 함께해 주시기를 바랍니다.`,
      `권양호 · 임미영의 딸 수지
        박시영 · 김연옥의 아들 성진`,
    ],
  },
  groomContact: "tel:01031350378",
  brideContact: "tel:01033985746",
  galleryThumbPosition: {}, // e.g. { "p03.jpeg": "bottom" },
  groomGive: [
    { name: "박성진", account: "우리은행 1002-941-504941" },
    { name: "박시영(부)", account: "신한은행 110-048-311363" },
    { name: "김연옥(모)", account: "신한은행 110-195-831956" },
  ],
  brideGive: [
    { name: "권수지", account: "우리은행 1002-962-551597" },
    { name: "권양호(부)", account: "우리은행 126-08-327394" },
  ],
};

export default myContentSpec;
