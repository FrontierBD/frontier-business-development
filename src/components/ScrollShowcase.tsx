import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

const ScrollShowcase = () => {
  return (
    <div className="flex flex-col overflow-hidden py-4 md:py-8" style={{
      background: 'linear-gradient(180deg, hsl(0 0% 0%), hsl(213 25% 3%), hsl(0 0% 0%))'
    }}>
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-4xl font-semibold text-foreground">
              Modern Web Design <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-primary">
                That Stands Out
              </span>
            </h2>
          </>
        }
      >
        <div className="mx-auto rounded-2xl w-full h-full bg-black flex items-center justify-center p-4">
          <RotatingEarth width={800} height={600} />
        </div>
      </ContainerScroll>
    </div>
  );
};

export default ScrollShowcase;
