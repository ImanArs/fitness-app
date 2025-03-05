import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Clock } from "lucide-react";
import { workouts } from "@/lib/workout";
import { formatDuration } from "@/lib/utils";

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
            <Card className="overflow-hidden transition-transform hover:scale-[0.98] active:scale-[0.97] rounded-[12px]">
              <div className="aspect-[2/1] relative">
                <img
                  src={workout.image || "/placeholder.svg"}
                  alt={workout.title}
                  className="w-full h-full object-cover rounded-[12px_12px_0_0]"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="font-semibold text-lg">{workout.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(+workout?.duration)} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    <span>{workout?.calories} cal</span>
                  </div>
                  <div>
                    <span>{workout?.exercises?.length} exercises</span>
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
