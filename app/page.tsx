import { Card } from "@/components/ui/card"
import { LineChart, CircleProgress, StatCard } from "@/components/stats"

export default function Home() {
  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Workouts Completed" value="12" className="animate-in-delay-100" />
        <StatCard title="Total Workout Time" value="5h 30m" className="animate-in-delay-200" />
      </div>

      <Card className="p-4 animate-in-delay-100">
        <h2 className="text-lg font-medium mb-4">Posts Read</h2>
        <LineChart />
      </Card>

      <Card className="p-4 animate-in-delay-200">
        <h2 className="text-lg font-medium mb-4">Workout Time</h2>
        <div className="flex justify-center">
          <CircleProgress value={75} label="75%" sublabel="of goal" />
        </div>
      </Card>
    </div>
  )
}

