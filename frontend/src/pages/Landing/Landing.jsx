import { useState } from 'react';
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import IndustrySolutions from '../../components/landing/IndustrySolutions';
import EnterpriseCTA from '../../components/landing/EnterpriseCTA';
import Footer from '../../components/landing/Footer';
import DocumentationModal from '../../components/landing/DocumentationModal';

export default function Landing({ onOpenDocs, onOpenPilot, onOpenArch }) {
  const [docsOpen, setDocsOpen] = useState(false);

  const handleOpenDocs = onOpenDocs || (() => setDocsOpen(true));
  const handleCloseDocs = () => setDocsOpen(false);

  return (
    <div className="min-h-screen bg-transparent text-[#0F172A]">
      <Navbar onOpenDocs={handleOpenDocs} onOpenPilot={onOpenPilot} />
      <main>
        <Hero onOpenDocs={handleOpenDocs} />
        <Features />
        <IndustrySolutions />
        <EnterpriseCTA onOpenPilot={onOpenPilot} onOpenArch={onOpenArch} />
      </main>
      <Footer onOpenDocs={handleOpenDocs} onOpenArch={onOpenArch} />

      <DocumentationModal isOpen={docsOpen} onClose={handleCloseDocs} />
    </div>
  );
}
