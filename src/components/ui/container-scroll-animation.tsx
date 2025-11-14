import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Phase 1 (0 → 0.3): Tablet rotation + minor scale
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [20, 0]);
  const initialScale = useTransform(scrollYProgress, [0, 0.3], [1.05, 1.0]);

  // Phase 2 (0.3 → 0.7): Portal zoom to full viewport
  // Scale up enough so the inner content fills the viewport and frame goes off-screen
  const portalScale = useTransform(scrollYProgress, [0.3, 0.7], [1.0, 2.8]);
  
  // Combine scales
  const scale = useTransform(
    scrollYProgress,
    (p) => {
      if (p < 0.3) return initialScale.get();
      return portalScale.get();
    }
  );

  // Frame opacity: visible → invisible
  const frameOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);
  
  // Border radius: 30px → 0px
  const borderRadius = useTransform(scrollYProgress, [0.3, 0.7], [30, 0]);

  // Box shadow based on frame opacity
  const boxShadow = useTransform(
    frameOpacity,
    (opacity) =>
      opacity > 0
        ? `0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003`
        : "none"
  );

  // Title behavior: fade out and move up
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 0.5, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  return (
    <section
      ref={ref}
      className="relative w-full bg-black text-white min-h-[300vh]"
    >
      {/* Title – fades out */}
      <motion.div
        className="sticky top-16 z-20 flex justify-center pointer-events-none"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <div className="max-w-5xl mx-auto text-center px-4">
          {titleComponent}
        </div>
      </motion.div>

      {/* Tablet container – pinned & transformed */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{
            scale,
            rotateX,
            borderRadius,
            boxShadow,
          }}
          className="relative bg-black"
        >
          {/* Outer frame - grey border */}
          <motion.div
            style={{ opacity: frameOpacity }}
            className="border-4 border-[#6C6C6C] rounded-[30px] p-2 md:p-6 bg-[#222222]"
          >
            {/* Inner white bezel */}
            <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
              {/* Content area - no independent scrolling */}
              <div className="w-[min(1100px,calc(100vw-2rem))] h-[min(650px,calc(100vh-4rem))]">
                <div className="h-full w-full">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
