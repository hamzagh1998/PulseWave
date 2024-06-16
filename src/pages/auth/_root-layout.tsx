import useCurrentTheme from "@/hooks/use-current-theme";

export function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = useCurrentTheme();
  return (
    <div className="p-4 flex justify-center items-center flex-col min-h-screen">
      <div className="w-full max-w-screen-lg mx-auto lg:grid lg:grid-cols-12 gap-20 h-full lg:h-auto">
        <div className="hidden lg:flex lg:col-span-6 justify-center items-center flex-col lg:justify-start lg:items-start mb-8 lg:mb-0">
          <div className="flex justify-center items-center gap-6">
            <img
              className="w-32 h-32 lg:w-40 lg:h-40 mb-4"
              src={
                theme === "dark" ? "wave-logo-dark.png" : "wave-logo-light.png"
              }
              alt="logo"
            />
            <p className="text-4xl lg:text-6xl">PulseChat</p>
          </div>
          <div className="flex justify-center items-center lg:justify-start lg:items-start">
            <p className="text-lg lg:text-xl text-muted-foreground text-center lg:text-left">
              Connecting you with friends and the world around you!
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-col lg:col-span-6">
          <div className="w-full flex justify-center items-center gap-4 lg:hidden mb-4">
            <img
              className="w-16 h-16 lg:w-20 lg:h-20"
              src={
                theme === "dark" ? "wave-logo-dark.png" : "wave-logo-light.png"
              }
              alt="logo"
            />
            <p className="font-bold text-2xl lg:text-3xl">PulseChat</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
