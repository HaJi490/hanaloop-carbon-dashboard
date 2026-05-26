"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Menu, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/constants/NavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
    const pathname = usePathname();

    return (
        <div className="md:hidden fixed top-4 right-4 z-30">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="bg-white shadow-md">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className="text-left pb-6 border-b">
                        <div className="flex items-center gap-2">
                            <Leaf className="h-6 w-6 text-main" />
                            <SheetTitle className="text-xl font-bold">HanaLoop</SheetTitle>
                        </div>
                    </SheetHeader>
                    <nav className="flex flex-col gap-2 m-3 ">
                        {NAV_ITEMS.map(item => {
                            const isActive = pathname === item.href
                            return (
                                <Link key={item.href} href={item.href}
                                    className={cn('p-2 text-base cursor-pointer rounded-xs', 
                                        isActive ? 'text-main font-bold': 'text-gray-500')}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    );
}