import useCurrentTheme from "@/hooks/use-current-theme";

export function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = useCurrentTheme();
  return (
    <div className="p-4 flex justify-center items-center flex-col h-screen">
      <div className="lg:grid lg:grid-cols-12 gap-20 h-screen">
        <div className="hidden lg:flex lg:col-span-6 justify-center items-center flex-col">
          <div className="flex justify-center items-center gap-6">
            <img
              className="w-40 h-40 mb-4"
              src={
                theme === "dark" ? "wave-logo-dark.png" : "wave-logo-light.png"
              }
              alt="logo"
            />
            <p className="text-6xl">WavePulse</p>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-xl text-muted-foreground text-center">
              Connecting You with friends and the world around you!
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-col lg:col-span-6">
          <div className="w-full flex justify-center items-center gap-4">
            <img
              className="w-20 h-20 mb-4 sm:block"
              src={
                theme === "dark" ? "wave-logo-dark.png" : "wave-logo-light.png"
              }
              alt="logo"
            />
            <p className="font-bold text-3xl sm:block">WavePulse</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
