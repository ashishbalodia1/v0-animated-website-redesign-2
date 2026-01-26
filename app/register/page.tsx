"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { UserPlus, Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react"
import { register } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) {
      newErrors.name = "Name is required"
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address"
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
      })

      if (result.success) {
        toast({
          title: "Account Created Successfully",
          description: result.message || "Welcome to ElectronicsHub! Redirecting to login...",
        })

        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push("/login")
        }, 1500)
      } else {
        toast({
          title: "Registration Failed",
          description: result.message,
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20 flex items-center justify-center p-4 pb-20">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Info */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <Badge className="px-4 py-2 bg-[#2874F0] text-white border-0">
              <UserPlus className="w-4 h-4 mr-2" />
              Maker Registration
            </Badge>
            <h1 className="text-5xl font-bold leading-tight">
              <span className="text-[#2874F0]">
                Join ElectronicsHub
              </span>
              <br />
              <span className="text-foreground">Today!</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Get access to quality components, competitive prices, and fast delivery for all your projects.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: CheckCircle2, text: "Quality electronics components" },
              { icon: CheckCircle2, text: "Competitive prices on all products" },
              { icon: CheckCircle2, text: "Fast delivery across India" },
              { icon: CheckCircle2, text: "7-day easy return policy" },
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#2874F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <benefit.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-muted-foreground">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200">
            <p className="text-sm text-muted-foreground mb-2">Trusted by makers from</p>
            <div className="flex items-center gap-4 flex-wrap">
              <Badge className="bg-[#2874F0] text-white border-0">1000+ Makers</Badge>
              <Badge className="bg-[#2874F0] text-white border-0">100+ Colleges</Badge>
              <Badge className="bg-[#2874F0] text-white border-0">4.8★ Rating</Badge>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="shadow-xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#2874F0] flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Create Account</h2>
              <p className="text-gray-600">Sign up to start shopping</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-11 h-11 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-11 h-11 bg-white text-black placeholder:text-gray-400 border-gray-300 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`pl-11 h-11 bg-white text-black placeholder:text-gray-400 border-gray-300 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-11 pr-11 h-11 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pl-11 pr-11 h-11 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-[#2874F0] focus:ring-[#2874F0]"
                    disabled={isLoading}
                  />
                  <Label htmlFor="agree" className="text-sm text-gray-600 font-normal cursor-pointer">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#2874F0] hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-[#2874F0] hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.agree && (
                  <p className="text-sm text-red-500 mt-1">{errors.agree}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 bg-[#2874F0] text-white hover:bg-[#2366d1] transition-all font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-[#2874F0] hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
