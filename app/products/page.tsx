"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Star, Search, Filter, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Product categories with their items
const productCategories = [
  {
    id: 1,
    name: "Microcontrollers & Development Boards",
    folder: "1. Microcontrollers & Development Boards",
    products: [
      { name: "Arduino UNO", image: "Arduino UNO.png", price: 899, rating: 4.5, description: "ATmega328P based microcontroller board, perfect for beginners" },
      { name: "Arduino NANO", image: "Arduino NANO.png", price: 599, rating: 4.6, description: "Compact Arduino board with ATmega328P, ideal for small projects" },
      { name: "Arduino MEGA", image: "Arduino MEGA.png", price: 1299, rating: 4.4, description: "ATmega2560 based board with 54 digital I/O pins" },
      { name: "ESP32", image: "ESP32.png", price: 699, rating: 4.7, description: "Dual-core WiFi & Bluetooth enabled microcontroller" },
      { name: "ESP8266 NodeMCU", image: "ESP8266 (NodeMCU).png", price: 449, rating: 4.5, description: "WiFi enabled development board for IoT projects" },
      { name: "Raspberry Pi 4", image: "Raspberry Pi 4.png", price: 4999, rating: 4.8, description: "Quad-core 64-bit ARM processor, up to 8GB RAM" },
      { name: "Raspberry Pi Pico", image: "Raspberry Pi Pico.png", price: 399, rating: 4.6, description: "RP2040 microcontroller board, dual-core ARM Cortex-M0+" },
      { name: "Raspberry Pi Zero", image: "Raspberry Pi Zero.png", price: 899, rating: 4.5, description: "Ultra-small single-core Linux computer" },
      { name: "Teensy 4.0", image: "Teensy 4.0.png", price: 2499, rating: 4.7, description: "600MHz ARM Cortex-M7 microcontroller" },
      { name: "ATmega328P", image: "ATmega328P.png", price: 199, rating: 4.3, description: "8-bit AVR microcontroller chip" },
      { name: "ATtiny85", image: "ATtiny85.png", price: 99, rating: 4.4, description: "Tiny 8-bit AVR microcontroller for minimal projects" },
    ]
  },
  {
    id: 2,
    name: "Sensors",
    folder: "2. Sensors",
    products: [
      { name: "DHT11", image: "DHT11.png", price: 99, rating: 4.2, description: "Temperature & humidity sensor, ±2°C accuracy" },
      { name: "DHT22", image: "DHT22.png", price: 249, rating: 4.5, description: "High precision temperature & humidity sensor" },
      { name: "HC-SR04", image: "HC-SR04.png", price: 79, rating: 4.6, description: "Ultrasonic distance sensor, 2cm-400cm range" },
      { name: "MPU6050", image: "MPU6050.png", price: 299, rating: 4.7, description: "6-axis gyroscope & accelerometer module" },
      { name: "PIR Motion Sensor", image: "PIR Motion Sensor.png", price: 89, rating: 4.3, description: "Passive infrared motion detection sensor" },
      { name: "MQ-2 Gas Sensor", image: "MQ 2.png", price: 149, rating: 4.4, description: "Detects LPG, smoke, alcohol, propane, hydrogen" },
      { name: "MQ135 Air Quality", image: "MQ135.png", price: 179, rating: 4.3, description: "Air quality sensor for CO2, NH3, benzene" },
      { name: "IR Proximity Sensor", image: "IR Proximity Sensor.png", price: 59, rating: 4.2, description: "Infrared obstacle detection sensor" },
      { name: "DS18B20", image: "DS18B20.png", price: 149, rating: 4.5, description: "Digital temperature sensor with 1-Wire interface" },
      { name: "LM35", image: "LM35.png", price: 89, rating: 4.3, description: "Precision analog temperature sensor" },
      { name: "BMP180", image: "BMP180.png", price: 249, rating: 4.4, description: "Barometric pressure & temperature sensor" },
      { name: "Soil Moisture Sensor", image: "soil moisture sensor.png", price: 69, rating: 4.2, description: "Measures soil moisture content" },
      { name: "Rain Sensor", image: "Rain sensor.png", price: 79, rating: 4.1, description: "Detects rain and water level" },
      { name: "Sound Sensor", image: "Sound Sensor.png", price: 99, rating: 4.3, description: "Microphone sound detection module" },
      { name: "GPS NEO-6M", image: "GPS NEO-6M.png", price: 899, rating: 4.6, description: "GPS module with antenna for location tracking" },
      { name: "Load Cell HX711", image: "Load Cell (HX711).png", price: 349, rating: 4.5, description: "Weight sensor with HX711 amplifier" },
      { name: "Hall Effect Sensor", image: "Hall Effect Sensor.png", price: 49, rating: 4.2, description: "Magnetic field detection sensor" },
      { name: "Capacitive Touch Sensor", image: "Capacitive Touch Sensor.png", price: 79, rating: 4.3, description: "Touch-sensitive button module" },
      { name: "BH1750 Light Sensor", image: "BH1750 Light Sensor.png", price: 149, rating: 4.4, description: "Digital light intensity sensor" },
      { name: "ACS712 Current Sensor", image: "ACS712 Current Sensor.png", price: 199, rating: 4.5, description: "AC/DC current measurement sensor" },
      { name: "Voltage Sensor", image: "Voltage Sensor Module.png", price: 79, rating: 4.2, description: "DC voltage measurement module 0-25V" },
      { name: "Rotary Encoder", image: "Rotary Encoder.png", price: 99, rating: 4.4, description: "Rotary encoder for position/speed sensing" },
      { name: "Pulse Sensor", image: "Pulse Sensor.png", price: 399, rating: 4.5, description: "Heart rate & pulse detection sensor" },
    ]
  },
  {
    id: 3,
    name: "Motor Drivers & Power Control",
    folder: "3. Motor Drivers, wheels & Power Control",
    products: [
      { name: "L298N Motor Driver", image: "L298N Motor Driver.jpg", price: 249, rating: 4.6, description: "Dual H-Bridge motor driver, up to 2A per channel" },
      { name: "L293D Motor Driver", image: "L293D Motor Driver.jpg", price: 99, rating: 4.3, description: "Quad half H-Bridge motor driver IC" },
      { name: "A4988 Stepper Driver", image: "A4988.jpg", price: 199, rating: 4.5, description: "Stepper motor driver with microstepping" },
      { name: "DRV8825 Stepper Driver", image: "DRV8825.jpg", price: 249, rating: 4.6, description: "High current stepper motor driver" },
      { name: "MG996R Servo", image: "MG996R Servo.jpg", price: 349, rating: 4.5, description: "Metal gear high torque servo motor" },
      { name: "BO Motor", image: "bo motor.jpg", price: 149, rating: 4.2, description: "DC geared motor for robotics" },
      { name: "BO Gear Motor", image: "bo gear moto.jpg", price: 179, rating: 4.3, description: "High torque DC gear motor" },
      { name: "Brushless Motor", image: "Avian Brushless Motor 14-Pole.jpg", price: 1299, rating: 4.7, description: "14-pole brushless motor for drones" },
      { name: "ESC Speed Controller", image: "ESCs.jpg", price: 599, rating: 4.5, description: "Electronic speed controller for brushless motors" },
      { name: "Balance Charger", image: "Balance Charger.jpg", price: 1499, rating: 4.6, description: "LiPo battery balance charger" },
      { name: "Heat Shrink Tubing", image: "Heat shrink tubing.jpg", price: 99, rating: 4.4, description: "Assorted heat shrink tubes" },
      { name: "Hinges", image: "hinges.jpg", price: 49, rating: 4.1, description: "Small hinges for DIY projects" },
    ]
  },
  {
    id: 4,
    name: "Power & Batteries",
    folder: "4. Power & Batteries",
    products: [
      { name: "18650 Li-ion Battery", image: "18650 Li-ion Battery.png", price: 249, rating: 4.5, description: "3.7V rechargeable lithium-ion battery" },
      { name: "LiPo Battery", image: "LiPo Battery.png", price: 899, rating: 4.6, description: "Lithium polymer battery for RC projects" },
      { name: "Battery Holder", image: "Battery Holder.png", price: 29, rating: 4.2, description: "AA/AAA battery holder case" },
      { name: "7805 Voltage Regulator", image: "7805 Regulator.jpg", price: 19, rating: 4.4, description: "5V fixed voltage regulator IC" },
      { name: "AMS1117 Regulator", image: "AMS1117.png", price: 29, rating: 4.3, description: "Low dropout voltage regulator" },
      { name: "LM2596 Buck Converter", image: "LM2596 Buck Converter.jpg", price: 149, rating: 4.6, description: "Step-down DC-DC converter module" },
      { name: "MT3608 Boost Converter", image: "MT3608 Boost Converter.png", price: 89, rating: 4.5, description: "Step-up DC-DC converter 2-28V" },
      { name: "DC Barrel Jack", image: "DC Barrel Jack.png", price: 19, rating: 4.2, description: "Standard DC power connector" },
      { name: "USB Power Module", image: "USB Power Module.png", price: 49, rating: 4.3, description: "USB to breadboard power supply" },
      { name: "Power Bank Module", image: "Power Bank Module.png", price: 199, rating: 4.4, description: "DIY power bank circuit board" },
      { name: "12V Adapter", image: "12v adaptor.jpg", price: 299, rating: 4.5, description: "12V 2A AC to DC power adapter" },
    ]
  },
  {
    id: 5,
    name: "Displays & Indicators",
    folder: "5. Displays & Indicators",
    products: [
      { name: "16x2 LCD Display", image: "16x2 LCD.jpg", price: 199, rating: 4.4, description: "16 character x 2 line LCD with I2C" },
      { name: "20x4 LCD Display", image: "20x4 LCD.jpg", price: 349, rating: 4.5, description: "20 character x 4 line LCD module" },
      { name: "OLED Display", image: "OLED Display.jpg", price: 399, rating: 4.7, description: "0.96\" 128x64 I2C OLED display" },
      { name: "TFT LCD Screen", image: "TFT LCD.jpg", price: 899, rating: 4.6, description: "2.4\" TFT LCD color touchscreen" },
      { name: "7-Segment Display", image: "7-Segment Display.jpg", price: 49, rating: 4.3, description: "4-digit 7-segment LED display" },
      { name: "RGB LED", image: "RGB LED.jpg", price: 19, rating: 4.4, description: "Common cathode RGB LED" },
      { name: "Single LED", image: "Single LED.jpg", price: 5, rating: 4.2, description: "5mm LED - multiple colors available" },
      { name: "Buzzer", image: "Buzzer.jpg", price: 29, rating: 4.3, description: "Active/passive piezo buzzer" },
    ]
  },
  {
    id: 6,
    name: "Communication Modules",
    folder: "6. Communication Modules",
    products: [
      { name: "Bluetooth HC-06", image: "Bluetooth HC-06.jpg", price: 349, rating: 4.5, description: "Bluetooth 2.0 serial communication module" },
      { name: "ESP-01 WiFi", image: "ESP-01.jpg", price: 249, rating: 4.4, description: "ESP8266 WiFi module" },
      { name: "NRF24L01", image: "NRF24L01.png", price: 199, rating: 4.6, description: "2.4GHz wireless transceiver module" },
      { name: "433MHz RF TX", image: "433 MHz RF TX.jpg", price: 99, rating: 4.2, description: "433MHz radio frequency transmitter" },
      { name: "433MHz RF RX", image: "433 MHz RF RX.jpg", price: 99, rating: 4.2, description: "433MHz radio frequency receiver" },
      { name: "SIM800L GSM", image: "SIM800L GSM.jpg", price: 599, rating: 4.5, description: "GSM/GPRS module for SMS & calls" },
      { name: "LoRa SX1278", image: "LoRa SX1278.jpg", price: 899, rating: 4.6, description: "Long range wireless communication module" },
      { name: "ENC28J60 Ethernet", image: "ENC28J60 Ethernet.jpg", price: 349, rating: 4.3, description: "Ethernet network module" },
      { name: "MCP2515 CAN", image: "MCP2515 CAN.jpg", price: 449, rating: 4.5, description: "CAN bus communication module" },
    ]
  },
  {
    id: 7,
    name: "Basic Electronic Components",
    folder: "7. Basic Electronic Components",
    products: [
      { name: "Breadboard", image: "Breadboard.jpg", price: 99, rating: 4.6, description: "830-point solderless breadboard" },
      { name: "Perfboard", image: "Perfboard.jpg", price: 49, rating: 4.4, description: "Universal PCB prototype board" },
      { name: "Jumper Wires", image: "jumper wire.jpg", price: 79, rating: 4.5, description: "65pcs male-to-male jumper wire set" },
      { name: "Resistors Pack", image: "Resistors.jpg", price: 99, rating: 4.3, description: "1/4W resistor assortment kit" },
      { name: "Ceramic Capacitors", image: "Ceramic Capacitors.jpg", price: 79, rating: 4.2, description: "Assorted ceramic capacitor kit" },
      { name: "Electrolytic Capacitors", image: "Electrolytic Capacitors .jpg", price: 99, rating: 4.3, description: "Polarized capacitor assortment" },
      { name: "Push Button", image: "Push Button .jpg", price: 9, rating: 4.4, description: "Tactile push button switch" },
      { name: "Slide Switch", image: "Slide Switch .jpg", price: 19, rating: 4.2, description: "SPDT slide switch" },
      { name: "Potentiometer", image: "Potentiometer .jpg", price: 29, rating: 4.3, description: "10K variable resistor" },
      { name: "1N4007 Diode", image: "1N4007 Diode .jpg", price: 5, rating: 4.2, description: "1A rectifier diode" },
      { name: "Zener Diode", image: "Zener Diode .jpg", price: 9, rating: 4.1, description: "Voltage regulator diode" },
      { name: "BC547 Transistor", image: "BC547 .jpg", price: 5, rating: 4.3, description: "NPN switching transistor" },
      { name: "2N2222 Transistor", image: "2N2222.jpg", price: 9, rating: 4.2, description: "NPN general purpose transistor" },
      { name: "Crystal Oscillator", image: "Crystal Oscillator .jpg", price: 19, rating: 4.3, description: "16MHz quartz crystal" },
      { name: "Screw Terminals", image: "Screw Terminals .jpg", price: 29, rating: 4.4, description: "PCB mount terminal blocks" },
    ]
  },
  {
    id: 8,
    name: "Interfaces & Miscellaneous",
    folder: "8. Interfaces & Miscellaneous",
    products: [
      { name: "SD Card Module", image: "SD Card Module.jpg", price: 149, rating: 4.5, description: "Micro SD card reader/writer module" },
      { name: "RTC DS3231", image: "RTC DS3231.jpg", price: 249, rating: 4.6, description: "Real-time clock module with battery" },
      { name: "4x4 Keypad", image: "4x4 Keypad .jpg", price: 99, rating: 4.3, description: "Matrix membrane keypad" },
      { name: "Joystick Module", image: "Joystick Module .jpg", price: 149, rating: 4.4, description: "XY-axis analog joystick" },
      { name: "Camera Module", image: "Camera Module .jpg", price: 899, rating: 4.5, description: "OV7670 camera sensor module" },
      { name: "Logic Level Converter", image: "Logic Level Converter .jpg", price: 79, rating: 4.4, description: "Bi-directional level shifter 3.3V-5V" },
      { name: "I2C Multiplexer", image: "I2C Multiplexer .jpg", price: 199, rating: 4.3, description: "TCA9548A I2C bus multiplexer" },
      { name: "Cooling Fan", image: "Cooling Fan .jpg", price: 149, rating: 4.2, description: "5V DC cooling fan 40x40mm" },
    ]
  },
  {
    id: 9,
    name: "3D Printed Parts",
    folder: "3D printed parts",
    products: [
      { name: "Robot Chassis", image: "robot chassis.jpg", price: 599, rating: 4.5, description: "Custom 3D printed robot chassis" },
      { name: "Electronics Parts Kit", image: "electronics parts.jpg", price: 799, rating: 4.4, description: "3D printed electronics enclosures" },
      { name: "3D Parts Set", image: "3d parts.jpg", price: 499, rating: 4.3, description: "Assorted 3D printed mechanical parts" },
      { name: "Component Set 1", image: "1.jpg", price: 299, rating: 4.2, description: "3D printed component holders" },
      { name: "Component Set 2", image: "2.jpg", price: 299, rating: 4.2, description: "Custom mounting brackets" },
      { name: "Component Set 3", image: "3.jpg", price: 299, rating: 4.2, description: "3D printed connectors" },
      { name: "Elephant Model", image: "ELEPHANT.jpg", price: 399, rating: 4.6, description: "Decorative 3D printed elephant" },
      { name: "Custom Part E1", image: "E1.jpg", price: 199, rating: 4.1, description: "Specialized mounting part" },
      { name: "Custom Part E2", image: "E2.jpg", price: 199, rating: 4.1, description: "Custom mechanical connector" },
      { name: "KC1 Component", image: "KC1.jpg", price: 249, rating: 4.2, description: "3D printed project component" },
    ]
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const toggleWishlist = (productName: string) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productName)) {
      newWishlist.delete(productName)
    } else {
      newWishlist.add(productName)
    }
    setWishlist(newWishlist)
  }

  const filteredCategories = productCategories
    .filter(category => selectedCategory === "all" || category.name === selectedCategory)
    .map(category => ({
      ...category,
      products: category.products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.products.length > 0)

  const allProductsCount = productCategories.reduce((acc, cat) => acc + cat.products.length, 0)
  const filteredProductsCount = filteredCategories.reduce((acc, cat) => acc + cat.products.length, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Electronics Components Store
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Premium quality electronics components for your projects - {allProductsCount}+ products available
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for Arduino, sensors, motors, displays..."
                className="pl-12 pr-4 h-14 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === "all"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                    >
                      All Products
                      <Badge variant="secondary" className="ml-2">
                        {allProductsCount}
                      </Badge>
                    </button>
                    {productCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                          selectedCategory === category.name
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        }`}
                      >
                        <span className="block truncate">{category.name}</span>
                        <Badge variant="secondary" className="ml-2 mt-1">
                          {category.products.length}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort and Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredProductsCount}</span> products
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Sort by: {sortBy === "popularity" ? "Popularity" : sortBy === "price-low" ? "Price: Low to High" : sortBy === "price-high" ? "Price: High to Low" : "Rating"}
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
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Products Grid by Category */}
            {filteredCategories.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found matching your search.</p>
              </div>
            ) : (
              filteredCategories.map((category) => {
                const sortedProducts = [...category.products].sort((a, b) => {
                  if (sortBy === "price-low") return a.price - b.price
                  if (sortBy === "price-high") return b.price - a.price
                  if (sortBy === "rating") return b.rating - a.rating
                  return 0
                })

                return (
                  <div key={category.id} className="mb-12">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
                      <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {sortedProducts.map((product, idx) => (
                        <Card key={idx} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                          <CardHeader className="p-0">
                            <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                              <Image
                                src={`/${category.folder}/${product.image}`}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                              />
                              <button
                                onClick={() => toggleWishlist(product.name)}
                                className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                              >
                                <Heart
                                  className={`h-5 w-5 ${
                                    wishlist.has(product.name)
                                      ? "fill-red-500 text-red-500"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </button>
                              <Badge className="absolute bottom-3 left-3 bg-primary">
                                <Star className="h-3 w-3 fill-current mr-1" />
                                {product.rating}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-2 line-clamp-1" title={product.name}>
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 gap-2">
                            <Button className="flex-1 group/btn" size="sm">
                              <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                              Add to Cart
                            </Button>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
