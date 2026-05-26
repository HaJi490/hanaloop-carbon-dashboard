import { LoaderCircle } from "lucide-react";

export default function ChartLoading() {
    return (
        <div className="h-[350px] w-full flex flex-col items-center justify-center bg-slate-50/50 rounded-md">
            <LoaderCircle className="text-main animate-spin h-5 w-5 " />
            <span className="text-xs text-slate-400">로딩 중...</span>
        </div>
    )
}
