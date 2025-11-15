import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";

const Services = lazy(() => import("@/components/Services"));
const Contact = lazy(() => import("@/components/Contact"));

const SectionLoader = () => <div className="min-h-screen bg-black" />;

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />

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
