'use client'
import { motion } from 'framer-motion'
import { Rocket } from '@phosphor-icons/react'

interface ComingSoonProps {
  title: string
  description?: string
}

export default function ComingSoon({ 
  title, 
  description = "We're working hard to bring you something amazing. Stay tuned!" 
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-[#0A1628] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }} />
        </div>

        <div className="container mx-auto max-w-6xl px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-24 px-4">
        <div className="flex flex-col items-center justify-center mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center flex flex-col items-center justify-center "
          >
            <motion.div 
              className="inline-block text-6xl mb-8"
              animate={{ 
                y: [0, -10, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Rocket size={64} weight="duotone" className="text-primary" />
            </motion.div>
            
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold mb-8">
              Coming Soon
            </div>
            
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="max-w-2xl mx-auto p-8 rounded-2xl bg-gray-50 border border-gray-100"
            >
              <p className="text-gray-600 mb-6">
                This page is currently under construction. Check back soon for updates!
              </p>
              <motion.a
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                whileHover={{ x: 5 }}
              >
                Return Home
                <span>→</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 