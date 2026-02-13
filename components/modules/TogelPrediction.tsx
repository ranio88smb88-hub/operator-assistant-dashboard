
import React, { useState } from 'react';
import { Copy, RefreshCw, FileText } from 'lucide-react';
import { PASARAN_SCHEDULE, ZODIAC_ANIMALS } from '../../constants';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const TogelPrediction: React.FC<Props> = ({ showToast }) => {
  const [market, setMarket] = useState(PASARAN_SCHEDULE[0].name);
  const [shioOff, setShioOff] = useState('Kelinci');
  const [result, setResult] = useState('');

  const generateRandomNumbers = (count: number, length: number) => {
    return Array.from({ length: count }, () => 
      Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
    );
  };

  const generate = () => {
    const bbfs = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
    const ai = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
    
    const d4 = generateRandomNumbers(5, 4);
    const d3 = generateRandomNumbers(4, 3);
    const d2 = generateRandomNumbers(10, 2);
    
    const cb1 = Math.floor(Math.random() * 10);
    const cb2 = Math.floor(Math.random() * 10);
    
    const cm = [
      generateRandomNumbers(1, 2)[0] + ' / ' + generateRandomNumbers(1, 2)[0] + ' / ' + generateRandomNumbers(1, 2)[0]
    ];
    
    const shuffledShio = [...ZODIAC_ANIMALS].sort(() => 0.5 - Math.random());
    const cShio = `${shuffledShio[0]} / ${shuffledShio[1]} / ${shuffledShio[2]}`;
    
    const twin = `${generateRandomNumbers(1, 2)[0]} / ${generateRandomNumbers(1, 2)[0]} / ${generateRandomNumbers(1, 2)[0]}`;

    const text = `
🏮 PREDIKSI TOGEL JITU 🏮

📍 Pasaran: ${market}
📅 Tanggal: ${new Date().toLocaleDateString('id-ID')}
🐉 Shio Off: ${shioOff}

BBFS Kuat: ${bbfs}

Angka Ikut: ${ai}

4D (BB):
${d4.join(' ')}

3D (BB):
${d3.join(' ')}

2D (BB):
${d2.join(' ')}

Colok Bebas: ${cb1} / ${cb2}

Colok Macau: ${cm[0]}

Colok Shio: ${cShio}

Invest Twin: ${twin}

Biasakan UPS - Utamakan Prediksi Sendiri
    `.trim();
    
    setResult(text);
    showToast('Prediksi berhasil dibuat!', 'success');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    showToast('Script berhasil disalin!', 'success');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <div className="glass-panel p-8 rounded-[40px] border border-primary-fade space-y-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary-fade rounded-2xl border border-primary-fade">
            <FileText className="w-6 h-6 text-[var(--primary-color)]" />
          </div>
          <h3 className="text-xl font-black font-orbitron text-white uppercase tracking-tighter">Script Config</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Select Market</label>
            <select 
              value={market} 
              onChange={e => setMarket(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[var(--primary-color)] transition-all"
            >
              {PASARAN_SCHEDULE.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Shio Off Reference</label>
            <select 
              value={shioOff} 
              onChange={e => setShioOff(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-[var(--primary-color)] transition-all"
            >
              {ZODIAC_ANIMALS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <button 
            onClick={generate}
            className="w-full bg-[var(--primary-color)] hover:opacity-80 text-black font-black font-orbitron py-5 rounded-2xl text-sm transition-all shadow-[0_0_20px_rgba(0,255,0,0.2)] flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-3" /> CALCULATE PREDICTION
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center px-4">
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Output Script</span>
          {result && (
            <button 
              onClick={copyToClipboard}
              className="text-[10px] font-black text-[var(--primary-color)] uppercase flex items-center hover:opacity-60 transition-all"
            >
              <Copy className="w-3 h-3 mr-1" /> Copy to Clipboard
            </button>
          )}
        </div>
        <div className="flex-1 glass-panel p-8 rounded-[40px] border border-white/5 font-mono text-[13px] leading-relaxed text-zinc-300 whitespace-pre-wrap min-h-[500px] overflow-y-auto custom-scrollbar">
          {result || <div className="h-full flex items-center justify-center text-zinc-700 italic">Generate to see script...</div>}
        </div>
      </div>
    </div>
  );
};

export default TogelPrediction;
