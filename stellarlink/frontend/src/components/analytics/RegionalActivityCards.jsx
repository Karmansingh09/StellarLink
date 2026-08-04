import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import { Globe, MapPin } from 'lucide-react';

const regions = [
  { name: 'North America', activeDevices: '3,910', volume: '$18.4M', share: '38%', status: 'active' },
  { name: 'Europe West', activeDevices: '4,820', volume: '$22.1M', share: '42%', status: 'active' },
  { name: 'Asia Pacific', activeDevices: '2,450', volume: '$6.2M', share: '15%', status: 'active' },
  { name: 'South America & ME', activeDevices: '980', volume: '$1.5M', share: '5%', status: 'active' },
];

export default function RegionalActivityCards() {
  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Regional Activity & Volume Share</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Geographic distribution of connected devices and settlement volume</CardDescription>
          </div>
          <Badge variant="primary" dot size="sm">
            4 Regions Active
          </Badge>
        </div>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {regions.map((reg) => (
          <motion.div
            key={reg.name}
            whileHover={{ y: -2 }}
            className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                <MapPin className="h-4 w-4 text-[#0F766E]" />
                <span>{reg.name}</span>
              </div>
              <Badge variant="success" size="sm">
                {reg.share} Share
              </Badge>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0] space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Active Devices</span>
                <span className="font-semibold text-[#0F172A]">{reg.activeDevices}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Settlement Volume</span>
                <span className="font-mono font-bold text-[#0F766E]">{reg.volume}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
