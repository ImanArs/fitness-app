"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Flame, ArrowRight, ArrowLeft } from "lucide-react";
import { workouts } from "@/lib/workout";
import { formatDuration } from "@/lib/utils";

export default function WorkoutDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const workout = workouts.find(
    (workout) => workout.id === Number.parseInt(params.id)
  );

  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <Link href={`/workouts`}>
        <div className="flex gap-2 text-gray-400">
          <ArrowLeft className="w-6 h-6" />
          <span className="text-[18px] leading-6 font-medium">Back</span>
        </div>
      </Link>
      <div className="aspect-[2/1] relative rounded-lg overflow-hidden">
        <img
          src={workout?.image || "/placeholder.svg"}
          alt={workout?.title}
          className="w-full h-full object-cover rounded-[12px]"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{workout?.title}</h1>
        <p className="text-muted-foreground">{workout?.description}</p>

        <div className="flex gap-4">
          <Card className="flex-1 animate-in-delay-100 rounded-[12px]">
            <CardContent className="p-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium flex gap-2 items-center">
                  {formatDuration(Number(workout?.duration))}
                  <span>min</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-1 animate-in-delay-200 rounded-[12px]">
            <CardContent className="p-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="font-medium">{workout?.calories} cal</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-xl font-semibold mt-6">Exercises</h2>
        <div className="space-y-3">
          {workout?.exercises.map((exercise, index) => (
            <Card
              key={exercise.id}
              className={`animate-in-delay-${index * 100} rounded-[12px]`}
            >
              <Link href={`/workouts/${params.id}/start`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <img
                    src={exercise.image || "/placeholder.svg"}
                    alt={exercise.name}
                    className="w-12 h-12 rounded-[12px] object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{exercise.name}</h3>
                    <div className="flex gap-3 text-sm text-muted-foreground">
                      <span>{formatDuration(+exercise.duration)} min</span>
                      <span>{String(exercise.calories)} cal</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <Link href={`/workouts/${params.id}/start`} className="block mt-6">
          <Button className="w-full rounded-[12px]">Start Workout</Button>
        </Link>
      </div>
    </div>
  );
}
