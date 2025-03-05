import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Flame, ArrowRight } from "lucide-react"

export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this data based on the ID
  const workout = {
    id: Number.parseInt(params.id),
    title: "Full Body Workout",
    description: "A complete workout targeting all major muscle groups",
    duration: "30 min",
    calories: 250,
    image: "/placeholder.svg?height=300&width=600",
    exercises: [
      {
        id: 1,
        name: "Push-ups",
        duration: "45 sec",
        calories: 30,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Squats",
        duration: "60 sec",
        calories: 40,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 3,
        name: "Lunges",
        duration: "45 sec",
        calories: 35,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 4,
        name: "Plank",
        duration: "30 sec",
        calories: 25,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 5,
        name: "Mountain Climbers",
        duration: "45 sec",
        calories: 45,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  }

  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <div className="aspect-[2/1] relative rounded-lg overflow-hidden">
        <img src={workout.image || "/placeholder.svg"} alt={workout.title} className="w-full h-full object-cover" />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{workout.title}</h1>
        <p className="text-muted-foreground">{workout.description}</p>

        <div className="flex gap-4">
          <Card className="flex-1 animate-in-delay-100">
            <CardContent className="p-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{workout.duration}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 animate-in-delay-200">
            <CardContent className="p-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="font-medium">{workout.calories} cal</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mt-6">Exercises</h2>
        <div className="space-y-3">
          {workout.exercises.map((exercise, index) => (
            <Card key={exercise.id} className={`animate-in-delay-${index * 100}`}>
              <CardContent className="p-4 flex items-center gap-3">
                <img
                  src={exercise.image || "/placeholder.svg"}
                  alt={exercise.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{exercise.name}</h3>
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <span>{exercise.duration}</span>
                    <span>{exercise.calories} cal</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Link href={`/workouts/${params.id}/start`} className="block mt-6">
          <Button className="w-full">Start Workout</Button>
        </Link>
      </div>
    </div>
  )
}

