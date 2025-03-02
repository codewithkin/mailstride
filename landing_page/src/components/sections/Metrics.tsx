'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const metrics = [
  {
    value: '2.4M+',
    label: 'Emails Sent Daily',
    icon: '📧'
  },
  {
    value: '98.5%',
    label: 'Delivery Rate',
    icon: '📈'
  },
  {
    value: '150K+',
    label: 'Active Users',
    icon: '👥'
  }
]

const testimonials = [
  {
    text: "MailStride has transformed how we engage with our audience. The analytics are incredible!",
    author: "Sarah Chen",
    role: "Newsletter Creator"
  },
  {
    text: "The automation features have saved us countless hours. Best email platform we've used.",
    author: "Mark Thompson",
    role: "Marketing Director"
  }
]

export default function Metrics() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 px-4 bg-[#0A1628] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[128px]" />
        
        {/* Stars background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 120px 120px, 80px 80px',
        }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Metrics Section */}
          <div className="w-full lg:w-1/2">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-12 font-inter text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Trusted by Growing Newsletters
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-4xl mb-4 transform hover:scale-110 transition-transform duration-300">
                    {metric.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2 font-inter">
                    {metric.value}
                  </div>
                  <div className="text-gray-400 font-dm-sans">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative bg-white/5 rounded-2xl p-8 sm:p-10 backdrop-blur-sm border border-white/10">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="text-center lg:text-left"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: currentTestimonial === index ? 1 : 0,
                    x: currentTestimonial === index ? 0 : 20
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    position: currentTestimonial === index ? 'relative' : 'absolute',
                    inset: 0
                  }}
                >
                  <p className="text-lg sm:text-xl text-gray-200 mb-6 font-dm-sans">
                    "{testimonial.text}"
                  </p>
                  <div className="text-white font-semibold">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role}
                  </div>
                </motion.div>
              ))}

              <div className="flex justify-center lg:justify-start gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-white' : 'bg-white/20'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 