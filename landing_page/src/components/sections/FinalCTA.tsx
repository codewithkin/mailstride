'use client'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-bold font-inter">
            Start Growing Your Newsletter Today
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-dm-sans">
            Join thousands of creators and marketers using MailStride.
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.button>
            <motion.button
              onClick={() => window.location.href = '/#pricing'}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Pricing
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 