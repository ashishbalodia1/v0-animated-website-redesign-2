"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2, Clock, HeadphonesIcon } from "lucide-react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Helpingengineers24@gmail.com",
    link: "mailto:Helpingengineers24@gmail.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+91 7470578495",
    link: "tel:+917470578495",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Campus Plaza, University Ave",
    link: "#",
  },
  {
    icon: Clock,
    title: "Support Hours",
    description: "Mon-Fri: 9AM - 6PM",
    link: "#",
  },
]

const feedbackCategories = [
  "General Inquiry",
  "Product Question",
  "Order Issue",
  "Technical Support",
  "Partnership",
  "Other",
]

export default function FeedbackPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(feedbackCategories[0])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div
            className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-4 px-4 py-2 bg-[#2874F0] text-white border-0">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              <span className="text-[#2874F0]">We're Here to Help</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Have a question, suggestion, or need assistance? Our support team is ready to help you with
              anything you need.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <a
                  key={index}
                  href={method.link}
                  className={`block transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card className="group border-gray-200 hover:border-[#2874F0]/30 hover:scale-105 hover:shadow-xl transition-all duration-300 h-full bg-white">
                    <div className="p-6 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#2874F0] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-semibold text-base mb-2 text-black">{method.title}</h3>
                      <p className="text-sm text-gray-700 break-words">{method.description}</p>
                    </div>
                  </Card>
                </a>
              )
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feedback Form */}
            <Card className="border-border shadow-xl">
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                  <p className="text-muted-foreground">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" type="text" placeholder="John" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" type="text" placeholder="Doe" className="h-11" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="student@university.edu" className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {feedbackCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" type="text" placeholder="How can we help you?" className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-32 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </Card>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* FAQ Section */}
              <Card className="border-border shadow-lg">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <HeadphonesIcon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Quick Support</h3>
                      <p className="text-sm text-muted-foreground">Common questions answered</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        question: "How long does delivery take?",
                        answer: "Campus orders are typically delivered within 24-48 hours.",
                      },
                      {
                        question: "What payment methods do you accept?",
                        answer: "We accept all major cards, UPI, and offer EMI options.",
                      },
                      {
                        question: "How do I verify my student status?",
                        answer: "Use your .edu email address during registration.",
                      },
                    ].map((faq, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                      >
                        <h4 className="font-medium text-sm mb-1">{faq.question}</h4>
                        <p className="text-xs text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Response Time Card */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">Fast Response Time</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We typically respond to all inquiries within 2-4 hours during business hours.
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Average response: 2 hours
                  </Badge>
                </div>
              </Card>

              {/* Location Map Card */}
              <Card className="border-border shadow-lg overflow-hidden">
                <div className="h-48 bg-muted relative">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop"
                    alt="Campus location"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                    <div className="p-4">
                      <p className="text-sm font-medium text-foreground">Campus Plaza</p>
                      <p className="text-xs text-muted-foreground">University Avenue, Main Campus</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
