import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, ShieldCheck } from 'lucide-react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';

export default function Footer({ onOpenDocs, onOpenArch }) {
  const links = [
    { label: 'Platform', href: '#platform' },
    { label: 'Infrastructure', href: '#infrastructure' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-10 md:py-12">
      <Container size="full">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl space-y-4"
          >
            <Logo size="md" />
            <p className="max-w-xl text-sm leading-6 text-[#64748B]">
              StellarLink is a production-grade Stellar interface for enterprise machine payments, designed for calm operations and clear execution.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#475569]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1">
                <Globe className="h-4 w-4 text-[#0F766E]" />
                Stellar network
              </span>
              <button
                type="button"
                onClick={onOpenArch}
                className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1 hover:border-[#0F766E]/40 hover:text-[#0F766E] transition-colors"
              >
                <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
                View Architecture
              </button>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 md:items-end">
            <nav className="flex flex-wrap gap-4 text-sm font-medium text-[#475569]">
              {links.map((link) => (
                <a key={link.label} href={link.href} className="transition-colors hover:text-[#0F172A]">
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] transition-transform hover:-translate-y-0.5"
            >
              Back to top
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}