"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { UserPlus, Mail, Lock, User, GraduationCap, Building2, Eye, EyeOff, CheckCircle2 } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen bg-white pt-20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Info */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <Badge className="px-4 py-2 bg-[#2874F0] text-white border-0">
              <GraduationCap className="w-4 h-4 mr-2" />
              Maker Registration
            </Badge>
            <h1 className="text-5xl font-bold leading-tight">
              <span className="text-[#2874F0]">
                Join ElectronicsHub
              </span>
              <br />
              <span className="text-gray-900">Today!</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
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
                <p className="text-gray-700">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Trusted by makers from</p>
            <div className="flex items-center gap-4 flex-wrap">
              <Badge className="bg-[#2874F0] text-white border-0">1000+ Makers</Badge>
              <Badge className="bg-[#2874F0] text-white border-0">100+ Colleges</Badge>
              <Badge className="bg-[#2874F0] text-white border-0">4.8★ Rating</Badge>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card className="border-gray-200 shadow-xl bg-white">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#2874F0] flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Create Account</h2>
              <p className="text-gray-600">Sign up to start shopping</p>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="fullName" type="text" placeholder="John Doe" className="pl-11 h-11" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Student Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="student@university.edu" className="pl-11 h-11" />
                </div>
                <p className="text-xs text-muted-foreground">Use your .edu email for verification</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="college">College/University</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="college" type="text" placeholder="Your College Name" className="pl-11 h-11" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-11 pr-11 h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="pl-11 pr-11 h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal cursor-pointer">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
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
