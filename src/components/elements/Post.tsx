'use client'

import {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CircleSmall } from 'lucide-react';


interface PostProps {
    data: any[];
}

export default function Post({ data }: PostProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    if (!isMounted) return null;

    return (
        <div className='w-full'>
            <div className='grid grid-cols-8 bg-gray-100 py-2 px-5 rounded-full font-bold'>
                <span className='hidden sm:block col-span-1 lg:col-span-1'>번호</span>
                <span className='col-span-6 sm:col-span-5 lg:col-span-4'>제목</span>
                <span className='col-span-1 hidden lg:block'>작성자</span>
                <span className='col-span-2 lg:col-span-2'>작성일</span>
            </div>
            {data.map((item, idx) => (
                <Dialog key={item.id}>
                    <DialogTrigger asChild>
                        <div className='grid grid-cols-8 text-lg px-5 py-5 border-b border-gray-300 hover:bg-gray-100 cursor-pointer rounded-lg '>
                            <span className='hidden sm:block col-span-1 lg:col-span-1'>{idx + 1}</span>
                            <div className='col-span-6 sm:col-span-5 lg:col-span-4 font-bold truncate flex items-start'>
                                {item.title}
                                <CircleSmall size={10} fill='var(--main)' className='text-main ml-0.5 mt-1' />
                            </div>
                            <span className='col-span-1 hidden lg:block'>{item.resourceUid}</span>
                            <span className='col-span-2 lg:col-span-2'>{item.dateTime}</span>
                        </div>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[600px] min-h-[40vh] flex flex-col p-5">
                        <DialogHeader>
                            <DialogDescription className="sr-only">
                                {item.title}에 대한 상세 리포트 내용입니다.
                            </DialogDescription>
                            <DialogTitle className="text-xl font-bold">{item.title}</DialogTitle>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2 pb-4 border-b">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-gray-700">작성자</span>
                                    {item.resourceUid}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-gray-700 truncate">작성일</span>
                                    {item.dateTime}
                                </div>
                            </div>
                        </DialogHeader>
                        <div className="py-4">
                            <p className="text-gray-600">{item.content}</p>
                        </div>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    )
}
