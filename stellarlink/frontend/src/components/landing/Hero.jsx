import { ArrowRight, BookOpen, ShieldCheck, Zap, Cpu, Globe } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import Container from '../ui/Container';

export default function Hero() {
  const trustBadges = [
    { name: 'Built on Stellar', icon: Globe },
    { name: 'Soroban Smart Contracts', icon: Cpu },
    { name: 'Enterprise Security', icon: ShieldCheck },
    { name: 'Millisecond Settlement', icon: Zap },
  ];

  return (
    <section className="bg-white py-12 md:py-20 border-b border-[#E2E8F0]">
      <Container size="full" className="max-w-[1440px]">
        {/* 12-column Grid Layout on Desktop */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 flex flex-col items-start gap-6">
            <Badge variant="primary" dot size="lg">
              Autonomous Machine-to-Machine Settlement
            </Badge>

            <Heading level={1} className="leading-tight">
              Enterprise Machine-to-Machine Payments on Stellar
            </Heading>

            <p className="text-lg md:text-xl text-[#475569] leading-relaxed">
              Automated micro-settlements, device wallet management, and sub-second liquidity built for autonomous IoT economies and machine networks.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Launch Platform
              </Button>
              <Button variant="outline" size="lg" icon={BookOpen} iconPosition="left">
                Read Documentation
              </Button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-8 w-full border-t border-[#E2E8F0] mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#475569] mb-4">
                Enterprise Infrastructure Standard
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.name}
                      className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] bg-slate-50 border border-[#E2E8F0] rounded-xl px-3 py-2"
                    >
                      <Icon className="w-4 h-4 text-[#0F766E] shrink-0" />
                      <span className="truncate">{badge.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Enterprise M2M Illustration Placeholder */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Card padding="generous" className="bg-slate-50 border-[#E2E8F0]">
              <div className="w-full h-auto min-h-[340px] flex flex-col justify-between gap-6 bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
                {/* Header Node Row */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#0F766E]" />
                    <span className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
                      M2M Node Cluster #082
                    </span>
                  </div>
                  <Badge variant="success" dot size="sm">
                    Network Active
                  </Badge>
                </div>

                {/* Architecture Diagram Diagram Scheme */}
                <div className="grid grid-cols-3 gap-4 text-center py-4">
                  <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl flex flex-col items-center gap-2">
                    <Cpu className="w-6 h-6 text-[#0F766E]" />
                    <span className="text-xs font-semibold text-[#0F172A]">IoT Device</span>
                    <span className="text-[10px] text-[#475569]">Telemetry Feed</span>
                  </div>

                  <div className="p-3 bg-teal-50 border border-teal-200/80 rounded-xl flex flex-col items-center gap-2">
                    <Zap className="w-6 h-6 text-[#0F766E]" />
                    <span className="text-xs font-semibold text-[#0F766E]">Soroban</span>
                    <span className="text-[10px] text-[#0F766E]">Smart Contract</span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-[#E2E8F0] rounded-xl flex flex-col items-center gap-2">
                    <Globe className="w-6 h-6 text-[#0F766E]" />
                    <span className="text-xs font-semibold text-[#0F172A]">Stellar Core</span>
                    <span className="text-[10px] text-[#475569]">Instant Finality</span>
                  </div>
                </div>

                {/* Bottom Status Row */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#475569]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                    <span>Cryptographic Proof Verification</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#0F766E] font-medium">
                    &lt; 500ms latency
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
