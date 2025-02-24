"use client"
import { motion } from "framer-motion";

export default function(){
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
        </motion.div>
      </div>
    )
}