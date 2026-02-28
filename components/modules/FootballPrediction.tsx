
import React, { useState, useEffect, useRef } from 'react';
import { Copy, RefreshCw, ExternalLink, Trash2, Palette, FileCode, Eye, Monitor } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  glow: string;
}

const COLOR_THEMES: ColorTheme[] = [
  { name: 'Luxury Gold', primary: '#1a1a1a', secondary: '#d1c462', glow: '#FFD700' },
  { name: 'Cyber Blue', primary: '#0a0a1a', secondary: '#00f2ff', glow: '#ffffff' },
  { name: 'Blood Red', primary: '#1a0505', secondary: '#ff3e3e', glow: '#ffffff' },
  { name: 'Emerald Green', primary: '#051a05', secondary: '#00ff88', glow: '#ffffff' },
  { name: 'Royal Purple', primary: '#10051a', secondary: '#bc13fe', glow: '#ffffff' },
  { name: 'Neon Orange', primary: '#1a1005', secondary: '#ff8c00', glow: '#ffffff' },
];

interface MatchData {
  league: string;
  matches: {
    date: string;
    time: string;
    teams: string;
    score: string;
  }[];
}

const FootballPrediction: React.FC<Props> = ({ showToast }) => {
  const [inputText, setInputText] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(COLOR_THEMES[0]);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [outputMode, setOutputMode] = useState<'code' | 'preview'>('code');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const parseInput = (text: string): MatchData[] => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const data: MatchData[] = [];
    let currentLeague = '';

    lines.forEach(line => {
      const isMatchLine = line.match(/\d{2}\/\d{2}\s\d{2}:\d{2}/);
      
      if (!isMatchLine) {
        currentLeague = line.toUpperCase();
      } else {
        const match = line.match(/(\d{2}\/\d{2})\s(\d{2}:\d{2})\sWIB\s(.+?)\s(\d+\s:\s\d+)/);
        if (match && currentLeague) {
          const [_, date, time, teams, score] = match;
          let leagueGroup = data.find(d => d.league === currentLeague);
          if (!leagueGroup) {
            leagueGroup = { league: currentLeague, matches: [] };
            data.push(leagueGroup);
          }
          leagueGroup.matches.push({ date, time: time + ' WIB', teams, score });
        }
      }
    });

    return data;
  };

  const getFormattedDate = (dateStr: string) => {
    if (!dateStr) return "⚽ PREDIKSI BOLA HARI INI ⚽";
    try {
      const [day, month] = dateStr.split('/');
      const year = new Date().getFullYear();
      const dateObj = new Date(year, parseInt(month) - 1, parseInt(day));
      
      const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
      const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
      
      const dayName = days[dateObj.getDay()];
      const monthName = months[dateObj.getMonth()];
      
      return `⚽ ${dayName}, ${day} ${monthName} ${year} ⚽`;
    } catch (e) {
      return "⚽ PREDIKSI BOLA HARI INI ⚽";
    }
  };

  const generateScript = () => {
    if (!inputText.trim()) {
      showToast('Masukkan data prediksi terlebih dahulu', 'error');
      return;
    }

    const parsedData = parseInput(inputText);
    if (parsedData.length === 0) {
      showToast('Format teks tidak valid', 'error');
      return;
    }

    const theme = selectedTheme;
    const dateHeader = getFormattedDate(parsedData[0]?.matches[0]?.date);
    
    let tablesHtml = '';
    parsedData.forEach(group => {
      tablesHtml += `
<table class="prediction-table">
<thead>
<tr>
<th colspan="3">${group.league}</th>
</tr>
<tr>
<th>TANGGAL & WAKTU</th>
<th>PERTANDINGAN</th>
<th>SKOR</th>
</tr>
</thead>
<tbody>`;
      group.matches.forEach(m => {
        tablesHtml += `
<tr>
<td>${m.date} ${m.time}</td>
<td>${m.teams}</td>
<td>${m.score}</td>
</tr>`;
      });
      tablesHtml += `
</tbody>
</table>`;
    });

    const fullHTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
    body { background-color: #050505; margin: 0; padding: 20px; font-family: 'Arial', sans-serif; }
    .date { text-align: center; font-size: 16px; color: ${theme.glow}; margin-bottom: 15px; font-weight: bold; background: linear-gradient(45deg, ${theme.primary}, ${theme.secondary}); padding: 8px; border-radius: 5px; }
    .prediction-table { width: 100%; border-collapse: collapse; margin: 15px 0; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); border-radius: 8px; overflow: hidden; background: linear-gradient(135deg, ${theme.primary}, #2a0a0a); font-size: 14px; }
    .prediction-table th { background: linear-gradient(45deg, ${theme.secondary}, ${theme.primary}); color: ${theme.glow}; text-align: center; padding: 12px 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid ${theme.glow}; }
    .prediction-table td { text-align: center; padding: 10px 8px; color: ${theme.secondary}; border-bottom: 1px solid #333; background: rgba(0, 0, 0, 0.7); }
    .prediction-table tr:nth-child(even) td { background: rgba(30, 0, 0, 0.7); }
    .prediction-table tr:hover td { background: rgba(139, 0, 0, 0.5); color: ${theme.glow}; }
    .marquee { overflow: hidden; white-space: nowrap; background: linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.primary}); color: ${theme.glow}; padding: 12px 0; font-size: 16px; font-weight: bold; border-radius: 5px; margin-bottom: 15px; }
    .marquee p { display: inline-block; animation: marquee 20s linear infinite; padding-left: 100%; margin: 0; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
    @media (max-width: 768px) { .prediction-table { font-size: 12px; } .prediction-table th, .prediction-table td { padding: 8px 5px; font-size: 11px; } }
    @media (max-width: 480px) { .prediction-table { font-size: 10px; } .prediction-table th, .prediction-table td { padding: 6px 3px; font-size: 9px; } }
</style>
</head>
<body>
    <div class="date">${dateHeader}</div>
    <div class="marquee">
        <p>🌟 DAFTAR & PASANG TARUHAN ANDA DI LIGABANDOT - PREDIKSI TERAKURAT SETIAP HARI! 🌟</p>
    </div>
    ${tablesHtml}
</body>
</html>`.trim();

    setGeneratedHTML(fullHTML);
    setOutputMode('preview');
    showToast('Script berhasil dibuat!', 'success');
  };

  const copyResult = () => {
    navigator.clipboard.writeText(generatedHTML);
    showToast('Script disalin ke clipboard!', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header & Quick Links */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter">Football Script Generator</h3>
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.3em]">Advanced Layout Engine V3 // Live Preview Enabled</p>
        </div>
        <div className="flex gap-2">
          <a href="https://shortq.net/PREDIKSIBOLA" target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-[10px] font-black text-blue-400 flex items-center hover:bg-blue-600/40 transition-all uppercase">
            Source 1 <ExternalLink className="w-3 h-3 ml-2" />
          </a>
          <a href="https://kembarprediksi.online/category/prediksi-bola/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-xl text-[10px] font-black text-emerald-400 flex items-center hover:bg-emerald-600/40 transition-all uppercase">
            Source 2 <ExternalLink className="w-3 h-3 ml-2" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel: Input & Settings */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-[30px] border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center">
                <Palette className="w-4 h-4 mr-2 text-[var(--primary-color)]" /> Select Color Style
              </label>
              <span className="text-[9px] font-bold text-zinc-600">{selectedTheme.name}</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setSelectedTheme(theme)}
                  title={theme.name}
                  className={`h-10 rounded-xl transition-all border-2 ${selectedTheme.name === theme.name ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                />
              ))}
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Input Raw Match Data</label>
                <button onClick={() => setInputText('')} className="text-zinc-600 hover:text-rose-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste data di sini...&#10;Contoh:&#10;ITALY SERIE A&#10;14/02 02:45 WIB Pisa VS AC Milan 1 : 2"
                className="w-full h-64 bg-black/60 border border-white/10 rounded-2xl p-5 font-mono text-xs text-zinc-300 outline-none focus:border-[var(--primary-color)] transition-all custom-scrollbar"
              />
            </div>

            <button
              onClick={generateScript}
              className="w-full bg-[var(--primary-color)] text-black font-black font-orbitron py-5 rounded-2xl text-sm flex items-center justify-center hover:opacity-80 transition-all shadow-[0_0_20px_rgba(0,255,0,0.2)]"
            >
              <RefreshCw className="w-5 h-5 mr-3" /> GENERATE & PREVIEW
            </button>
          </div>
        </div>

        {/* Right Panel: Output & Live Preview */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
             <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/5">
                <button 
                  onClick={() => setOutputMode('code')}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center transition-all ${outputMode === 'code' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <FileCode className="w-3 h-3 mr-2" /> HTML CODE
                </button>
                <button 
                  onClick={() => setOutputMode('preview')}
                  className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center transition-all ${outputMode === 'preview' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Eye className="w-3 h-3 mr-2" /> LIVE PREVIEW
                </button>
             </div>
            {generatedHTML && (
              <button onClick={copyResult} className="text-[10px] font-black text-[var(--primary-color)] uppercase flex items-center hover:opacity-70 transition-all">
                <Copy className="w-3.5 h-3.5 mr-2" /> Copy Script
              </button>
            )}
          </div>
          
          <div className="glass-panel rounded-[30px] border border-white/5 h-[620px] flex flex-col overflow-hidden relative">
            {generatedHTML ? (
              outputMode === 'code' ? (
                <div className="p-6 h-full flex flex-col">
                  <pre className="flex-1 text-[11px] font-mono text-zinc-400 overflow-auto custom-scrollbar whitespace-pre-wrap select-all">
                    {generatedHTML}
                  </pre>
                </div>
              ) : (
                <div className="h-full bg-zinc-950 flex flex-col">
                  <div className="p-3 border-b border-white/5 bg-black/40 flex items-center justify-between text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                    <div className="flex items-center">
                      <Monitor className="w-3 h-3 mr-2 text-zinc-600" /> VIRTUAL BROWSER VIEW
                    </div>
                    <span className="text-emerald-500/50 font-orbitron">REALTIME_RENDER_ACTIVE</span>
                  </div>
                  <iframe 
                    ref={iframeRef}
                    srcDoc={generatedHTML}
                    title="Live Preview"
                    className="flex-1 w-full border-none bg-zinc-900"
                    sandbox="allow-scripts"
                  />
                </div>
              )
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-700 space-y-4 opacity-30">
                <Monitor className="w-16 h-16" />
                <p className="font-orbitron font-black text-xs uppercase tracking-widest text-center">
                  Configure and generate<br/>to produce script output
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballPrediction;
