# 토어(TOOR)

"현지인 솔직한 후기와 AI를 통해 관광지 바가지를 근절하는 투명한 여행 플랫폼"  
현지인 인증 + 실시간 가격 비교 + AI 개인화 여행 가이드로 국내여행의 가성비와 신뢰도를 높이는 서비스입니다.


<img width="1920" height="1080" alt="Slide 16_9 - 1" src="https://github.com/user-attachments/assets/86f89ec0-7e20-4133-8aff-13c680e6400d" />
<img width="1920" height="1080" alt="Slide 16_9 - 3" src="https://github.com/user-attachments/assets/e1c89e42-f5f6-4662-b703-c8fbaf986da8" />
<img width="1920" height="1080" alt="Slide 16_9 - 60" src="https://github.com/user-attachments/assets/b4ff2e50-8237-46fe-a452-71fa59e0d564" />
<img width="1920" height="1080" alt="Slide 16_9 - 59" src="https://github.com/user-attachments/assets/b1d14af1-b01e-4166-8826-fef18a350ce3" />
<img width="1920" height="1080" alt="Slide 16_9 - 61" src="https://github.com/user-attachments/assets/b5aad426-4580-4fee-824d-356134f37331" />
<img width="1920" height="1080" alt="Slide 16_9 - 63" src="https://github.com/user-attachments/assets/a1c06cf4-d962-48e1-b33f-2b5ff9c2906a" />
<img width="1920" height="1080" alt="Slide 16_9 - 64" src="https://github.com/user-attachments/assets/b3396bb7-b88c-4037-99a9-31374b1f8851" />
<img width="1920" height="1080" alt="Slide 16_9 - 65" src="https://github.com/user-attachments/assets/328aafd7-f492-4ebb-ae18-5b0620f3b63d" />



---

## 1. 서비스 소개
토어(TOOR)는 여행지에서 발생하는 가격 불투명성(바가지)을 현지인 데이터와 AI로 해결합니다.  
GPS 기반 현지인 인증으로 '진짜 적정가'를 판별하고, 현지인 평가·찜·리뷰 데이터를 AI가 분석하여 사용자에게 가성비 최적화된 추천과 절약 정보를 제공합니다.

핵심 가치:
- 현지인 인증을 통한 신뢰 가능한 가격 정보
- 실시간 현지인 평가로 바가지 방지
- AI 기반 맞춤형 여행 일정(제주봇 등 지역 특화 모델)

---

## 2. 주요 기능
- 위치 기반 현지인 인증 (GPS)
- 실시간 가격 비교 및 '절약 금액' 안내
- 현지인 인증 등급(A~E) 및 신뢰도 기반 추천
- 음식점 / 숙소 미리보기 카드(절약값 · 사진 · 위치 · 찜)
- 북마크(찜) API 연동 (음식/숙소 구분)
- AI 챗봇(개인화 일정 생성, 지도 연동)
- 지도 기반 지역 선택 및 동선 시각화
- 리뷰·현지인 전용 솔직 후기

---

## 3. 사용한 기술 스택
- Frontend
  - React (Vite)
  - react-router-dom
  - Tailwind CSS
- Backend (기획)
  - Spring (Java) + Express (Node) 연동 가능 설계
- API / DB
  - REST API (location-food-bookmarks, location-accommodation-bookmarks 등)
  - MongoDB (서비스 설계 기준)
- AI
  - OpenAI GPT 계열 (챗봇/여행 플래너)
- 배포 / 도구
  - Vite, Git, (추후) Vercel / Netlify

---

## 4. 파일 구조 (주요 디렉터리)
프로젝트 루트: `likelion/`

```
/src
├─ /api
│  ├─ GetNearAccomodation.js
│  ├─ GetNearFood.js
│  ├─ MainFBook.js                # 음식 북마크 API (query param 방식)
│  ├─ MainACBook.js               # 숙소 북마크 API (query param 방식)
│  └─ ...                        
├─ /components
│  └─ Loading.jsx
├─ /layout
│  ├─ Layout.jsx
│  └─ Navbar.jsx
├─ /pages
│  ├─ /logo
│  │  └─ index.jsx                # 로고 → /auth 자동 이동
│  ├─ /current
│  │  ├─ index.jsx                # 위치 인증 플로우
│  │  └─ /location
│  │     └─ index.jsx             # 내 동네 설정
│  ├─ /main
│  │  ├─ index.jsx                # MainPage (Restaurant, Accommodation 포함)
│  │  └─ /components
│  │     ├─ PlaceCard.jsx
│  │     └─ PlacePreview.jsx
│  ├─ /restaurant
│  │  └─ Restaurant.jsx
│  ├─ /accommodation
│  │  └─ Accommodation.jsx
│  └─ /chatbot
│     └─ ... 
├─ /stores
│  ├─ uselocationStore.js
│  └─ usePlaceStore.js
├─ /router
│  └─ index.jsx
├─ assets
└─ main.jsx
```

---

## 5. 빠른 시작 (개발)
1. 의존성 설치
   - npm: `npm install`
   - yarn: `yarn`
2. 환경 변수 설정
   - 프로젝트 루트에 `.env` 또는 `.env.local`에 `VITE_API_BASE_URL` 설정
3. 개발 서버 실행
   - npm: `npm run dev`
   - yarn: `yarn dev`

## 6. 팀원

<table>
  <tr> 
    <th align='center'><strong>FRONT-END</strong></th> 
    <th align='center'><strong>BACK-END</strong></th> 
    <th align='center'><strong>DESIGN</strong></th> 
    <th align='center'><strong>PM</strong></th> 
  </tr>
  <tr> 
    <td align='center'><strong>현용찬,조윤호,이수민</strong></td> 
    <td align='center'><strong>신예준,기승민</strong></td> 
    <td align='center'><strong>이수현</strong></td> 
    <td align='center'><strong>현용찬</strong></td> 
  </tr>
</table>

