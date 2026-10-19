import { Comparison } from "@/components/Comparison";
import { Faq, FaqJsonLd } from "@/components/Faq";
import { Features } from "@/components/Features";
import { FinalCta, Footer, WhatsAppFloat } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Comparison />
        <Features />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
      <FaqJsonLd />
    </>
  );
}
