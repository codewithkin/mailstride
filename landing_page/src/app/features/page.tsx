'use client'
import { motion } from 'framer-motion'
import { 
  Cursor,
  ChartLineUp,
  Lightning,
  Users,
  PaintBrush,
  Code,
  ChartPie,
  ArrowsLeftRight,
  Rocket,
  Target,
  Gauge,
  ListChecks
} from '@phosphor-icons/react'

const features = [
  {
    category: 'Email Creation',
    items: [
      {
        title: 'Drag & Drop Editor',
        description: 'Create beautiful emails with our intuitive drag & drop interface',
        icon: PaintBrush,
        color: 'text-purple-500'
      },
      {
        title: 'Template Library',
        description: 'Choose from hundreds of pre-designed templates',
        icon: Cursor,
        color: 'text-blue-500'
      },
      {
        title: 'Custom HTML Editor',
        description: 'Full HTML editing capabilities for advanced users',
        icon: Code,
        color: 'text-emerald-500'
      }
    ]
  },
  {
    category: 'Analytics & Tracking',
    items: [
      {
        title: 'Real-time Analytics',
        description: 'Track opens, clicks, and engagement in real-time',
        icon: ChartPie,
        color: 'text-cyan-500'
      },
      {
        title: 'Subscriber Growth',
        description: 'Monitor your audience growth and engagement trends',
        icon: ChartLineUp,
        color: 'text-green-500'
      },
      {
        title: 'Link Tracking',
        description: 'Track click-through rates and link performance',
        icon: Gauge,
        color: 'text-indigo-500'
      }
    ]
  },
  {
    category: 'Automation',
    items: [
      {
        title: 'Email Sequences',
        description: 'Create automated email sequences and drip campaigns',
        icon: Lightning,
        color: 'text-amber-500'
      },
      {
        title: 'Trigger-based Emails',
        description: 'Send emails based on subscriber actions and events',
        icon: Target,
        color: 'text-red-500'
      },
      {
        title: 'A/B Testing',
        description: 'Test different versions of your emails to optimize performance',
        icon: ArrowsLeftRight,
        color: 'text-fuchsia-500'
      }
    ]
  },
  {
    category: 'Subscriber Management',
    items: [
      {
        title: 'Segmentation',
        description: 'Group subscribers based on behavior and preferences',
        icon: Users,
        color: 'text-sky-500'
      },
      {
        title: 'Custom Fields',
        description: 'Add custom data fields to personalize your emails',
        icon: ListChecks,
        color: 'text-teal-500'
      },
      {
        title: 'List Growth',
        description: 'Tools and strategies to grow your subscriber base',
        icon: Rocket,
        color: 'text-rose-500'
      }
    ]
  }
]

export default function Features() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Modern Newsletters
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, grow, and monetize your newsletter
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-16">
            {features.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {category.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
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
                        <div className={`text-3xl relative z-10 ${feature.color} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                          <feature.icon size={44} weight="duotone" />
                        </div>
                        <div className={`absolute -inset-2 ${feature.color.replace('text-', 'bg-')}/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                      </div>

                      {/* Content with enhanced typography */}
                      <div className="relative mt-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-current to-transparent opacity-[0.03] rounded-tl-[100px] transform translate-x-8 translate-y-8" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Get Started?
            </h2>
            <motion.button
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 