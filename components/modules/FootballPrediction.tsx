
import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

interface Props {
  showToast: (msg: string) => void;
}

const FootballPrediction: React.FC<Props> = ({ showToast }) => {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [league, setLeague] = useState('Premier League');
  const [type, setType] = useState('Over/Under');
  const [result, setResult] = useState('');

  const leagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League', 'Europa League'];
  const types = ['Over/Under', 'Handicap', '1X2', 'BTTS'];

  const generate = () => {
    if (!homeTeam || !awayTeam) return;
    
    const randomPred = () => {
      switch(type) {
        case 'Over/Under': return `Prediksi: ${Math.random() > 0.5 ? 'Over 2.5' : 'Under 2.5'} (Odds: 1.${Math.floor(Math.random() * 90) + 10})`;
        case 'Handicap': return `Prediksi: ${homeTeam} ${Math.random() > 0.5 ? '-0.5' : '+0.5'} (Odds: 1.8${Math.floor(Math.random() * 9)})`;
        case '1X2': return `Prediksi: ${Math.random() > 0.6 ? homeTeam : Math.random() > 0.5 ? 'Draw' : awayTeam} (Odds: 2.${Math.floor(Math.random() * 50)})`;
        case 'BTTS': return `Prediksi: ${Math.random() > 0.5 ? 'YES' : 'NO'} (Odds: 1.7${Math.floor(Math.random() * 9)})`;
        default: return '';
      }
    };

    const text = `
🏆 PREDIKSI SEPAK BOLA 🏆
━━━━━━━━━━━━━━━━━━━
⚽ Match: ${homeTeam} vs ${awayTeam}
🌍 League: ${league}
📌 Type: ${type}
🔥 ${randomPred()}

Admin Confidence: ${Math.floor(Math.random() * 30) + 70}%
Good luck & salam JP!
━━━━━━━━━━━━━━━━━━━
    `.trim();
    setResult(text);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    showToast('Prediction copied to clipboard!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest">Generator Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-zinc-500 block mb-1">Home Team</label>
            <input 
              value={homeTeam} 
              onChange={e => setHomeTeam(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none transition"
              placeholder="e.g. Arsenal"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 block mb-1">Away Team</label>
            <input 
              value={awayTeam} 
              onChange={e => setAwayTeam(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none transition"
              placeholder="e.g. Liverpool"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-500 block mb-1">League</label>
              <select 
                value={league} 
                onChange={e => setLeague(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-sm outline-none"
              >
                {leagues.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-500 block mb-1">Prediction Type</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-2.5 text-sm outline-none"
              >
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>
        <button 
          onClick={generate}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg text-sm transition-all flex items-center justify-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Generate Script
        </button>
      </div>

      <div className="glass-card p-6 rounded-2xl flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Output Result</h3>
          {result && (
            <button onClick={copyToClipboard} className="text-xs text-blue-400 hover:text-blue-300 flex items-center">
              <Copy className="w-3 h-3 mr-1" /> Copy Script
            </button>
          )}
        </div>
        <div className="flex-1 bg-zinc-950/50 rounded-xl p-4 border border-white/5 font-mono text-xs whitespace-pre-wrap text-zinc-300">
          {result || "Configure and generate to see results here..."}
        </div>
      </div>
    </div>
  );
};

export default FootballPrediction;
