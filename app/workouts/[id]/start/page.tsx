"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Pause, Play } from "lucide-react";
import { workouts } from "@/lib/workout";

export default function WorkoutStartPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3); // Initial countdown
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);

  const workout: any = workouts?.find(
    (workout) => workout.id === Number.parseInt(params.id)
  );

  const restTime = 3;

  useEffect(() => {
    if (isPaused || workoutComplete) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, workoutComplete]);

  useEffect(() => {
    if (timeLeft > 0) return;

    if (isResting) {
      // Переход из отдыха к следующему упражнению
      setIsResting(false);
      setCurrentExerciseIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < workout.exercises.length) {
          setTimeLeft(workout.exercises[nextIndex].duration);
          return nextIndex;
        } else {
          setWorkoutComplete(true);
          return prevIndex;
        }
      });
    } else {
      // Переход от упражнения к отдыху
      setIsResting(true);
      setTimeLeft(restTime);
    }
  }, [timeLeft, isResting]);

  useEffect(() => {
    if (!isResting) {
      setTimeLeft(workout.exercises[currentExerciseIndex].duration);
    }
  }, [currentExerciseIndex, isResting, workout.exercises]);

  const currentExercise = workout?.exercises[currentExerciseIndex] ?? null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const addScoreExercise = () => {
    const exerciseNumber = JSON.parse(localStorage.getItem("exercises") || "0");
    const exerciseTotalTime = JSON.parse(
      localStorage.getItem("exerciseTotalTime") || "0"
    );

    localStorage.setItem(
      "exerciseTotalTime",
      JSON.stringify(+exerciseTotalTime + workout.duration)
    );
    localStorage.setItem("exercises", JSON.stringify(exerciseNumber + 1));
    router.push("/");
  };

  const progress = isResting
    ? ((restTime - timeLeft) / restTime) * 100
    : ((currentExercise?.duration - timeLeft) / currentExercise?.duration) *
      100;

  if (workoutComplete) {
    return (
      <div className="container px-4 py-6 h-[80vh] flex flex-col items-center justify-center animate-in">
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold">Workout Complete!</h1>
          <p className="text-muted-foreground">
            Great job! You've completed the {workout.title}.
          </p>
          <button
            onClick={addScoreExercise}
            className="mt-8 rounded-[12px] w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <div className="text-center">
        <p className="text-muted-foreground">
          {isResting
            ? "Take a break"
            : `Exercise ${currentExerciseIndex + 1}/${
                workout?.exercises.length
              }`}
        </p>
        <h1 className="text-xl font-bold">
          {isResting ? "Rest Time" : currentExercise?.name}
        </h1>
      </div>
      {!isResting && (
        <p className="text-[14px] leading-4 text-gray-400 m-0">
          {currentExercise?.description}
        </p>
      )}
      {!isResting && (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={currentExercise?.image || "/placeholder.svg"}
            alt={currentExercise?.name}
            className="w-full h-full max-h-[220px] object-cover rounded-[12px]"
          />
        </div>
      )}

      <Card className="animate-in-delay-100 border-0">
        <CardContent className="p-2 flex flex-col items-center">
          <div className="text-5xl font-bold mb-2">{formatTime(timeLeft)}</div>
          <Progress value={progress} className="w-full h-2" />

          <div className="flex gap-4 mt-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-full h-12 w-12 flex items-center justify-center"
            >
              {isPaused ? (
                <Play className="w-5 h-5" />
              ) : (
                <Pause className="w-5 h-5" />
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
