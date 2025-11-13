import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

const ScrollShowcase = () => {
  return (
    <div className="flex flex-col overflow-hidden py-8 md:py-16" style={{
      background: 'linear-gradient(180deg, hsl(0 0% 0%), hsl(213 25% 3%), hsl(0 0% 0%))'
    }}>
      <Card className="w-full max-w-7xl mx-auto h-[500px] md:h-[600px] bg-black/[0.96] relative overflow-hidden border-primary/20">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          size={300}
        />
        
        <div className="flex flex-col md:flex-row h-full">
          {/* Left content */}
          <div className="flex-1 p-6 md:p-8 relative z-10 flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Modern Web Design
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold mt-2 text-primary leading-tight">
              That Stands Out
            </h3>
            <p className="mt-4 text-neutral-300 max-w-lg text-sm md:text-base">
              Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
              that capture attention and enhance your design.
            </p>
          </div>

          {/* Right content - 3D Scene */}
          <div className="flex-1 relative">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScrollShowcase;
