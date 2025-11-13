import { SplineScene } from "@/components/ui/spline";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const ScrollShowcase = () => {
  return (
    <div className="flex flex-col overflow-hidden" style={{
      background: 'linear-gradient(180deg, hsl(0 0% 0%), hsl(213 25% 3%), hsl(0 0% 0%))'
    }}>
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Modern Web Design
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold mt-2 text-primary leading-tight">
              That Stands Out
            </h3>
            <p className="mt-4 text-neutral-300 max-w-lg text-sm md:text-base text-center">
              Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
              that capture attention and enhance your design.
            </p>
          </div>
        }
      >
        {/* Split layout inside the tablet */}
        <div className="flex flex-row h-full w-full bg-black">
          {/* Left side - Text */}
          <div className="flex-[0.4] flex items-center justify-center p-6 md:p-8">
            <h3 className="text-2xl md:text-4xl font-bold text-white text-center">
              Robotics company example
            </h3>
          </div>
          
          {/* Right side - 3D Robot */}
          <div className="flex-[0.6] relative">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
};

export default ScrollShowcase;
