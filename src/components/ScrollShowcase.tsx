import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from '@/components/ui/liquid-glass-button';
const ScrollShowcase = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <div className="flex flex-col overflow-hidden py-4 md:py-8" style={{
    background: 'linear-gradient(180deg, hsl(0 0% 0%), hsl(213 25% 3%), hsl(0 0% 0%))'
  }}>
      <ContainerScroll titleComponent={<>
            <h2 className="text-4xl font-semibold text-foreground">
              Modern Web Design <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-primary">
                That Stands Out
              </span>
            </h2>
          </>}>
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <WebGLShader />
          <div className="relative flex flex-col items-center justify-center h-full p-4 md:p-8">
            <h1 className="mb-2 md:mb-3 text-white text-center text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter">
              Design is Everything
            </h1>
            <p className="text-white/60 px-4 md:px-6 text-xs md:text-sm max-w-2xl text-center lg:text-base">
              Stand Out Where Your 
Competitors Don’t                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            </p>
            <div className="my-4 md:my-6 flex items-center justify-center gap-1">
              
              
            </div>
            
            <div className="flex justify-center"> 
              <LiquidButton onClick={scrollToServices} className="text-white border rounded-full text-sm md:text-base" size={'xl'}>
                Services
              </LiquidButton> 
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>;
};
export default ScrollShowcase;