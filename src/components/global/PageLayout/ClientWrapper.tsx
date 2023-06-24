"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={path}
        initial={{ opacity: 0, x: "150%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 1, x: "-150%" }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
