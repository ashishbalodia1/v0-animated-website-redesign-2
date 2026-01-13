"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function WishlistButton() {
  const [wishlistCount, setWishlistCount] = useState(5)

  return (
    <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-all hover:scale-110">
      <Heart className="h-5 w-5" />
      {wishlistCount > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-red-500 text-[10px] font-bold border-0">
          {wishlistCount}
        </Badge>
      )}
      <span className="sr-only">Wishlist</span>
    </Button>
  )
}
