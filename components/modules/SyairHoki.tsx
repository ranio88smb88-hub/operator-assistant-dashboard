
import React, { useState } from 'react';
import { Copy, Sparkles, RefreshCw } from 'lucide-react';
import { SYAIR_SENTENCES } from '../../constants';

interface Props {
  showToast: (msg: string) => void;
}

const SyairHoki: React.FC<Props> = ({ showToast }) => {
  const [result, setResult] = useState('');

  const generate = () => {
    const shuffled = [...SYAIR_SENTENCES].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);
    
    const text = `
📜 SYAIR HOKI HARI INI 📜
━━━━━━━━━━━━━━━━━━━
${selected.map((s, i) => `${i + 1}. ${s}`).join('\n')}

"Pecahkan misteri di balik syair, 
temukan angka di balik tabir."
━━━━━━━━━━━━━━━━━━━
    `.trim();
    setResult(text);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="max-w-xl w-full glass-card p-10 rounded-3xl text-center space-y-8">
        <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Mystical Syair Generator</h2>
          <p className="text-zinc-500 text-sm mt-2">Generate poetic clues for lucky predictions in Indonesian.</p>
        </div>

        {result && (
          <div className="bg-zinc-950/50 p-8 rounded-2xl border border-purple-500/20 font-serif italic text-lg text-purple-200 whitespace-pre-line relative group">
            <button 
              onClick={() => { navigator.clipboard.writeText(result); showToast('Syair Copied!'); }}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/5 rounded-lg"
            >
              <Copy className="w-4 h-4 text-zinc-400" />
            </button>
            {result}
          </div>
        )}

        <div className="flex space-x-4">
          <button 
            onClick={generate}
            className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" /> {result ? 'Regenerate Syair' : 'Generate Syair'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SyairHoki;
