"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  Plus,
  Trash2,
  Home,
  Building2,
  ShoppingBag,
  Heart,
  Package,
  LogOut,
  Check
} from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

interface Address {
  id: string
  name: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  type: "Home" | "Work"
  isDefault: boolean
}

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [addressData, setAddressData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home" as "Home" | "Work",
  })

  useEffect(() => {
    loadUser()
    loadAddresses()
  }, [])

  const loadUser = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setProfileData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
    })
  }

  const loadAddresses = () => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem("user_addresses")
    if (saved) {
      setAddresses(JSON.parse(saved))
    }
  }

  const saveAddresses = (newAddresses: Address[]) => {
    localStorage.setItem("user_addresses", JSON.stringify(newAddresses))
    setAddresses(newAddresses)
  }

  const handleProfileUpdate = () => {
    // Update user profile in localStorage
    const users = JSON.parse(localStorage.getItem("electronicsHub_users") || "{}")
    if (users[profileData.email]) {
      users[profileData.email] = {
        ...users[profileData.email],
        name: profileData.name,
        phone: profileData.phone,
      }
      localStorage.setItem("electronicsHub_users", JSON.stringify(users))
      localStorage.setItem("electronicsHub_currentUser", JSON.stringify({
        ...user,
        name: profileData.name,
        phone: profileData.phone,
      }))
      setUser({ ...user, name: profileData.name, phone: profileData.phone })
      setIsEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      })
    }
  }

  const handleAddAddress = () => {
    if (!addressData.name || !addressData.phone || !addressData.address || !addressData.city || !addressData.pincode) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    const newAddress: Address = {
      id: Date.now().toString(),
      ...addressData,
      isDefault: addresses.length === 0,
    }

    saveAddresses([...addresses, newAddress])
    setShowAddressForm(false)
    setAddressData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    })
    toast({
      title: "Address Added",
      description: "New address has been added successfully",
    })
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setAddressData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      type: address.type,
    })
    setShowAddressForm(true)
  }

  const handleUpdateAddress = () => {
    if (!editingAddress) return

    const updated = addresses.map(addr =>
      addr.id === editingAddress.id
        ? { ...addr, ...addressData }
        : addr
    )
    saveAddresses(updated)
    setEditingAddress(null)
    setShowAddressForm(false)
    setAddressData({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      type: "Home",
    })
    toast({
      title: "Address Updated",
      description: "Address has been updated successfully",
    })
  }

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(addr => addr.id !== id)
    saveAddresses(updated)
    toast({
      title: "Address Deleted",
      description: "Address has been removed",
    })
  }

  const handleSetDefault = (id: string) => {
    const updated = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    }))
    saveAddresses(updated)
    toast({
      title: "Default Address Set",
      description: "This address will be used for deliveries",
    })
  }

  const handleLogout = async () => {
    await logout()
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    })
    router.push("/login")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
        <div className="text-gray-900">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1 h-fit p-6 border-0 shadow-lg">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2874F0] to-[#1e5bb8] flex items-center justify-center text-white text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-gray-600">Hello,</p>
                <p className="font-bold text-gray-900 text-lg">{user.name}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "profile"
                    ? "bg-blue-50 text-[#2874F0] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <User className="w-5 h-5" />
                Profile Information
              </button>
              
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "addresses"
                    ? "bg-blue-50 text-[#2874F0] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MapPin className="w-5 h-5" />
                Manage Addresses
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "orders"
                    ? "bg-blue-50 text-[#2874F0] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Package className="w-5 h-5" />
                My Orders
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "wishlist"
                    ? "bg-blue-50 text-[#2874F0] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart className="w-5 h-5" />
                My Wishlist
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                  {!isEditing && (
                    <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-gray-900 font-semibold">Full Name</Label>
                      {isEditing ? (
                        <Input
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="mt-2 text-gray-900"
                        />
                      ) : (
                        <p className="mt-2 text-gray-700 font-medium">{user.name}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-gray-900 font-semibold">Email Address</Label>
                      <p className="mt-2 text-gray-700 font-medium">{user.email}</p>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <Label className="text-gray-900 font-semibold">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="mt-2 text-gray-900"
                        />
                      ) : (
                        <p className="mt-2 text-gray-700 font-medium">{user.phone || "Not provided"}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleProfileUpdate} className="bg-[#2874F0] hover:bg-[#1e5bb8]">
                        Save Changes
                      </Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-4">
                <Card className="p-6 border-0 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Manage Addresses</h2>
                    <Button
                      onClick={() => {
                        setShowAddressForm(true)
                        setEditingAddress(null)
                      }}
                      className="bg-[#2874F0] hover:bg-[#1e5bb8] gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Address
                    </Button>
                  </div>

                  {/* Address Form */}
                  {showAddressForm && (
                    <Card className="p-6 mb-6 bg-blue-50 border-2 border-[#2874F0]">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        {editingAddress ? "Edit Address" : "Add New Address"}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-900 font-semibold">Full Name *</Label>
                          <Input
                            value={addressData.name}
                            onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
                            className="mt-2 text-gray-900"
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-900 font-semibold">Phone Number *</Label>
                          <Input
                            value={addressData.phone}
                            onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                            className="mt-2 text-gray-900"
                            placeholder="10-digit mobile number"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-gray-900 font-semibold">Address *</Label>
                          <Textarea
                            value={addressData.address}
                            onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                            className="mt-2 text-gray-900"
                            placeholder="House No., Building Name, Road Name, Area"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-900 font-semibold">City *</Label>
                          <Input
                            value={addressData.city}
                            onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                            className="mt-2 text-gray-900"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-900 font-semibold">State</Label>
                          <Input
                            value={addressData.state}
                            onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                            className="mt-2 text-gray-900"
                            placeholder="State"
                          />
                        </div>
                        <div>
                          <Label className="text-gray-900 font-semibold">Pincode *</Label>
                          <Input
                            value={addressData.pincode}
                            onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                            className="mt-2 text-gray-900"
                            placeholder="6-digit pincode"
                            maxLength={6}
                          />
                        </div>
                        <div>
                          <Label className="text-gray-900 font-semibold">Address Type</Label>
                          <div className="flex gap-4 mt-2">
                            <button
                              onClick={() => setAddressData({ ...addressData, type: "Home" })}
                              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                                addressData.type === "Home"
                                  ? "border-[#2874F0] bg-blue-50 text-[#2874F0] font-semibold"
                                  : "border-gray-300 text-gray-700"
                              }`}
                            >
                              <Home className="w-4 h-4 inline mr-2" />
                              Home
                            </button>
                            <button
                              onClick={() => setAddressData({ ...addressData, type: "Work" })}
                              className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                                addressData.type === "Work"
                                  ? "border-[#2874F0] bg-blue-50 text-[#2874F0] font-semibold"
                                  : "border-gray-300 text-gray-700"
                              }`}
                            >
                              <Building2 className="w-4 h-4 inline mr-2" />
                              Work
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button
                          onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                          className="bg-[#2874F0] hover:bg-[#1e5bb8]"
                        >
                          {editingAddress ? "Update Address" : "Save Address"}
                        </Button>
                        <Button
                          onClick={() => {
                            setShowAddressForm(false)
                            setEditingAddress(null)
                          }}
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Card>
                  )}

                  {/* Address List */}
                  {addresses.length === 0 ? (
                    <div className="text-center py-12">
                      <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-medium">No addresses saved yet</p>
                      <p className="text-gray-500 text-sm mt-2">Add a new address to get started</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <Card
                          key={address.id}
                          className={`p-4 ${
                            address.isDefault ? "border-2 border-[#2874F0] bg-blue-50" : "border"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Badge className={address.type === "Home" ? "bg-green-100 text-green-700 border-0" : "bg-orange-100 text-orange-700 border-0"}>
                                {address.type === "Home" ? <Home className="w-3 h-3 mr-1" /> : <Building2 className="w-3 h-3 mr-1" />}
                                {address.type}
                              </Badge>
                              {address.isDefault && (
                                <Badge className="bg-[#2874F0] text-white border-0">
                                  <Check className="w-3 h-3 mr-1" />
                                  Default
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditAddress(address)}
                                className="text-[#2874F0] hover:text-[#1e5bb8]"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="font-bold text-gray-900">{address.name}</p>
                          <p className="text-gray-700 text-sm mt-1">{address.address}</p>
                          <p className="text-gray-700 text-sm">{address.city}, {address.state} - {address.pincode}</p>
                          <p className="text-gray-700 text-sm mt-2">Phone: {address.phone}</p>
                          {!address.isDefault && (
                            <Button
                              onClick={() => handleSetDefault(address.id)}
                              variant="outline"
                              size="sm"
                              className="mt-3 text-[#2874F0] border-[#2874F0]"
                            >
                              Set as Default
                            </Button>
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <Card className="p-6 border-0 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">No orders yet</p>
                  <p className="text-gray-500 text-sm mt-2">Start shopping to see your orders here</p>
                  <Button
                    onClick={() => router.push("/products")}
                    className="mt-4 bg-[#2874F0] hover:bg-[#1e5bb8]"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Start Shopping
                  </Button>
                </div>
              </Card>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <Card className="p-6 border-0 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">Your wishlist is empty</p>
                  <p className="text-gray-500 text-sm mt-2">Add products you like to your wishlist</p>
                  <Button
                    onClick={() => router.push("/products")}
                    className="mt-4 bg-[#2874F0] hover:bg-[#1e5bb8]"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Browse Products
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
