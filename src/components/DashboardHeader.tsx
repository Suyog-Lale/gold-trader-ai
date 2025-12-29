import { Activity, Wifi, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export const DashboardHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">GoldTrader AI</h1>
            <p className="text-xs text-muted-foreground -mt-0.5">Smart Signal Dashboard</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <Wifi className="w-4 h-4 text-success animate-pulse" />
          <span className="text-success font-medium">Connected</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="font-mono">
            {time.toLocaleTimeString('en-US', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit', 
              second: '2-digit' 
            })}
          </span>
          <span className="text-xs">UTC</span>
        </div>

        <div className="h-8 w-px bg-border" />

        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-mono text-primary">$2,654.82</span>
            <span className="text-success text-sm font-medium">+0.42%</span>
          </div>
          <p className="text-xs text-muted-foreground">XAU/USD Spot Price</p>
        </div>
      </div>
    </header>
  );
};
