"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart } from "lucide-react"

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [likedPosts, setLikedPosts] = useState<number[]>([2])

  const allNews = [
    {
      id: 1,
      title: "10 Best Exercises for Building Muscle",
      summary: "Discover the most effective exercises to build muscle mass quickly and efficiently.",
      image: "/placeholder.svg?height=200&width=400",
      likes: 245,
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Nutrition Tips for Better Recovery",
      summary: "Learn how proper nutrition can significantly improve your post-workout recovery time.",
      image: "/placeholder.svg?height=200&width=400",
      likes: 189,
      date: "5 days ago",
    },
    {
      id: 3,
      title: "The Science Behind HIIT Workouts",
      summary: "Understanding why High-Intensity Interval Training is so effective for fat loss and fitness.",
      image: "/placeholder.svg?height=200&width=400",
      likes: 312,
      date: "1 week ago",
    },
  ]

  const favoriteNews = allNews.filter((news) => likedPosts.includes(news.id))

  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <h1 className="text-2xl font-bold">News</h1>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-4">
          {allNews.map((news, index) => (
            <NewsCard
              key={news.id}
              news={news}
              isLiked={likedPosts.includes(news.id)}
              onLike={() => {
                if (likedPosts.includes(news.id)) {
                  setLikedPosts(likedPosts.filter((id) => id !== news.id))
                } else {
                  setLikedPosts([...likedPosts, news.id])
                }
              }}
              delay={index * 100}
            />
          ))}
        </TabsContent>

        <TabsContent value="favorites" className="mt-4 space-y-4">
          {favoriteNews.length > 0 ? (
            favoriteNews.map((news, index) => (
              <NewsCard
                key={news.id}
                news={news}
                isLiked={true}
                onLike={() => {
                  setLikedPosts(likedPosts.filter((id) => id !== news.id))
                }}
                delay={index * 100}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">No favorite articles yet</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NewsCard({
  news,
  isLiked,
  onLike,
  delay,
}: {
  news: any
  isLiked: boolean
  onLike: () => void
  delay: number
}) {
  return (
    <Card className={`overflow-hidden animate-in-delay-${delay}`}>
      <Link href={`/news/${news.id}`}>
        <div className="aspect-[2/1] relative">
          <img src={news.image || "/placeholder.svg"} alt={news.title} className="w-full h-full object-cover" />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/news/${news.id}`}>
          <h2 className="font-semibold text-lg">{news.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{news.summary}</p>
        </Link>
        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="text-muted-foreground">{news.date}</div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.preventDefault()
                onLike()
              }}
              className="p-1"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            </button>
            <span>{news.likes}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

