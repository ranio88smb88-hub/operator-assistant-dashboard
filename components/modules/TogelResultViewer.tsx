
import React, { useState, useMemo } from 'react';
import { Search, Plus, Calendar, Save, Trash2, Copy, FileText, Send, Sparkles } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const SHIO_MAP: Record<number, string> = {
  1: 'ULAR',
  2: 'NAGA',
  3: 'KELINCI',
  4: 'MACAN',
  5: 'KERBAU',
  6: 'TIKUS',
  7: 'BABI',
  8: 'ANJING',
  9: 'AYAM',
  10: 'MONYET',
  11: 'KAMBING',
  0: 'KUDA'
};

const getShio = (numStr: string): string => {
  if (!numStr || numStr.length < 2) return '???';
  const last2 = parseInt(numStr.slice(-2));
  if (isNaN(last2)) return '???';
  
  // Logika Shio Togel 2025/2026 (Ular = 01)
  // Rumus: (Angka % 12). Jika 0 maka Kuda (12)
  const index = last2 % 12;
  return SHIO_MAP[index as keyof typeof SHIO_MAP] || 'KUDA';
};

export default function TogelResultViewer({ showToast }: Props) {
  const [inputText, setInputText] = useState('');
  
  const generatedScript = useMemo(() => {
    if (!inputText.trim()) return '';

    const lines = inputText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const dateStr = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date());

    // Deteksi Mode: Prize 1-3 atau Result Tunggal
    const isMultiPrize = inputText.toUpperCase().includes('PRIZE 1');
    
    if (isMultiPrize) {
      // Logic for Multi Prize (HUAHIN Example)
      let market = lines[0].replace(/PRIZE.*/gi, '').trim();
      let p1 = '', p2 = '', p3 = '';
      
      inputText.split('\n').forEach(line => {
        if (line.toUpperCase().includes('PRIZE 1')) p1 = line.split(':')[1]?.trim() || '';
        if (line.toUpperCase().includes('PRIZE 2')) p2 = line.split(':')[1]?.trim() || '';
        if (line.toUpperCase().includes('PRIZE 3')) p3 = line.split(':')[1]?.trim() || '';
      });

      return `Hasil Pengeluaran ${market.toUpperCase()}
Hari ini ${dateStr}
PRIZE 1 : ${p1}, SHIO : ${getShio(p1)}
PRIZE 2 : ${p2}
PRIZE 3 : ${p3}
Selamat Kepada Pemenang, Salam JACKPOT`.trim();
    } else {
      // Logic for Single Result (SINGAPORE / HOKI Example)
      // Mencari angka di baris pertama atau baris setelah nama market
      const firstLine = lines[0];
      const match = firstLine.match(/^(.*?)\s+(\d+)$/);
      
      let market = '';
      let resultNum = '';

      if (match) {
        market = match[1];
        resultNum = match[2];
      } else {
        market = firstLine;
        resultNum = lines[1] || '';
      }

      return `Hasil Pengeluaran ${market.toUpperCase()}
Hari ini ${dateStr}
Result : ${resultNum}
SHIO : ${getShio(resultNum)}
Selamat Kepada Pemenang, Salam JACKPOT`.trim();
    }
  }, [inputText]);

  const copyResult = () => {
    if (!generatedScript) return;
    navigator.clipboard.writeText(generatedScript);
    showToast('Result script copied to clipboard!', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-black font-orbitron text-white uppercase tracking-tighter">Result Archive</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-bold">Automated Script Formatting System</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Input Raw Data */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center">
              <FileText className="w-4 h-4 mr-2 text-blue-400" /> RAW INPUT DATA
            </label>
            <button 
              onClick={() => setInputText('')}
              className="text-[9px] font-black text-rose-500 uppercase hover:opacity-70 transition-all"
            >
              Clear
            </button>
          </div>
          <div className="glass-panel p-6 rounded-[40px] border border-white/5 h-[500px] flex flex-col space-y-4">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste data di sini...&#10;&#10;Contoh 1:&#10;SINGAPORE 0819&#10;&#10;Contoh 2:&#10;HUAHIN2100&#10;PRIZE 1: 3114&#10;PRIZE 2: 4909&#10;PRIZE 3: 7339"
              className="flex-1 bg-black/40 border border-white/10 rounded-3xl p-6 text-sm font-mono text-zinc-300 outline-none focus:border-blue-500/50 transition-all resize-none custom-scrollbar"
            />
            <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start space-x-3">
              <Sparkles className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
              <p className="text-[10px] text-zinc-500 font-bold italic leading-relaxed">
                Input market dan angka di atas. Sistem akan secara otomatis mendeteksi format (Single/Multi-Prize) dan menghitung Shio berdasarkan 2 angka belakang.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Formatted Result */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center">
              <Send className="w-4 h-4 mr-2 text-emerald-400" /> GENERATED SCRIPT
            </label>
            {generatedScript && (
              <button 
                onClick={copyResult}
                className="text-[10px] font-black text-emerald-400 uppercase flex items-center hover:opacity-70 transition-all"
              >
                <Copy className="w-3.5 h-3.5 mr-2" /> Copy Result
              </button>
            )}
          </div>
          <div className="glass-panel p-8 rounded-[40px] border border-white/5 h-[500px] flex flex-col relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute -right-20 -bottom-20 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
              <FileText className="w-96 h-96 text-white" />
            </div>

            {generatedScript ? (
              <div className="flex-1 overflow-auto custom-scrollbar relative z-10">
                <pre className="text-sm font-bold text-zinc-200 leading-[1.8] whitespace-pre-wrap font-sans">
                  {generatedScript}
                </pre>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-800 space-y-4">
                <div className="p-6 bg-white/5 rounded-full">
                  <FileText className="w-12 h-12" />
                </div>
                <p className="font-orbitron font-black text-[10px] uppercase tracking-[0.3em] text-center">
                  Waiting for input data...<br/>
                  <span className="text-zinc-900 mt-2 block">Script will be live-generated here</span>
                </p>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-white/5 relative z-10">
              <button 
                disabled={!generatedScript}
                onClick={copyResult}
                className={`w-full py-4 rounded-2xl font-black font-orbitron text-xs transition-all flex items-center justify-center space-x-3 ${
                  generatedScript 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 hover:scale-[1.02]' 
                    : 'bg-zinc-900 text-zinc-700 cursor-not-allowed'
                }`}
              >
                <Copy className="w-4 h-4" />
                <span>COPY FORMATTED SCRIPT</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Logic Section */}
      <div className="glass-panel p-8 rounded-[40px] border border-white/5 bg-black/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-3">
             <h4 className="text-[11px] font-black text-zinc-400 uppercase tracking-widest flex items-center">
               <Calendar className="w-4 h-4 mr-2 text-blue-500" /> SHIO CALCULATION PROTOCOL (2025/2026)
             </h4>
             <p className="text-[10px] text-zinc-600 leading-relaxed font-bold italic">
               Sistem menggunakan tabel Shio Ular (01) sebagai patokan dasar. Angka keberuntungan (Shio) 
               diambil dari 2 angka belakang (2D) dari Prize 1. Algoritma: (Angka % 12).
             </p>
           </div>
           <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {Object.entries(SHIO_MAP).map(([idx, name]) => (
                <div key={idx} className="bg-white/5 p-2 rounded-xl text-center border border-white/5">
                  <div className="text-[8px] text-zinc-600 font-black mb-1">{idx.padStart(2, '0')}</div>
                  <div className="text-[9px] text-zinc-400 font-bold">{name}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
