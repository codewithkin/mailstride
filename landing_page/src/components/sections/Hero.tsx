'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Random position generator
const getRandomPosition = () => {
  return {
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: Math.random() * 100 + 20,
    endY: Math.random() * 100 + 20,
    rotation: Math.random() * 45 + 15, // Random rotation between 15 and 60 degrees
  }
}

// Shooting star component
const ShootingStar = ({ delay }: { delay: number }) => {
  const position = getRandomPosition()
  
  return (
    <motion.div
      className="absolute h-[1px] w-[150px] bg-gradient-to-r from-white/0 via-white to-white/0"
      initial={{ 
        opacity: 0,
        top: `${position.startY}%`,
        left: `${position.startX}%`,
        rotate: position.rotation,
        scale: 0.5
      }}
      animate={{
        opacity: [0, 1, 0],
        top: [`${position.startY}%`, `${position.endY}%`],
        left: [`${position.startX}%`, `${position.endX}%`],
        scale: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 5
      }}
    />
  )
}

export default function Hero() {
  const [stars, setStars] = useState<number[]>([])

  useEffect(() => {
    // Create 5 shooting stars with different delays
    setStars([0, 1, 2, 3, 4].map(i => i * 0.8)) // Spread out the delays
  }, [])

  return (
    <section className="relative min-h-screen pt-16 flex items-center justify-center bg-[#0A1628] text-white px-4 py-16 overflow-hidden">
      {/* Starry background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large glowing orbs */}
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        {/* Static stars */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 15% 85%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 120px 120px, 80px 80px, 90px 90px, 110px 110px',
        }} />

        {/* Shooting stars */}
        {stars.map((delay, index) => (
          <ShootingStar key={index} delay={delay} />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold font-oswald uppercase tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            The{' '}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-white bg-clip-text text-transparent">
              Smartest
            </span>{' '}
            Way to Grow Your Newsletter
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 font-dm-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Create, send, and track your emails with ease. Powerful analytics, automation, 
            and growth tools—all in one platform.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button 
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started for Free
            </motion.button>
            
            <motion.button 
              className="px-8 py-4 border-2 border-white/20 text-white rounded-lg font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              See Pricing
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 