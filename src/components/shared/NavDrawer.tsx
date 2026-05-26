'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from "@/constants/NavItems"
import { LayoutDashboard, Calculator, FileText, Settings, Leaf } from 'lucide-react';

const menuItems = [
    { name: '대시보드', href: '/', icon: LayoutDashboard },
    { name: 'PCF 계산기', href: '/pcf', icon: Calculator },
    { name: '배출 리포트', href: '/posts', icon: FileText },
    { name: '설정', href: '/settings', icon: Settings },
]

export default function NavDrawer() {
    const pathname = usePathname();

    return (
        <aside className={cn('group fixed left-0 top-0 z-30 shirink-0 overflow-hidden hidden md:flex flex-col gap-2', 
                            'h-screen w-16 hover:w-64 bg-muted border-r will-change-[width]', 
                            'transition-width duration-300 ease-in-out')}>
            {/* 로고 영역 */}
            <div className="flex h-16 items-center border-b px-4 overflow-hidden">
                <Leaf className="h-6 w-6 text-main shrink-0" />
                <span className="ml-4 font-bold text-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap">
                    HanaLoop
                </span>
            </div>
            
            {/* 네비게이션 */}
            <nav className='flex-1 space-y-2 p-3'>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.href} href={item.href} 
                            className={cn('h-12 flex gap-3 items-center cursor-pointer rounded-sm',
                                isActive ? 'bg-gray-100 text-main': 'text-gray-500 hover:text-black hover:bg-gray-100'
                            )}
                        >
                            <item.icon className='w-6 h-6 shrink-0'/>
                            <span className='opacity-0 transition-opacity duration-300 group-hover:opacity-100'>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
