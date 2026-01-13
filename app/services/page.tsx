"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ShoppingCart,
  Heart,
  Star,
  Laptop,
  Smartphone,
  BookOpen,
  Headphones,
  Package,
  HomeIcon,
  Filter,
  ChevronDown,
  CreditCard,
  Truck,
  RotateCcw,
  BadgePercent,
} from "lucide-react"

const products = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    category: "electronics",
    categoryName: "Electronics",
    price: 149999,
    originalPrice: 199999,
    discount: 25,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    badge: "Trending",
    inStock: true,
  },
  {
    id: 2,
    name: "Apple Watch Series 8",
    category: "accessories",
    categoryName: "Accessories",
    price: 39999,
    originalPrice: 49999,
    discount: 20,
    rating: 4.0,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop",
    badge: "Hot Deal",
    inStock: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "audio",
    categoryName: "Audio",
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    rating: 5.0,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 4,
    name: "Engineering Textbook Bundle",
    category: "books",
    categoryName: "Books",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=600&fit=crop",
    badge: "Student Pick",
    inStock: true,
  },
  {
    id: 5,
    name: "iPhone 14 Pro Max",
    category: "mobiles",
    categoryName: "Mobiles",
    price: 129999,
    originalPrice: 149999,
    discount: 13,
    rating: 5.0,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    badge: "Premium",
    inStock: true,
  },
  {
    id: 6,
    name: "Premium Student Backpack",
    category: "accessories",
    categoryName: "Accessories",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    rating: 4.0,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=600&fit=crop",
    badge: "Top Rated",
    inStock: true,
  },
  {
    id: 7,
    name: "Dell XPS 13 Laptop",
    category: "electronics",
    categoryName: "Electronics",
    price: 89999,
    originalPrice: 109999,
    discount: 18,
    rating: 4.5,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 8,
    name: "Samsung Galaxy S23",
    category: "mobiles",
    categoryName: "Mobiles",
    price: 74999,
    originalPrice: 89999,
    discount: 17,
    rating: 4.5,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop",
    badge: "New",
    inStock: true,
  },
  {
    id: 9,
    name: "Medical Study Guide Set",
    category: "books",
    categoryName: "Books",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    rating: 5.0,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop",
    badge: "Best Seller",
    inStock: true,
  },
]

const categories = [
  { id: "all", name: "All Products", icon: Package },
  { id: "electronics", name: "Electronics", icon: Laptop },
  { id: "mobiles", name: "Mobiles", icon: Smartphone },
  { id: "books", name: "Books", icon: BookOpen },
  { id: "audio", name: "Audio", icon: Headphones },
  { id: "accessories", name: "Accessories", icon: Package },
  { id: "home", name: "Home", icon: HomeIcon },
]

const serviceFeatures = [
  {
    icon: BadgePercent,
    title: "Student Discounts",
    description: "Up to 50% off with verified .edu email",
  },
  {
    icon: CreditCard,
    title: "Flexible EMI",
    description: "0% interest on orders above ₹5000",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On all campus orders above ₹500",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day return policy with free pickup",
  },
]

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

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
              <Package className="w-3.5 h-3.5 mr-1.5" />
              Premium Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              <span className="text-blue-900 dark:text-white">Explore Our Services</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Discover amazing products with exclusive student discounts, flexible payment options, and fast delivery
              right to your campus.
            </p>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className={`border-border hover:border-primary/30 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:w-64 flex-shrink-0">
              <Card className="sticky top-24 border-border">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="w-5 h-5 text-primary" />
                    <h2 className="font-semibold text-lg">Categories</h2>
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const Icon = category.icon
                      const isActive = selectedCategory === category.id
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{category.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {categories.find((c) => c.id === selectedCategory)?.name || "All Products"}
                  </h2>
                  <p className="text-sm text-muted-foreground">{filteredProducts.length} products available</p>
                </div>
                <Button variant="outline" className="gap-2 bg-transparent">
                  Sort By
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className={`group relative overflow-hidden border-border hover:border-primary/30 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {/* Product Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-accent text-accent-foreground shadow-lg">{product.badge}</Badge>
                    </div>

                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground shadow-lg"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>

                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden bg-muted">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Product Details */}
                    <div className="p-6">
                      <div className="mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {product.categoryName}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          ({product.rating}) · {product.reviews} reviews
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                        <Badge variant="secondary" className="ml-auto">
                          {product.discount}% OFF
                        </Badge>
                      </div>

                      {/* Add to Cart Button */}
                      <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>

                    {/* Hover Shimmer Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 animate-shimmer" />
                    </div>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 bg-transparent">
                  Load More Products
                  <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 shadow-xl">
            <div className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help Finding Something?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our student support team is here to help you find the perfect product for your needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg"
                >
                  <Link href="/feedback">Contact Support</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-border bg-transparent">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
