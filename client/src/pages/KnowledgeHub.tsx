import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HealthcareBlog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [myBlogs, setMyBlogs] = useState([]);
  
  // Form states for creating new blog
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    readTime: ""
  });

  // External healthcare blogs data
  const externalBlogs = [
    {
      id: 1,
      title: "The Future of Personalized Medicine: AI-Driven Healthcare Solutions",
      excerpt: "Exploring how artificial intelligence is revolutionizing personalized treatment plans and improving patient outcomes across various medical specialties.",
      author: "Dr. Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      category: "technology",
      tags: ["AI", "Personalized Medicine", "Healthcare Technology"],
      readTime: "8 min read",
      publishedAt: "2 days ago",
      image: "https://www.capgemini.com/wp-content/uploads/2024/07/Capgemini-PoV-LS-TrustedAI-Part1-HeroBanner.jpg?w=800&quality=70",
      website: "Mayo Clinic Blog",
      websiteUrl: "https://www.mayoclinic.org/healthy-lifestyle",
      likes: 245,
      comments: 18,
      isExternal: true
    },
    {
      id: 2,
      title: "Mental Health in the Digital Age: Telehealth Revolution",
      excerpt: "How digital mental health platforms are breaking barriers and making psychological support more accessible to patients worldwide.",
      author: "Dr. Michael Chen",
      authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      category: "mental-health",
      tags: ["Mental Health", "Telehealth", "Digital Healthcare"],
      readTime: "6 min read",
      publishedAt: "4 days ago",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=300&fit=crop",
      website: "Harvard Health Blog",
      websiteUrl: "https://www.health.harvard.edu/blog",
      likes: 189,
      comments: 24,
      isExternal: true
    },
    {
      id: 3,
      title: "Breakthrough in Cancer Immunotherapy: CAR-T Cell Treatment",
      excerpt: "Latest developments in CAR-T cell therapy are showing remarkable results in treating previously incurable blood cancers.",
      author: "Dr. Emily Rodriguez",
      authorImage: "https://images.unsplash.com/photo-1594824388647-82b5c2f7c5f5?w=100&h=100&fit=crop&crop=face",
      category: "research",
      tags: ["Cancer", "Immunotherapy", "Medical Research"],
      readTime: "10 min read",
      publishedAt: "1 week ago",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=300&fit=crop",
      website: "Johns Hopkins Medicine",
      websiteUrl: "https://www.hopkinsmedicine.org/health",
      likes: 312,
      comments: 42,
      isExternal: true
    },
    {
      id: 4,
      title: "Nutrition and Preventive Medicine: Building Healthier Communities",
      excerpt: "Evidence-based approaches to community nutrition programs that are reducing chronic disease rates and improving population health.",
      author: "Dr. Lisa Thompson",
      authorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      category: "nutrition",
      tags: ["Nutrition", "Preventive Medicine", "Public Health"],
      readTime: "7 min read",
      publishedAt: "1 week ago",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=300&fit=crop",
      website: "Cleveland Clinic",
      websiteUrl: "https://my.clevelandclinic.org/health",
      likes: 156,
      comments: 31,
      isExternal: true
    },
    {
      id: 5,
      title: "Pediatric Care Innovation: Child-Friendly Medical Technologies",
      excerpt: "New medical devices and treatment approaches designed specifically for children are making healthcare less intimidating and more effective.",
      author: "Dr. Amanda White",
      authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      category: "pediatrics",
      tags: ["Pediatrics", "Medical Innovation", "Child Healthcare"],
      readTime: "5 min read",
      publishedAt: "2 weeks ago",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=300&fit=crop",
      website: "WebMD",
      websiteUrl: "https://www.webmd.com/",
      likes: 203,
      comments: 19,
      isExternal: true
    }
  ];

  // Sample user blogs
  const sampleUserBlogs = [
    {
      id: 101,
      title: "My Journey in Emergency Medicine: Lessons from the Front Lines",
      excerpt: "Reflecting on 10 years of emergency medicine practice and the invaluable lessons learned from treating patients in critical situations.",
      author: "You",
      authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      category: "my-blog",
      tags: ["Emergency Medicine", "Personal Story", "Medical Practice"],
      readTime: "12 min read",
      publishedAt: "3 days ago",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=300&fit=crop",
      website: "My Blog",
      websiteUrl: "#",
      likes: 89,
      comments: 15,
      isExternal: false,
      content: "Working in emergency medicine has taught me that every second counts, but more importantly, every patient has a story..."
    },
    {
      id: 102,
      title: "Building Trust in Patient-Doctor Relationships",
      excerpt: "Exploring effective communication strategies that help build stronger, more trusting relationships between healthcare providers and patients.",
      author: "You",
      authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      category: "my-blog",
      tags: ["Patient Care", "Communication", "Medical Ethics"],
      readTime: "9 min read",
      publishedAt: "1 week ago",
      image: "https://assets.contenthub.wolterskluwer.com/api/public/content/1b0680fbb8e24c309887564053a33c44?v=d7a6f55c&t=w768l",
      website: "My Blog",
      websiteUrl: "#",
      likes: 134,
      comments: 28,
      isExternal: false,
      content: "Trust is the foundation of effective healthcare. In my years of practice, I've learned that building trust requires..."
    },
    {
      id: 103,
      title: "The Impact of Technology on Modern Healthcare Delivery",
      excerpt: "Analyzing how electronic health records, telemedicine, and AI diagnostics are transforming the way we deliver healthcare services.",
      author: "You",
      authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      category: "my-blog",
      tags: ["Healthcare Technology", "EHR", "Digital Transformation"],
      readTime: "11 min read",
      publishedAt: "2 weeks ago",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
      website: "My Blog",
      websiteUrl: "#",
      likes: 198,
      comments: 35,
      isExternal: false,
      content: "The digital revolution in healthcare is not just about new tools; it's about reimagining how we connect with and care for patients..."
    }
  ];

  // Combine all blogs
  const allBlogs = [...externalBlogs, ...sampleUserBlogs, ...myBlogs];

  const categories = [
    { id: "all", name: "All Blogs", icon: "article", color: "green" },
    { id: "technology", name: "Technology", icon: "computer", color: "green" },
    { id: "research", name: "Research", icon: "science", color: "green" },
    { id: "mental-health", name: "Mental Health", icon: "psychology", color: "green" },
    { id: "nutrition", name: "Nutrition", icon: "restaurant", color: "green" },
    { id: "pediatrics", name: "Pediatrics", icon: "child_care", color: "green" },
    { id: "patient-care", name: "Patient Care", icon: "favorite", color: "green" },
    { id: "my-blog", name: "My Blog", icon: "person", color: "green" }
  ];

  const filteredBlogs = allBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === "all" || blog.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBlogClick = (blog) => {
    if (blog.isExternal) {
      window.open(blog.websiteUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal blog viewing (could open a modal or navigate to full post)
      console.log("Viewing internal blog:", blog.title);
    }
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    
    if (!newBlog.title || !newBlog.excerpt || !newBlog.content || !newBlog.category) {
      alert("Please fill in all required fields");
      return;
    }

    const blogPost = {
      id: Date.now(),
      title: newBlog.title,
      excerpt: newBlog.excerpt,
      content: newBlog.content,
      author: "You",
      authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      category: newBlog.category,
      tags: newBlog.tags.split(',').map(tag => tag.trim()),
      readTime: newBlog.readTime || "5 min read",
      publishedAt: "Just now",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop",
      website: "My Blog",
      websiteUrl: "#",
      likes: 0,
      comments: 0,
      isExternal: false
    };

    setMyBlogs([blogPost, ...myBlogs]);
    setOpenCreateDialog(false);
    setNewBlog({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      readTime: ""
    });
  };

  const topExternalSources = [
    { name: "Mayo Clinic", url: "https://www.mayoclinic.org/healthy-lifestyle", icon: "local_hospital" },
    { name: "Harvard Health", url: "https://www.health.harvard.edu/blog", icon: "school" },
    { name: "Johns Hopkins", url: "https://www.hopkinsmedicine.org/health", icon: "medical_services" },
    { name: "Cleveland Clinic", url: "https://my.clevelandclinic.org/health", icon: "healing" },
    { name: "WebMD", url: "https://www.webmd.com/", icon: "health_and_safety" },
    { name: "Healthline", url: "https://www.healthline.com/", icon: "monitor_heart" }
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
              <span className="material-icons text-white text-2xl">article</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Knowledge Hub</h1>
              <p className="text-gray-600">Discover insights, share knowledge, and connect with the medical community</p>
            </div>
          </div>
          
          <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
                <span className="material-icons mr-2 text-sm">edit</span>
                Write Blog
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
                <DialogDescription>
                  Share your medical insights, experiences, or research with the healthcare community.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateBlog}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                      placeholder="Enter blog title..."
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={newBlog.category} 
                        onValueChange={(value) => setNewBlog({...newBlog, category: value})}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.filter(cat => cat.id !== "all").map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="readTime">Read Time</Label>
                      <Input
                        id="readTime"
                        value={newBlog.readTime}
                        onChange={(e) => setNewBlog({...newBlog, readTime: e.target.value})}
                        placeholder="e.g., 5 min read"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt *</Label>
                    <Textarea
                      id="excerpt"
                      value={newBlog.excerpt}
                      onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                      placeholder="Brief description of your blog post..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={newBlog.tags}
                      onChange={(e) => setNewBlog({...newBlog, tags: e.target.value})}
                      placeholder="Enter tags separated by commas..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      value={newBlog.content}
                      onChange={(e) => setNewBlog({...newBlog, content: e.target.value})}
                      placeholder="Write your blog content here..."
                      rows={8}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    Publish Blog
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-80 flex-shrink-0">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <span className="material-icons mr-2 text-purple-600">tune</span>
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
                  placeholder="Search blog posts..." 
                  className="pl-10 border-2 focus:border-purple-500 transition-colors" 
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
                          ? `bg-${category.color}-500 text-white shadow-md transform scale-105`
                          : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span className="material-icons mr-3 text-sm">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Top External Sources */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="material-icons mr-2 text-blue-500">public</span>
                  Top Sources
                </h3>
                <div className="space-y-2">
                  {topExternalSources.map((source, index) => (
                    <button 
                      key={index}
                      onClick={() => window.open(source.url, '_blank', 'noopener,noreferrer')}
                      className="w-full flex items-center p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                    >
                      <span className="material-icons mr-3 text-blue-600 text-sm">{source.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{source.name}</span>
                      <span className="material-icons ml-auto text-gray-400 text-sm">open_in_new</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card className="shadow-lg border-0">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-gray-800">
                  {activeCategory === "all" ? "All Blog Posts" : categories.find(c => c.id === activeCategory)?.name} ({filteredBlogs.length})
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    {allBlogs.filter(b => !b.isExternal).length} My Posts
                  </Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-200">
                    {allBlogs.filter(b => b.isExternal).length} External
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {filteredBlogs.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {filteredBlogs.map((blog) => (
                    <article 
                      key={blog.id}
                      onClick={() => handleBlogClick(blog)}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    >
                      <div className="relative">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          {blog.isExternal ? (
                            <Badge className="bg-blue-500 text-white">
                              <span className="material-icons mr-1 text-xs">public</span>
                              External
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500 text-white">
                              <span className="material-icons mr-1 text-xs">person</span>
                              My Blog
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="outline" className="bg-white/90 text-gray-700">
                            {categories.find(c => c.id === blog.category)?.name || 'General'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src={blog.authorImage} 
                              alt={blog.author}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-sm mr-3"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                              <p className="text-xs text-gray-500">{blog.publishedAt}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center">
                              <span className="material-icons mr-1 text-xs">schedule</span>
                              {blog.readTime}
                            </span>
                            <span className="flex items-center">
                              <span className="material-icons mr-1 text-xs">favorite</span>
                              {blog.likes}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <span className="material-icons mr-1 text-xs">language</span>
                            <span>{blog.website}</span>
                          </div>
                          <span className="material-icons text-gray-400 group-hover:text-purple-500 transition-colors">
                            {blog.isExternal ? 'open_in_new' : 'arrow_forward'}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-icons text-4xl text-gray-400">article</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No blog posts found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm 
                      ? `No results found for "${searchTerm}"`
                      : "No blog posts available in this category"}
                  </p>
                  <Button 
                    onClick={() => setOpenCreateDialog(true)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  >
                    <span className="material-icons mr-2 text-sm">edit</span>
                    Write Your First Blog
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthcareBlog;