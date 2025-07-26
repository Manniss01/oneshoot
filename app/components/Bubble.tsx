"use client";
import React from "react";
import { motion } from "framer-motion";

const Bubble = ({ message }) => {
  const { content, role } = message;
  const isUser = role === "user";

  return (
    <motion.div
      className={`bubble ${isUser ? "user" : "assistant"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
};

export default Bubble;
