import { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time, CandlestickSeries } from 'lightweight-charts';
import { generateCandleData } from '@/data/tradingData';

export const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: 'hsl(220, 20%, 8%)' },
        textColor: 'hsl(60, 10%, 70%)',
        fontFamily: "'JetBrains Mono', monospace",
      },
      grid: {
        vertLines: { color: 'hsl(220, 15%, 15%)' },
        horzLines: { color: 'hsl(220, 15%, 15%)' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'hsl(45, 90%, 55%)',
          width: 1,
          style: 2,
          labelBackgroundColor: 'hsl(45, 90%, 55%)',
        },
        horzLine: {
          color: 'hsl(45, 90%, 55%)',
          width: 1,
          style: 2,
          labelBackgroundColor: 'hsl(45, 90%, 55%)',
        },
      },
      rightPriceScale: {
        borderColor: 'hsl(220, 15%, 20%)',
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: 'hsl(220, 15%, 20%)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: 'hsl(142, 70%, 45%)',
      downColor: 'hsl(0, 72%, 51%)',
      borderUpColor: 'hsl(142, 70%, 50%)',
      borderDownColor: 'hsl(0, 72%, 56%)',
      wickUpColor: 'hsl(142, 70%, 45%)',
      wickDownColor: 'hsl(0, 72%, 51%)',
    });

    candleSeriesRef.current = candleSeries;

    const rawData = generateCandleData();
    const formattedData: CandlestickData<Time>[] = rawData.map((d, index) => ({
      time: (index + 1) as Time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    candleSeries.setData(formattedData);

    // Add price lines for current signal levels
    candleSeries.createPriceLine({
      price: 2654.50,
      color: 'hsl(45, 90%, 55%)',
      lineWidth: 2,
      lineStyle: 0,
      axisLabelVisible: true,
      title: 'Entry',
    });

    candleSeries.createPriceLine({
      price: 2648.20,
      color: 'hsl(0, 72%, 51%)',
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: 'SL',
    });

    candleSeries.createPriceLine({
      price: 2662.00,
      color: 'hsl(142, 70%, 45%)',
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: 'TP1',
    });

    candleSeries.createPriceLine({
      price: 2670.50,
      color: 'hsl(142, 70%, 50%)',
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: 'TP2',
    });

    candleSeries.createPriceLine({
      price: 2682.00,
      color: 'hsl(142, 70%, 55%)',
      lineWidth: 1,
      lineStyle: 2,
      axisLabelVisible: true,
      title: 'TP3',
    });

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
          <span className="text-primary font-semibold text-lg">XAU/USD</span>
          <span className="text-muted-foreground text-sm">Gold Spot</span>
        </div>
        <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
          <div className="pulse-dot" />
          <span className="text-success text-sm font-medium">LIVE</span>
        </div>
      </div>
      <div ref={chartContainerRef} className="h-full w-full" />
    </div>
  );
};
