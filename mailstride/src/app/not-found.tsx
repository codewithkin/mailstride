'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HomeIcon } from "@heroicons/react/24/outline"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-purple-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl relative"
        style={{
          backgroundImage: 'linear-gradient(white, white), linear-gradient(to right,rgb(142, 144, 255), #a855f7)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          border: '1px solid transparent',
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mx-auto w-24 h-24"
        >
          <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-25" />
          <div className="relative flex items-center justify-center w-full h-full bg-indigo-100 rounded-full">
            <span className="text-4xl">404</span>
          </div>
        </motion.div>
        
        <div className="space-y-2 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-slate-800"
          >
            Page not found
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            The page you're looking for doesn't exist or has been moved.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-2"
        >
          <Button
            asChild
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <Link href="/">
              <HomeIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full"
          >
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
} 