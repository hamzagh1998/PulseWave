import useCurrentTheme from "@/hooks/use-current-theme";

export function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = useCurrentTheme();
  return (
    <div className="p-4 flex justify-center items-center flex-col h-screen">
      <div className="sm:grid sm:grid-cols-12 gap-20">
        <div className="sm:col-span-6 hidden sm:block">
          <div className="flex justify-center items-center gap-6">
            <img
              className="w-40 h-4w-40 mb-4"
              src={
                theme === "dark" ? "wave-logo-dark.png" : "wave-logo-light.png"
              }
              alt="logo"
            />
            <p className="text-6xl">PulseWave</p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center flex-col sm:col-span-6">
          <img
            className="w-20 h-2w-20 mb-4 sm:hidden"
            src={
              theme === "dark" ? "wave-logo-dark.png" : "wave-logo-light.png"
            }
            alt="logo"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
