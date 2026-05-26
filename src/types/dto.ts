export type GhgEmission = {
    yearMonth: string; 
    source: 'gasoline' | 'lpg' | 'electricity' | 'purchased_materials' | 'logistics';
    scope: 'Scope 1' | 'Scope 2' | 'Scope 3';
    emissions: number; 
}

export type Company = {
    id: string;
    name: string;
    country: string; 
    emissions: GhgEmission[];
}

export type ProductPCF = {
    id: string;
    name: string;
    gasoline: number    //L
    electricity: number; // 전기 사용량 (kWh)
    material: number; // 원소재 입력값 (kg)
    transport: number; // 운송 거리 (km)
    totalPcf: number; //결과값 (kgCO2e)
};

export type PostDTO = {
    id: string;
    title: string;
    resourceUid: string;
    dateTime: string;    
    content: string;
};
