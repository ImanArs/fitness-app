"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)

  // In a real app, you would fetch this data based on the ID
  const article = {
    id: Number.parseInt(params.id),
    title: "10 Best Exercises for Building Muscle",
    content: `
      <p>Building muscle requires consistent effort both in the gym and in the kitchen. Here are the 10 best exercises that should be part of any muscle-building routine:</p>
      
      <h2>1. Squats</h2>
      <p>The king of all exercises, squats work your entire lower body and core. They also trigger a strong hormonal response that aids in overall muscle growth.</p>
      
      <h2>2. Deadlifts</h2>
      <p>Another compound movement that engages multiple muscle groups simultaneously. Deadlifts build strength in your posterior chain, including your back, glutes, and hamstrings.</p>
      
      <h2>3. Bench Press</h2>
      <p>The standard for chest development, bench presses also work your shoulders and triceps.</p>
      
      <h2>4. Pull-ups</h2>
      <p>One of the best exercises for back development, pull-ups also engage your biceps and shoulders.</p>
      
      <h2>5. Overhead Press</h2>
      <p>This exercise builds impressive shoulder strength and size while also engaging your triceps and upper chest.</p>
    `,
    image: "/placeholder.svg?height=300&width=600",
    likes: 245,
    date: "March 15, 2023",
  }

  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <Button variant="ghost" size="icon" onClick={() => router.back()} className="mb-2">
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <div className="aspect-[2/1] relative rounded-lg overflow-hidden">
        <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{article.title}</h1>

        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">{article.date}</div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsLiked(!isLiked)} className="p-1">
              <Heart className={`w-5 h-5 ${isLiked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            </button>
            <span>{isLiked ? article.likes + 1 : article.likes}</span>
          </div>
        </div>

        <div
          className="prose prose-invert max-w-none prose-headings:text-primary prose-headings:font-semibold prose-p:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  )
}

