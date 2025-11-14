import Hero from "@/components/Hero";
import ScrollShowcase from "@/components/ScrollShowcase";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
const Home = () => {
  return <div className="min-h-screen">
      <Hero />
      <ScrollShowcase />
      <Services />
      <Contact />
    </div>;
};
export default Home;