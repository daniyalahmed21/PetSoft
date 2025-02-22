import Logo from "@/components/logo";
import Image from "next/image";
import homeImage from "../../../public/petsoft-preview.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10 p-8">
    
      <div className=" flex flex-col items-center xl:items-start text-center xl:text-left">
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px] leading-tight">
          Manage your{" "}
          <span className="font-extrabold text-white">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px] text-gray-100 mb-8">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $250.
        </p>
        <div className="mt-10 flex gap-4">
          <Button
            asChild
            className="rounded-full px-8 py-6 text-lg bg-black text-[#5DC9A8] hover:bg-gray-100 hover:text-black transition-colors"
          >
            <Link href="/signup">Get started</Link>
          </Button>
          <Button
            asChild
            className="rounded-full px-8 py-6 text-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#5DC9A8] transition-colors"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
      <div className=" flex justify-center xl:justify-end">
        <Image
          src={homeImage}
          alt="home image"
          width={519}
          height={472}
          className="rounded-lg shadow-2xl"
          priority // Ensures the image is loaded as a priority
        />
      </div>
    </main>
  );
}
