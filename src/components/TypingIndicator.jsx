"use client";

import { motion } from "framer-motion";

export const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex space-x-2 p-2 w-fit"
    >
      <motion.div
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </motion.div>
  );
};
