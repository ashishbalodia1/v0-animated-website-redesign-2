"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function CartButton() {
  const [cartCount, setCartCount] = useState(3)

  return (
    <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-all hover:scale-110">
      <ShoppingCart className="h-5 w-5" />
      {cartCount > 0 && (
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-primary to-accent text-[10px] font-bold border-0 animate-pulse">
          {cartCount}
        </Badge>
      )}
      <span className="sr-only">Shopping cart</span>
    </Button>
  )
}
