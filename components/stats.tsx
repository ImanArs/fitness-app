"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function StatCard({
  title,
  value,
  className,
}: {
  title: string
  value: string
  className?: string
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </CardContent>
    </Card>
  )
}

export function LineChart() {
  // Mock data for the chart
  const data = [10, 25, 15, 30, 20, 35, 45]
  const max = Math.max(...data)

  return (
    <div className="w-full h-40 flex items-end">
      {data.map((value, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className="w-1 bg-primary rounded-t transition-all duration-500"
            style={{
              height: `${(value / max) * 100}%`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
          <div className="text-xs mt-2 text-muted-foreground">{`D${index + 1}`}</div>
        </div>
      ))}
    </div>
  )
}

export function CircleProgress({
  value,
  label,
  sublabel,
}: {
  value: number
  label: string
  sublabel: string
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value])

  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg width="150" height="150" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r={radius} fill="transparent" stroke="hsl(var(--secondary))" strokeWidth="8" />
        <circle
          cx="75"
          cy="75"
          r={radius}
          fill="transparent"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
          transform="rotate(-90 75 75)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{label}</span>
        <span className="text-xs text-muted-foreground">{sublabel}</span>
      </div>
    </div>
  )
}

