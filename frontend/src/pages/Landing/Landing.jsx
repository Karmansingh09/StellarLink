import { useState } from 'react';
import Navbar from '../../components/landing/Navbar';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import IndustrySolutions from '../../components/landing/IndustrySolutions';
import EnterpriseCTA from '../../components/landing/EnterpriseCTA';
import Footer from '../../components/landing/Footer';
import DocumentationModal from '../../components/landing/DocumentationModal';
import PilotOnboardingModal from '../../components/landing/PilotOnboardingModal';
import ArchitectureModal from '../../components/landing/ArchitectureModal';

export default function Landing({ onOpenDocs, onOpenPilot, onOpenArch }) {
  const [docsOpen, setDocsOpen] = useState(false);
  const [pilotOpen, setPilotOpen] = useState(false);
  const [archOpen, setArchOpen] = useState(false);

  const handleOpenDocs = onOpenDocs || (() => setDocsOpen(true));
  const handleCloseDocs = () => setDocsOpen(false);

  const handleOpenPilot = onOpenPilot || (() => setPilotOpen(true));
  const handleClosePilot = () => setPilotOpen(false);

  const handleOpenArch = onOpenArch || (() => setArchOpen(true));
  const handleCloseArch = () => setArchOpen(false);

  return (
    <div className="min-h-screen bg-transparent text-[#0F172A]">
      <Navbar onOpenDocs={handleOpenDocs} onOpenPilot={handleOpenPilot} />
      <main>
        <Hero onOpenDocs={handleOpenDocs} />
        <Features />
        <IndustrySolutions />
        <EnterpriseCTA onOpenPilot={handleOpenPilot} onOpenArch={handleOpenArch} />
      </main>
      <Footer onOpenDocs={handleOpenDocs} onOpenArch={handleOpenArch} />

      <DocumentationModal isOpen={docsOpen} onClose={handleCloseDocs} />
      <PilotOnboardingModal isOpen={pilotOpen} onClose={handleClosePilot} />
      <ArchitectureModal isOpen={archOpen} onClose={handleCloseArch} />
    </div>
  );
}
