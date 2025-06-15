import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TrendingArticle = {
  id: number;
  title: string;
  time: string;
  readCount: string;
  url: string;
};

const TrendingNow = () => {
  const [articles] = useState<TrendingArticle[]>([
    {
      id: 1,
      title: "Breakthrough in cardiac stent tech reduces complications",
      time: "2h ago",
      readCount: "70,771 readers",
      url: "https://www.medicalnewstoday.com/articles/new-stent-tech-2025"
    },
    {
      id: 2,
      title: "Healthcare workforce crisis deepens globally",
      time: "1d ago",
      readCount: "18,943 readers",
      url: "https://www.bbc.com/news/health-64234259"
    },
    {
      id: 3,
      title: "AI-assisted diagnosis shines in clinical trials",
      time: "2d ago",
      readCount: "7,818 readers",
      url: "https://www.who.int/news-room/feature-stories/detail/ai-in-healthcare"
    },
    {
      id: 4,
      title: "Funding for medical research increases in 2025",
      time: "1d ago",
      readCount: "5,990 readers",
      url: "https://www.nih.gov/news-events/news-releases/federal-funding-medical-research-2025"
    },
    {
      id: 5,
      title: "Telemedicine shows lasting impact post-pandemic",
      time: "23h ago",
      readCount: "4,678 readers",
      url: "https://www.webmd.com/coronavirus-in-context/telehealth-growth"
    }
  ]);

  const [showMore, setShowMore] = useState(false);
  const displayArticles = showMore ? articles : articles.slice(0, 3);

  return (
    <Card className="shadow-card overflow-hidden">
      <CardHeader className="pb-3 border-b border-border dark:border-slate-700">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Trending Now</span>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
            aria-label="More information"
          >
            <span className="material-icons text-text-secondary dark:text-slate-400 text-lg">info</span>
          </button>
        </CardTitle>
        <p className="text-sm text-text-secondary dark:text-slate-400">
          curated by MedConnect News
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border dark:divide-slate-700">
          {displayArticles.map((article) => (
            <li
              key={article.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label={`Read article: ${article.title}`}
              >
                <h3 className="font-medium text-sm mb-1 text-primary hover:underline dark:text-primary-300">
                  {article.title}
                </h3>
                <p className="text-xs text-text-muted dark:text-slate-400">
                  {article.time} · {article.readCount}
                </p>
              </a>
            </li>
          ))}
        </ul>
        <div className="p-3 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMore(!showMore)}
            className="text-sm text-primary dark:text-primary-300 font-medium w-full justify-center"
          >
            {showMore ? "Show less" : "Show more"}
            <span className="material-icons text-sm ml-1">
              {showMore ? "expand_less" : "expand_more"}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingNow;
