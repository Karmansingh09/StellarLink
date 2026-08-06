import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Cpu, Globe, ShieldCheck, Zap } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Heading from '../ui/Heading';
import Container from '../ui/Container';

export default function Hero() {
  const trustBadges = [
    { name: 'Built on Stellar', icon: Globe },
    { name: 'Soroban Ready', icon: Cpu },
    { name: 'Enterprise Security', icon: ShieldCheck },
    { name: 'Fast Settlement', icon: Zap },
  ];

  const nodes = [
    { label: 'IoT Device', detail: 'Telemetry feed', icon: Cpu, active: false },
    { label: 'Soroban', detail: 'Smart contract', icon: Zap, active: true },
    { label: 'Stellar Core', detail: 'Instant finality', icon: Globe, active: false },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#E2E8F0]/80 bg-white py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[#0F766E]/8 blur-3xl" />
        <div className="absolute right-[-6rem] top-10 h-80 w-80 rounded-full bg-[#60A5FA]/8 blur-3xl" />
      </div>

      <Container size="full" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 flex flex-col items-start gap-6">
            <Badge variant="primary" dot size="lg" className="tracking-wide">
              Autonomous Machine-to-Machine Settlement
            </Badge>

            <Heading level={1} className="max-w-3xl">
              Enterprise machine-to-machine payments on Stellar
            </Heading>

            <p className="max-w-2xl text-lg leading-8 text-[#475569] md:text-xl">
              Automated micro-settlements, device wallet management, and sub-second liquidity built for autonomous IoT economies and machine networks.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link to="/dashboard">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Launch Platform
                </Button>
              </Link>
              <Button variant="outline" size="lg" icon={BookOpen} iconPosition="left">
                Read Documentation
              </Button>
            </div>

            <div className="w-full border-t border-[#E2E8F0] pt-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                Enterprise infrastructure standard
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;

                  return (
                    <div
                      key={badge.name}
                      className="flex items-center gap-2 rounded-[14px] border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs font-semibold text-[#0F172A]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#0F766E]" />
                      <span className="truncate">{badge.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Card variant="flat" padding="generous" className="relative overflow-hidden border-[#E2E8F0] bg-[#F8FAFC]">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent" />

              <div className="relative flex min-h-[380px] flex-col gap-6 rounded-[18px] border border-[#E2E8F0] bg-white p-5 sm:p-6">
                <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E]/10 text-[#0F766E]">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                        M2M Node Cluster #082
                      </p>
                      <p className="text-sm text-[#475569]">Operational settlement layer</p>
                    </div>
                  </div>

                  <Badge variant="success" dot size="sm">
                    Network active
                  </Badge>
                </div>

                <div className="grid gap-3 md:grid-cols-[1fr_0.8fr_1fr] md:gap-4">
                  {nodes.map((node, index) => {
                    const Icon = node.icon;

                    return (
                      <div
                        key={node.label}
                        className={[
                          'rounded-[16px] border p-4 transition-colors',
                          node.active
                            ? 'border-[#CBE9E3] bg-[#EAF8F6]'
                            : 'border-[#E2E8F0] bg-[#F8FAFC]',
                        ].join(' ')}
                      >
                        <div className="flex h-full flex-col items-center justify-between gap-3 text-center">
                          <div className={node.active ? 'text-[#0F766E]' : 'text-[#0F172A]'}>
                            <Icon className="h-7 w-7" />
                          </div>

                          <div>
                            <p className={['text-sm font-semibold', node.active ? 'text-[#0F766E]' : 'text-[#0F172A]'].join(' ')}>
                              {node.label}
                            </p>
                            <p className={['text-xs', node.active ? 'text-[#0F766E]' : 'text-[#64748B]'].join(' ')}>
                              {node.detail}
                            </p>
                          </div>

                          <div className={node.active ? 'flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0F766E] shadow-[0_1px_2px_rgba(15,23,42,0.06)]' : 'flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B]'}>
                            <span className="text-xs font-semibold">0{index + 1}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Settlement latency', value: '< 500ms' },
                    { label: 'Proof verification', value: 'On-chain' },
                    { label: 'Finality mode', value: 'Instant' },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                        {metric.label}
                      </p>
                      <p className="mt-1 font-['Space_Grotesk'] text-lg font-semibold tracking-tight text-[#0F172A]">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-[#E2E8F0] pt-4 text-sm text-[#475569] sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
                    <span>Cryptographic proof verification</span>
                  </div>
                  <span className="font-mono text-xs font-medium tracking-[0.12em] text-[#0F766E]">
                    LIVE / LINKED / VERIFIED
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
