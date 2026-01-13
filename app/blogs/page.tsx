"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Calendar, Clock, User, Search, TrendingUp, Tag, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tech Gadgets Every Student Needs in 2026",
    excerpt:
      "Discover the must-have technology that will make your college life easier, more productive, and more enjoyable.",
    category: "Technology",
    author: "Alex Johnson",
    date: "Jan 3, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "How to Save Money While Shopping in College",
    excerpt: "Smart budgeting tips and tricks to maximize your student discounts and stretch your dollar further.",
    category: "Finance",
    author: "Sarah Martinez",
    date: "Dec 28, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3c?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: 3,
    title: "Best Study Accessories for Remote Learning",
    excerpt: "Transform your dorm room into the perfect study environment with these carefully selected accessories.",
    category: "Lifestyle",
    author: "Michael Chen",
    date: "Dec 25, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 4,
    title: "Understanding Student EMI Options: A Complete Guide",
    excerpt: "Everything you need to know about flexible payment plans and interest-free EMI for students.",
    category: "Finance",
    author: "Emily Rodriguez",
    date: "Dec 20, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "Top 5 Laptops for Computer Science Students",
    excerpt: "A comprehensive comparison of the best laptops for coding, development, and all your CS coursework.",
    category: "Technology",
    author: "David Park",
    date: "Dec 15, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: 6,
    title: "Campus Life Essentials: What to Buy First Semester",
    excerpt: "A first-year student's guide to the essential items that will make your transition to college smooth.",
    category: "Lifestyle",
    author: "Jessica Lee",
    date: "Dec 10, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop",
    featured: false,
  },
]

const categories = ["All", "Technology", "Finance", "Lifestyle", "Tips & Tricks"]

function BlogsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredPosts =
    selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  const featuredPost = blogPosts.find((post) => post.featured)

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <div
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 text-white border-primary/30">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Student Resources
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              <span className="text-blue-900 dark:text-white">Campus Life Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
              Tips, guides, and insights to help you make the most of your college experience and shopping decisions.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search articles..." className="pl-12 h-12 bg-card border-border shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-lg z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg whitespace-nowrap"
                    : "bg-transparent whitespace-nowrap"
                }
              >
                <Tag className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All" && featuredPost && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>
            <Card
              className={`group overflow-hidden border-primary/30 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto overflow-hidden bg-muted">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-r" />
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Button className="w-fit bg-gradient-to-r from-primary to-accent text-primary-foreground group/btn">
                    Read Article
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts
              .filter((post) => selectedCategory !== "All" || !post.featured)
              .map((post, index) => (
                <Card
                  key={post.id}
                  className={`group overflow-hidden border-border hover:border-primary/30 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 bg-transparent">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 shadow-xl max-w-3xl mx-auto">
            <div className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed max-w-xl mx-auto">
                Subscribe to our newsletter and get the latest student tips, product updates, and exclusive deals
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input placeholder="Enter your email" type="email" className="h-11 flex-1" />
                <Button className="bg-gradient-to-r from-primary to-accent text-primary-foreground h-11 px-6">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default function BlogsPage() {
  return (
    <Suspense fallback={null}>
      <BlogsPageContent />
    </Suspense>
  )
}
