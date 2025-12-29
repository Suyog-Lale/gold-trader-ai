export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Signal {
  id: string;
  type: 'LONG' | 'SHORT';
  entry: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  takeProfit3: number;
  reasoning: string[];
  confidence: number;
  timestamp: string;
  status: 'ACTIVE' | 'PENDING' | 'CLOSED';
}

export interface TradeResult {
  id: string;
  date: string;
  type: 'LONG' | 'SHORT';
  entry: number;
  exit: number;
  pnl: number;
  pnlPercent: number;
  reasoning: string;
  result: 'WIN' | 'LOSS' | 'BREAKEVEN';
}

// Generate realistic XAU/USD candlestick data
export const generateCandleData = (): CandleData[] => {
  const data: CandleData[] = [];
  let basePrice = 2650;
  const startDate = new Date('2024-12-01');
  
  for (let i = 0; i < 100; i++) {
    const date = new Date(startDate);
    date.setHours(date.getHours() + i * 4);
    
    const volatility = 8 + Math.random() * 12;
    const trend = Math.sin(i / 15) * 3;
    
    const open = basePrice + (Math.random() - 0.5) * volatility;
    const close = open + trend + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
    
    data.push({
      time: date.toISOString().split('T')[0] + ' ' + date.toTimeString().slice(0, 5),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });
    
    basePrice = close;
  }
  
  return data;
};

export const currentSignal: Signal = {
  id: 'SIG-001',
  type: 'LONG',
  entry: 2654.50,
  stopLoss: 2648.20,
  takeProfit1: 2662.00,
  takeProfit2: 2670.50,
  takeProfit3: 2682.00,
  reasoning: [
    'Liquidity Sweep detected at 2648 zone',
    'MSB (Market Structure Break) confirmed on H4',
    'FVG (Fair Value Gap) filled at 2652-2654',
    'Order Block rejection at key support',
    'RSI Divergence on lower timeframe',
  ],
  confidence: 87,
  timestamp: new Date().toISOString(),
  status: 'ACTIVE',
};

export const historicalTrades: TradeResult[] = [
  {
    id: 'TR-001',
    date: '2024-12-28',
    type: 'LONG',
    entry: 2642.30,
    exit: 2658.75,
    pnl: 164.50,
    pnlPercent: 2.48,
    reasoning: 'Bullish OB + Liquidity grab',
    result: 'WIN',
  },
  {
    id: 'TR-002',
    date: '2024-12-27',
    type: 'SHORT',
    entry: 2668.20,
    exit: 2652.10,
    pnl: 161.00,
    pnlPercent: 2.41,
    reasoning: 'Bearish CHoCH + Premium zone',
    result: 'WIN',
  },
  {
    id: 'TR-003',
    date: '2024-12-26',
    type: 'LONG',
    entry: 2635.50,
    exit: 2631.20,
    pnl: -43.00,
    pnlPercent: -0.65,
    reasoning: 'Failed breakout attempt',
    result: 'LOSS',
  },
  {
    id: 'TR-004',
    date: '2024-12-25',
    type: 'LONG',
    entry: 2620.00,
    exit: 2638.40,
    pnl: 184.00,
    pnlPercent: 2.80,
    reasoning: 'Daily demand zone + MSB',
    result: 'WIN',
  },
  {
    id: 'TR-005',
    date: '2024-12-24',
    type: 'SHORT',
    entry: 2645.80,
    exit: 2645.50,
    pnl: 3.00,
    pnlPercent: 0.05,
    reasoning: 'Tight range, early exit',
    result: 'BREAKEVEN',
  },
  {
    id: 'TR-006',
    date: '2024-12-23',
    type: 'LONG',
    entry: 2612.40,
    exit: 2628.90,
    pnl: 165.00,
    pnlPercent: 2.51,
    reasoning: 'Weekly FVG fill + accumulation',
    result: 'WIN',
  },
];
