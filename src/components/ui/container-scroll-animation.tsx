import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContainerScrollProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

/**
 * ContainerScroll
 *
 * Scroll-through portal effect:
 * - Tablet starts angled upward.
 * - As you scroll, it flattens and zooms in.
 * - Grey frame + white bezel fade away.
 * - Once "inside", content (children) scrolls vertically: robot → services → contact.
 * - Only the page scroll bar is used (no inner scroll containers).
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

  // Measure viewport + natural content height
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight || 0;
      setViewportHeight(vh);

      if (contentRef.current) {
        // Full natural height of robot + services + contact stack
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Visible area inside the tablet "screen"
  const visibleHeight = viewportHeight > 0 ? Math.min(viewportHeight - 80, 650) : 0;

  // How much vertical content we need to reveal once the portal is open
  const maxTranslate = visibleHeight > 0 && contentHeight > visibleHeight ? contentHeight - visibleHeight : 0;

  // Ensure the outer section is tall enough for:
  // - the portal animation, AND
  // - fully scrolling through all inner content while the tablet is sticky.
  const sectionMinHeight =
    viewportHeight > 0 && contentHeight > 0
      ? viewportHeight + maxTranslate + viewportHeight * 0.4
      : viewportHeight > 0
        ? viewportHeight * 3
        : 2000; // fallback for very early render

  // Title: holds for a bit, then fades & moves up
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.35], [0, -80]);

  // Tablet rotation & scale:
  // 0 → 0.3: angled upward → flat
  // 0.3 → 0.6: zoom in to portal
  // 0.6+ : hold scale (we're fully "inside")
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [20, 0]); // keep original upward-ish angle
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.9, 1, 1.25, 1.25]);

  // Frame & bezel fade
  const frameOpacity = useTransform(scrollYProgress, [0.35, 0.6], [1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0.35, 0.6], [30, 0]);

  // Inner content scroll: starts once portal is open
  const innerProgress = useTransform(scrollYProgress, [0.65, 1], [0, 1]);
  const contentY = useTransform(innerProgress, (v) => (maxTranslate <= 0 ? 0 : -v * maxTranslate));

  // Soft, tablet-like shadow that fades with the frame
  const frameShadow = useTransform(frameOpacity, (opacity) => {
    const o = Number(opacity.toFixed(2));
    return `0 9px 20px rgba(0,0,0,${o * 0.6}), 0 40px 60px rgba(0,0,0,${o * 0.35})`;
  });

  return (
    <section ref={sectionRef} style={{ minHeight: sectionMinHeight }} className="relative w-full bg-black text-white">
      {/* Title above tablet */}
      <motion.div
        className="pointer-events-none sticky top-10 z-20 flex justify-center"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <div className="px-4 text-center">{titleComponent}</div>
      </motion.div>

      {/* Tablet / portal */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <motion.div
          style={{
            rotateX,
            scale,
            borderRadius,
            boxShadow: frameShadow,
          }}
          className="relative mx-auto w-[min(1100px,100vw-2rem)] max-w-5xl h-[min(650px,100vh-3rem)] bg-[#222222] rounded-[30px]"
        >
          {/* Grey outer frame + white inner bezel on top (fade out) */}
          <motion.div
            style={{ opacity: frameOpacity, borderRadius }}
            className="pointer-events-none absolute inset-0 border border-[#6C6C6C] p-2 md:p-4"
          >
            <div className="h-full w-full rounded-2xl bg-gray-100 dark:bg-zinc-900" />
          </motion.div>

          {/* Content area: fixed viewport, scrolling driven by page */}
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
            <motion.div ref={contentRef} style={{ y: contentY }} className="w-full">
              {children}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
