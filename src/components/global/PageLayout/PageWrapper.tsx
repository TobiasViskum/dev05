"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden standalone:touch:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
      <div className="block standalone:touch:hidden">{children}</div>
    </>
  );
}
