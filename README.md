# Hanaloop 탄소 관리 대시보드 과제
> 기업의 탄소 배출량을 측정하고, 제품별 탄소 발자국(PCF) 산정을 통해 재무적 리스크(탄소세)를 관리하는 관리자용 SaaS 플랫폼 대시보드입니다.

## 🚀 실행 방법
```Bash
    git clone https://github.com/HaJi490/hanaloop-carbon-dashboard.git

    cd hanaloop-carbon-dashboard

    npm install

    npm run dev
```
## 0. 기술 스택
<img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js">
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white">
<img src="https://img.shields.io/badge/Recharts-222222?logo=recharts&logoColor=white">

## 1. 가정 사항
- 배출계수 산정: 환경부 온실가스종합정보센터(GIR)의 '국가 온실가스 고유 배출계수'를 참고하여 상수를 정의
   - Gasoline: 2.1kg / Electricity: 0.45kg / Transport: 0.12kg / Material: 2.5kg
- 탄소세 기준: 탄소 배출권 거래제(K-ETS) 시세를 반영하여 **톤당 ₩20,000**의 탄소세를 가정
- **데이터 구조:** 모든 배출량 데이터는 GHG Protocol의 국제 표준에 따라 **Scope 1(직접), 2(에너지 간접), 3(기타 간접)**으로 분류하여 모델링

## 2. 폴더 아키텍처
``` python
src/
 ├── app/               # Next.js App Router (Pages & Layouts, Error/Loading)
 ├── components/
 │    ├── ui/           # 원자 단위 디자인 부품 (shacdn/ui)
 │    ├── elements/     # 기능적 모듈 (Card, Charts, Post)
 │    └──  shared/      # 전역 공통 요소 (Nav, Container)
 ├── constants/         # 상수 및 정적 데이터
 ├── lib/               # 유틸리티 및 mock API
 └── types/             # 데이터 타입 정의
```
---

## 3. 주요 기능 및 엔지니어링
- 총 배출량 증감 추이와 예상 탄소세를 상단에 배치하여 재무적 관점의 인사이트를 제공
- Recharts를 활용하여 월별 배출량을 Scope 1/2/3로 누적 시각화하고, 비중 분석(Pie Chart)을 제공
- 현실적인 네트워크 환경(200~800ms 지연)과 랜덤 실패 확률(15%)을 시뮬레이션
- loading.tsx를 통한 Streaming SSR과 스켈레톤 UI, error.tsx를 통한 에러 바운더리 처리를 통해 사용자 경험을 최적화
- 클라이언트 전용 라이브러리(Recharts)의 렌더링 시점을 제어하여 서버/클라이언트 불일치 에러를 방지
- 데이터(에너지원 사용량) 입력 시 즉각적인 PCF 산출 및 원소재 기여도 시각화 기능을 구현

## 5. 시간상 생략한 부분
- 반응형 고도화: 데스크탑 환경에 최적화된 대시보드이며, 모바일 환경의 경우 사이드 드로어 메뉴 등 기본적인 접근성만 확보
- 다양한 배출원 확장: 현재의 4가지 주요 에너지원 외에도 용수, 폐기물 등 탄소 회계 표준에 따른 배출원 항목을 동적으로 추가 검토
- DB 연동: 현재는 메모리 기반 가짜 DB를 사용하고 있으며, 실제 운영 환경을 고려한다면 Supabase나 Prisma로 교체하여 데이터 영속성 확보
- 유닛 테스트 보강: 기능 구현과 UX 최적화에 우선순위를 두어, Jest/Cypress를 활용한 상세 테스트 코드는 생략

## 6. 프로젝트 데모
![Dashboard demo](https://github.com/user-attachments/assets/b0f59bfe-3ffe-430f-a1d7-14c3d576264a)
<table align='center' style="border-collapse: collapse; border: none; border-spacing: 0;">
    <tr align="center" style="border: none;" >
        <td style="border: none;">
            <img src="https://github.com/user-attachments/assets/5119075b-f5d8-4c46-92ef-3a30d7270c4d" width="400" alt="Dashboard mobile" />
        </td>
        <td style="border: none;">
            <img src="https://github.com/user-attachments/assets/eda1832c-9704-4672-a286-5427a6723e6d" height="300" alt="pcfCalc mobile" />
        </td>
    </tr>
    <tr align="center" style="border: none;">
        <td style="border: none;">
            <p>Dashboard mobile</p>
        </td>
        <td style="border: none;">
            <p>PCFCalc mobile</p>
        </td>
    </tr>
</table>
