import Hero from "@/components/Hero";
import TabletZoomParallax from "@/components/TabletZoomParallax";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />

      {/* Zoom-into-tablet section */}
      <TabletZoomParallax />

      {/* Rest of the site – visible after you go through the tablet section */}
      <Services />
      <Contact />
    </div>
  );
};

export default Home;
