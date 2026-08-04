import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function EnterpriseCTA() {
  return (
    <Section spacing="xl" bg="slate" id="contact">
      <Container size="full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
        >
          <Card variant="default" padding="none" className="overflow-hidden border-[#D9E2E1] bg-white">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="max-w-2xl space-y-6">
                  <Heading
                    level={2}
                    align="left"
                    subtitle="A production-ready interface for machine payments, enterprise settlement, and Stellar-native operations."
                  >
                    Ready to deploy StellarLink?
                  </Heading>

                  <p className="max-w-xl text-base leading-7 text-[#475569] md:text-lg md:leading-8">
                    Use StellarLink to bring together devices, ledger settlement, and enterprise controls in one coherent operating surface.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                        Start a Pilot
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" size="lg">
                        View Architecture
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E2E8F0] bg-[#F8FAFC] p-6 sm:p-8 md:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <div className="flex h-full flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#CBE9E3] bg-[#EAF8F6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F766E]">
                      <ShieldCheck className="h-4 w-4" />
                      Enterprise-ready
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748B]">
                        Implementation posture
                      </p>
                      <p className="font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-[#0F172A]">
                        Calm, structured, production-grade
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {[
                      ['Ledger', 'Stellar'],
                      ['Contracts', 'Soroban'],
                      ['Surface', 'Enterprise'],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[16px] border border-[#E2E8F0] bg-white px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">{label}</p>
                        <p className="mt-1 font-['Space_Grotesk'] text-lg font-semibold tracking-tight text-[#0F172A]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </Section>
  );
}