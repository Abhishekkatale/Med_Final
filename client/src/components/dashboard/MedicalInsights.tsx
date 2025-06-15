import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PostWithAuthor } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, TrendingUp, Bookmark, Share2, Newspaper, Globe, Activity } from "lucide-react";

type FilterType = "latest" | "popular" | "saved";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
  readTime: string;
}

const MedicalInsights = () => {
  const [filter, setFilter] = useState<FilterType>("latest");
  const [newsFilter, setNewsFilter] = useState<string>("all");
  const queryClient = useQueryClient();

  // Mock healthcare news data (in real app, this would come from news APIs)
  const [healthcareNews, setHealthcareNews] = useState<NewsArticle[]>([
    {
      id: "1",
      title: "Breakthrough Gene Therapy Shows Promise for Rare Genetic Disorders",
      description: "Researchers at leading medical centers report significant progress in treating previously incurable genetic conditions using advanced gene editing techniques.",
      url: "https://www.bbc.com/news/health",
      source: "BBC Health",
      publishedAt: "2 hours ago",
      category: "Research",
      readTime: "4 min read"
    },
    {
      id: "2",
      title: "WHO Announces New Guidelines for Mental Health Care Integration",
      description: "The World Health Organization releases comprehensive guidelines for integrating mental health services into primary healthcare systems globally.",
      url: "https://www.who.int/news",
      source: "WHO",
      publishedAt: "4 hours ago",
      category: "Policy",
      readTime: "6 min read"
    },
    {
      id: "3",
      title: "AI-Powered Diagnostic Tool Reduces Misdiagnosis Rates by 40%",
      description: "New artificial intelligence system helps physicians identify complex conditions with unprecedented accuracy, potentially revolutionizing diagnostic medicine.",
      url: "https://www.nature.com/articles",
      source: "Nature Medicine",
      publishedAt: "6 hours ago",
      category: "Technology",
      readTime: "8 min read"
    },
    {
      id: "4",
      title: "Global Vaccination Campaign Achieves 95% Coverage Milestone",
      description: "International health authorities report historic vaccination coverage rates, marking a significant achievement in global public health efforts.",
      url: "https://www.reuters.com/business/healthcare-pharmaceuticals",
      source: "Reuters Health",
      publishedAt: "8 hours ago",
      category: "Public Health",
      readTime: "3 min read"
    },
    {
      id: "5",
      title: "Revolutionary Cancer Treatment Shows 80% Success Rate in Clinical Trials",
      description: "Innovative immunotherapy approach demonstrates remarkable efficacy in treating advanced-stage cancers previously considered untreatable.",
      url: "https://www.nejm.org",
      source: "New England Journal of Medicine",
      publishedAt: "12 hours ago",
      category: "Oncology",
      readTime: "10 min read"
    },
    {
      id: "6",
      title: "Digital Health Records Improve Patient Outcomes by 30%",
      description: "Comprehensive study reveals that electronic health record systems significantly enhance care coordination and reduce medical errors.",
      url: "https://www.healthaffairs.org",
      source: "Health Affairs",
      publishedAt: "1 day ago",
      category: "Digital Health",
      readTime: "7 min read"
    }
  ]);

  const { data: posts, isLoading } = useQuery<PostWithAuthor[]>({
    queryKey: ["/api/posts", filter],
  });

  const handleSavePost = async (postId: number, isSaved: boolean) => {
    try {
      await fetch(`/api/posts/${postId}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ saved: !isSaved }),
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/posts", filter] });
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleSharePost = (postId: number) => {
    console.log("Sharing post:", postId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "research": return <Activity className="w-4 h-4" />;
      case "policy": return <Globe className="w-4 h-4" />;
      case "technology": return <TrendingUp className="w-4 h-4" />;
      default: return <Newspaper className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "research": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "policy": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "technology": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "oncology": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "digital health": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "public health": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const filteredNews = newsFilter === "all" 
    ? healthcareNews 
    : healthcareNews.filter(article => article.category.toLowerCase() === newsFilter.toLowerCase());

  const newsCategories = ["all", "research", "policy", "technology", "oncology", "public health", "digital health"];

  return (
    <div className="space-y-6">
      {/* Medical Insights Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Medical Insights</h2>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filter === "latest" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter("latest")}
              className={filter === "latest" 
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50" 
                : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"}
            >
              Latest
            </Button>
            <Button
              variant={filter === "popular" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter("popular")}
              className={filter === "popular" 
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50" 
                : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"}
            >
              Popular
            </Button>
            <Button
              variant={filter === "saved" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter("saved")}
              className={filter === "saved" 
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50" 
                : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"}
            >
              Saved
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="mb-6 pb-6 border-b border-gray-200 dark:border-slate-700 last:border-0 last:mb-0 last:pb-0"
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(post.category.name)}`}>
                          {post.category.name}
                        </span>
                        <span className="ml-3 text-xs text-gray-500 dark:text-slate-400 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.timeAgo}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-slate-300 mb-3 leading-relaxed">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {post.participants.map((participant) => (
                              <div
                                key={participant.id}
                                className={`w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 ${participant.colorClass} flex items-center justify-center`}
                              >
                                <span className="text-xs font-medium">{participant.initials}</span>
                              </div>
                            ))}
                          </div>
                          <span className="ml-3 text-xs text-gray-500 dark:text-slate-400">
                            {post.discussCount} physicians discussed this
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            onClick={() => handleSavePost(post.id, post.saved)}
                          >
                            <Bookmark className={`w-4 h-4 ${post.saved ? 'text-blue-600 dark:text-blue-400 fill-current' : 'text-gray-400 dark:text-slate-500'}`} />
                          </button>
                          <button 
                            className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            onClick={() => handleSharePost(post.id)}
                          >
                            <Share2 className="w-4 h-4 text-gray-400 dark:text-slate-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-lg font-medium text-gray-500 dark:text-slate-400">No articles found</p>
              <p className="text-sm text-gray-400 dark:text-slate-500">
                {filter === "saved" 
                  ? "You haven't saved any articles yet" 
                  : "No articles available in this category"}
              </p>
            </div>
          )}
          
          <Button
            variant="outline"
            className="w-full py-3 mt-6 text-sm font-medium border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            View All Medical Insights
          </Button>
        </div>
      </div>

      {/* Healthcare News Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Newspaper className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Healthcare News & Updates</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              View All Sources
            </Button>
          </div>
          
          {/* News Category Filter */}
          <div className="flex flex-wrap gap-2">
            {newsCategories.map((category) => (
              <Button
                key={category}
                variant={newsFilter === category ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setNewsFilter(category)}
                className={`text-xs ${
                  newsFilter === category
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
                    : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {filteredNews.map((article) => (
              <div
                key={article.id}
                className="group p-4 border border-gray-200 dark:border-slate-700 rounded-lg hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200 cursor-pointer"
                onClick={() => window.open(article.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {getCategoryIcon(article.category)}
                    <span>{article.category}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-slate-400">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.publishedAt}
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium text-gray-600 dark:text-slate-400">
                      {article.source}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-slate-500">
                    <span>{article.readTime}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* News Sources Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-slate-400">
                <span className="font-medium">Trusted Sources:</span>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>BBC Health</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>WHO</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Reuters Health</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Nature Medicine</span>
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              >
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInsights;