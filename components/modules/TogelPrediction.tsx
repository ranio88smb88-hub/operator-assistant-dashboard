
import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { PASARAN_SCHEDULE } from '../../constants';

interface Props {
  showToast: (msg: string) => void;
}

const TogelPrediction: React.FC<Props> = ({ showToast }) => {
  const [market, setMarket] = useState(PASARAN_SCHEDULE[0].name);
  const [shio, setShio] = useState('Naga');
  const [result, setResult] = useState('');

  const generate = () => {
    const main = Array.from({length: 4}, () => Math.floor(Math.random() * 10)).join('');
    const backup = Array.from({length: 4}, () => Math.floor(Math.random() * 10)).join('');
    const bbfs = Array.from({length: 6}, () => Math.floor(Math.random() * 10)).join(' ');
    const cb = Array.from({length: 2}, () => Math.floor(Math.random() * 10)).join(', ');

    const text = `
🏮 PREDIKSI TOGEL JITU 🏮
━━━━━━━━━━━━━━━━━━━
📍 Pasaran: ${market}
📅 Tanggal: ${new Date().toLocaleDateString('id-ID')}
🐉 Shio Off: ${shio}

🔢 Angka Main: ${main}
🔢 Angka Ikut: ${backup}
✨ BBFS: ${bbfs}
💥 Colok Bebas: ${cb}

Ups & Selalu Tetap UPS!
━━━━━━━━━━━━━━━━━━━
    `.trim();
    setResult(text);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">Togel Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-zinc-500 block mb-1">Market (Pasaran)</label>
            <select 
              value={market} 
              onChange={e => setMarket(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-sm outline-none"
            >
              {PASARAN_SCHEDULE.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-500 block mb-1">Shio Reference</label>
            <select 
              value={shio} 
              onChange={e => setShio(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-sm outline-none"
            >
              {['Naga', 'Ular', 'Kuda', 'Kambing', 'Monyet', 'Ayam', 'Anjing', 'Babi', 'Tikus', 'Kerbau', 'Macan', 'Kelinci'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <button 
          onClick={generate}
          className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg text-sm transition-all flex items-center justify-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Generate Prediction
        </button>
      </div>

      <div className="glass-card p-6 rounded-2xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Final Script</h3>
          {result && (
            <button onClick={() => { navigator.clipboard.writeText(result); showToast('Copied!'); }} className="text-xs text-amber-400 hover:text-amber-300 flex items-center">
              <Copy className="w-3 h-3 mr-1" /> Copy
            </button>
          )}
        </div>
        <div className="flex-1 bg-zinc-950/50 rounded-xl p-4 border border-white/5 font-mono text-xs whitespace-pre-wrap text-amber-100/80 leading-relaxed">
          {result || "Generate to see script output..."}
        </div>
      </div>
    </div>
  );
};

export default TogelPrediction;
