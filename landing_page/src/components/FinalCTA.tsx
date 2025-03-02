'use client'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold text-white font-oswald uppercase tracking-wide">
            Start Growing Your Newsletter Today
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-dm-sans">
            Join thousands of creators and marketers using MailStride.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-white/20 text-white rounded-lg font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              View Pricing
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 