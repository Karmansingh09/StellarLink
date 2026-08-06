import clsx from 'clsx';
import Badge from '../ui/Badge';

const statusMap = {
  active: { label: 'Active', variant: 'success' },
  healthy: { label: 'Healthy', variant: 'success' },
  settled: { label: 'Settled', variant: 'primary' },
  pending: { label: 'Pending', variant: 'warning' },
  warning: { label: 'Warning', variant: 'warning' },
  offline: { label: 'Offline', variant: 'error' },
  failed: { label: 'Failed', variant: 'error' },
  sync: { label: 'Syncing', variant: 'secondary' },
  monitoring: { label: 'Monitoring', variant: 'accent' },
};

export default function StatusBadge({ status = 'active', children, className = '', ...props }) {
  const config = statusMap[status] ?? statusMap.active;

  return (
    <Badge variant={config.variant} dot size="sm" className={clsx('whitespace-nowrap', className)} {...props}>
      {children ?? config.label}
    </Badge>
  );
}