import Logo from "@/components/logo";
import Image from "next/image";
import homeImage from "../../../public/petsoft-preview.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10 ">
      <Image
        src={homeImage}
        alt="home image"
        width={519}
        height={472}
        objectFit="cover"
      />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for $299.
        </p>
        <div className="mt-10 flex gap-2">
          <Button asChild className="rounded-full">
            <Link href="/signup">Get started</Link>
          </Button>
          <Button asChild className="rounded-full" variant="secondary">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
