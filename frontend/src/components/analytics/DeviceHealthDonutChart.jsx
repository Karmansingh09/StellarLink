import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription } from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import { Cpu } from 'lucide-react';
import useDevices from '../../hooks/useDevices';

export default function DeviceHealthDonutChart() {
  const { data: devices = [], isLoading } = useDevices();

  const total = devices.length;
  const healthyCount = devices.filter((d) => ['active', 'settled', 'monitoring'].includes((d.status || '').toLowerCase())).length;
  const warningCount = devices.filter((d) => ['pending', 'warning'].includes((d.status || '').toLowerCase())).length;
  const offlineCount = devices.filter((d) => (d.status || '').toLowerCase() === 'offline').length;

  const pct = total > 0 ? Math.round((healthyCount / total) * 100) : 0;

  const data = [
    { name: 'Healthy', value: healthyCount, color: '#0F766E' },
    { name: 'Warning', value: warningCount, color: '#F59E0B' },
    { name: 'Offline', value: offlineCount, color: '#EF4444' },
  ].filter((entry) => entry.value > 0);

  return (
    <Card padding="generous" className="h-full min-w-0">
      <CardHeader className="mb-2">
        <CardTitle className="text-base font-semibold text-[#0F172A]">Device Health</CardTitle>
        <CardDescription className="text-xs">Fleet operational status calculated from device registry</CardDescription>
      </CardHeader>

      <div className="h-56 sm:h-64 w-full flex items-center justify-center relative">
        {isLoading ? (
          <div className="text-xs text-[#64748B]">Loading device status...</div>
        ) : total === 0 ? (
          <EmptyState
            icon={Cpu}
            title="No Devices Registered"
            description="No machine endpoints currently provisioned in the control plane."
          />
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={3} stroke="none">
                  {data.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-xl font-bold font-['Space_Grotesk'] text-[#0F172A]">{pct}%</span>
              <span className="text-[10px] text-[#64748B]">Healthy Fleet</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
