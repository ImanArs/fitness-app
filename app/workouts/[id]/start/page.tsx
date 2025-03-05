"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/card"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Pause, Play } from "lucide-react"

export default function WorkoutStartPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45) // in seconds
  const [isResting, setIsResting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [workoutComplete, setWorkoutComplete] = useState(false)

  // In a real app, you would fetch this data based on the ID
  const workout = {
    id: Number.parseInt(params.id),
    title: "Full Body Workout",
    exercises: [
      {
        id: 1,
        name: "Push-ups",
        duration: 45, // in seconds
        image: "/placeholder.svg?height=300&width=600",
      },
      {
        id: 2,
        name: "Squats",
        duration: 60,
        image: "/placeholder.svg?height=300&width=600",
      },
      {
        id: 3,
        name: "Lunges",
        duration: 45,
        image: "/placeholder.svg?height=300&width=600",
      },
    ],
  }

  const currentExercise = workout.exercises[currentExerciseIndex]
  const restTime = 30 // in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isPaused && !workoutComplete) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up for current exercise or rest
            if (isResting) {
              // Rest is over, move to next exercise
              if (currentExerciseIndex < workout.exercises.length - 1) {
                setCurrentExerciseIndex((prev) => prev + 1)
                setIsResting(false)
                return workout.exercises[currentExerciseIndex + 1].duration
              } else {
                // Workout complete
                setWorkoutComplete(true)
                return 0
              }
            } else {
              // Exercise is over, start rest
              setIsResting(true)
              return restTime
            }
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPaused, isResting, currentExerciseIndex, workout.exercises, workoutComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const progress = isResting
    ? ((restTime - timeLeft) / restTime) * 100
    : ((currentExercise.duration - timeLeft) / currentExercise.duration) * 100

  if (workoutComplete) {
    return (
      <div className="container px-4 py-6 h-[80vh] flex flex-col items-center justify-center animate-in">
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold">Workout Complete!</h1>
          <p className="text-muted-foreground">Great job! You've completed the {workout.title}.</p>
          <Button
            onClick={() => router.push("/")}
            className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md"
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <div className="text-center">
        <h1 className="text-xl font-bold">{isResting ? "Rest Time" : currentExercise.name}</h1>
        <p className="text-muted-foreground">
          {isResting ? "Take a break" : `Exercise ${currentExerciseIndex + 1} of ${workout.exercises.length}`}
        </p>
      </div>

      {!isResting && (
        <div className="aspect-[2/1] relative rounded-lg overflow-hidden">
          <img
            src={currentExercise.image || "/placeholder.svg"}
            alt={currentExercise.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <Card className="animate-in-delay-100">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="text-5xl font-bold mb-6">{formatTime(timeLeft)}</div>
          <Progress value={progress} className="w-full h-2" />

          <div className="flex gap-4 mt-8">
            <Button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-full h-12 w-12 flex items-center justify-center"
            >
              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

