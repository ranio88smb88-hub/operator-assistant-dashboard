import React, { useState, useRef, useEffect } from 'react';
import { Download, RefreshCw, Image as ImageIcon, Type, Sparkles, Layout, Palette } from 'lucide-react';
import { PASARAN_SCHEDULE, SYAIR_SENTENCES } from '../../constants';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

interface SyairData {
  pasaran: string;
  date: string;
  bbfs: string;
  angkaMain: string;
  fourD: string;
  shio: string;
  quote: string;
  character: string;
}

const CHARACTERS = [
  { name: 'Oracle 1', url: 'https://i.postimg.cc/R051t01d/6m-RVI-removebg-preview.png' },
  { name: 'Oracle 2', url: 'https://i.postimg.cc/XJnw2Dzz/h8v3A-removebg-preview.png' },
  { name: 'Oracle 3', url: 'https://i.postimg.cc/v8qWzhL3/Z74yn-1-removebg-preview.png' },
  { name: 'Oracle 4', url: 'https://i.postimg.cc/dVdrJYM2/j-AYfb-removebg-preview.png' },
  { name: 'Oracle 5', url: 'https://i.postimg.cc/RFCH1JW1/G56w9-removebg-preview.png' },
  { name: 'Oracle 6', url: 'https://i.postimg.cc/8PfrbSz0/A3ccj-removebg-preview.png' },
  { name: 'Oracle 7', url: 'https://i.postimg.cc/25rbmL7n/9y-Z8o-removebg-preview.png' },
  { name: 'Oracle 8', url: 'https://i.postimg.cc/Dfc5YcZj/Urq7Z-removebg-preview-(1).png' },
  { name: 'Oracle 9', url: 'https://i.postimg.cc/4NLPXNp2/Qf-OYw-removebg-preview.png' },
  { name: 'Oracle 10', url: 'https://i.postimg.cc/2S1wyRw8/vp2qr-removebg-preview.png' },
];

const BACKGROUNDS = [
  { name: 'Mystic Realm 1', url: 'https://i.postimg.cc/YqgfgfF6/JGCeq.jpg', accent: '#00E5FF' },
  { name: 'Mystic Realm 2', url: 'https://i.postimg.cc/7PJg8Mmz/Es6CL.jpg', accent: '#E040FB' },
  { name: 'Mystic Realm 3', url: 'https://i.postimg.cc/P5yDz6rR/s-Yien.jpg', accent: '#448AFF' },
];

const SyairHoki: React.FC<Props> = ({ showToast }) => {
  const [data, setData] = useState<SyairData>({
    pasaran: 'TOTO CAMBODIA',
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long' }).toUpperCase(),
    bbfs: '4484450',
    angkaMain: '99000',
    fourD: '6562',
    shio: '9 / 5',
    quote: 'Menanti kesempatan dengan senyuman, angka-angka ini membawa harapan.',
    character: CHARACTERS[0].url,
  });

  const [bgImage, setBgImage] = useState(BACKGROUNDS[0].url);
  const currentBg = BACKGROUNDS.find(bg => bg.url === bgImage) || BACKGROUNDS[0];
  const accentColor = currentBg.accent;
  const goldGradient = 'linear-gradient(to bottom, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)';
  const goldTextShadow = '0 2px 4px rgba(0,0,0,0.8)';

  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleRandomize = () => {
    const randomSyair = SYAIR_SENTENCES[Math.floor(Math.random() * SYAIR_SENTENCES.length)];
    const randomBBFS = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
    const randomAM = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
    const random4D = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
    
    setData(prev => ({
      ...prev,
      quote: randomSyair,
      bbfs: randomBBFS,
      angkaMain: randomAM,
      fourD: random4D,
    }));
    showToast('Data diacak secara mistis!', 'success');
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#000',
      });
      const link = document.createElement('a');
      link.download = `Syair-${data.pasaran}-${data.date}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('Gambar berhasil diunduh!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Gagal membuat gambar', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter">Syair Image Generator</h3>
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.3em]">Automatic Visual Oracle // LigaBandot Edition</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRandomize}
            className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs font-bold text-zinc-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-3 h-3" /> ACAK DATA
          </button>
          <button 
            onClick={downloadImage}
            disabled={isGenerating}
            className="px-4 py-2 bg-purple-600 rounded-lg text-xs font-bold text-white hover:bg-purple-500 transition-all flex items-center gap-2 shadow-lg shadow-purple-900/20 disabled:opacity-50"
          >
            <Download className="w-3 h-3" /> {isGenerating ? 'GENERATING...' : 'DOWNLOAD GAMBAR'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <Type className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Data Prediksi</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">Pasaran</label>
                <select 
                  value={data.pasaran}
                  onChange={(e) => setData({...data, pasaran: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
                >
                  {PASARAN_SCHEDULE.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">BBFS</label>
                  <input 
                    type="text" 
                    value={data.bbfs}
                    onChange={(e) => setData({...data, bbfs: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">Angka Main</label>
                  <input 
                    type="text" 
                    value={data.angkaMain}
                    onChange={(e) => setData({...data, angkaMain: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">4D</label>
                  <input 
                    type="text" 
                    value={data.fourD}
                    onChange={(e) => setData({...data, fourD: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">Shio</label>
                  <input 
                    type="text" 
                    value={data.shio}
                    onChange={(e) => setData({...data, shio: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">Syair / Pantun</label>
                <textarea 
                  value={data.quote}
                  onChange={(e) => setData({...data, quote: e.target.value})}
                  rows={3}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-purple-400 mb-2">
              <Palette className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Visual Style</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">Character</label>
                <div className="grid grid-cols-4 gap-2">
                  {CHARACTERS.map(char => (
                    <button 
                      key={char.name}
                      onClick={() => setData({...data, character: char.url})}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${data.character === char.url ? 'border-purple-500 scale-95' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={char.url} alt={char.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[9px] text-zinc-500 uppercase font-bold mb-1 block">Background</label>
                <div className="grid grid-cols-3 gap-2">
                  {BACKGROUNDS.map(bg => (
                    <button 
                      key={bg.name}
                      onClick={() => setBgImage(bg.url)}
                      className={`h-12 rounded-lg overflow-hidden border-2 transition-all ${bgImage === bg.url ? 'border-purple-500 scale-95' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-8">
          <div className="sticky top-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Preview</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">1200 x 480 PX // HD RENDER</span>
            </div>

            {/* The Canvas Container */}
            <div className="relative w-full aspect-[1200/480] rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
              <div 
                ref={previewRef}
                className="w-[1200px] h-[480px] relative overflow-hidden bg-black select-none"
                style={{ transform: 'scale(var(--preview-scale))', transformOrigin: 'top left' }}
              >
                {/* Background */}
                <img 
                  src={bgImage} 
                  className="absolute inset-0 w-full h-full object-cover" 
                  alt="bg" 
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle Vignette for readability */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]"></div>

                {/* Header */}
                <div className="absolute top-6 left-10 flex flex-col items-start">
                  <div className="flex items-center justify-start">
                    <img 
                      src="https://ligabandot.com/resources/images/logo.png" 
                      className="h-16 w-auto object-contain" 
                      style={{ filter: `drop-shadow(0 0 15px #BF953F66)` }}
                      alt="LIGABANDOT LOGO" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="absolute top-6 right-10 text-right">
                  <span className="text-3xl font-black font-fantasy tracking-tighter" 
                    style={{ 
                      backgroundImage: goldGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: `drop-shadow(${goldTextShadow})`
                    }}
                  >
                    {data.date}
                  </span>
                </div>

                {/* Left Side: Prediction Boxes */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 space-y-4">
                  {[
                    { label: 'BBFS', value: data.bbfs },
                    { label: 'A.main', value: data.angkaMain },
                    { label: '4D', value: data.fourD },
                    { label: 'A.Shio', value: data.shio },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-24 h-12 bg-black/60 backdrop-blur-md rounded-l-xl flex items-center justify-center" style={{ borderColor: `#BF953F4D`, borderStyle: 'solid', borderWidth: '1px' }}>
                        <span className="text-sm font-black uppercase tracking-widest font-fantasy"
                          style={{ 
                            backgroundImage: goldGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <div className="w-56 h-12 bg-black/40 backdrop-blur-md rounded-r-xl flex items-center px-6" style={{ borderColor: `#BF953F66`, borderStyle: 'solid', borderWidth: '1px' }}>
                        <span className="text-2xl font-black font-medieval tracking-widest"
                          style={{ 
                            backgroundImage: goldGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: `drop-shadow(${goldTextShadow})`
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Center: Character */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[480px]">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 blur-[150px] rounded-full animate-pulse" style={{ backgroundColor: `#BF953F26` }}></div>
                    <img 
                      src={data.character} 
                      className="w-full h-full object-contain relative z-10" 
                      style={{ filter: `drop-shadow(0 0 60px #BF953F4D)` }}
                      alt="character" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Right Side: Pasaran & Quote */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 w-96 space-y-6 text-right">
                  <div className="space-y-1">
                    <span className="text-sm font-black uppercase tracking-[0.3em] font-fantasy"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                      }}
                    >
                      TOTO
                    </span>
                    <h4 className="text-5xl font-black font-fantasy tracking-tighter leading-none"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))'
                      }}
                    >
                      {data.pasaran}
                    </h4>
                  </div>

                  <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl text-right relative overflow-hidden shadow-2xl" style={{ borderColor: `#BF953F4D`, borderStyle: 'solid', borderWidth: '1px' }}>
                    <div className="absolute top-0 right-0 w-1 h-full" style={{ backgroundColor: '#BF953F' }}></div>
                    <p className="text-lg font-medium italic leading-relaxed font-medieval"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
                      }}
                    >
                      "{data.quote}"
                    </p>
                  </div>

                  <div className="flex justify-end items-center gap-3">
                    <div className="h-[1px] w-20 bg-gradient-to-l to-transparent" style={{ backgroundImage: `linear-gradient(to left, #BF953F, transparent)` }}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest font-fantasy"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
                      }}
                    >
                      Official Prediction
                    </span>
                  </div>
                </div>

                {/* Footer Logo */}
                <div className="absolute bottom-6 right-10 flex items-center gap-2">
                  <span className="text-[8px] font-bold tracking-[0.5em]"
                    style={{ 
                      backgroundImage: goldGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                    }}
                  >
                    WWW.LIGABANDOT.COM
                  </span>
                </div>
              </div>

              {/* Scale Helper for Preview */}
              <style>{`
                :root { --preview-scale: 1; }
                @media (min-width: 1024px) {
                  .sticky { --preview-scale: ${Math.min(1, 800 / 1200)}; }
                }
                @media (max-width: 1023px) {
                  .relative { --preview-scale: calc(100vw / 1200 * 0.9); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyairHoki;
