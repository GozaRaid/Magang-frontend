import { Hero } from "@/components/layouts/hero";
import { About } from "@/components/layouts/about";
import { Speakers } from "@/components/layouts/speakers";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Hero />
      <About />
      <Speakers />
    </div>
  );
}
