# 김인서 포트폴리오 웹사이트 PRD

## 프로젝트 개요
- **이름:** 김인서 (KIM INSEO)
- **포지션:** UI/UX Designer & Web Publisher
- **마감:** 2025년 7월 2일
- **구현 방식:** SPA (Single Page Application), index.html 단일 파일
- **배포:** GitHub Pages or Dothome

---

## 디자인 시스템

### 컬러
- Background: `#0d0d0d`
- Primary Text: `#F4F8FF`
- Accent: `#C1121F` (와인레드)
- Muted: `#555555`

### 폰트
- Display: `Bebas Neue` (섹션 타이틀, 네비, 카테고리)
- Body: `Pretendard` (본문, 태그, 설명)

### 코딩 규칙
- 인라인 스타일 금지 (모든 스타일은 CSS 파일로)
- 주석 최소화
- 변수명 영문 KebabCase 통일
- 애니메이션 라이브러리: GSAP

---

## 파일 구조
```
portfolio-coding/
├── index.html
├── css/
│   ├── reset.css
│   ├── common.css
│   └── style.css
├── js/
│   ├── main.js
│   └── animation.js
└── img/
    ├── intro/
    ├── projects/
    │   ├── uiux/
    │   ├── publishing/
    │   ├── team/
    │   └── archive/
    └── profile/
```

---

## 페이지 구조 (섹션 순서)

```
Intro (프리로더)
↓
Main (INSEO 타이포 메인)
↓
About Me
↓
Category (카테고리 선택)
↓
Project Slider (가로 슬라이더)
↓
Archive
↓
Contact
```

---

## 섹션별 상세

### 00. Intro (프리로더)
- 단어 전환 시퀀스: DESIGNER → PUBLISHER → UI·UX → KIM INSEO
- 단어 전환마다 대응하는 프로젝트 사진 전환
- 완료 후 Stairs transition → Main 섹션으로

### 01. Main
- 네비게이션: ABOUT / PROJECT / CONTACT (Bebas Neue)
- 좌상단: IS 하트 로고 SVG
- 메인 타이포: INSEO (화면 꽉 채우게)
- 서브: UI/UX DESIGNER & WEB PUBLISHER
- 우하단: SCROLL 텍스트 + bounce 애니메이션

### 02. About Me
- 배경: 흰색 (다크 섹션과 반전 효과)
- 좌측: 프로필 사진
- 좌하단: 소개글 + 연락처
- 우측 상단: SKILL SET
  - Photoshop 90% / Illustrator 90%
  - Figma 90% / HTML·CSS 90%
  - JavaScript 70% / Vibe Coding 90%
  - GitHub / GSAP / SVG 아이콘
- 우측 하단:
  - EDUCATION
  - CERTIFICATE
  - EXPERIENCE
- 하단: ABOUT ME 대형 타이포

### 03. Category
- 배경: 다크
- 카테고리 목록 (Bebas Neue, 화면 꽉 채우게):
  ALL / UI·UX / PUBLISHING / TEAM / ARCHIVE
- 호버: 커서 옆에 썸네일 이미지 붙어다님
- 클릭: 아래 Project Slider 섹션으로 스크롤 + 해당 카테고리 필터링

### 04. Project Slider
- 가로 스크롤 슬라이더
- 카드 구성: 이미지 + 하단 텍스트 분리
  - 카테고리 (빨간색, Bebas Neue)
  - 프로젝트명 (흰색)
- 필터 탭: ALL / UI·UX / PUBLISHING / TEAM
- 카드 클릭 → 풀스크린 오버레이 (슬라이드 업 전환)
- 오버레이 닫기 → 슬라이드 다운 복귀

### 05. Archive
- 배경: 다크
- 상단: ARCHIVE 대형 타이포 + ILLUST · PHOTO 서브텍스트
- 마소너리 그리드 (3열, 이미지 높이 제각각)
- 프로젝트: 청첩장, 메뉴판, 소메뉴판, 유튜브 썸네일, AI 광고 포스터
- 클릭 → 풀스크린 오버레이 (템플릿 B)

### 06. Contact
- 배경: 다크
- 좌측: GET IN TOUCH 대형 타이포
- 우측:
  - EMAIL: inser0503@naver.com (클릭 시 복사)
  - GITHUB: 링크 이동

---

## 프로젝트 목록

### UI·UX
| 프로젝트 | 템플릿 |
|---------|--------|
| 다우니 홈페이지 리뉴얼 | A |
| 모바일 앱 UI디자인 (ARCO) | A |

### PUBLISHING
| 프로젝트 | 템플릿 | 스택 |
|---------|--------|------|
| ZARA One Page | A | HTML, CSS |
| 컴포즈커피 웹사이트 리뉴얼 | A | HTML, CSS, JS |
| AETHER 랜딩 페이지 | A | HTML, CSS, JS |

### TEAM
| 프로젝트 | 템플릿 | 역할 |
|---------|--------|------|
| 제주비건지도 반응형 웹사이트 | A | 팀장 / 디자인 + 퍼블리싱 |
| 바이브코딩 팀 프로젝트 | A | 미정 |

### ARCHIVE
| 프로젝트 | 템플릿 |
|---------|--------|
| 청첩장 제작 (Wedding Invitation) | B |
| 메뉴판 제작 | B |
| 소메뉴판 제작 | B |
| 유튜브 썸네일 제작 | B |
| AI 광고 포스터 | B |

---

## 상세페이지 템플릿

### 템플릿 A (디자인 + 퍼블리싱)
1. 프로젝트명 + 태그 (PERIOD / TOOL / STACK)
2. 히어로 이미지 (100% PERSONAL 뱃지)
3. FIGMA 링크 버튼
4. OVERVIEW 텍스트
5. BEFORE / AFTER
6. COLOR & TYPOGRAPHY
7. WIREFRAME (hover-scroll 인터랙션)
8. SELECT DESIGN DETAIL (섹션별 클로즈업 + 설명)
9. 하단: FIGMA / GITHUB / SITE 링크

### 템플릿 B (그래픽)
1. 프로젝트명 + 태그 (PERIOD / TOOL)
2. 히어로 이미지 풀와이드
3. OVERVIEW 텍스트
4. GALLERY (2열 그리드)

---

## 인터랙션 정리

| 섹션 | 인터랙션 | 라이브러리 |
|------|---------|-----------|
| Intro | 단어 전환 + 사진 전환 | GSAP |
| Intro → Main | Stairs transition | GSAP |
| Main | SCROLL bounce 애니메이션 | GSAP |
| Category | 호버 시 커서 옆 썸네일 | JS |
| Category | 클릭 시 슬라이더로 스크롤 + 필터 | JS |
| Project Slider | 가로 드래그 스크롤 | JS |
| Project Slider | 카드 클릭 → 풀스크린 오버레이 | GSAP |
| Archive | 마소너리 그리드 | CSS columns |
| 상세페이지 | WIREFRAME hover-scroll | JS |
| 오버레이 닫기 | 슬라이드 다운 복귀 | GSAP |

---

## 구현 순서
1. reset.css + common.css 기본 세팅
2. index.html 전체 뼈대 (섹션 구조)
3. Intro 프리로더 (단어 전환 + Stairs transition)
4. Main 섹션 (네비 + INSEO 타이포)
5. About Me 섹션
6. Category 섹션 (호버 인터랙션)
7. Project Slider (가로 스크롤 + 필터링)
8. Archive 섹션 (마소너리)
9. Contact 섹션
10. 풀스크린 오버레이 (템플릿 A/B)
11. 전체 GSAP 애니메이션 연결
12. 반응형 체크 + 버그 수정
13. 배포
