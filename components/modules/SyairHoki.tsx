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
  const goldGradient = 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)';
  const goldTextShadow = '0 2px 8px rgba(0,0,0,0.6)';

  const [isGenerating, setIsGenerating] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const scale = Math.min(1, containerWidth / 1200);

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
        backgroundColor: '#000000',
        logging: false,
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
                      <img src={char.url} alt={char.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
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
                      <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
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
            <div 
              ref={containerRef}
              className="relative w-full max-w-4xl aspect-[1200/480] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-950 mx-auto"
            >
              <div 
                ref={previewRef}
                className="absolute top-0 left-0 w-[1200px] h-[480px] bg-black select-none origin-top-left"
                style={{ transform: `scale(${scale})` }}
              >
                {/* Background */}
                <img 
                  src={bgImage} 
                  className="absolute inset-0 w-full h-full object-cover" 
                  alt="bg" 
                  crossOrigin="anonymous"
                />
                
                {/* Dark Overlay for better readability */}
                <div className="absolute inset-0 bg-black/30"></div>
                
                {/* Subtle Vignette for readability */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]"></div>

                {/* Header */}
                <div className="absolute top-6 left-8 flex flex-col items-start z-10">
                  <div className="flex items-center justify-start">
                    <img 
                      src="https://ligabandot.com/resources/images/logo.png" 
                      className="h-14 w-auto object-contain" 
                      style={{ filter: `drop-shadow(0 0 15px rgba(191, 149, 63, 0.5))` }}
                      alt="LIGABANDOT LOGO" 
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>

                <div className="absolute top-6 right-8 text-right z-10">
                  <span className="text-2xl font-black tracking-tighter" 
                    style={{ 
                      backgroundImage: goldGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: goldTextShadow
                    }}
                  >
                    {data.date}
                  </span>
                </div>

                {/* Left Side: Prediction Boxes */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 space-y-3 z-10">
                  {[
                    { label: 'BBFS', value: data.bbfs },
                    { label: 'A.MAIN', value: data.angkaMain },
                    { label: '4D', value: data.fourD },
                    { label: 'SHIO', value: data.shio },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-0">
                      <div className="w-20 h-10 bg-black/70 backdrop-blur-sm rounded-l-lg flex items-center justify-center border border-r-0" style={{ borderColor: '#BF953F66' }}>
                        <span className="text-xs font-black uppercase tracking-wider"
                          style={{ 
                            backgroundImage: goldGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <div className="w-40 h-10 bg-black/50 backdrop-blur-sm rounded-r-lg flex items-center px-4 border border-l-0" style={{ borderColor: '#BF953F66' }}>
                        <span className="text-xl font-black tracking-wider"
                          style={{ 
                            backgroundImage: goldGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: goldTextShadow
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Center: Character */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-0 pointer-events-none">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 blur-[80px] rounded-full opacity-40" style={{ backgroundColor: '#BF953F' }}></div>
                    <img 
                      src={data.character} 
                      className="max-w-full max-h-full object-contain relative z-0" 
                      style={{ filter: `drop-shadow(0 0 30px rgba(191, 149, 63, 0.4))` }}
                      alt="character" 
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>

                {/* Right Side: Pasaran & Quote */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-80 space-y-4 text-right z-10">
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-[0.3em]"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      TOTO
                    </span>
                    <h4 className="text-3xl font-black tracking-tighter leading-tight"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}
                    >
                      {data.pasaran}
                    </h4>
                  </div>

                  <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl text-right relative overflow-hidden border-l-4" style={{ borderLeftColor: '#BF953F' }}>
                    <p className="text-sm font-medium italic leading-relaxed"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      "{data.quote}"
                    </p>
                  </div>

                  <div className="flex justify-end items-center gap-3">
                    <div className="h-[1px] w-16 bg-gradient-to-l to-transparent" style={{ backgroundImage: `linear-gradient(to left, #BF953F, transparent)` }}></div>
                    <span className="text-[8px] font-black uppercase tracking-widest"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Official Prediction
                    </span>
                  </div>
                </div>

                {/* Footer Logo */}
                <div className="absolute bottom-4 right-8 flex items-center gap-2 z-10">
                  <span className="text-[7px] font-bold tracking-[0.5em]"
                    style={{ 
                      backgroundImage: goldGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    WWW.LIGABANDOT.COM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyairHoki;
