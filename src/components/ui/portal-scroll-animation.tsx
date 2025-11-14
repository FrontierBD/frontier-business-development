import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const PortalScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Phase 1 & 2: Initial rotation and scale (0-40%), then portal entry (50-85%)
  const rotate = useTransform(scrollYProgress, [0, 0.4, 0.6], [20, 0, 0]);
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.4, 0.85], 
    isMobile ? [0.7, 0.9, 1.15] : [1.05, 1, 1.2]
  );

  // Phase 2: Border dissolution (50-85%)
  const borderOpacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0.5, 0.85], [30, 0]);

  // Phase 1: Title fade (0-40%)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -150]);

  // No content exit - stays visible
  const contentY = useTransform(scrollYProgress, [0.95, 1], [0, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 1]);

  return (
    <div
      className="h-[70rem] md:h-[90rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={titleY} titleComponent={titleComponent} titleOpacity={titleOpacity} />
        <PortalCard 
          rotate={rotate} 
          scale={scale}
          borderOpacity={borderOpacity}
          borderRadius={borderRadius}
          contentY={contentY}
          contentOpacity={contentOpacity}
        >
          {children}
        </PortalCard>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent, titleOpacity }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
        opacity: titleOpacity,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const PortalCard = ({
  rotate,
  scale,
  borderOpacity,
  borderRadius,
  contentY,
  contentOpacity,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  borderOpacity: MotionValue<number>;
  borderRadius: MotionValue<number>;
  contentY: MotionValue<number>;
  contentOpacity: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        borderRadius: borderRadius,
        boxShadow: useTransform(
          borderOpacity,
          (opacity) => `inset 0 0 0 4px rgba(108, 108, 108, ${opacity}), 0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003`
        ),
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl overflow-hidden"
    >
      <motion.div 
        style={{
          translateY: contentY,
          opacity: contentOpacity,
        }}
        className="h-full w-full overflow-y-auto rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
