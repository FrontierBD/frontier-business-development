import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const ScrollShowcase = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-background">
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
        <div className="mx-auto rounded-2xl w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <p className="text-2xl md:text-4xl font-bold text-center text-muted-foreground">
            Your Website Preview
          </p>
        </div>
      </ContainerScroll>
    </div>
  );
};

export default ScrollShowcase;
