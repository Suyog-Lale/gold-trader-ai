import { TrendingUp, TrendingDown, Target, ShieldAlert, Zap, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { currentSignal } from '@/data/tradingData';
import { cn } from '@/lib/utils';

export const AISignalPanel = () => {
  const isLong = currentSignal.type === 'LONG';

  return (
    <div className="h-full flex flex-col gap-4 p-4 bg-sidebar border-l border-border overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">AI Agent Signals</h2>
        </div>
        <Badge variant={currentSignal.status === 'ACTIVE' ? 'default' : 'secondary'} className="animate-pulse-glow">
          {currentSignal.status}
        </Badge>
      </div>

      {/* Signal Type */}
      <Card className="card-glow border-primary/30">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {isLong ? (
                <div className="p-2 rounded-lg bg-success/20">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              ) : (
                <div className="p-2 rounded-lg bg-destructive/20">
                  <TrendingDown className="w-6 h-6 text-destructive" />
                </div>
              )}
              <div>
                <span className={cn(
                  "text-2xl font-bold font-mono",
                  isLong ? "text-success" : "text-destructive"
                )}>
                  {currentSignal.type}
                </span>
                <p className="text-xs text-muted-foreground">Signal Direction</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-primary font-bold font-mono">{currentSignal.confidence}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Confidence</p>
            </div>
          </div>
          <Progress value={currentSignal.confidence} className="h-2 bg-muted" />
        </CardContent>
      </Card>

      {/* Price Levels */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <Target className="w-4 h-4" />
            Price Levels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="data-row">
            <span className="text-muted-foreground text-sm">Entry Price</span>
            <span className="font-mono font-semibold text-primary">${currentSignal.entry.toFixed(2)}</span>
          </div>
          <div className="data-row">
            <span className="text-muted-foreground text-sm flex items-center gap-2">
              <ShieldAlert className="w-3 h-3 text-destructive" />
              Stop Loss
            </span>
            <span className="font-mono font-semibold text-destructive">${currentSignal.stopLoss.toFixed(2)}</span>
          </div>
          <div className="border-t border-border/50 pt-2 mt-2">
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Take Profit Targets</p>
            <div className="data-row">
              <span className="text-muted-foreground text-sm">TP1</span>
              <span className="font-mono font-medium text-success">${currentSignal.takeProfit1.toFixed(2)}</span>
            </div>
            <div className="data-row">
              <span className="text-muted-foreground text-sm">TP2</span>
              <span className="font-mono font-medium text-success">${currentSignal.takeProfit2.toFixed(2)}</span>
            </div>
            <div className="data-row border-b-0">
              <span className="text-muted-foreground text-sm">TP3</span>
              <span className="font-mono font-medium text-success">${currentSignal.takeProfit3.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk/Reward */}
      <Card className="border-border/50">
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Risk</p>
              <p className="font-mono text-destructive font-semibold">
                {(currentSignal.entry - currentSignal.stopLoss).toFixed(2)} pts
              </p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">R:R Ratio</p>
              <p className="font-mono text-success font-semibold">1:4.3</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reasoning */}
      <Card className="border-border/50 flex-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            AI Reasoning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {currentSignal.reasoning.map((reason, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-primary mt-1">▸</span>
                <span className="text-foreground/90">{reason}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Timestamp */}
      <div className="text-center text-xs text-muted-foreground">
        Last updated: {new Date(currentSignal.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};
