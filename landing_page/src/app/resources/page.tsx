'use client'
import { motion } from 'framer-motion'
import { 
  BookOpen,
  Lightbulb,
  Users,
  VideoCamera,
  Books,
  ChatsCircle,
  GraduationCap,
  Newspaper,
  FileText,
  Code,
  PlayCircle,
  UsersThree
} from '@phosphor-icons/react'

const resources = [
  {
    category: 'Learning Center',
    description: 'Master the basics and learn advanced techniques',
    items: [
      {
        title: 'Getting Started Guide',
        description: 'Everything you need to know to start your newsletter',
        icon: BookOpen,
        color: 'text-blue-500',
        link: '/guides/getting-started'
      },
      {
        title: 'Best Practices',
        description: 'Tips and tricks for newsletter success',
        icon: Lightbulb,
        color: 'text-amber-500',
        link: '/guides/best-practices'
      },
      {
        title: 'Video Tutorials',
        description: 'Step-by-step video guides for every feature',
        icon: VideoCamera,
        color: 'text-red-500',
        link: '/tutorials'
      }
    ]
  },
  {
    category: 'Documentation',
    description: 'Detailed technical documentation and API references',
    items: [
      {
        title: 'API Reference',
        description: 'Complete API documentation for developers',
        icon: Code,
        color: 'text-purple-500',
        link: '/docs/api'
      },
      {
        title: 'User Guides',
        description: 'In-depth guides for all features',
        icon: FileText,
        color: 'text-emerald-500',
        link: '/docs/guides'
      },
      {
        title: 'Integration Guides',
        description: 'Connect MailStride with your tech stack',
        icon: Books,
        color: 'text-cyan-500',
        link: '/docs/integrations'
      }
    ]
  },
  {
    category: 'Community',
    description: 'Connect with other newsletter creators',
    items: [
      {
        title: 'Community Forum',
        description: 'Discuss strategies and share experiences',
        icon: ChatsCircle,
        color: 'text-indigo-500',
        link: '/community/forum'
      },
      {
        title: 'Success Stories',
        description: 'Learn from successful newsletter creators',
        icon: UsersThree,
        color: 'text-green-500',
        link: '/community/stories'
      },
      {
        title: 'Events & Webinars',
        description: 'Join live sessions and workshops',
        icon: PlayCircle,
        color: 'text-rose-500',
        link: '/events'
      }
    ]
  },
  {
    category: 'Updates & News',
    description: 'Stay up to date with MailStride',
    items: [
      {
        title: 'Blog',
        description: 'Latest news, tips, and best practices',
        icon: Newspaper,
        color: 'text-teal-500',
        link: '/blog'
      },
      {
        title: 'Academy',
        description: 'Free courses on newsletter growth',
        icon: GraduationCap,
        color: 'text-fuchsia-500',
        link: '/academy'
      },
      {
        title: 'Case Studies',
        description: 'Real-world success stories and strategies',
        icon: Users,
        color: 'text-sky-500',
        link: '/case-studies'
      }
    ]
  }
]

export default function Resources() {
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
              Resources & Learning Center
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to succeed with your newsletter
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-16">
            {resources.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {category.category}
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <motion.a
                      key={itemIndex}
                      href={item.link}
                      className="group relative p-8 rounded-xl bg-white hover:bg-gray-50/80 border border-gray-200 transition-all duration-500 overflow-hidden"
                      whileHover={{ y: -4 }}
                    >
                      {/* Gradient border effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500"
                        style={{
                          backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px)`,
                          backgroundSize: '24px 24px',
                        }}
                      />

                      {/* Icon container with enhanced glow */}
                      <div className="relative">
                        <div className={`text-3xl relative z-10 ${item.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                          <item.icon size={44} weight="duotone" />
                        </div>
                        <div className={`absolute -inset-2 ${item.color.replace('text-', 'bg-')}/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                      </div>

                      {/* Content with enhanced typography */}
                      <div className="relative mt-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Arrow indicator for links */}
                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                        <svg className={`w-5 h-5 ${item.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-current to-transparent opacity-[0.03] rounded-tl-[100px] transform translate-x-8 translate-y-8" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Stay Updated
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest guides, tips, and resources
            </p>
            <div className="max-w-md mx-auto">
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
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 