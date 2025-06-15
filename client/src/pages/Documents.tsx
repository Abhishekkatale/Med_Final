import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const HealthcareNews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Mock healthcare news data - you can replace this with real API data
  const newsData = [
    {
      id: 1,
      title: "Revolutionary Gene Therapy Shows Promise for Rare Disease Treatment",
      summary: "New clinical trials demonstrate unprecedented success rates in treating genetic disorders using advanced gene editing techniques.",
      category: "research",
      source: "BBC Health",
      sourceUrl: "https://www.bbc.com/news/health",
      publishedAt: "2 hours ago",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      tags: ["Gene Therapy", "Clinical Trials", "Rare Diseases"],
      trending: true
    },
    {
      id: 2,
      title: "AI-Powered Diagnostic Tool Reduces Medical Errors by 40%",
      summary: "Machine learning algorithms are helping doctors make more accurate diagnoses, particularly in radiology and pathology.",
      category: "technology",
      source: "Reuters Health",
      sourceUrl: "https://www.reuters.com/business/healthcare-pharmaceuticals/",
      publishedAt: "4 hours ago",
      readTime: "3 min read",
      image: "https://www.scnsoft.com/healthcare/artificial-intelligence-medical-diagnosis/architecture.png",
      tags: ["Artificial Intelligence", "Diagnostics", "Medical Technology"],
      trending: false
    },
    {
      id: 3,
      title: "Global Mental Health Initiative Launches in 50 Countries",
      summary: "WHO announces comprehensive program to address rising mental health challenges worldwide, focusing on accessibility and prevention.",
      category: "global-health",
      source: "CNN Health",
      sourceUrl: "https://www.cnn.com/health",
      publishedAt: "6 hours ago",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=200&fit=crop",
      tags: ["Mental Health", "WHO", "Global Initiative"],
      trending: true
    },
    {
      id: 4,
      title: "Breakthrough in Cancer Immunotherapy Shows 85% Success Rate",
      summary: "New personalized treatment approach demonstrates remarkable results in late-stage cancer patients across multiple cancer types.",
      category: "research",
      source: "Nature Medicine",
      sourceUrl: "https://www.nature.com/nm/",
      publishedAt: "8 hours ago",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=200&fit=crop",
      tags: ["Cancer", "Immunotherapy", "Clinical Research"],
      trending: true
    },
    {
      id: 5,
      title: "Telemedicine Usage Stabilizes at 38x Pre-Pandemic Levels",
      summary: "Healthcare systems worldwide report sustained high adoption of virtual consultations, transforming patient care delivery.",
      category: "digital-health",
      source: "Healthcare IT News",
      sourceUrl: "https://www.healthcareitnews.com/",
      publishedAt: "12 hours ago",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop",
      tags: ["Telemedicine", "Digital Health", "Healthcare Delivery"],
      trending: false
    },
    {
      id: 6,
      title: "New Alzheimer's Drug Shows Promise in Slowing Cognitive Decline",
      summary: "Phase III trials reveal significant reduction in disease progression, offering hope for millions of patients and families.",
      category: "research",
      source: "Medical News Today",
      sourceUrl: "https://www.medicalnewstoday.com/",
      publishedAt: "1 day ago",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=200&fit=crop",
      tags: ["Alzheimer's", "Neurology", "Drug Development"],
      trending: false
    }
  ];

  const categories = [
    { id: "all", name: "All News", icon: "public" },
    { id: "research", name: "Research", icon: "science" },
    { id: "technology", name: "Technology", icon: "computer" },
    { id: "global-health", name: "Global Health", icon: "language" },
    { id: "digital-health", name: "Digital Health", icon: "smartphone" }
  ];

  const filteredNews = newsData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const trendingNews = newsData.filter(article => article.trending);

  const handleNewsClick = (sourceUrl) => {
    window.open(sourceUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
            <span className="material-icons text-white text-2xl">medical_information</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Healthcare News</h1>
            <p className="text-gray-600">Stay updated with the latest medical breakthroughs and health innovations</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-80 flex-shrink-0">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <span className="material-icons mr-2 text-blue-600">search</span>
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-icons text-gray-400 text-lg">search</span>
                </span>
                <Input 
                  type="text" 
                  placeholder="Search healthcare news..." 
                  className="pl-10 border-2 focus:border-blue-500 transition-colors" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-blue-500 text-white shadow-md transform scale-105'
                          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span className="material-icons mr-3 text-sm">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Section */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="material-icons mr-2 text-red-500">trending_up</span>
                  Trending Now
                </h3>
                <div className="space-y-2">
                  {trendingNews.slice(0, 3).map((article) => (
                    <div 
                      key={article.id}
                      onClick={() => handleNewsClick(article.sourceUrl)}
                      className="p-3 bg-white rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-500">{article.source} • {article.publishedAt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card className="shadow-lg border-0">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-gray-800">
                  Latest Healthcare News ({filteredNews.length})
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.reload()}
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  <span className="material-icons mr-1 text-sm">refresh</span>
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredNews.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredNews.map((article, index) => (
                    <article 
                      key={article.id}
                      onClick={() => handleNewsClick(article.sourceUrl)}
                      className={`p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer group ${
                        index === 0 ? 'bg-gradient-to-r from-blue-50/30 to-green-50/30' : ''
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row gap-4">
                        <div className="lg:w-48 flex-shrink-0">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-32 lg:h-24 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {article.trending && (
                                  <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                                    <span className="material-icons mr-1 text-xs">trending_up</span>
                                    Trending
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {categories.find(c => c.id === article.category)?.name || 'News'}
                                </Badge>
                              </div>
                              
                              <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {article.title}
                              </h2>
                              
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {article.summary}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {article.tags.map((tag, tagIndex) => (
                                  <span 
                                    key={tagIndex}
                                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="ml-4 flex-shrink-0">
                              <span className="material-icons text-gray-400 group-hover:text-blue-500 transition-colors">
                                open_in_new
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center">
                                <span className="material-icons mr-1 text-xs">language</span>
                                {article.source}
                              </span>
                              <span className="flex items-center">
                                <span className="material-icons mr-1 text-xs">schedule</span>
                                {article.publishedAt}
                              </span>
                              <span className="flex items-center">
                                <span className="material-icons mr-1 text-xs">timer</span>
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons text-4xl text-gray-400">search_off</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No news found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm 
                      ? `No results found for "${searchTerm}"`
                      : "No news available in this category"}
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("");
                      setActiveCategory("all");
                    }}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <span className="material-icons mr-2 text-sm">refresh</span>
                    Reset Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Links Footer */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border-0">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <span className="material-icons mr-2 text-blue-600">link</span>
            Quick Access to Trusted Health News Sources
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "BBC Health", url: "https://www.bbc.com/news/health", icon: "public" },
              { name: "Reuters Health", url: "https://www.reuters.com/business/healthcare-pharmaceuticals/", icon: "article" },
              { name: "CNN Health", url: "https://www.cnn.com/health", icon: "tv" },
              { name: "Nature Medicine", url: "https://www.nature.com/nm/", icon: "science" },
              { name: "Medical News Today", url: "https://www.medicalnewstoday.com/", icon: "medical_information" },
              { name: "Healthcare IT News", url: "https://www.healthcareitnews.com/", icon: "computer" }
            ].map((source, index) => (
              <button
                key={index}
                onClick={() => handleNewsClick(source.url)}
                className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
              >
                <span className="material-icons text-2xl text-gray-600 group-hover:text-blue-600 mb-2">
                  {source.icon}
                </span>
                <span className="text-xs font-medium text-gray-700 text-center">
                  {source.name}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthcareNews;