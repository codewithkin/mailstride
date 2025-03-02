'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const footerLinks = {
  Product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Integrations', href: '/#integrations' },
    { name: 'API', href: '/docs/api' }
  ],
  Resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Guides', href: '/guides' },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' }
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partners', href: '/partners' }
  ],
  Legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Security', href: '/security' }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white py-16 px-4 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Link 
              href="/"
              className="text-2xl font-bold mb-4 block hover:text-primary transition-colors"
            >
              MailStride
            </Link>
            <p className="text-gray-300 mb-4 font-dm-sans">
              The smartest way to grow your newsletter and connect with your audience.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-gray-300 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MailStride. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 