"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBag, User } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartButton } from "@/components/cart-button"
import { WishlistButton } from "@/components/wishlist-button"
import { NotificationsButton } from "@/components/notifications-button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/feedback", label: "Feedback" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg" : "bg-white/90 backdrop-blur-md border-b border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
            <div className="w-10 h-10 bg-[#2874F0] rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#2874F0]">
              ElectronicsHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-all hover:text-[#2874F0] relative group ${
                  pathname === link.href ? "text-[#2874F0]" : "text-black"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2874F0] transition-all group-hover:w-full ${
                    pathname === link.href ? "w-full" : ""
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <NotificationsButton />
            <WishlistButton />
            <CartButton />
            <Button variant="ghost" size="icon" className="hover:bg-blue-50 transition-all hover:scale-110 text-black">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" asChild className="hover:bg-blue-50 text-black font-semibold">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-[#2874F0] hover:bg-[#2366d1] text-white transition-all shadow-lg hover:shadow-blue-500/50 font-semibold"
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-black hover:text-[#2874F0] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex items-center justify-around px-4 pb-4 border-b border-gray-200">
              <ThemeToggle />
              <NotificationsButton />
              <WishlistButton />
              <CartButton />
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 text-black">
                <User className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:bg-blue-50 ${
                    pathname === link.href ? "text-[#2874F0] bg-blue-50" : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-2 border-t border-gray-200">
                <Button variant="outline" asChild className="w-full bg-white text-black border-gray-300 font-semibold">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="w-full bg-[#2874F0] hover:bg-[#2366d1] text-white font-semibold">
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
