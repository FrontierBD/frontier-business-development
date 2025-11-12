import { ContainerScroll } from "@/components/ui/container-scroll-animation";

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
        <video
          className="w-full h-full object-cover rounded-xl"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/website-scroll-demo.mp4" type="video/mp4" />
        </video>
      </ContainerScroll>
    </div>
  );
};

export default ScrollShowcase;
