'use client'
import { motion } from 'framer-motion'

const features = [
  {
    title: 'Drag & Drop Email Builder',
    description: 'Create stunning emails in minutes, no coding needed.',
    icon: '✨',
    neonColor: 'before:from-purple-600 before:to-blue-600 shadow-purple-500/10'
  },
  {
    title: 'Powerful Analytics',
    description: 'Track open rates, CTR, and subscriber growth easily.',
    icon: '📊',
    neonColor: 'before:from-blue-600 before:to-cyan-600 shadow-blue-500/10'
  },
  {
    title: 'Automations That Work',
    description: 'Schedule sequences and trigger emails effortlessly.',
    icon: '⚡',
    neonColor: 'before:from-orange-600 before:to-red-600 shadow-orange-500/10'
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function Features() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-inter">
            Built for Growth. Designed for Simplicity.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Everything you need to create, manage, and grow your newsletter effectively.
          </p>
        </motion.div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Card */}
              <div className={`
                relative h-full p-6 sm:p-8 rounded-2xl bg-gray-50
                before:absolute before:inset-0 before:-z-10 before:rounded-2xl
                before:bg-gradient-to-r ${feature.neonColor} before:opacity-0
                hover:before:opacity-5 before:transition-opacity
                border border-gray-100
                transition-all duration-500
                hover:border-gray-200 hover:shadow-lg ${feature.neonColor}
              `}>
                {/* Icon container */}
                <div className="mb-5 sm:mb-6 relative">
                  <div className="text-4xl sm:text-5xl relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <div className="absolute -inset-2 bg-gray-900/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 font-inter group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-dm-sans leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Neon glow effect */}
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl bg-gradient-to-r ${feature.neonColor}" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="text-gray-900 font-semibold flex items-center gap-2 mx-auto hover:gap-4 transition-all duration-300 bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-lg group border border-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Features
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 