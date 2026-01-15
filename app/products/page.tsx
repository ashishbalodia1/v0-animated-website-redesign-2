"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Heart, Star, Search, Filter, ChevronDown, X, SlidersHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/CartContext"
import { useToast } from "@/hooks/use-toast"
import { productCategories } from "@/data/products"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: any, category: string) => {
    addToCart({ ...product, category })
    toast({
      title: "✓ Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleWishlist = (product: any, category: string) => {
    toggleWishlist({ ...product, category })
    const inWishlist = isInWishlist(product.name)
    toast({
      title: inWishlist ? "Removed from wishlist" : "❤️ Added to wishlist",
      description: inWishlist 
        ? `${product.name} has been removed from your wishlist.`
        : `${product.name} has been added to your wishlist.`,
    })
  }

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    )
  }

  const filteredCategories = useMemo(() => {
    return productCategories
      .filter(category => selectedCategory === "all" || category.name === selectedCategory)
      .map(category => ({
        ...category,
        products: category.products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
          const matchesRating = selectedRatings.length === 0 || selectedRatings.some(r => product.rating >= r)
          
          return matchesSearch && matchesPrice && matchesRating
        })
      }))
      .filter(category => category.products.length > 0)
  }, [searchQuery, selectedCategory, priceRange, selectedRatings])

  const allProducts = useMemo(() => {
    return filteredCategories.flatMap(cat => 
      cat.products.map(p => ({ ...p, category: cat.name, folder: cat.folder }))
    )
  }, [filteredCategories])

  const sortedProducts = useMemo(() => {
    const products = [...allProducts]
    if (sortBy === "price-low") return products.sort((a, b) => a.price - b.price)
    if (sortBy === "price-high") return products.sort((a, b) => b.price - a.price)
    if (sortBy === "rating") return products.sort((a, b) => b.rating - a.rating)
    if (sortBy === "name") return products.sort((a, b) => a.name.localeCompare(b.name))
    return products
  }, [allProducts, sortBy])

  const allProductsCount = productCategories.reduce((acc, cat) => acc + cat.products.length, 0)

  const clearFilters = () => {
    setSelectedCategory("all")
    setPriceRange([0, 5000])
    setSelectedRatings([])
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for Arduino, sensors, motors, displays..."
                className="pl-12 pr-4 h-12 text-base border-2 border-gray-200 focus:ring-2 focus:ring-[#2874F0] focus:border-[#2874F0] text-black placeholder:text-gray-400 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`lg:w-72 space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-32 bg-white border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold flex items-center gap-2 text-black">
                    <Filter className="h-5 w-5 text-[#2874F0]" />
                    Filters
                  </h2>
                  {(selectedCategory !== "all" || priceRange[0] !== 0 || priceRange[1] !== 5000 || selectedRatings.length > 0) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#2874F0] hover:bg-blue-50">
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm uppercase text-black">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                        selectedCategory === "all"
                          ? "bg-[#2874F0] text-white font-medium"
                          : "hover:bg-blue-50 text-black"
                      }`}
                    >
                      All Products
                      <Badge variant="secondary" className="ml-2 text-xs bg-gray-200 text-black">
                        {allProductsCount}
                      </Badge>
                    </button>
                    {productCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                          selectedCategory === category.name
                            ? "bg-[#2874F0] text-white font-medium"
                            : "hover:bg-blue-50 text-black"
                        }`}
                      >
                        <span className="block truncate">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 text-sm uppercase text-black">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      min={0}
                      max={5000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-black">₹{priceRange[0]}</span>
                      <span className="text-gray-600">to</span>
                      <span className="font-medium text-black">₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 text-sm uppercase text-black">Customer Ratings</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => toggleRating(rating)}
                        />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1 cursor-pointer text-black"
                        >
                          {rating}
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          & above
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-black">Electronics Components</h1>
                <p className="text-sm text-gray-700 mt-1">
                  Showing <span className="font-semibold text-black">{sortedProducts.length}</span> of {allProductsCount} products
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Sort: {sortBy === "popularity" ? "Popularity" : sortBy === "price-low" ? "Price: Low to High" : sortBy === "price-high" ? "Price: High to Low" : sortBy === "rating" ? "Rating" : "Name"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("popularity")}>
                    Popularity
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    Customer Rating
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>
                    Name (A-Z)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold mb-2 text-black">No products found</h3>
                <p className="text-gray-700 mb-4">Try adjusting your filters or search</p>
                <Button onClick={clearFilters} className="bg-[#2874F0] hover:bg-[#2366d1] text-white">Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedProducts.map((product, idx) => (
                  <Card key={idx} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-2 border-gray-200 hover:border-[#2874F0]/50 bg-white">
                    <CardHeader className="p-0 relative">
                      <div className="relative aspect-square bg-gradient-to-br from-background to-muted/20 overflow-hidden">
                        <Image
                          src={`/${product.folder}/${product.image}`}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <button
                          onClick={() => handleToggleWishlist(product, product.category)}
                          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all z-10 hover:scale-110 shadow-md"
                        >
                          <Heart
                            className={`h-5 w-5 transition-all ${
                              isInWishlist(product.name)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-700 hover:text-red-500"
                            }`}
                          />
                        </button>
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <Badge className="bg-[#2874F0] text-white border-0">
                            <Star className="h-3 w-3 fill-white mr-1" />
                            {product.rating}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs border-[#2874F0] text-[#2874F0]">
                        {product.category}
                      </Badge>
                      <h3 className="font-semibold text-base mb-2 line-clamp-2 min-h-[48px] text-black" title={product.name}>
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-2xl font-bold text-[#2874F0]">₹{product.price}</span>
                        <span className="text-sm text-gray-600 line-through">₹{Math.round(product.price * 1.3)}</span>
                        <span className="text-xs text-green-600 font-semibold">23% off</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 gap-2">
                      <Button 
                        onClick={() => handleAddToCart(product, product.category)}
                        className="flex-1 group/btn font-semibold bg-[#FF9F00] hover:bg-[#FF9F00]/90 text-white" 
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
