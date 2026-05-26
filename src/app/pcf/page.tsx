"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { calculatePCF } from "@/lib/mockData";
import { EMISSION_FACTORS } from "@/constants/EmissionFactors";
import Container from '@/components/shared/Container'
import { BaseCard } from "@/components/elements/card/BaseCard";
import { ProductPCF } from "@/types/dto";
import { toast } from "sonner";
import ChartLoading from "@/components/ui/ChartLoading";
import { Button } from "@/components/ui/button";

export default function page() {
    const [pcfProducts, setPcfProducts] = useState<ProductPCF[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>();
    const [inputs, setInputs] = useState({
        name: "",
        material: 0,
        electricity: 0,
        transport: 0,
        gasoline: 0,
    });
    const totalPcf = calculatePCF(inputs);

    const fetchProducts = async () => {
        setIsLoading(true);
        try{
            const data = await api.getProducts();
            setPcfProducts(data);
        } catch (error) {
            toast.error('데이터를 불러오는 중 오류가 발생했습니다.')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const handleSave = async () => {
        const productToSave: ProductPCF = {
            ...inputs,
            id: `p-${Date.now()}`,
            totalPcf: totalPcf,
        }
        setIsLoading(true);

        try {
            await api.saveProduct(productToSave);
            toast.success('성공적으로 저장되었습니다.');
            fetchProducts();
            setInputs({ name: "", material: 0, electricity: 0, transport: 0, gasoline: 0 });
        } catch (error) {
            toast.error('저장에 실패했습니다. 다시 시도해주세요.')
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <ChartLoading />
        )
    }

    return (
        <Container>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
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
                <BaseCard title='예상 탄소 발자국 (PCF)' theme="dark" className="flex flex-col items-center justify-center py-7">
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
                    <Button onClick={() => handleSave()} variant='default' className="bg-main cursor-pointer mt-5">
                        결과 저장하기
                    </Button>
                </BaseCard>

                <BaseCard title='PCF 산정 내역' entireClassName="w-full col-span-1 md:col-span-2">
                    <div className='w-full'>
                        <div className='grid grid-cols-12 bg-gray-100 py-2 px-5 rounded-full font-bold'>
                            <span className='hidden sm:block col-span-1 lg:col-span-1'>번호</span>
                            <span className='col-span-6 sm:col-span-5 lg:col-span-4'>제품명</span>
                            <span className='col-span-4 lg:col-span-5 truncate'>가솔린/전기/운송/원자재</span>
                            <span className='col-span-2 lg:col-span-2'>PCF</span>
                        </div>
                        <div>
                            {pcfProducts.map((item, idx) => (
                                <div key={item.id} className="grid grid-cols-12 p-5 border-b">
                                    <span className='hidden sm:block col-span-1 lg:col-span-1'>{idx+1}</span>
                                    <span className='col-span-6 sm:col-span-5 lg:col-span-4 truncate'>{item.name}</span>
                                    <span className='col-span-4 lg:col-span-5 truncate'>{item.gasoline}/{item.electricity}/{item.transport}/{item.material}</span>
                                    <span className='col-span-2 lg:col-span-2'>{item.totalPcf}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </BaseCard>
            </div>
        </Container>
    )
}

