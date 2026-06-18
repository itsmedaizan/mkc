'use client';

import { useState, useCallback } from 'react';
import { Calculator, DollarSign, Percent, AlertCircle, TrendingUp } from 'lucide-react';

type LotType = 'Standard' | 'Mini' | 'Micro';

const pipValues: Record<LotType, number> = {
  Standard: 1.0,
  Mini: 0.1,
  Micro: 0.01,
};

const lotMultipliers: Record<LotType, number> = {
  Standard: 1,
  Mini: 10,
  Micro: 100,
};

export default function RiskCalculator() {
  const [balance, setBalance] = useState<string>('10000');
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [slPips, setSlPips] = useState<string>('30');
  const [lotType, setLotType] = useState<LotType>('Standard');

  const calculate = useCallback(() => {
    const balanceNum = parseFloat(balance) || 0;
    const slPipsNum = parseFloat(slPips) || 1;
    const pipValue = pipValues[lotType];

    const dollarRisk = (balanceNum * riskPercent) / 100;
    const lotSize = dollarRisk / (slPipsNum * pipValue * 100);
    const tpPips1 = slPipsNum * 1.5;
    const tpPips2 = slPipsNum * 2;
    const tpProfit1 = tpPips1 * pipValue * lotSize * 100;
    const tpProfit2 = tpPips2 * pipValue * lotSize * 100;

    return {
      dollarRisk: dollarRisk.toFixed(2),
      lotSize: Math.max(0.01, lotSize).toFixed(2),
      tpPips1: tpPips1.toFixed(0),
      tpPips2: tpPips2.toFixed(0),
      tpProfit1: tpProfit1.toFixed(2),
      tpProfit2: tpProfit2.toFixed(2),
      riskReward: '1:1.5 / 1:2',
    };
  }, [balance, riskPercent, slPips, lotType]);

  const results = calculate();

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">XAUUSD Risk Calculator</h3>
            <p className="text-slate-500 text-sm">Calculate your optimal lot size & risk</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-5">
            {/* Account Balance */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  Account Balance (USD)
                </div>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 text-sm"
                  placeholder="10000"
                  min="100"
                />
              </div>
            </div>

            {/* Risk Percent Slider */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="w-4 h-4 text-cyan-400" />
                    Risk Per Trade
                  </div>
                  <span className="text-cyan-400 font-bold text-base">{riskPercent}%</span>
                </div>
              </label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={riskPercent}
                onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00d4ff ${((riskPercent - 0.5) / 4.5) * 100}%, rgba(255,255,255,0.1) ${((riskPercent - 0.5) / 4.5) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-slate-600 mt-1">
                <span>0.5%</span>
                <span className="text-yellow-400/70">2% Recommended</span>
                <span>5%</span>
              </div>
              {riskPercent > 3 && (
                <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-amber-400/10 border border-amber-400/20">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="text-xs text-amber-400">High risk. Professional traders risk 1-2% per trade.</span>
                </div>
              )}
            </div>

            {/* Stop Loss in Pips */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Stop Loss Distance (Pips / Points)
              </label>
              <input
                type="number"
                value={slPips}
                onChange={(e) => setSlPips(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-cyan-400/5 transition-all duration-200 text-sm"
                placeholder="30"
                min="1"
              />
              <p className="text-xs text-slate-500 mt-1">
                For XAUUSD, 1 pip = $0.10 movement in price
              </p>
            </div>

            {/* Lot Type */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Account Lot Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Standard', 'Mini', 'Micro'] as LotType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setLotType(type)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      lotType === type
                        ? 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-400 shadow-lg shadow-cyan-400/10'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <div className="font-semibold">{type}</div>
                    <div className="text-xs opacity-60 mt-0.5">
                      {type === 'Standard' ? '100,000' : type === 'Mini' ? '10,000' : '1,000'} oz
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-4 uppercase tracking-wider">Calculation Results</h4>
            <div className="space-y-3">
              {/* Lot Size - Primary Result */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-400/10 to-blue-500/10 border border-cyan-400/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-300 font-medium">Recommended Lot Size</span>
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-bold text-cyan-400 font-mono">{results.lotSize}</div>
                <div className="text-xs text-slate-500 mt-1">{lotType} lot ({lotType === 'Standard' ? '100,000' : lotType === 'Mini' ? '10,000' : '1,000'} oz units)</div>
              </div>

              {/* Dollar Risk */}
              <div className="p-4 rounded-xl bg-white/4 border border-white/8">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Max Dollar Risk</span>
                  <span className="text-red-400 font-bold font-mono text-lg">${results.dollarRisk}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">Maximum loss if SL is hit</div>
              </div>

              {/* TP Projections */}
              <div className="p-4 rounded-xl bg-white/4 border border-white/8">
                <div className="text-sm text-slate-400 mb-3">Profit Projections (at 1.5R & 2R)</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">TP1 ({results.tpPips1} pips / 1.5R)</span>
                    <span className="text-green-400 font-semibold font-mono text-sm">+${results.tpProfit1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">TP2 ({results.tpPips2} pips / 2R)</span>
                    <span className="text-emerald-400 font-semibold font-mono text-sm">+${results.tpProfit2}</span>
                  </div>
                </div>
              </div>

              {/* Formula Note */}
              <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <p className="text-xs text-slate-500 leading-relaxed">
                  <span className="text-blue-400 font-medium">Formula: </span>
                  Lot Size = (Balance × Risk%) ÷ (SL Pips × Pip Value × 100)
                </p>
              </div>

              {/* Risk/Reward Ratio */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/4 border border-white/8">
                <span className="text-sm text-slate-400">Risk:Reward Targets</span>
                <span className="text-cyan-400 font-semibold text-sm">{results.riskReward}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
