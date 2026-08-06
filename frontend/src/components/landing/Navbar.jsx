import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Platform', href: '#platform' },
    { name: 'Infrastructure', href: '#infrastructure' },
    { name: 'Developers', href: '#developers' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Documentation', href: '#documentation' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0]/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-360 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="rounded-2xl p-1 transition-colors hover:bg-[#F1F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/30">
          <Logo size="md" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#475569] transition-colors duration-150 hover:text-[#0F172A]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" size="md">
            Read Docs
          </Button>
          <Link to="/dashboard">
            <Button variant="primary" size="md">
              Launch Platform
            </Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-2xl p-2 text-[#475569] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/30 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#E2E8F0] bg-white px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-3 py-2 text-base font-medium text-[#475569] transition-colors hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-4 grid gap-3">
            <Button variant="outline" size="md" fullWidth>
              Read Docs
            </Button>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" fullWidth>
                Launch Platform
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
