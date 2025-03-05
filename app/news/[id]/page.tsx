"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { allNews } from "@/lib/news";
import Link from "next/link";

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const article = allNews.find(
    (news) => news.id === Number.parseInt(params.id)
  );

  const addNewsStats = () => {
    router.push(`/news`);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const currentDay = daysOfWeek[today.getDay()];
    const readStats = JSON.parse(localStorage.getItem("readStats") || "{}");
    readStats[currentDay] = (readStats[currentDay] || 0) + 1;
    localStorage.setItem("readStats", JSON.stringify(readStats));
  };

  return (
    <div className="container px-4 py-6 space-y-6 animate-in">
      <Link href={`/news`}>
        <div className="flex gap-2 text-gray-400">
          <ArrowLeft className="w-6 h-6" />
          <span className="text-[18px] leading-6 font-medium">Back</span>
        </div>
      </Link>

      <div className="aspect-[2/1] relative rounded-lg overflow-hidden">
        <img
          src={article?.image || "/placeholder.svg"}
          alt={article?.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{article?.title}</h1>

        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">{article?.date}</div>
          <div className="flex items-center gap-1">
            <button onClick={() => setIsLiked(!isLiked)} className="p-1">
              <Heart
                className={`w-5 h-5 ${
                  isLiked
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
            </button>
            <span>{isLiked ? (article?.likes ?? 0) + 1 : article?.likes}</span>
          </div>
        </div>

        <div
          className="prose prose-invert max-w-none prose-headings:text-primary prose-headings:font-semibold prose-p:text-muted-foreground
          flex flex-col gap-4
          "
          dangerouslySetInnerHTML={{ __html: article?.content ?? "" }}
        />
      </div>
      <button
        onClick={addNewsStats}
        className="mt-8 rounded-[12px] w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4"
      >
        Back to News
      </button>
    </div>
  );
}
