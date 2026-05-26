/**
 * Mock API 정의 
 */
import { GhgEmission, Company, ProductPCF, Post } from "@/types/dto";
import { EMISSION_FACTORS } from "@/constants/EmissionFactors";

// GHB 데이터 생성
export const generateEmissions = (): GhgEmission[] => {
    const data: GhgEmission[] = [];
    const sources: { type: GhgEmission['source']; scope: GhgEmission['scope'] }[] = [
        { type: 'gasoline', scope: 'Scope 1' },
        { type: 'lpg', scope: 'Scope 1' },
        { type: 'electricity', scope: 'Scope 2' },
        { type: 'purchased_materials', scope: 'Scope 3' },
        { type: 'logistics', scope: 'Scope 3' },
    ];

    for (let i = 1; i <= 10; i++) {
        const month = String(i).padStart(2, '0');
        const yearMonth = `2025-${month}`;

        sources.forEach(({ type, scope }) => {
            let base = 30;

            if (type === 'purchased_materials') base = 120;
            if (type === 'electricity') base = 60;
            if (type === 'logistics') base = 40;


            const randomFator = 0.8 + Math.random() * 0.4;

            data.push({
                yearMonth,
                source: type,
                scope,
                emissions: parseFloat((base * randomFator).toFixed(2)),
            });
        });
    }
    return data;
}

// 회사
export const companies: Company[] = [
    {
        id: "c1",
        name: "Hanaloop Solutions",
        country: "KR",
        emissions: generateEmissions(),
    }
]

// PCF 계산
export const calculatePCF = (inputs: Omit<ProductPCF, 'id' | 'name' | 'totalPcf'>): number => {
    const total =
        (inputs.gasoline * EMISSION_FACTORS.gasoline) +
        (inputs.electricity * EMISSION_FACTORS.electricity) +
        (inputs.transport * EMISSION_FACTORS.transport) +
        (inputs.material * EMISSION_FACTORS.material);
    return parseFloat(total.toFixed(2));
};

// PCF 적용 제품
export const mockProducts: ProductPCF[] = [
    {
        id: "p1",
        name: "산업용 고중량 프레스",
        gasoline: 50,
        electricity: 800,
        transport: 120,
        material: 1500,
        totalPcf: 0,
    },
    {
        id: "p2",
        name: "표준 정밀 부품",
        gasoline: 0,
        electricity: 150,
        transport: 300,
        material: 45,
        totalPcf: 0,
    },
    {
        id: "p3",
        name: "글로벌 물류용 컨테이너 케이스",
        gasoline: 10,
        electricity: 50,
        transport: 2500,
        material: 450,
        totalPcf: 0,
    },
    {
        id: "p4",
        name: "고정밀 반도체 제어 모듈",
        gasoline: 0,
        electricity: 1800,
        transport: 50,
        material: 12,
        totalPcf: 0,
    }
].map(product => ({
    ...product,
    totalPcf: calculatePCF({
        gasoline: product.gasoline,
        electricity: product.electricity,
        transport: product.transport,
        material: product.material
    })
}));

// 배출 리포트
export const mockPosts: Post[] = [
    {
        id: "post-1",
        title: "1월 탄소 배출량 급증 원인 분석",
        resourceUid: "c1",
        dateTime: "2024-01",
        content: "동절기 한파로 인한 가스(LNG) 사용량 증가와 공장 난방 가동 시간 확대로 인해 Scope 1 배출량이 전월 대비 15% 상승했습니다. 차월부터는 에너지 절감 캠페인을 실시할 예정입니다."
    },
    {
        id: "post-2",
        title: "공급망 탄소 리스크 관리 보고",
        resourceUid: "c1",
        dateTime: "2024-03",
        content: "신규 원자재 협력사의 배출계수가 기존 대비 높게 측정되었습니다. 제품별 탄소 발자국(PCF) 목표 달성을 위해 저탄소 소재 도입 및 협력사 교체를 검토 중입니다."
    },
    {
        id: "post-3",
        title: "탄소세 부담 예측 및 대응 전략",
        resourceUid: "c1",
        dateTime: "2024-06",
        content: "현재 배출 추세를 유지할 경우, 내년 예상 탄소세는 약 1억 2천만 원으로 추산됩니다. 전력 소비가 많은 p4 모델의 공정 최적화를 통해 Scope 2 배출량을 10% 감축하는 것을 목표로 합니다."
    }
]

