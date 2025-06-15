import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type User = {
  id: number;
  name: string;
  initials: string;
  username: string;
};

type CategoryOption = {
  value: string;
  label: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  timestamp: Date;
  likes: number;
  comments: number;
};

const PostCreator = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openMediaDialog, setOpenMediaDialog] = useState(false);
  const [openExpertiseDialog, setOpenExpertiseDialog] = useState(false);
  const [openArticleDialog, setOpenArticleDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [notification, setNotification] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [expertise, setExpertise] = useState("");
  const [expertiseCategory, setExpertiseCategory] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleCategory, setArticleCategory] = useState("");

  // Mock current user data
  const currentUser: User = {
    id: 1,
    name: "Dr. John Smith",
    initials: "JS",
    username: "johnsmith_md"
  };

  // Mock categories data
  const categoriesData: CategoryOption[] = [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "oncology", label: "Oncology" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "surgery", label: "Surgery" },
    { value: "emergency", label: "Emergency Medicine" },
    { value: "radiology", label: "Radiology" },
    { value: "pathology", label: "Pathology" },
    { value: "research", label: "Medical Research" },
    { value: "education", label: "Medical Education" }
  ];

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 4000);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const resetMediaForm = () => {
    setMediaFile(null);
    setTitle("");
    setContent("");
    setCategory("");
  };

  const resetExpertiseForm = () => {
    setExpertise("");
    setExpertiseCategory("");
  };

  const resetArticleForm = () => {
    setArticleTitle("");
    setArticleContent("");
    setArticleCategory("");
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      category,
      author: currentUser.name,
      timestamp: new Date(),
      likes: 0,
      comments: 0
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setOpenCreateDialog(false);
    resetForm();
    showNotification(`✅ Post "${title}" created successfully!`);
    
    // Simulate sharing to external platforms
    setTimeout(() => {
      showNotification("🔗 Post shared to medical networks!");
    }, 1500);
  };

  const handleMediaPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: Post = {
      id: Date.now(),
      title: title || "Media Post",
      content: content + (mediaFile ? ` [📎 ${mediaFile.name}]` : ""),
      category,
      author: currentUser.name,
      timestamp: new Date(),
      likes: 0,
      comments: 0
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setOpenMediaDialog(false);
    resetMediaForm();
    showNotification(`📷 Media post created with ${mediaFile?.name || 'attachment'}!`);
  };

  const handleExpertiseContribution = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: Post = {
      id: Date.now(),
      title: `Expert Insight: ${expertiseCategory}`,
      content: `💡 Expert Contribution: ${expertise}`,
      category: expertiseCategory,
      author: currentUser.name,
      timestamp: new Date(),
      likes: 0,
      comments: 0
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setOpenExpertiseDialog(false);
    resetExpertiseForm();
    showNotification("🧠 Expert insight shared with the community!");
    
    // Simulate expert verification
    setTimeout(() => {
      showNotification("✅ Expert contribution verified and featured!");
    }, 2000);
  };

  const handleArticleCreation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPost: Post = {
      id: Date.now(),
      title: `📄 Article: ${articleTitle}`,
      content: articleContent,
      category: articleCategory,
      author: currentUser.name,
      timestamp: new Date(),
      likes: 0,
      comments: 0
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    setOpenArticleDialog(false);
    resetArticleForm();
    showNotification(`📝 Article "${articleTitle}" published successfully!`);
    
    // Simulate article indexing
    setTimeout(() => {
      showNotification("🔍 Article indexed for medical research database!");
    }, 2500);
  };

  const handleMediaUpload = () => {
    setOpenMediaDialog(true);
  };

  const handleExpertiseContribute = () => {
    setOpenExpertiseDialog(true);
  };

  const handleWriteArticle = () => {
    setOpenArticleDialog(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      showNotification(`📎 File "${file.name}" selected for upload`);
    }
  };

  return (
    <div className="relative">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse max-w-sm">
          {notification}
        </div>
      )}

      <Card className="shadow-card mb-6 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 dark:bg-primary-800/30 text-primary dark:text-primary-300 rounded-full flex items-center justify-center font-medium">
              {currentUser?.initials || "MD"}
            </div>
            <Button 
              variant="outline" 
              className="flex-1 justify-start text-left font-normal text-text-secondary dark:text-slate-400 h-10 hover:bg-blue-50 dark:hover:bg-slate-700"
              onClick={() => setOpenCreateDialog(true)}
            >
              Start a post, {currentUser.name.split(' ')[1]}...
            </Button>
          </div>
          <div className="grid grid-cols-3 mt-3 gap-1">
            <Button 
              variant="ghost" 
              className="flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-50 dark:hover:bg-slate-700 py-2"
              onClick={handleMediaUpload}
            >
              <span className="material-icons text-blue-600 dark:text-blue-400 text-[20px]">image</span>
              <span>Media</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center justify-center gap-2 text-sm font-medium hover:bg-amber-50 dark:hover:bg-slate-700 py-2"
              onClick={handleExpertiseContribute}
            >
              <span className="material-icons text-amber-600 dark:text-amber-400 text-[20px]">lightbulb</span>
              <span>Expertise</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center justify-center gap-2 text-sm font-medium hover:bg-purple-50 dark:hover:bg-slate-700 py-2"
              onClick={handleWriteArticle}
            >
              <span className="material-icons text-purple-600 dark:text-purple-400 text-[20px]">edit_note</span>
              <span>Article</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts Display */}
      {posts.length > 0 && (
        <Card className="shadow-card mb-6">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Recent Posts</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {posts.slice(0, 3).map((post) => (
                <div key={post.id} className="border-b border-gray-200 dark:border-slate-700 pb-3 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium text-sm">
                      {currentUser.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm dark:text-white">{post.author}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {post.timestamp.toLocaleTimeString()}
                        </span>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm mb-1 dark:text-white">{post.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{post.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>👍 {post.likes}</span>
                        <span>💬 {post.comments}</span>
                        <span>🔄 Share</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Regular Post Dialog */}
      <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
          </DialogHeader>
          <div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right dark:text-slate-300">
                  Title
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter post title..."
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right dark:text-slate-300">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData?.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2 dark:text-slate-300">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="col-span-3 min-h-[150px]"
                  placeholder="Share your thoughts with the medical community..."
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setOpenCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                className="bg-primary text-white hover:bg-primary/90"
                onClick={handleCreatePost}
              >
                📤 Post
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Media Post Dialog */}
      <Dialog open={openMediaDialog} onOpenChange={setOpenMediaDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>📷 Share Media Post</DialogTitle>
          </DialogHeader>
          <div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="media-file" className="text-right dark:text-slate-300">
                  Media
                </Label>
                <Input
                  id="media-file"
                  type="file"
                  onChange={handleFileChange}
                  className="col-span-3"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="media-title" className="text-right dark:text-slate-300">
                  Title
                </Label>
                <Input
                  id="media-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                  placeholder="Describe your media..."
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="media-category" className="text-right dark:text-slate-300">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData?.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="media-content" className="text-right pt-2 dark:text-slate-300">
                  Caption
                </Label>
                <Textarea
                  id="media-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="col-span-3 min-h-[100px]"
                  placeholder="Add a caption to your media..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setOpenMediaDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleMediaPost}
              >
                📤 Share Media
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Expertise Dialog */}
      <Dialog open={openExpertiseDialog} onOpenChange={setOpenExpertiseDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>💡 Contribute Your Expertise</DialogTitle>
          </DialogHeader>
          <div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expertise-category" className="text-right dark:text-slate-300">
                  Area
                </Label>
                <Select value={expertiseCategory} onValueChange={setExpertiseCategory} required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select your area of expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData?.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="expertise-content" className="text-right pt-2 dark:text-slate-300">
                  Insight
                </Label>
                <Textarea
                  id="expertise-content"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  className="col-span-3 min-h-[150px]"
                  placeholder="Share your professional insight, best practices, or clinical experience..."
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setOpenExpertiseDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                className="bg-amber-600 text-white hover:bg-amber-700"
                onClick={handleExpertiseContribution}
              >
                🧠 Share Expertise
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Article Dialog */}
      <Dialog open={openArticleDialog} onOpenChange={setOpenArticleDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📝 Write Medical Article</DialogTitle>
          </DialogHeader>
          <div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="article-title" className="text-right dark:text-slate-300">
                  Title
                </Label>
                <Input
                  id="article-title"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter article title..."
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="article-category" className="text-right dark:text-slate-300">
                  Category
                </Label>
                <Select value={articleCategory} onValueChange={setArticleCategory} required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select article category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesData?.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="article-content" className="text-right pt-2 dark:text-slate-300">
                  Content
                </Label>
                <Textarea
                  id="article-content"
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  className="col-span-3 min-h-[250px]"
                  placeholder="Write your medical article content here. Include research findings, case studies, treatment protocols, or educational content..."
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setOpenArticleDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                className="bg-purple-600 text-white hover:bg-purple-700"
                onClick={handleArticleCreation}
              >
                📄 Publish Article
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostCreator;