import ExtraSections from "@/components/home/ExtraSections";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import { Suspense } from "react";



export default function Home() {
  return (
    <main>
      <Hero/>
      <Suspense fallback={<p className="py-16 text-center">Loading books...</p>}>
        <NewArrivals />
      </Suspense>
      <ExtraSections/>
    </main>
  );
}