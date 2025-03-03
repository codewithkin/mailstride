'use client'

import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-purple-400">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-purple-600"
      >
        <Loader2 className="h-12 w-12 animate-spin" />
      </motion.div>
    </div>
  )
} 