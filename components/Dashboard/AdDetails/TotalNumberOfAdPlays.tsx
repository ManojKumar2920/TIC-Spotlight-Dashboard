"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { browser: "safari", visitors: 10, fill: "hsl(var(--chart-1))" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function NumberofAdPlaysComponent() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Number of Ad plays</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mt-9">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={190} 
            endAngle={-10}
            innerRadius={90}
            outerRadius={120}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[96, 0]}
            />
            <RadialBar
              dataKey="visitors"
              background={{ fill: "var(--background-muted)" }}
              cornerRadius={9}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold bg-white text-white"
                        >
                          {chartData[0].visitors.toLocaleString()} Ad
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground bg-white text-white"
                        >
                        
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4 pt-2">
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-full bg-blue-700"
            aria-label="AdRuns"
          ></span>
          <span className="text-sm text-muted-foreground">AdRuns</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-full bg-gray-200"
            aria-label="Balance"
          ></span>
          <span className="text-sm text-muted-foreground">Balance</span>
        </div>
      </CardFooter>
    </Card>
  )
}