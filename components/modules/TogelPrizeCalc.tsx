import React, { useState } from 'react';
import { Calculator, Wallet } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

// Add showToast to component props to align with other modules
const TogelPrizeCalc: React.FC<Props> = ({ showToast }) => {
  const [betAmount, setBetAmount] = useState<number>(1000);
  const [betType, setBetType] = useState<'4D' | '3D' | '2D'>('4D');

  const payouts = {
    '4D': 9000,
    '3D': 950,
    '2D': 95,
  };

  const calculate = () => {
    return betAmount * payouts[betType];
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="glass-card p-8 rounded-3xl space-y-8 border border-white/10">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/20 rounded-2xl">
            <Calculator className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Prize Calculator</h2>
            <p className="text-zinc-500 text-sm">Estimate potential winnings based on stake.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Bet Category</label>
            <div className="grid grid-cols-3 gap-3">
              {(['4D', '3D', '2D'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setBetType(type)}
                  className={`py-3 rounded-xl border-2 transition-all font-bold ${
                    betType === type 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                      : 'bg-zinc-900 border-white/5 text-zinc-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Bet Amount (Stake)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-500">Rp</span>
              <input 
                type="number"
                value={betAmount}
                onChange={e => setBetAmount(Number(e.target.value))}
                className="w-full bg-zinc-950 border-2 border-white/5 rounded-2xl p-5 pl-12 text-3xl font-bold outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500">Payout Multiplier</span>
            <span className="text-indigo-400 font-bold font-mono">x{payouts[betType]}</span>
          </div>
          
          <div className="bg-zinc-900/80 rounded-2xl p-6 border border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wallet className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Estimated Total</span>
            </div>
            <div className="text-3xl font-black text-emerald-400">
              Rp {calculate().toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TogelPrizeCalc;