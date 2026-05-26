import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: string;
    unit: string;
    description?: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down';
    trendValue?: string;
}

export default function StatCard({ title, value, unit, description, icon, trend, trendValue }: StatCardProps) {
    return (
        <Card className="col-span-1 sm:col-span-2">
            <CardHeader className="flex flex-row items-center pb-2">
                {icon}
                <CardTitle className="text-sm sm:text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {trend &&
                    <p className={`ml-1 text-xs ${trend == 'up' ? 'text-red-500 bg-red-200/40': 'text-blue-500 bg-blue-200/40'} flex items-center mt-1 font-medium py-1 px-2  rounded-full`}>
                        {trend == 'up' ? '+': '-'}{trendValue}
                    </p>
                }
            </CardHeader>

            <CardContent className="flex gap-2">
                <div className="text-2xl sm:text-3xl font-bold truncate">{value} <span className="text-sm sm:text-base">{unit}</span></div>
            </CardContent>
        </Card>
    )
}
