import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { MapPin, Globe } from 'lucide-react';
import useDevices from '../../hooks/useDevices';

export default function RegionalActivityCards() {
  const { data: devices = [], isLoading } = useDevices();

  const total = devices.length;

  // Group devices by real region
  const regionMap = {};
  devices.forEach((d) => {
    const reg = d.region || 'Unassigned Region';
    if (!regionMap[reg]) {
      regionMap[reg] = { name: reg, count: 0, activeCount: 0 };
    }
    regionMap[reg].count++;
    if (['active', 'settled', 'monitoring'].includes((d.status || '').toLowerCase())) {
      regionMap[reg].activeCount++;
    }
  });

  const regionsList = Object.values(regionMap).map((r) => ({
    ...r,
    share: total > 0 ? `${Math.round((r.count / total) * 100)}%` : '0%',
  }));

  return (
    <Card padding="generous">
      <CardHeader className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg font-semibold text-[#0F172A]">Regional Fleet Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Geographic breakdown of registered devices across operating regions</CardDescription>
          </div>
          <Badge variant="primary" dot size="sm">
            {regionsList.length} Regions Provisioned
          </Badge>
        </div>
      </CardHeader>

      {isLoading ? (
        <div className="py-8 text-center text-xs text-[#64748B]">Loading regional fleet distribution...</div>
      ) : regionsList.length === 0 ? (
        <EmptyState
          icon={Globe}
          title="No Regional Fleet Data"
          description="No registered devices found across operating regions."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {regionsList.map((reg) => (
            <motion.div
              key={reg.name}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3 min-w-0"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                  <MapPin className="h-4 w-4 text-[#0F766E] shrink-0" />
                  <span className="truncate">{reg.name}</span>
                </div>
                <Badge variant="success" size="sm" className="shrink-0">
                  {reg.share} Fleet
                </Badge>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Registered Endpoints</span>
                  <span className="font-semibold text-[#0F172A]">{reg.count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Healthy Status</span>
                  <span className="font-bold text-[#0F766E]">{reg.activeCount} Active</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}
