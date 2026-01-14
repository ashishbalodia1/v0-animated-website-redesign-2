"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Calendar, Clock, User, Search, TrendingUp, Tag, ArrowRight, Heart, Share2 } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Electronics Components Every Maker Needs",
    excerpt:
      "From Arduino boards to sensors, discover the essential components that will kickstart your electronics journey and help you build amazing projects.",
    category: "Electronics",
    author: "Rajesh Kumar",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    image: "/image 1.jpg",
    featured: true,
    likes: 234,
  },
  {
    id: 2,
    title: "IoT Projects with ESP32: A Complete Beginner's Guide",
    excerpt: "Learn how to build your first IoT project using ESP32. Connect sensors, control devices remotely, and create smart home solutions easily.",
    category: "IoT",
    author: "Priya Sharma",
    date: "Jan 8, 2026",
    readTime: "12 min read",
    image: "/image 2.jpg",
    featured: true,
    likes: 189,
  },
  {
    id: 3,
    title: "Arduino vs Raspberry Pi: Which One Should You Choose?",
    excerpt: "A detailed comparison of Arduino and Raspberry Pi platforms to help you decide which microcontroller board is perfect for your next project.",
    category: "Comparison",
    author: "Amit Patel",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    image: "/macbook-air-laptop-silver.jpg",
    featured: false,
    likes: 156,
  },
  {
    id: 4,
    title: "Building a Weather Station with Sensors",
    excerpt: "Step-by-step guide to creating your own weather monitoring system using temperature, humidity, and pressure sensors with real-time data display.",
    category: "Projects",
    author: "Sneha Reddy",
    date: "Jan 3, 2026",
    readTime: "15 min read",
    image: "/ipad-pro-tablet-with-stylus.jpg",
    featured: false,
    likes: 142,
  },
  {
    id: 5,
    title: "3D Printing for Electronics: Enclosures and Custom Parts",
    excerpt: "Learn how to design and print custom enclosures for your electronics projects. Perfect housings for Arduino, Raspberry Pi, and more.",
    category: "3D Printing",
    author: "Vikram Singh",
    date: "Jan 2, 2026",
    readTime: "11 min read",
    image: "/sony-premium-headphones-black.jpg",
    featured: false,
    likes: 98,
  },
  {
    id: 6,
    title: "Motor Control with L298N: Robotics Basics",
    excerpt: "Master motor control for robotics projects. Learn to drive DC motors, control speed, and build your first robot chassis.",
    category: "Robotics",
    author: "Ananya Desai",
    date: "Dec 30, 2025",
    readTime: "9 min read",
    image: "/airpods-pro-white-wireless-earbuds.jpg",
    featured: false,
    likes: 167,
  },
  {
    id: 7,
    title: "Understanding I2C and SPI Communication Protocols",
    excerpt: "Deep dive into serial communication protocols. Learn when to use I2C vs SPI and how to connect multiple sensors to your microcontroller.",
    category: "Electronics",
    author: "Karan Malhotra",
    date: "Dec 28, 2025",
    readTime: "14 min read",
    image: "/image 1.jpg",
    featured: false,
    likes: 203,
  },
  {
    id: 8,
    title: "Best Power Supply Solutions for Your Projects",
    excerpt: "Choose the right power supply for your electronics. From batteries to buck converters, ensure stable power for reliable operation.",
    category: "Power",
    author: "Meera Joshi",
    date: "Dec 25, 2025",
    readTime: "7 min read",
    image: "/image 2.jpg",
    featured: false,
    likes: 121,
  },
]

const categories = ["All", "Electronics", "IoT", "Robotics", "Projects", "3D Printing", "Power", "Comparison"]

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
                  <Image
                    src={featuredPost.image || "/placeholder.jpg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-r" />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">Featured</Badge>
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
                  <Image
                    src={post.image || "/placeholder.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge variant="secondary" className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-pink-500">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-muted-foreground">{post.likes}</span>
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
