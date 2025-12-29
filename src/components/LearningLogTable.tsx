import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { historicalTrades, TradeResult } from '@/data/tradingData';
import { cn } from '@/lib/utils';

const ResultBadge = ({ result }: { result: TradeResult['result'] }) => {
  const config = {
    WIN: { className: 'bg-success/20 text-success border-success/30', icon: TrendingUp },
    LOSS: { className: 'bg-destructive/20 text-destructive border-destructive/30', icon: TrendingDown },
    BREAKEVEN: { className: 'bg-muted text-muted-foreground border-muted', icon: Minus },
  };

  const { className, icon: Icon } = config[result];

  return (
    <Badge variant="outline" className={cn('gap-1', className)}>
      <Icon className="w-3 h-3" />
      {result}
    </Badge>
  );
};

export const LearningLogTable = () => {
  const stats = {
    totalTrades: historicalTrades.length,
    winRate: (historicalTrades.filter(t => t.result === 'WIN').length / historicalTrades.length * 100).toFixed(1),
    totalPnL: historicalTrades.reduce((sum, t) => sum + t.pnl, 0),
    avgPnL: (historicalTrades.reduce((sum, t) => sum + t.pnlPercent, 0) / historicalTrades.length).toFixed(2),
  };

  return (
    <Card className="border-border/50 card-glow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Learning Log</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Win Rate:</span>
              <span className="font-mono font-semibold text-success">{stats.winRate}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Total P&L:</span>
              <span className={cn(
                "font-mono font-semibold",
                stats.totalPnL >= 0 ? "text-profit" : "text-loss"
              )}>
                {stats.totalPnL >= 0 ? '+' : ''}${stats.totalPnL.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Avg:</span>
              <span className={cn(
                "font-mono font-semibold",
                parseFloat(stats.avgPnL) >= 0 ? "text-success" : "text-destructive"
              )}>
                {parseFloat(stats.avgPnL) >= 0 ? '+' : ''}{stats.avgPnL}%
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-muted-foreground font-semibold">Date</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Type</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Entry</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">Exit</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">P&L</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">%</TableHead>
                <TableHead className="text-muted-foreground font-semibold">Reasoning</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicalTrades.map((trade, index) => (
                <TableRow 
                  key={trade.id}
                  className="animate-slide-in border-border/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-mono text-sm text-foreground/80">
                    {trade.date}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-mono",
                        trade.type === 'LONG' 
                          ? 'bg-success/10 text-success border-success/30' 
                          : 'bg-destructive/10 text-destructive border-destructive/30'
                      )}
                    >
                      {trade.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-right text-foreground/90">
                    ${trade.entry.toFixed(2)}
                  </TableCell>
                  <TableCell className="font-mono text-right text-foreground/90">
                    ${trade.exit.toFixed(2)}
                  </TableCell>
                  <TableCell className={cn(
                    "font-mono text-right font-semibold",
                    trade.pnl >= 0 ? "text-profit" : "text-loss"
                  )}>
                    {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                  </TableCell>
                  <TableCell className={cn(
                    "font-mono text-right font-semibold",
                    trade.pnlPercent >= 0 ? "text-success" : "text-destructive"
                  )}>
                    {trade.pnlPercent >= 0 ? '+' : ''}{trade.pnlPercent.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-sm text-foreground/70 max-w-[200px] truncate">
                    {trade.reasoning}
                  </TableCell>
                  <TableCell className="text-center">
                    <ResultBadge result={trade.result} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
