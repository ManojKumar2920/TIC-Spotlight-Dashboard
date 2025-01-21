// "use client"

// import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// const chartData = [
//   { name: "AdRuns", value: 4, fill: "hsl(var(--chart-1))" },
//   // { name: "Balance", value: 24, fill: "hsl(var(--muted))" },
// ];

// const chartConfig = {
//   Balance: {
//     label: "Balance",
//     color: "hsl(var(--muted))",
//   },
//   AdRuns: {
//     label: "AdRuns",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

// export function BudgetComponent() {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Total Budget</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <RadialBarChart
//             data={chartData}
//             startAngle={240}
//             endAngle={-60}
//             innerRadius={80}
//             outerRadius={120}
//           >
//             <PolarGrid
//               gridType="circle"
//               radialLines={false}
//               stroke="none"
//               className="first:fill-muted"
//               polarRadius={[86, 74]}
//             />
//             <RadialBar
//               dataKey="value"
//               cornerRadius={9}
//               background
//               isAnimationActive={true}
//             />
//             <PolarRadiusAxis tick={false} tickLine={true} axisLine={false}>
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-4xl font-bold"
//                         >
//                           {chartData[0].value.toLocaleString()} hrs
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-foreground"
//                         >

//                         </tspan>
//                       </text>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//             </PolarRadiusAxis>
//           </RadialBarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex justify-center space-x-4 pt-2">
//         <div className="flex items-center space-x-2">
//           <span
//             className="inline-block w-3 h-3 rounded-full bg-blue-700"
//             aria-label="AdRuns"
//           ></span>
//           <span className="text-sm text-muted-foreground">AdRuns</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <span
//             className="inline-block w-3 h-3 rounded-full bg-gray-200"
//             aria-label="Balance"
//           ></span>
//           <span className="text-sm text-muted-foreground">Balance</span>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  { name: "AdRuns", value: 20, fill: "hsl(var(--chart-1))" },
  { name: "Balance", value: 24, fill: "hsl(var(--muted))" },
]

const chartConfig = {
  balance: {
    label: "Balance",
  },
  adruns: {
    label: "AdRuns",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function BudgetComponent() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Budget</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"  // Use value for the dataKey
              nameKey="name"   
              startAngle={240}
              cornerRadius={9}
              endAngle={-60}
              innerRadius={80}
            
              strokeWidth={5}
              activeIndex={0}
             
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
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
