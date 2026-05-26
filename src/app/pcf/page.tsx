"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculatePCF } from "@/lib/api";
import { EMISSION_FACTORS } from "@/constants/EmissionFactors";
import Container from '@/components/shared/Container'
import { BaseCard } from "@/components/elements/card/BaseCard";

export default function page() {
    const [inputs, setInputs] = useState({
        name: "",
        material: 0,
        electricity: 0,
        transport: 0,
        gasoline: 0,
    });

    const totalPcf = calculatePCF(inputs);

    return (
        <Container>
            <div className="grid gap-6 md:grid-cols-2">
                {/* 입력 폼 */}
                <BaseCard title='활동 데이터 입력'>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                            <Label>제품명</Label>
                            <Input placeholder="예: 알루미늄 케이스" onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>원소재 사용량 (kg)</Label>
                            <Input type="number" onChange={(e) => setInputs({ ...inputs, material: Number(e.target.value) })} />
                        </div>
                        <div className="space-y-2">
                            <Label>운송 (km)</Label>
                            <Input type="number" onChange={(e) => setInputs({ ...inputs, transport: Number(e.target.value) })} />
                        </div>
                        <div className="space-y-2">
                            <Label>전력 사용량 (kWh)</Label>
                            <Input type="number" onChange={(e) => setInputs({ ...inputs, electricity: Number(e.target.value) })} />
                        </div>
                        <div className="space-y-2">
                            <Label>가솔린 (L)</Label>
                            <Input type="number" onChange={(e) => setInputs({ ...inputs, gasoline: Number(e.target.value) })} />
                        </div>
                    </div>
                </BaseCard>

                {/* 실시간 결과 리포트 */}
                <BaseCard title='예상 탄소 발자국 (PCF)' theme="dark" className="flex flex-col items-center justify-center py-10">
                    <p className="text-sm text-slate-400">제품 단위당 총 배출량</p>
                    <h2 className="text-5xl font-bold mt-2 text-main">{totalPcf} <span className="text-2xl">kgCO2e</span></h2>

                    <div className="w-full mt-8 space-y-2">
                        <div className="flex justify-between text-xs">
                            <span>원소재 기여도</span>
                            <span>{(inputs.material * EMISSION_FACTORS.material / totalPcf * 100 || 0).toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-main h-full" style={{ width: `${(inputs.material * EMISSION_FACTORS.material / totalPcf * 100) || 0}%` }} />
                        </div>
                    </div>
                </BaseCard>
            </div>
        </Container>
    )
}

