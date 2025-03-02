'use client'
import { motion } from 'framer-motion'
import { 
  CalendarBlank, 
  Newspaper, 
  ChatsCircle, 
  EnvelopeSimple 
} from '@phosphor-icons/react'

const upcomingTopics = [
  "Newsletter Growth Strategies",
  "Email Design Best Practices",
  "Audience Engagement Tips",
  "Monetization Strategies",
  "Content Creation Guide",
  "Analytics & Metrics Deep Dive"
]

export default function Blog() {
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
              MailStride Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights and strategies for newsletter creators
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold mb-8">
              Coming Soon
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900">
              Our Blog is Under Construction
            </h2>
            
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're working on creating valuable content to help you grow and engage with your newsletter audience. 
              Subscribe to be notified when we launch.
            </p>

            {/* Topics Preview */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-8">
                Upcoming Topics
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {upcomingTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <p className="text-gray-800">{topic}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup
            <div className="mt-16 max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <motion.button
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Notify Me
                </motion.button>
              </div>
            </div> */}

            {/* Stats */}
            <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: CalendarBlank, label: 'Weekly Updates', color: 'text-blue-500' },
                { icon: Newspaper, label: 'Expert Articles', color: 'text-green-500' },
                { icon: ChatsCircle, label: 'Community Insights', color: 'text-purple-500' },
                { icon: EnvelopeSimple, label: 'Newsletter Tips', color: 'text-rose-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center flex flex-col items-center justify-center"
                >
                  <div className={`text-4xl mb-3 ${stat.color} mx-auto`}>
                    <stat.icon size={44} weight="duotone" />
                  </div>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 