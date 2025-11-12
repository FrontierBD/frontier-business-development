import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
const Home = () => {
  return <div className="min-h-screen">
      <Hero />
      <Services className="bg-black" />
      <Contact />
    </div>;
};
export default Home;