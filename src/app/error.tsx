'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <h1 className='text-4xl font-bold text-slate-700 mb-2'>500</h1>
            <h2 className="text-2xl font-bold text-slate-900">데이터를 불러오는 중 문제가 발생했습니다.</h2>
            <p className="text-slate-500 text-center max-w-md">
                일시적인 오류일 수 있습니다. 아래 버튼을 눌러 다시 시도해 주세요.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()} variant="default">
                    다시 시도
                </Button>
                <Button onClick={() => window.location.href = '/'} variant="outline">
                    홈으로 가기
                </Button>
            </div>
        </div>
    )
}
