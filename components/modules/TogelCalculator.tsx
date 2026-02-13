import React, { useState } from 'react';
import { LayoutGrid, Hash, Layers, PlayCircle } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

// Add showToast to component props to align with other modules
const TogelCalculator: React.FC<Props> = ({ showToast }) => {
  const [bbfsInput, setBbfsInput] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'BBFS' | 'BOLAK' | 'OFF'>('BBFS');

  const generateBBFS = () => {
    const digits = bbfsInput.replace(/\D/g, '').split('');
    if (digits.length < 2) return;

    // Simplified generator for preview
    const permutations: string[] = [];
    for (let i = 0; i < Math.min(digits.length, 10); i++) {
      for (let j = 0; j < digits.length; j++) {
        if (i !== j) permutations.push(digits[i] + digits[j]);
      }
    }
    setResults(permutations.slice(0, 50));
    // Provide feedback via toast
    showToast('Sets generated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5 inline-flex">
        {(['BBFS', 'BOLAK', 'OFF'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            {tab} Generator
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-card p-6 rounded-3xl space-y-6">
          <div className="flex items-center space-x-3">
            <Hash className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Input Digits</h3>
          </div>
          <div className="space-y-4">
            <input 
              value={bbfsInput}
              onChange={e => setBbfsInput(e.target.value)}
              className="w-full bg-zinc-950 border-2 border-white/10 rounded-xl p-4 text-3xl font-mono tracking-widest outline-none focus:border-blue-500 transition-all text-center"
              placeholder="012345"
            />
            <p className="text-[10px] text-zinc-500 italic">Enter unique digits to generate 2D/3D combinations.</p>
            <button 
              onClick={generateBBFS}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center"
            >
              <PlayCircle className="w-5 h-5 mr-2" /> Start Generation
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 glass-card p-6 rounded-3xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <Layers className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold uppercase tracking-widest">Calculated Sets</h3>
            </div>
            <span className="text-[10px] font-bold text-zinc-600 bg-zinc-900 px-2 py-1 rounded">Total: {results.length}</span>
          </div>

          <div className="flex-1 grid grid-cols-5 sm:grid-cols-10 gap-2 overflow-y-auto custom-scrollbar pr-2">
            {results.length > 0 ? results.map((res, i) => (
              <div 
                key={i} 
                className="bg-zinc-950/80 border border-white/5 rounded-lg py-2 flex items-center justify-center font-mono text-xs text-blue-200 hover:border-blue-500/30 transition-all cursor-default"
              >
                {res}
              </div>
            )) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-20">
                <LayoutGrid className="w-12 h-12 mb-2" />
                <span className="text-xs font-bold uppercase tracking-widest">No combinations generated</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TogelCalculator;