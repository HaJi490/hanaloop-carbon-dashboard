'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <h1 className='text-4xl font-bold text-slate-700 mb-2'>404</h1>
            <h2 className="text-2xl font-bold text-slate-900">페이지를 찾을 수 없습니다.</h2>
            <p className="text-slate-500 text-center max-w-md">
                요청하신 페이지가 삭제되었거나, 주소가 잘못 입력되었을 수 있습니다.입력하신 주소가 정확한지 다시 한번 확인해 주세요.
            </p>

            <div className="flex gap-4">
                <Button onClick={() => window.location.href = '/'} variant="default">
                    홈으로 가기
                </Button>
            </div>
        </div>
    )
}
