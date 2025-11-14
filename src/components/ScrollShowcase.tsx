import { SplineScene } from "@/components/ui/spline";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

const ScrollShowcase = () => {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(0 0% 0%), hsl(213 25% 3%), hsl(0 0% 0%))",
      }}
    >
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
              Modern Web Design
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold mt-2 text-primary leading-tight">That Stands Out</h3>
            <p className="mt-4 text-neutral-300 max-w-xl text-sm md:text-base">
              Bring your website to life with immersive 3D visuals and smooth scroll interactions that keep visitors
              engaged.
            </p>
          </div>
        }
      >
        <div className="flex flex-col h-full bg-black">
          {/* 1) Robot hero "inside" the tablet */}
          <section className="min-h-[600px] md:min-h-[650px] flex flex-col md:flex-row">
            {/* Left: text */}
            <div className="flex-[0.4] flex items-center justify-center p-6 md:p-8">
              <h3 className="text-3xl md:text-5xl font-bold text-white text-center">Robotics company example</h3>
            </div>

            {/* Right: 3D Robot */}
            <div className="flex-[0.6] relative">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </section>

          {/* 2) Services section – appears immediately after robot */}
          <section className="bg-black">
            <Services />
          </section>

          {/* 3) Contact section */}
          <section className="bg-black">
            <Contact />
          </section>
        </div>
      </ContainerScroll>
    </div>
  );
};

export default ScrollShowcase;
