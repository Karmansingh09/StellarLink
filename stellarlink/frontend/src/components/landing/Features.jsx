import { BarChart3, ShieldCheck, Wallet, Zap } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';

export default function Features() {
  const featuresList = [
    {
      title: 'Autonomous Settlement',
      description: 'Execute secure machine-to-machine payments using Soroban smart contracts with instant settlement.',
      icon: Zap,
    },
    {
      title: 'Device Wallet Management',
      description: 'Manage Stellar wallets for EV chargers, robots, sensors and autonomous devices.',
      icon: Wallet,
    },
    {
      title: 'Real-Time Analytics',
      description: 'Track transactions, settlement health, throughput and network performance.',
      icon: BarChart3,
    },
    {
      title: 'Enterprise Security',
      description: 'Cryptographic verification with enterprise-grade reliability and Stellar consensus.',
      icon: ShieldCheck,
    },
  ];

  return (
    <Section spacing="xl" bg="white" id="platform">
      <Container size="full">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <Heading
            level={2}
            align="left"
            subtitle="Enterprise-grade infrastructure for autonomous machine payments built on Stellar."
          >
            Why StellarLink?
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-6 items-stretch md:grid-cols-2 xl:grid-cols-4">
          {featuresList.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                padding="generous"
                className="h-full flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[#CFE1DE]"
              >
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#CBE9E3] bg-[#EAF8F6]">
                    <Icon className="h-6 w-6 text-[#0F766E]" />
                  </div>
                  <CardHeader className="mb-3">
                    <CardTitle className="text-[1.05rem] font-semibold text-[#0F172A]">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="text-[15px] leading-7 text-[#475569]">
                    {feature.description}
                  </CardDescription>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
