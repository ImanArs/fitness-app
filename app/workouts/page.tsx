import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Clock } from "lucide-react";

export const workouts = [
  {
    id: 1,
    title: "Full Body Workout",
    duration: "30 min",
    calories: 250,
    image:
      "https://www.bodybuilding.com/images/2016/july/the-ultimate-beginners-full-body-workout-header-v2-960x540.jpg",
    exercises: 8,
  },
  {
    id: 2,
    title: "HIIT Cardio",
    duration: "20 min",
    calories: 300,
    image:
      "https://s36370.pcdn.co/wp-content/uploads/2023/07/image-of-a-man-doing-planks-in-an-hiit-workout-unsplash-1024x683.jpg",
    exercises: 6,
  },
  {
    id: 3,
    title: "Core Strength",
    duration: "25 min",
    calories: 200,
    image:
      "https://manofmany.com/wp-content/uploads/2023/10/11-Best-HIIT-Workouts-for-Men-What-is-HIIT.jpg",
    exercises: 7,
  },
];
export default function WorkoutsPage() {
  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <h1 className="text-2xl font-bold">Workouts</h1>

      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <Link
            key={workout.id}
            href={`/workouts/${workout.id}`}
            className={`block animate-in-delay-${index * 100}`}
          >
            <Card className="overflow-hidden transition-transform hover:scale-[0.98] active:scale-[0.97]">
              <div className="aspect-[2/1] relative">
                <img
                  src={workout.image || "/placeholder.svg"}
                  alt={workout.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg">{workout.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    <span>{workout.calories} cal</span>
                  </div>
                  <div>
                    <span>{workout.exercises} exercises</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
