import React, { useState } from 'react';
import { Plus, Minus, Trash2, Calculator, TrendingUp } from 'lucide-react';

interface OddsItem {
  id: string;
  odds: number;
}

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

// Add showToast to component props to align with other modules
const FootballBetCalc: React.FC<Props> = ({ showToast }) => {
  const [stake, setStake] = useState<number>(100000);
  const [oddsList, setOddsList] = useState<OddsItem[]>([{ id: '1', odds: 1.85 }]);

  const addOdds = () => {
    setOddsList([...oddsList, { id: Date.now().toString(), odds: 1.0 }]);
  };

  const removeOdds = (id: string) => {
    if (oddsList.length > 1) {
      setOddsList(oddsList.filter(o => o.id !== id));
    }
  };

  const updateOdds = (id: string, val: number) => {
    setOddsList(oddsList.map(o => o.id === id ? { ...o, odds: val } : o));
  };

  const totalOdds = oddsList.reduce((acc, curr) => acc * curr.odds, 1);
  const totalWin = stake * totalOdds;
  const netProfit = totalWin - stake;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="glass-card p-6 rounded-3xl border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Match Odds Selection</h3>
            <button 
              onClick={addOdds}
              className="bg-blue-600/10 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-500/20 hover:bg-blue-600/20 transition-all flex items-center"
            >
              <Plus className="w-3 h-3 mr-1" /> Add Match
            </button>
          </div>

          <div className="space-y-3">
            {oddsList.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-4 bg-zinc-950/50 p-4 rounded-2xl border border-white/5 group animate-in slide-in-from-left-2 duration-200">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-xs font-bold text-zinc-500">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-zinc-600 uppercase font-bold block mb-1">Decimal Odds</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={item.odds}
                    onChange={e => updateOdds(item.id, Number(e.target.value))}
                    className="bg-transparent text-xl font-bold font-mono outline-none w-full text-blue-400"
                  />
                </div>
                <button 
                  onClick={() => removeOdds(item.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/10 text-rose-500/50 hover:text-rose-500 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col h-full bg-gradient-to-br from-zinc-900/50 to-indigo-900/10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6 flex items-center">
            <Calculator className="w-4 h-4 mr-2" /> Summary
          </h3>

          <div className="space-y-6 flex-1">
            <div>
              <label className="text-xs text-zinc-500 font-bold uppercase mb-2 block">Total Stake</label>
              <input 
                type="number"
                value={stake}
                onChange={e => setStake(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-2xl font-bold outline-none"
              />
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500">Accumulated Odds</span>
                <span className="font-mono text-lg text-blue-400">x{totalOdds.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500">Estimated Win</span>
                <span className="font-mono text-lg text-emerald-400">Rp {totalWin.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center">
            <span className="text-[10px] uppercase font-black text-emerald-500 tracking-widest block mb-1">Net Potential Profit</span>
            <div className="text-4xl font-black text-emerald-400 font-mono">
              +{netProfit.toLocaleString('id-ID')}
            </div>
            <div className="mt-3 flex items-center justify-center text-[10px] text-emerald-600 font-bold uppercase">
              <TrendingUp className="w-3 h-3 mr-1" /> ROI: {((netProfit / stake) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballBetCalc;