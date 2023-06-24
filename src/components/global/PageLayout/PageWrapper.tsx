"use client";
import { motion } from "framer-motion";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden standalone:touch:block">
        <motion.div
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: -500 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
