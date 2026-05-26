import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BaseCardProps {
    children: React.ReactNode;
    title: string;
    className?: string;
    theme?: 'light' | 'dark';
}

export function BaseCard({ children, title, className, theme='light' }: BaseCardProps) {
    return (
        <Card className={`border-none ${theme === 'light' ? 'bg-white' : 'bg-slate-900 text-white'}`}>
            <CardHeader className="mb-2">
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={`${className} w-full`}>
                    {children}
                </div>
            </CardContent>
        </Card>
    );
}
