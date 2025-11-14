import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

/**
 * ContainerScroll
 *
 * Creates a tall scrollable section where a "tablet" element
 * zooms & rotates into place, then dissolves its frame so that
 * the inner content effectively becomes the full-screen page.
 *
 * IMPORTANT:
 * - There is only ONE scroll container: the page.
 * - This component does NOT use overflow-y: scroll anywhere.
 */
export const ContainerScroll: React.FC<ContainerScrollProps> = ({ titleComponent, children }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure viewport + content so we can scroll through all inner sections
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      setViewportHeight(vh);

      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Approximate the visible height of the tablet "screen" in pixels.
  const containerHeight = viewportHeight > 0 ? Math.min(viewportHeight - 80, 650) : 0;

  // How much vertical content we need to reveal after the "portal" completes
  const maxTranslate = contentHeight > containerHeight && containerHeight > 0 ? contentHeight - containerHeight : 0;

  // Title animation (fades and moves up early)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18, 0.3], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  // Tablet rotation & scale:
  // 0 → 0.25: rotate down towards viewer, then flatten
  // 0.25 → 0.65: zoom in until content visually fills viewport
  const rotateX = useTransform(scrollYProgress, [0, 0.25], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.65, 1], [1.02, 1, 1.3, 1.3]);

  // Frame / bezel fade + border radius
  const frameOpacity = useTransform(scrollYProgress, [0.35, 0.65], [1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0.35, 0.65], [30, 0]);

  // Content scroll INSIDE the portal (but still driven by page scroll)
  // 0.7 → 1.0: translate children upward so user scrolls through them
  const innerScrollProgress = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const contentY = useTransform(innerScrollProgress, (v) => {
    if (maxTranslate <= 0) return 0;
    return -v * maxTranslate;
  });

  // Box shadow that fades out with frameOpacity (tablet frame)
  const frameShadow = useTransform(frameOpacity, (opacity) => {
    const o = Number(opacity.toFixed(2));
    return `0 0 0 1px rgba(108,108,108,${o})`;
  });

  return (
    <section ref={sectionRef} className="relative w-full bg-black text-white min-h-[320vh]">
      {/* Title */}
      <motion.div
        className="pointer-events-none sticky top-10 z-20 flex justify-center"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <div className="px-4 text-center">{titleComponent}</div>
      </motion.div>

      {/* Portal / tablet */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <motion.div
          style={{
            rotateX,
            scale,
            borderRadius,
            boxShadow: frameShadow,
          }}
          className="relative mx-auto w-[min(1100px,100vw-2rem)] h-[min(650px,100vh-3rem)] bg-[#222222] rounded-[30px]"
        >
          {/* Grey outer frame + white inner bezel, both fading out */}
          <motion.div
            style={{ opacity: frameOpacity, borderRadius }}
            className="pointer-events-none absolute inset-0 border border-[#6C6C6C] p-2 md:p-4"
          >
            <div className="h-full w-full rounded-2xl bg-gray-100 dark:bg-zinc-900" />
          </motion.div>

          {/* Actual content area — fills the tablet and extends vertically.
              It does NOT have its own scroll; y-translate is driven by page scroll. */}
          <motion.div
            ref={contentRef}
            style={{ y: contentY, borderRadius }}
            className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900"
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
