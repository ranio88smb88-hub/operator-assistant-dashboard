
import React, { useState } from 'react';
import { Gamepad2, FileText, X as CloseIcon } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const SlotWinCalc: React.FC<Props> = ({ showToast }) => {
  const [pgTotal, setPgTotal] = useState<number>(0);
  const [pragmaticTotal, setPragmaticTotal] = useState<number>(0);
  const [isParsingPg, setIsParsingPg] = useState(false);
  const [pgLogText, setPgLogText] = useState('');

  const updateAmount = (provider: 'PG' | 'PRAGMATIC', amount: string) => {
    const val = parseFloat(amount) || 0;
    if (provider === 'PG') setPgTotal(val);
    else setPragmaticTotal(val);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const ProviderColumn = ({ title, provider, total, color }: { title: string, provider: 'PG' | 'PRAGMATIC', total: number, color: string }) => (
    <div className="flex-1 flex flex-col glass-panel rounded-3xl border border-white/5 overflow-hidden">
      <div className={`p-6 border-b border-white/5 bg-gradient-to-r from-${color}-500/10 to-transparent flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-${color}-500/20 rounded-lg border border-${color}-500/30`}>
            <Gamepad2 className={`w-5 h-5 text-${color}-400`} />
          </div>
          <h2 className="font-orbitron font-black text-xl tracking-tighter uppercase">{title}</h2>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Current Win</p>
          <p className={`font-orbitron font-black text-lg text-${color}-400 neon-text-${color}`}>
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col space-y-4">
        {provider === 'PG' && (
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => setIsParsingPg(true)}
              className="flex items-center justify-center space-x-2 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all group"
            >
              <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black font-orbitron tracking-widest uppercase">Paste PGSOFT Log</span>
            </button>
          </div>
        )}

        {isParsingPg && provider === 'PG' && (
          <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-3 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Paste Log Content</span>
              <button onClick={() => setIsParsingPg(false)} className="text-zinc-500 hover:text-white">
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>
            <textarea 
              value={pgLogText}
              onChange={(e) => {
                const val = e.target.value;
                setPgLogText(val);
                if (val.toLowerCase().includes('close')) {
                  const lines = val.split('\n').map(l => l.trim());
                  let totalVal = 0;
                  let foundFreeSpins = false;

                  for (let i = 0; i < lines.length; i++) {
                    if (/Free Spin:\s*\d+\/\d+/i.test(lines[i])) {
                      foundFreeSpins = true;
                      if (i + 1 < lines.length && lines[i + 1].toUpperCase().includes('IDR')) {
                        const match = lines[i + 1].match(/IDR\s+([\d.,]+)/i);
                        if (match) {
                          let valStr = match[1].replace(/\./g, '').replace(',', '.');
                          totalVal += parseFloat(valStr) || 0;
                        }
                      }
                    }
                  }

                  if (foundFreeSpins) {
                    const finalAmount = totalVal * 1000;
                    setPgTotal(finalAmount);
                    showToast(`Successfully parsed log. Total: ${formatCurrency(finalAmount)}`, 'success');
                    setPgLogText('');
                    setIsParsingPg(false);
                  }
                }
              }}
              placeholder="Paste the PGSOFT game log here..."
              className="w-full h-32 bg-black/60 border border-white/10 rounded-xl p-3 text-[10px] font-mono focus:outline-none focus:border-emerald-500/50 transition-all custom-scrollbar"
            />
          </div>
        )}

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-500">Rp</span>
          <input 
            type="number"
            value={total || ''}
            onChange={(e) => updateAmount(provider, e.target.value)}
            placeholder="0"
            className="w-full bg-black/40 border border-white/5 rounded-lg py-3 pl-8 pr-3 text-sm font-orbitron focus:outline-none focus:border-[var(--primary-color)]/50 transition-all"
          />
        </div>
      </div>

      <div className="p-4 bg-black/40 border-t border-white/5">
        <button 
          onClick={() => {
            if (provider === 'PG') setPgTotal(0);
            else setPragmaticTotal(0);
            showToast(`${title} data cleared`);
          }}
          className="w-full py-2 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] hover:text-zinc-400 transition-colors"
        >
          Reset {title}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black font-orbitron text-[var(--primary-color)] neon-text-primary tracking-tighter uppercase">
            SLOT WIN CALC
          </h1>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mt-2">
            Freespin & Buyspin Profitability Monitor // v1.0
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <ProviderColumn 
          title="PGSOFT" 
          provider="PG" 
          total={pgTotal} 
          color="emerald" 
        />
        <ProviderColumn 
          title="PRAGMATIC" 
          provider="PRAGMATIC" 
          total={pragmaticTotal} 
          color="blue" 
        />
      </div>
    </div>
  );
};

export default SlotWinCalc;
