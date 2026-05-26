
import { companies, mockPosts } from "@/lib/api";
import { prepareBarData, preparePieData } from "@/lib/utils";
import Container from "@/components/shared/Container";
import StatCard from "@/components/elements/card/StatCard";
import { GraphCard } from "@/components/elements/card/GraphCard";
import { BaseCard } from "@/components/elements/card/BaseCard";
import EmissionBarChart from "@/components/elements/charts/EmissionBarChart";
import ScopePieChart from "@/components/elements/charts/ScopePieChart";
import Post from "@/components/elements/Post";
import { Factory, CreditCard, Zap, Truck } from "lucide-react";

const STAT_VALUE = [
  {
    title: '총 탄소 배출량',
    value: '1,284',
    unit: "tCO2e",
    icon: < Factory className="h-4 w-4 text-muted-foreground" />,
    trend: "up",
    trendValue: "3.2%",
  },
  {
    title: '예상 탄소세',
    value: '25,680,000',
    unit: "KRW",
    icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    trend: "up",
    trendValue: "4.1%",
  },
  {
    title: '탄소 집약도',
    value: '0.85',
    unit: "kg/unit",
    icon: <Zap className="h-4 w-4 text-muted-foreground" />,
    trend: "down",
    trendValue: "1.5%",
  },
  {
    title: 'Scope 3 비중',
    value: '72.4',
    unit: "%",
    icon: <Truck className="h-4 w-4 text-muted-foreground" />,
    trend: "up",
    trendValue: "0.8%",
  }
] as const;

export default async function Home() {
  const company = companies[0];
  const barChartData = prepareBarData(company.emissions);
  const pieChartData = preparePieData(company.emissions);

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-8 gap-x-3 gap-y-7">
        {STAT_VALUE.map(item => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            unit={item.unit}
            icon={item.icon}
            trend={item.trend}
            trendValue={item.trendValue}
          />
        ))}

        <div className="col-span-1 sm:col-span-4 lg:col-span-5 ">
          <GraphCard title='월별 배출량 추이 (tCO2e)'>
            <EmissionBarChart data={barChartData}/>
          </GraphCard>
        </div>
        <div className="col-span-1 sm:col-span-4 lg:col-span-3">
          <GraphCard title='Scope별 배출 비중'>
            <ScopePieChart data={pieChartData} />
          </GraphCard>
        </div>

        <div className="col-span-1 sm:col-span-4 lg:col-span-8">
          <BaseCard title='배출 리포트'>
            <Post data={mockPosts} />
          </BaseCard>
        </div>
      </div>

    </Container>
  );
}
