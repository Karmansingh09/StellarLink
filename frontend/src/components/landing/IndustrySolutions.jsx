import { motion } from 'framer-motion';
import { BarChart3, BatteryCharging, Cpu, Navigation, ShieldCheck, Warehouse } from 'lucide-react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import Badge from '../ui/Badge';
import IndustryCard from './IndustryCard';

export default function IndustrySolutions() {
  const industries = [
    {
      title: 'EV Charging Networks',
      description: 'Automate charging sessions, route payments, and settle usage-based billing for public and private charging fleets.',
      icon: BatteryCharging,
      stat: { label: 'Settlement', value: 'Instant' },
      accent: 'teal',
    },
    {
      title: 'Autonomous Logistics',
      description: 'Coordinate fleet triggers, route confirmations, and machine-to-machine payment release for logistics operations.',
      icon: Navigation,
      stat: { label: 'Ops layer', value: 'Live' },
      accent: 'slate',
    },
    {
      title: 'Industrial IoT',
      description: 'Connect sensors, controllers, and telemetry systems to settlement rails without manual intervention.',
      icon: Cpu,
      stat: { label: 'Latency', value: '< 500ms' },
      accent: 'navy',
    },
    {
      title: 'Supply Chain',
      description: 'Clear milestone-based payments between machines, warehouses, and fulfillment nodes with deterministic finality.',
      icon: Warehouse,
      stat: { label: 'Finality', value: 'Stellar' },
      accent: 'teal',
    },
    {
      title: 'Settlement Analytics',
      description: 'Track throughput, device health, and transaction flow with a clean operational view for finance teams.',
      icon: BarChart3,
      stat: { label: 'Reporting', value: 'Real-time' },
      accent: 'slate',
    },
    {
      title: 'Security & Controls',
      description: 'Use policy-based permissions and cryptographic verification to keep machine settlement auditable and safe.',
      icon: ShieldCheck,
      stat: { label: 'Trust', value: 'Enterprise' },
      accent: 'navy',
    },
  ];

  return (
    <Section spacing="xl" bg="white" id="infrastructure">
      <Container size="full">
        <div className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="max-w-3xl"
          >
            <Badge variant="primary" size="sm" dot className="mb-4">
              Industry Solutions
            </Badge>
            <Heading
              level={2}
              align="left"
              subtitle="Built for enterprise machine networks that need deterministic settlement, strong security, and a calm operational interface."
            >
              Solutions for connected industries
            </Heading>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.title}
              title={industry.title}
              description={industry.description}
              icon={industry.icon}
              stat={industry.stat}
              accent={industry.accent}
              delay={index * 0.03}
            />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}