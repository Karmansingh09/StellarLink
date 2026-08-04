import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';

export default function Landing() {
  return (
    <div className="min-h-screen bg-transparent text-[#0F172A]">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
}
