import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GhgEmission } from "@/types/dto";

export interface EmissionChartData {
  month: string; 
  scope1: number;
  scope2: number;
  scope3: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const prepareBarData = (emissions: GhgEmission[]) => {
  const chartDataMap: Record<string, EmissionChartData> = {};

  emissions.forEach((e) => {
    if (!chartDataMap[e.yearMonth]) {
      chartDataMap[e.yearMonth] = { month: e.yearMonth, scope1: 0, scope2: 0, scope3: 0 };
    }
    
    if (e.scope === 'Scope 1') chartDataMap[e.yearMonth].scope1 += e.emissions;
    if (e.scope === 'Scope 2') chartDataMap[e.yearMonth].scope2 += e.emissions;
    if (e.scope === 'Scope 3') chartDataMap[e.yearMonth].scope3 += e.emissions;
  });

  return Object.values(chartDataMap).sort((a, b) => a.month.localeCompare(b.month));
};

export const preparePieData = (emissions: GhgEmission[]) => {
  const scopeTotals = { scope1: 0, scope2: 0, scope3: 0 };

  emissions.forEach((e) => {
    if (e.scope === 'Scope 1') scopeTotals.scope1 += e.emissions;
    if (e.scope === 'Scope 2') scopeTotals.scope2 += e.emissions;
    if (e.scope === 'Scope 3') scopeTotals.scope3 += e.emissions;
  });

  return [
    { name: 'Scope 1', value: scopeTotals.scope1, fill: '#3b82f6' }, 
    { name: 'Scope 2', value: scopeTotals.scope2, fill: '#10b981' },
    { name: 'Scope 3', value: scopeTotals.scope3, fill: '#6366f1' },
  ];
};