"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"
import { Trash2, Minus, Plus } from "lucide-react"

export function CartButton() {
  const { cart, removeFromCart, updateQuantity } = useCart()
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 transition-all hover:scale-110 text-black">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#2874F0] text-white text-[10px] font-bold border-0">
              {cartCount}
            </Badge>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" />
            Shopping Cart
          </SheetTitle>
          <SheetDescription>
            {cartCount === 0 ? "Your cart is empty" : `${cartCount} item${cartCount === 1 ? '' : 's'} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col gap-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground opacity-50 mb-4" />
              <p className="text-muted-foreground">No items in cart yet</p>
              <p className="text-sm text-muted-foreground mt-2">Add some products to get started!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.name} className="flex gap-4 border-b pb-4">
                <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={`/${item.folder}/${item.image}`}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-primary">₹{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.name, Math.max(1, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-2xl text-primary">₹{cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Proceed to Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
