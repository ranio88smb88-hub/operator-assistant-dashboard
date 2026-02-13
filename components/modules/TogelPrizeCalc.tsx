import React, { useState } from 'react';
import { Calculator, Wallet } from 'lucide-react';

export default function TogelPrizeCalc({ showToast }: {
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  const [betAmount, setBetAmount] = useState<number>(1000);
  const [betType, setBetType] = useState<'4D' | '3D' | '2D'>('4D');

  const payouts = { '4D': 9000, '3D': 950, '2D': 95 };

  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="glass-card p-8 rounded-3xl space-y-8 border border-white/10">
        <div className="flex items-center space-x-4">
          <Calculator className="w-8 h-8 text-indigo-400" />
          <h2 className="text-2xl font-bold">Prize Calculator</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(['4D', '3D', '2D'] as const).map(type => (
            <button key={type} onClick={() => setBetType(type)} className={`py-3 rounded-xl border-2 font-bold ${betType === type ? 'border-indigo-500 bg-indigo-500/10 text-white' : 'border-white/5 text-zinc-500'}`}>{type}</button>
          ))}
        </div>
        <input 
          type="number" value={betAmount} onChange={e => setBetAmount(Number(e.target.value))}
          className="w-full bg-zinc-950 border-2 border-white/5 rounded-2xl p-5 text-3xl font-bold outline-none"
        />
        <div className="bg-zinc-900/80 rounded-2xl p-6 flex justify-between items-center">
          <span className="text-sm font-semibold text-zinc-400">TOTAL PRIZE</span>
          <div className="text-3xl font-black text-emerald-400">Rp {(betAmount * payouts[betType]).toLocaleString('id-ID')}</div>
        </div>
      </div>
    </div>
  );
}
