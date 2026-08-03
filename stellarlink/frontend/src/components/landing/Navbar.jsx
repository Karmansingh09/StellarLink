import { useState } from 'react';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="focus:outline-none focus:ring-2 focus:ring-[#0F766E] rounded-xl p-1">
              <Logo size="md" />
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Button variant="primary" size="md">
              Launch Platform
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-[#475569] hover:text-[#0F172A] hover:bg-slate-50 rounded-xl transition-colors duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <Button variant="primary" size="md" fullWidth>
              Launch Platform
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
