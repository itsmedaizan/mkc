import { TrendingUp, TrendingDown, Target, Shield, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface SignalCardProps {
  type: 'BUY' | 'SELL';
  entry: string;
  tp1: string;
  tp2: string;
  tp3: string;
  sl: string;
  status: 'Active' | 'TP1 Hit' | 'TP2 Hit' | 'Closed' | 'TP3 Hit';
  date: string;
  pair?: string;
}

const statusConfig = {
  Active: {
    label: 'Active',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    icon: Clock,
    dot: 'bg-cyan-400',
    animate: true,
  },
  'TP1 Hit': {
    label: 'TP1 Hit',
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/30',
    icon: CheckCircle2,
    dot: 'bg-green-400',
    animate: false,
  },
  'TP2 Hit': {
    label: 'TP2 Hit',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    icon: CheckCircle2,
    dot: 'bg-emerald-400',
    animate: false,
  },
  'TP3 Hit': {
    label: 'TP3 Hit',
    color: 'text-green-300',
    bg: 'bg-green-300/10',
    border: 'border-green-300/30',
    icon: CheckCircle2,
    dot: 'bg-green-300',
    animate: false,
  },
  Closed: {
    label: 'Closed',
    color: 'text-slate-400',
    bg: 'bg-slate-400/10',
    border: 'border-slate-400/30',
    icon: XCircle,
    dot: 'bg-slate-400',
    animate: false,
  },
};

export default function SignalCard({
  type,
  entry,
  tp1,
  tp2,
  tp3,
  sl,
  status,
  date,
  pair = 'XAUUSD',
}: SignalCardProps) {
  const isBuy = type === 'BUY';
  const statusInfo = statusConfig[status] || statusConfig.Active;
  const StatusIcon = statusInfo.icon;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isBuy
          ? 'border border-green-500/30 bg-white/4 hover:border-green-500/50 hover:shadow-green-500/10'
          : 'border border-red-500/30 bg-white/4 hover:border-red-500/50 hover:shadow-red-500/10'
      }`}
      style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.04)' }}
    >
      {/* Top stripe */}
      <div
        className={`h-1 w-full ${isBuy ? 'bg-gradient-to-r from-green-500 to-emerald-400' : 'bg-gradient-to-r from-red-500 to-orange-400'}`}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isBuy ? 'bg-green-500/15' : 'bg-red-500/15'
              }`}
            >
              {isBuy ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">{pair}</span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isBuy ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {type}
                </span>
              </div>
              <span className="text-xs text-slate-500">{date}</span>
            </div>
          </div>

          {/* Status */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.border} border ${statusInfo.color}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot} ${statusInfo.animate ? 'animate-pulse' : ''}`}
            />
            {statusInfo.label}
          </div>
        </div>

        {/* Price Grid */}
        <div className="space-y-2">
          {/* Entry */}
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span>Entry</span>
            </div>
            <span className="font-semibold text-white font-mono">{entry}</span>
          </div>

          {/* Take Profits */}
          <div className="space-y-1.5 py-1">
            {[
              { label: 'TP1', value: tp1, color: 'text-green-400', dot: 'bg-green-400', hit: status === 'TP1 Hit' || status === 'TP2 Hit' || status === 'TP3 Hit' },
              { label: 'TP2', value: tp2, color: 'text-emerald-400', dot: 'bg-emerald-400', hit: status === 'TP2 Hit' || status === 'TP3 Hit' },
              { label: 'TP3', value: tp3, color: 'text-green-300', dot: 'bg-green-300', hit: status === 'TP3 Hit' },
            ].map((tp) => (
              <div key={tp.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Target className={`w-3 h-3 ${tp.hit ? tp.color : 'text-slate-600'}`} />
                  <span className={tp.hit ? 'text-slate-300' : ''}>{tp.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-mono text-sm font-medium ${tp.hit ? tp.color : 'text-slate-300'}`}>
                    {tp.value}
                  </span>
                  {tp.hit && <CheckCircle2 className={`w-3.5 h-3.5 ${tp.color}`} />}
                </div>
              </div>
            ))}
          </div>

          {/* Stop Loss */}
          <div className="flex items-center justify-between py-2 border-t border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Shield className="w-3.5 h-3.5 text-red-400" />
              <span>Stop Loss</span>
            </div>
            <span className="font-mono text-sm font-medium text-red-400">{sl}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
