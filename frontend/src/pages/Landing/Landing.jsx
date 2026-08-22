import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import IndustrySolutions from '../../components/landing/IndustrySolutions';
import EnterpriseCTA from '../../components/landing/EnterpriseCTA';
import Footer from '../../components/landing/Footer';

export default function Landing({ onOpenDocs, onOpenPilot, onOpenArch }) {
  return (
    <div className="min-h-screen bg-transparent text-[#0F172A]">
      <Navbar onOpenDocs={onOpenDocs} onOpenPilot={onOpenPilot} />
      <main>
        <Hero onOpenDocs={onOpenDocs} />
        <Features />
        <IndustrySolutions />
        <EnterpriseCTA onOpenPilot={onOpenPilot} onOpenArch={onOpenArch} />
      </main>
      <Footer onOpenDocs={onOpenDocs} onOpenArch={onOpenArch} />
    </div>
  );
}
