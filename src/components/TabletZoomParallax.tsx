import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollShowcase from "@/components/ScrollShowcase";

/**
 * TabletZoomParallax
 *
 * Wraps the existing ScrollShowcase and:
 * - Makes the whole section tall so you have scroll room (h-[250vh])
 * - Keeps the tablet pinned with sticky top-0 h-screen
 * - Applies a zoom-in transform as you scroll
 *
 * ✅ Does NOT change anything inside the tablet / ScrollShowcase.
 */
const TabletZoomParallax = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Zoom into the tablet as you scroll this section
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.67]);

  return (
    <div ref={containerRef} className="relative h-[180vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div style={{ scale }} className="w-full flex justify-center will-change-transform">
          {/* Your original tablet section, unchanged */}
          <ScrollShowcase />
        </motion.div>
      </div>
    </div>
  );
};

export default TabletZoomParallax;
