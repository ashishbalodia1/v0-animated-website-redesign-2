import Link from "next/link"
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const footerLinks = {
    Product: [
      { label: "Features", href: "/services" },
      { label: "Pricing", href: "/services#pricing" },
      { label: "Registration", href: "/register" },
      { label: "Student Discounts", href: "/services#discounts" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Careers", href: "/about#careers" },
      { label: "Contact", href: "/feedback" },
    ],
    Resources: [
      { label: "Blog", href: "/blogs" },
      { label: "Help Center", href: "/feedback" },
      { label: "Student Guide", href: "/blogs" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
    Legal: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refunds" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-[#2874F0] rounded-lg flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#2874F0]">
                ElectronicsHub
              </span>
            </Link>
            <p className="text-sm text-gray-700 mb-4 max-w-xs">
              Your trusted electronics components store. Quality products, competitive prices, and fast delivery across India.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail className="w-4 h-4 text-[#2874F0]" />
                <span>Helpingengineers24@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="w-4 h-4 text-[#2874F0]" />
                <span>+91 7470578495</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-[#2874F0]" />
                <span>Campus Plaza, University Ave</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-black mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-[#2874F0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-700">
            © 2026 ElectronicsHub. All rights reserved. Built for makers and hobbyists.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
