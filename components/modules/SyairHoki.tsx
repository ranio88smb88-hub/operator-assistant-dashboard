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
  { name: 'Royal Cream', url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&w=1200&h=480&q=80', accent: '#BF953F' },
  { name: 'Mystic Realm 1', url: 'https://i.postimg.cc/YqgfgfF6/JGCeq.jpg', accent: '#00E5FF' },
  { name: 'Mystic Realm 2', url: 'https://i.postimg.cc/7PJg8Mmz/Es6CL.jpg', accent: '#E040FB' },
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
  const boxBgDark = 'rgba(40, 35, 30, 0.9)';
  const boxBgLight = 'rgba(120, 110, 90, 0.6)';

  const [isGenerating, setIsGenerating] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    // Initial measurement
    setTimeout(updateWidth, 100);
    
    window.addEventListener('resize', updateWidth);
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Use the contentRect width for more accuracy
        setContainerWidth(entry.contentRect.width);
      }
    });
    
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
      observer.disconnect();
    };
  }, []);

  // Ensure scale is never too small or too large initially
  const scale = containerWidth > 0 ? containerWidth / 1200 : 1;

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
          <div className="space-y-4">
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
              className="relative w-full aspect-[1200/480] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-950 mx-auto"
              style={{ minHeight: '150px' }}
            >
              <div 
                ref={previewRef}
                className="absolute top-0 left-1/2 w-[1200px] h-[480px] bg-black select-none"
                style={{ 
                  transform: `translateX(-50%) scale(${scale})`,
                  transformOrigin: 'top center'
                }}
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
                <div className="absolute top-8 left-10 flex flex-col items-start">
                  <div className="flex items-center justify-start">
                    <img 
                      src="https://ligabandot.com/resources/images/logo.png" 
                      className="h-20 w-auto object-contain" 
                      style={{ filter: `drop-shadow(0 0 20px #BF953F88)` }}
                      alt="LIGABANDOT LOGO" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="absolute top-8 right-10 text-right">
                  <span className="text-4xl font-black font-fantasy tracking-widest" 
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
                <div className="absolute left-10 top-1/2 -translate-y-1/2 space-y-3 z-20">
                  {[
                    { label: 'BBFS', value: data.bbfs },
                    { label: 'A.MAIN', value: data.angkaMain },
                    { label: '4D', value: data.fourD },
                    { label: 'A.SHIO', value: data.shio },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-24 h-14 flex items-center justify-center rounded-l-xl border-y border-l border-white/10" style={{ background: 'linear-gradient(to bottom, #2a2520, #1a1510)' }}>
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
                      <div className="w-52 h-14 flex items-center px-8 rounded-r-xl border-y border-r border-white/10 ml-[2px]" style={{ background: 'linear-gradient(to bottom, #786e5a, #4a453a)' }}>
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

                {/* Center: Character Frame */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-[340px] h-[340px] bg-[#f5f5f0] rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none"></div>
                    <div className="w-full h-full rounded-xl overflow-hidden border border-black/5 relative">
                      <img 
                        src={data.character} 
                        className="w-full h-full object-cover" 
                        alt="character" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side: Pasaran & Quote */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[420px] space-y-6 text-right z-20">
                  <div className="space-y-0">
                    <span className="text-sm font-black uppercase tracking-[0.4em] font-fantasy opacity-80"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      TOTO
                    </span>
                    <h4 className="text-6xl font-black font-fantasy tracking-tighter leading-[0.9]"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))'
                      }}
                    >
                      {data.pasaran}
                    </h4>
                  </div>

                  <div className="bg-[#2a2520]/90 backdrop-blur-md p-8 rounded-3xl text-right relative border border-white/5 shadow-2xl min-h-[140px] flex items-center justify-end">
                    <div className="absolute top-4 right-0 w-[3px] h-[calc(100%-32px)] bg-[#BF953F] rounded-full"></div>
                    <p className="text-xl font-medium italic leading-relaxed font-medieval"
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

                  <div className="flex justify-end items-center gap-4">
                    <div className="h-[1px] w-24 bg-gradient-to-l from-[#BF953F] to-transparent opacity-50"></div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] font-fantasy"
                      style={{ 
                        backgroundImage: goldGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      OFFICIAL PREDICTION
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyairHoki;
