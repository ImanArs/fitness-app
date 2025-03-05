"use client";

import { Card } from "@/components/ui/card";
import { LineChart, CircleProgress, StatCard } from "@/components/stats";
import { useEffect, useState } from "react";
import { workouts } from "@/lib/workout";
import { access } from "fs";

export default function Home() {
  const [exerciseNumber, setExerciseNumber] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [percentageTime, setPercentageTime] = useState(0);
  useEffect(() => {
    const exerciseNumber = JSON.parse(localStorage.getItem("exercises") || "0");
    setExerciseNumber(exerciseNumber);
    const exerciseTotalTime = JSON.parse(
      localStorage.getItem("exerciseTotalTime") || "0"
    );
    setTotalTime(exerciseTotalTime);

    const totalTimeGoal = workouts.reduce((acc, workout) => {
      return acc + Number(workout.duration);
    }, 0);
    setPercentageTime(Math.round((exerciseTotalTime / totalTimeGoal) * 100));
  }, []);
  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Workouts Completed"
          value={String(exerciseNumber)}
          className="animate-in-delay-100 rounded-[12px]"
        />
        <StatCard
          title="Total Workout Time"
          value={String(totalTime)}
          className="animate-in-delay-200 rounded-[12px]"
        />
      </div>

      <Card className="p-4 animate-in-delay-100 rounded-[12px]">
        <h2 className="text-lg font-medium mb-4">Posts Read</h2>
        <LineChart />
      </Card>

      <Card className="p-4 animate-in-delay-200 rounded-[12px]">
        <h2 className="text-lg font-medium mb-4">Workout Time</h2>
        <div className="flex justify-center">
          <CircleProgress
            value={percentageTime}
            label={percentageTime + "%"}
            sublabel="of goal"
          />
        </div>
      </Card>
    </div>
  );
}
