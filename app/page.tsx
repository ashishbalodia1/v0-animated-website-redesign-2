"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Sparkles,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Star,
  Search,
  ChevronRight,
  Package,
  Smartphone,
  BookOpen,
  Laptop,
  Headphones,
  HomeIcon,
  Award,
  Heart,
  ShoppingCart,
  Flame,
  Eye,
} from "lucide-react"

const categories = [
  { name: "Microcontrollers", icon: Laptop, color: "from-blue-600 to-blue-700", href: "/products" },
  { name: "Sensors", icon: Smartphone, color: "from-purple-600 to-purple-700", href: "/products" },
  { name: "Motor Drivers", icon: Package, color: "from-orange-600 to-orange-700", href: "/products" },
  { name: "Displays", icon: Eye, color: "from-green-600 to-green-700", href: "/products" },
  { name: "Power Supply", icon: Zap, color: "from-yellow-600 to-yellow-700", href: "/products" },
  { name: "Communication", icon: Smartphone, color: "from-indigo-600 to-indigo-700", href: "/products" },
]

const trendingProducts = [
  {
    id: 1,
    name: "Arduino UNO R3",
    price: 899,
    originalPrice: 1299,
    image: "/1. Microcontrollers & Development Boards/Arduino UNO.png",
    rating: 4.8,
    reviews: 234,
    discount: 31,
    trending: true,
    likes: 1289,
  },
  {
    id: 2,
    name: "ESP32 DevKit",
    price: 699,
    originalPrice: 999,
    image: "/1. Microcontrollers & Development Boards/ESP32.png",
    rating: 4.9,
    reviews: 567,
    discount: 30,
    trending: true,
    likes: 2341,
  },
  {
    id: 3,
    name: "DHT22 Sensor",
    price: 249,
    originalPrice: 399,
    image: "/2. Sensors/DHT22.png",
    rating: 4.7,
    reviews: 189,
    discount: 38,
    hot: true,
    likes: 987,
  },
  {
    id: 4,
    name: "L298N Motor Driver",
    price: 249,
    originalPrice: 349,
    image: "/3. Motor Drivers, wheels & Power Control/L298N Motor Driver.jpg",
    rating: 4.9,
    reviews: 423,
    discount: 29,
    trending: true,
    likes: 1567,
  },
]

const features = [
  {
    icon: Zap,
    title: "Fast Shipping",
    description: "Quick delivery of electronics components across India",
  },
  {
    icon: Shield,
    title: "Genuine Products",
    description: "100% authentic components with quality assurance",
  },
  {
    icon: Clock,
    title: "Easy Returns",
    description: "7-day return policy for defective products",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description: "Competitive prices on all electronics components",
  },
]

const stats = [
  { value: "120+", label: "Products" },
  { value: "9", label: "Categories" },
  { value: "500+", label: "Happy Makers" },
  { value: "4.8/5", label: "Rating" },
]

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{background: 'linear-gradient(135deg, #2874F0 0%, #1557B0 100%)'}}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all shadow-lg">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Electronics Components Store
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
              <span className="text-white">Your Complete</span>
              <br />
              <span className="text-yellow-300">
                Electronics Hub
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
              Arduino, Raspberry Pi, Sensors, and everything you need for your electronics projects. 
              Quality components at great prices.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto bg-white text-[#2874F0] hover:bg-yellow-300 hover:text-[#2874F0] hover:shadow-xl transition-all duration-300 group h-12 px-8 font-semibold"
              >
                <Link href="/products">
                  Shop Now
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm h-12 px-8 font-semibold"
              >
                <Link href="/blogs">Read Blogs</Link>
              </Button>
            </div>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for Arduino, sensors, modules..."
                className="pl-12 h-14 bg-white border-0 shadow-2xl focus:ring-2 focus:ring-yellow-300 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl opacity-20 animate-float" />
        <div
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-8 h-8 text-orange-500" />
                <h2 className="text-3xl md:text-5xl font-bold">
                  <span className="text-primary">Trending</span> Now
                </h2>
              </div>
              <p className="text-muted-foreground text-lg">Most popular products this week</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex">
              <Link href="/services">
                View All
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`group relative overflow-hidden border-border hover:border-primary/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                  {product.discount && (
                    <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 font-bold">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  {product.trending && (
                    <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  {product.hot && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                      <Flame className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-9 h-9 rounded-full bg-background/90 hover:bg-background backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-9 h-9 rounded-full bg-background/90 hover:bg-background backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 group-hover:shadow-lg transition-all"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>

                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                    <Heart className="w-3 h-3" />
                    <span>{product.likes.toLocaleString()} likes</span>
                  </div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/services">
                View All Products
                <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Shop by <span className="text-primary">Category</span>
            </h2>
            <p className="text-muted-foreground text-lg">Find exactly what you need for your campus life</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Link key={category.name} href={category.href}>
                  <Card
                    className={`group relative overflow-hidden border-border hover:border-primary/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="p-6 flex flex-col items-center text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm">{category.name}</h3>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-primary">CampusCart</span>
            </h2>
            <p className="text-muted-foreground text-lg">Built with students in mind</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className={`group relative overflow-hidden border-border hover:border-primary/30 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-6 text-center relative z-10">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by <span className="text-primary">Students</span>
            </h2>
            <p className="text-muted-foreground text-lg">See what our community has to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Computer Science, Year 3",
                content:
                  "CampusCart saved me so much money on textbooks this semester. The student discounts are incredible!",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Engineering, Year 2",
                content: "Fast delivery and great quality products. Got my laptop within 24 hours. Highly recommended!",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Business Admin, Year 4",
                content: "The EMI options made it so easy to get the tech I needed for my projects. Game changer!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`group border-border hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="border-primary/20 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
            <div className="p-12 md:p-16 text-center relative z-10">
              <Award className="w-16 h-16 mx-auto mb-6 text-white" />
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance text-white">Ready to Start Shopping?</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students who save money every day with exclusive deals, flexible payment options, and
                fast delivery.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 h-12 px-8"
                >
                  <Link href="/register">
                    Create Account
                    <Sparkles className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto border-border hover:bg-muted h-12 px-8 bg-transparent"
                >
                  <Link href="/services">Browse Products</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Floating Background Elements */}
        <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full blur-3xl opacity-20 animate-float" />
        <div
          className="absolute bottom-10 right-20 w-40 h-40 bg-gradient-to-br from-accent to-primary rounded-full blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </section>
    </div>
  )
}
