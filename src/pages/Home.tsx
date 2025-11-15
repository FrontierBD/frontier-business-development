import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";

const TabletZoomParallax = lazy(() => import("@/components/TabletZoomParallax"));
const Services = lazy(() => import("@/components/Services"));
const Contact = lazy(() => import("@/components/Contact"));

const SectionLoader = () => <div className="min-h-screen bg-black" />;

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />

      {/* Add a little space below the hero */}
      <div className="mt-24"></div>

      {/* Zoom-into-tablet section */}
      <Suspense fallback={<SectionLoader />}>
        <TabletZoomParallax />
      </Suspense>

      {/* Rest of the site – visible after you go through the tablet section */}
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </div>
  );
};

export default Home;
