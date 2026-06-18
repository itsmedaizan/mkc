'use client';

import { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  height?: number;
  symbol?: string;
  interval?: string;
}

declare global {
  interface Window {
    TradingView: {
      widget: new (config: Record<string, unknown>) => unknown;
    };
  }
}

export default function TradingViewChart({
  height = 500,
  symbol = 'OANDA:XAUUSD',
  interval = '60',
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<unknown>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const containerId = `tradingview_${Math.random().toString(36).substring(2, 9)}`;

    if (containerRef.current) {
      containerRef.current.id = containerId;
    }

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView && containerRef.current) {
        widgetRef.current = new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: interval,
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#0a0f1e',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerId,
          backgroundColor: '#050a14',
          gridColor: 'rgba(0, 212, 255, 0.05)',
          studies: ['RSI@tv-basicstudies', 'MACD@tv-basicstudies'],
          hide_side_toolbar: false,
          withdateranges: true,
          save_image: false,
        });
      }
    };

    document.head.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, interval]);

  return (
    <div className="w-full rounded-2xl overflow-hidden glass-card p-0.5">
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ height: `${height}px`, background: '#050a14' }}
      >
        {/* Loading placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#050a14] z-0">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Loading chart...</p>
          </div>
        </div>
        {/* TradingView container */}
        <div
          ref={containerRef}
          className="w-full h-full relative z-10"
          style={{ height: `${height}px` }}
        />
      </div>
    </div>
  );
}
