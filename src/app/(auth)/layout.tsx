import Logo from "@/components/logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#5DC9A8] to-[#4CAF91]">
      <div className="flex justify-center bg-white flex-col items-center shadow-md space-y-4 rounded-lg p-8 ">
        <Logo />
        {children}
      </div>
    </div>
  );
}
