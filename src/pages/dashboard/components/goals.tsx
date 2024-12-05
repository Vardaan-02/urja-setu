import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface GoalsProps {
  title: string
  progress: number
  total: number
  better: number
  trend?: "up" | "down" | "neutral"
}

export function Goals({ better,title, progress, total, trend = "neutral" }: GoalsProps) {
  const percentage = Math.round((progress / total) * 100)

  return (
    <Card
      className="p-4 bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-lg flex justify-between
     items-center w-full"
    >
      <CardContent className="p-4 w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold truncate mb-4">{title}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant={trend === "up" ? "success" : trend === "down" ? "destructive" : "secondary"} className=" mb-4 text-xs py-2 px-3">
                  {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : trend === "down" ? <ArrowDownRight className="h-3 w-3" /> : null}
                  {percentage}%
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
              
                <p>{progress} out of {total}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-black/60 mb-4">{better}% more than last week</p>
        <Progress value={percentage} className="h-4" />
      </CardContent>
    </Card>
  )
}

