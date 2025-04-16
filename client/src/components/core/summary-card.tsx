import { LucideIcon } from 'lucide-react';
import CountUp from 'react-countup';
import { Card, CardContent } from '../ui/card';

interface SummaryCardProps {
  icon: LucideIcon;
  title: string;
  count?: number;
  text?: string;
}

export function SummaryCard({ count, icon: Icon, title, text }: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="py-5 flex items-center space-x-5">
        <Icon />
        <div className="flex flex-col space-y-1.5">
          <h2 className="font-semibold text-xl">{title}</h2>
          <p className="font-medium text-lg">
            {count ? <CountUp end={count} duration={1} /> : text}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
