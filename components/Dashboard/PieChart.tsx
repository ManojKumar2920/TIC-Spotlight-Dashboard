"use client"

import * as React from "react"
import { Label, Pie, PieChart, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "Balance", visitors: 50, fill: "var(--color-Balance)" },
  { browser: "Spent", visitors: 20, fill: "var(--color-Spent)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Balance: {
    label: "Balance",
    color: "hsl(var(--chart-1))",
  },
  Spent: {
    label: "Spent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function PieChartComponent() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col dark:bg-[#1e1e1e]">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base font-medium">Total Ad Time (in hr)</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-[2/1] h-[305px] w-full dark:bg-[#1e1e1e]" 
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold dark:fill-white"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-center dark:fill-white"
                        >
                          
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
