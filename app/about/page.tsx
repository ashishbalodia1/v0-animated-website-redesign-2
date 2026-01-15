"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Target, Award, Zap, Heart, Shield, TrendingUp, Globe, ChevronRight, ShoppingBag } from "lucide-react"

const teamMembers = [
  {
    name: "Alex Thompson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Computer Science major passionate about creating solutions for students",
  },
  {
    name: "Sarah Chen",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-14947901681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Business student dedicated to streamlining campus logistics",
  },
  {
    name: "Michael Rodriguez",
    role: "Tech Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Engineering student building scalable marketplace solutions",
  },
  {
    name: "Emily Johnson",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Communications major connecting students with great deals",
  },
]

const values = [
  {
    icon: Users,
    title: "Student-First",
    description: "Every decision we make prioritizes the needs and budgets of students.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Secure payments, verified products, and reliable delivery you can count on.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "Built by students, for students, with feedback from our campus community.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "Constantly improving our platform with the latest technology and features.",
  },
]

const stats = [
  { icon: Users, value: "50,000+", label: "Active Students" },
  { icon: ShoppingBag, value: "10,000+", label: "Products Listed" },
  { icon: Globe, value: "100+", label: "Campus Partners" },
  { icon: Award, value: "4.8/5", label: "Customer Rating" },
]

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-6 px-4 py-2 bg-[#2874F0] text-white border-0">
              <Target className="w-3.5 h-3.5 mr-1.5" />
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              <span className="text-[#2874F0]">Your Trusted Partner,</span>
              <br />
              <span className="text-gray-900">For Electronics</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We started with a simple goal: provide quality electronics components to makers, hobbyists, and students 
              at competitive prices with fast delivery across India.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className={`text-center transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#2874F0] flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#2874F0] mb-2">{stat.value}</div>
                  <div className="text-sm text-black font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="text-primary">Mission</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  We believe every student deserves access to quality products at prices they can afford. Our mission is
                  to make campus shopping easier, more affordable, and more convenient than ever before.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  From textbooks to tech, dorm essentials to daily necessities, we're here to support students
                  throughout their entire college journey with exclusive discounts, flexible payment options, and
                  lightning-fast delivery.
                </p>
                <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  <Link href="/services">
                    Explore Our Services
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div
                className={`transition-all duration-1000 delay-300 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <Card className="overflow-hidden border-border shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
                    alt="Students collaborating"
                    className="w-full h-full object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
              Our <span className="text-[#2874F0]">Values</span>
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className={`group border-border hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The passionate students behind CampusCart</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className={`group overflow-hidden border-border hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/10 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 shadow-2xl max-w-4xl mx-auto">
            <div className="p-12 md:p-16 text-center">
              <Zap className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Community</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Be part of the student marketplace revolution. Start saving money and shopping smarter today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg h-12 px-8"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-border bg-transparent h-12 px-8">
                  <Link href="/feedback">Contact Us</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
