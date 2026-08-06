import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import IndustrySolutions from '../../components/landing/IndustrySolutions';
import EnterpriseCTA from '../../components/landing/EnterpriseCTA';
import Footer from '../../components/landing/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-transparent text-[#0F172A]">
      <Navbar />
      <main>
        <Hero />
        <IndustrySolutions />
        <EnterpriseCTA />
      </main>
      <Footer />
    </div>
  );
}
