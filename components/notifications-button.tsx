"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const notifications = [
  {
    id: 1,
    title: "Order Shipped",
    description: "Your MacBook Pro has been shipped",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    title: "Flash Sale",
    description: "50% off on all headphones - 2 hours left!",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    title: "Price Drop Alert",
    description: "iPhone 15 Pro is now ₹5000 cheaper",
    time: "3h ago",
    unread: false,
  },
]

export function NotificationsButton() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-all hover:scale-110">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-orange-500 text-[10px] font-bold border-0 animate-pulse">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4 cursor-pointer">
            <div className="flex items-start justify-between w-full mb-1">
              <span className="font-semibold text-sm">{notification.title}</span>
              <span className="text-xs text-muted-foreground">{notification.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{notification.description}</p>
            {notification.unread && <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-primary cursor-pointer">View all notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
