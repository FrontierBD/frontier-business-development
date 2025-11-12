import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
const Home = () => {
  return <div className="min-h-screen">
      <Hero />
      <div style={{
      background: 'linear-gradient(to bottom, #000000, #141414, #000000)'
    }}>
        <Services className="bg-inherit" />
        <Contact />
      </div>
    </div>;
};
export default Home;