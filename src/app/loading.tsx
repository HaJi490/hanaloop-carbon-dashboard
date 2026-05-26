import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
    return (
        <div className="space-y-8 p-8">
            {/* 타이틀 영역 스켈레톤 */}
            <div className="space-y-2">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-4 w-[380px]" />
            </div>

            {/* 싱테 카드 영역 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. 차트 영역 */}
            <div className="grid gap-4 md:grid-cols-7">
                <div className="md:col-span-4 rounded-xl border p-6 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-[300px] w-full rounded-lg" />
                </div>

                <div className="md:col-span-3 rounded-xl border p-6 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-[300px] w-full rounded-full" />
                </div>
            </div>

            {/* 4. 리포트 영역 */}
            <div className="rounded-xl border p-6 space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                    ))}
                </div>
            </div>
        </div>
    )
}
