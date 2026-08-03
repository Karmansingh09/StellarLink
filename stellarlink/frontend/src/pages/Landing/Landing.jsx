import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
