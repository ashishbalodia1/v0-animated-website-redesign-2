"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Calendar, Clock, User, Search, Heart, Share2, ArrowRight, Tag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Electronics Components Every Maker Needs",
    excerpt: "From Arduino boards to sensors, discover the essential components that will kickstart your electronics journey.",
    fullContent: `Starting with electronics can be overwhelming with so many components available. Here are the top 10 essential components every maker should have:

1. **Arduino UNO** - The perfect microcontroller board for beginners. Easy to program and has a huge community support.

2. **Breadboard** - Build circuits without soldering. Essential for prototyping and testing your ideas quickly.

3. **Jumper Wires** - Connect components on your breadboard. Get both male-to-male and male-to-female wires.

4. **Resistors** - Control current flow in circuits. Start with a variety pack from 220Ω to 10kΩ.

5. **LEDs** - Visual feedback for your projects. Red, green, and blue LEDs are must-haves.

6. **Push Buttons** - Add interactivity to projects. Simple tactile switches work great.

7. **DHT11 Sensor** - Measure temperature and humidity. Perfect for weather station projects.

8. **HC-SR04 Ultrasonic Sensor** - Measure distance accurately. Great for robotics and obstacle avoidance.

9. **Servo Motor** - Add movement to projects. Control angles precisely for robotic arms.

10. **Power Supply** - Reliable power is crucial. Get a 5V/12V adapter and battery packs.

With these components, you can build hundreds of different projects! Start with simple LED blinking and progress to complex IoT systems.`,
    category: "Electronics",
    author: "Rajesh Kumar",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    image: "/image 1.jpg",
    featured: true,
    likes: 234,
  },
  {
    id: 2,
    title: "IoT Projects with ESP32: A Complete Beginner's Guide",
    excerpt: "Learn how to build your first IoT project using ESP32. Connect sensors, control devices remotely, and create smart home solutions.",
    fullContent: `The ESP32 is a powerful microcontroller with built-in WiFi and Bluetooth, making it perfect for IoT projects.

**Getting Started:**
- Install Arduino IDE
- Add ESP32 board support
- Connect ESP32 to your computer
- Upload your first WiFi connection sketch

**Project Ideas:**
1. **Smart Temperature Monitor** - Read DHT22 sensor and send data to your phone
2. **WiFi Controlled LED** - Control lights from anywhere in your home
3. **Smart Doorbell** - Get notifications when someone rings the bell
4. **Weather Station** - Display real-time weather data on a webpage

**Key Features:**
- Dual-core processor (240MHz)
- Built-in WiFi and Bluetooth
- Low power consumption
- Multiple GPIO pins
- ADC and DAC support

The ESP32 opens up endless possibilities for IoT projects. Start simple and gradually build more complex systems!`,
    category: "IoT",
    author: "Priya Sharma",
    date: "Jan 8, 2026",
    readTime: "12 min read",
    image: "/image 2.jpg",
    featured: true,
    likes: 189,
  },
  {
    id: 3,
    title: "Arduino vs Raspberry Pi: Which One Should You Choose?",
    excerpt: "A detailed comparison of Arduino and Raspberry Pi platforms to help you decide which board is perfect for your next project.",
    fullContent: `Choosing between Arduino and Raspberry Pi depends on your project requirements.

**Arduino:**
- Best for: Real-time control, simple projects
- Pros: Low power, simple programming, real-time operations
- Cons: Limited processing power, no operating system
- Price: ₹899 (UNO)

**Raspberry Pi:**
- Best for: Complex computing, media projects
- Pros: Full computer, runs Linux, multiple languages
- Cons: Higher power consumption, not real-time
- Price: ₹4999 (Pi 4)

**When to use Arduino:**
- Robotics control
- Sensor reading
- Motor control
- Battery-powered projects

**When to use Raspberry Pi:**
- Media center
- Web server
- AI/ML projects
- Desktop replacement

Many makers use both in combination - Raspberry Pi for brain and Arduino for muscle control!`,
    category: "Comparison",
    author: "Amit Patel",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    image: "/macbook-air-laptop-silver.jpg",
    featured: false,
    likes: 156,
  },
  {
    id: 4,
    title: "Building a Weather Station with Sensors",
    excerpt: "Step-by-step guide to creating your own weather monitoring system with temperature, humidity, and pressure sensors.",
    fullContent: `Create a complete weather station that measures temperature, humidity, pressure, and more!

**Components Needed:**
- Arduino/ESP32
- DHT22 (Temperature & Humidity)
- BMP180 (Pressure)
- Rain sensor
- OLED display
- Enclosure

**Step 1: Hardware Setup**
Connect all sensors to your microcontroller using I2C or digital pins.

**Step 2: Software**
Install necessary libraries and write code to read sensor data.

**Step 3: Display**
Show real-time data on OLED screen or send to smartphone.

**Step 4: Data Logging**
Store readings on SD card or upload to cloud services.

**Advanced Features:**
- Weather forecasting
- Historical data graphs
- Alert notifications
- Solar power option

Build your own weather station and understand climate patterns in your area!`,
    category: "Projects",
    author: "Sneha Reddy",
    date: "Jan 3, 2026",
    readTime: "15 min read",
    image: "/ipad-pro-tablet-with-stylus.jpg",
    featured: false,
    likes: 142,
  },
  {
    id: 5,
    title: "Motor Control with L298N: Robotics Basics",
    excerpt: "Master motor control for robotics projects. Learn to drive DC motors, control speed, and build your first robot chassis.",
    fullContent: `The L298N motor driver is essential for robotics projects.

**Understanding L298N:**
- Dual H-Bridge driver
- Controls 2 DC motors or 1 stepper
- Up to 2A per channel
- 5-35V input voltage

**Wiring:**
1. Connect motor outputs to M1/M2
2. Connect Arduino pins to IN1-IN4
3. Connect power supply (7-12V)
4. Enable speed control with PWM

**Basic Control:**
- Forward: IN1=HIGH, IN2=LOW
- Reverse: IN1=LOW, IN2=HIGH
- Stop: Both LOW
- Speed: PWM on enable pins

**Robot Chassis:**
- Use BO motors (300 RPM)
- Add wheels with rubber tires
- Mount components on acrylic base
- Add sensors for autonomy

Start with basic remote control and progress to autonomous navigation!`,
    category: "Robotics",
    author: "Ananya Desai",
    date: "Dec 30, 2025",
    readTime: "9 min read",
    image: "/airpods-pro-white-wireless-earbuds.jpg",
    featured: false,
    likes: 167,
  },
]

const categories = ["All", "Electronics", "IoT", "Robotics", "Projects", "Comparison"]

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pt-20">
      {/* Hero Section */}
      <section className="py-12 border-b bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Electronics Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learn Electronics & IoT
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Tutorials, guides, and tips for makers, students, and hobbyists
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-12 pr-4 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b sticky top-16 bg-background/95 backdrop-blur-lg z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white whitespace-nowrap"
                  : "whitespace-nowrap"
                }
              >
                <Tag className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All" && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600">Featured</Badge>
              <h2 className="text-2xl font-bold">Top Article</h2>
            </div>
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden bg-muted">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4">
                    {blogPosts[0].category}
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-fit bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                        Read Full Article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={blogPosts[0].image}
                            alt={blogPosts[0].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <DialogTitle className="text-3xl">{blogPosts[0].title}</DialogTitle>
                        <DialogDescription className="flex items-center gap-4 text-sm pt-2">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {blogPosts[0].author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {blogPosts[0].date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {blogPosts[0].readTime}
                          </span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="prose prose-sm max-w-none mt-4 whitespace-pre-line">
                        {blogPosts[0].fullContent}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts
              .filter((post) => selectedCategory !== "All" || !post.featured)
              .map((post) => (
                <Dialog key={post.id}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <Badge className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="w-3.5 h-3.5" />
                          <span>{post.author}</span>
                        </div>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-primary">
                            Read More →
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </Card>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <DialogTitle className="text-3xl">{post.title}</DialogTitle>
                      <DialogDescription className="flex items-center gap-4 text-sm pt-2">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="prose prose-sm max-w-none mt-4 whitespace-pre-line">
                      {post.fullContent}
                    </div>
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                      <Button variant="outline" className="flex-1">
                        <Heart className="w-4 h-4 mr-2" />
                        Like ({post.likes})
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-background">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-primary/20">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Get the latest electronics tutorials and project ideas delivered to your inbox
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input placeholder="Enter your email" type="email" className="flex-1" />
                <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
