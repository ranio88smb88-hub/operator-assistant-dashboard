import React, { useState, useEffect } from 'react';
import { TogelResult } from '../../types';
import { Search, Plus, Calendar, Save, Trash2 } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

// Add showToast to component props to align with other modules
const TogelResultViewer: React.FC<Props> = ({ showToast }) => {
  const [results, setResults] = useState<TogelResult[]>([]);
  const [market, setMarket] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [number, setNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('togel_results');
    if (saved) setResults(JSON.parse(saved));
  }, []);

  const addResult = () => {
    if (!market || !number) return;
    const newList = [{
      id: Date.now().toString(),
      market,
      date,
      number
    }, ...results];
    setResults(newList);
    localStorage.setItem('togel_results', JSON.stringify(newList));
    // Feedback on success
    showToast('Result archived successfully!');
    setNumber('');
  };

  const deleteResult = (id: string) => {
    const newList = results.filter(r => r.id !== id);
    setResults(newList);
    localStorage.setItem('togel_results', JSON.stringify(newList));
    // Feedback on deletion
    showToast('Result deleted', 'error');
  };

  const filtered = results.filter(r => 
    r.market.toLowerCase().includes(search.toLowerCase()) || 
    r.number.includes(search)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-white/5 space-y-6 h-fit">
        <h3 className="text-sm font-bold uppercase tracking-widest flex items-center text-blue-400">
          <Plus className="w-4 h-4 mr-2" /> Add New Result
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block">Pasaran</label>
            <input 
              value={market} onChange={e => setMarket(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-blue-500"
              placeholder="e.g. Hong Kong"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block">Date</label>
            <input 
              type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-zinc-500 uppercase mb-1 block">Winning Number</label>
            <input 
              value={number} onChange={e => setNumber(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-3xl font-mono text-center outline-none focus:border-emerald-500 text-emerald-400"
              placeholder="1234"
              maxLength={4}
            />
          </div>
          <button 
            onClick={addResult}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" /> Archive Result
          </button>
        </div>
      </div>

      <div className="lg:col-span-8 flex flex-col space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input 
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:bg-zinc-900 transition-all"
            placeholder="Search by market name or number..."
          />
        </div>

        <div className="glass-card rounded-3xl overflow-hidden border border-white/5 flex-1 min-h-[400px]">
          <div className="p-4 bg-white/5 border-b border-white/5 grid grid-cols-12 text-[10px] font-black uppercase text-zinc-500 tracking-widest">
            <div className="col-span-5">Pasaran</div>
            <div className="col-span-3 text-center">Date</div>
            <div className="col-span-3 text-center">Result</div>
            <div className="col-span-1"></div>
          </div>
          <div className="divide-y divide-white/5">
            {filtered.length > 0 ? filtered.map(item => (
              <div key={item.id} className="p-4 grid grid-cols-12 items-center hover:bg-white/[0.02] transition-all">
                <div className="col-span-5 text-sm font-bold text-zinc-200">{item.market}</div>
                <div className="col-span-3 text-center text-xs text-zinc-500 font-mono">{item.date}</div>
                <div className="col-span-3 text-center font-mono text-lg text-emerald-400 font-black">{item.number}</div>
                <div className="col-span-1 flex justify-end">
                  <button onClick={() => deleteResult(item.id)} className="p-1.5 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 rounded">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )) : (
              <div className="py-20 text-center opacity-20 flex flex-col items-center">
                <Calendar className="w-12 h-12 mb-2" />
                <span className="text-xs font-bold uppercase tracking-widest">No results found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TogelResultViewer;