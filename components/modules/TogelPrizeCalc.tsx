
import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, Wallet, Target, Percent, Info, TrendingUp, Gem, Layers, ChevronDown } from 'lucide-react';

interface PrizeTableProps {
  title: string;
  data: { label: string; value: string; sub?: string }[];
  color: string;
}

const PrizeBox: React.FC<PrizeTableProps> = ({ title, data, color }) => (
  <div className="glass-panel p-6 rounded-[30px] border border-white/5 space-y-4 h-full">
    <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center ${color}`}>
      <div className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse ${color.replace('text-', 'bg-')}`}></div>
      {title}
    </h4>
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i} className="flex justify-between items-center border-b border-white/[0.03] pb-2">
          <span className="text-xs font-bold text-zinc-500">{item.label}</span>
          <div className="text-right">
            <span className="text-sm font-black text-zinc-200 font-orbitron">{item.value}</span>
            {item.sub && <p className="text-[9px] text-zinc-600 font-bold uppercase">{item.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface BetOption {
  label: string;
  mult: number;
  disc: number;
  isSpecial?: boolean;
}

const BET_OPTIONS_4D: Record<string, BetOption[]> = {
  "DISKON": [
    { label: "4D DISKON", mult: 3000, disc: 66.5 },
    { label: "3D DISKON", mult: 400, disc: 59.5 },
    { label: "2D DISKON", mult: 70, disc: 29.5 },
    { label: "2D DEPAN/TENGAH", mult: 65, disc: 0 },
  ],
  "FULL": [
    { label: "4D FULL", mult: 10000, disc: 0 },
    { label: "3D FULL", mult: 1000, disc: 0 },
    { label: "2D FULL", mult: 100, disc: 0 },
  ],
  "BB (TEPAT)": [
    { label: "4D BB TEPAT", mult: 4000, disc: 0 },
    { label: "3D BB TEPAT", mult: 400, disc: 0 },
    { label: "2D BB TEPAT", mult: 70, disc: 0 },
  ],
  "COLOK & LAINNYA": [
    { label: "COLOK BEBAS", mult: 1.5, disc: 6, isSpecial: true },
    { label: "MACAU 2 ANGKA", mult: 7, disc: 10, isSpecial: true },
    { label: "MACAU 3 ANGKA", mult: 11, disc: 10, isSpecial: true },
    { label: "MACAU 4 ANGKA", mult: 18, disc: 10, isSpecial: true },
    { label: "COLOK NAGA (MIN)", mult: 23, disc: 10, isSpecial: true },
    { label: "COLOK NAGA (MAX)", mult: 35, disc: 10, isSpecial: true },
    { label: "COLOK JITU", mult: 8, disc: 6, isSpecial: true },
    { label: "SHIO", mult: 9.5, disc: 8, isSpecial: true },
    { label: "KOMBINASI", mult: 2.6, disc: 8, isSpecial: true },
  ]
};

const BET_OPTIONS_5D: Record<string, BetOption[]> = {
  "FULL": [
    { label: "5D FULL", mult: 88000, disc: 0 },
    { label: "4D FULL", mult: 10000, disc: 0 },
    { label: "3D FULL", mult: 1000, disc: 0 },
  ],
  "BB (TEPAT)": [
    { label: "5D BB TEPAT", mult: 50000, disc: 0 },
    { label: "4D BB TEPAT", mult: 5000, disc: 0 },
    { label: "3D BB TEPAT", mult: 500, disc: 0 },
  ],
  "DISKON": [
    { label: "5D DISKON", mult: 50000, disc: 0 },
    { label: "4D DISKON", mult: 7000, disc: 0 },
    { label: "3D DISKON", mult: 750, disc: 0 },
  ],
  "COLOK 5D": [
    { label: "CB 2D (2 ANGKA)", mult: 4, disc: 10, isSpecial: true },
    { label: "CB 2D (3 ANGKA)", mult: 6, disc: 10, isSpecial: true },
    { label: "CB 2D (4 ANGKA)", mult: 20, disc: 10, isSpecial: true },
    { label: "CB 2D (5 ANGKA)", mult: 200, disc: 10, isSpecial: true },
    { label: "COLOK JITU", mult: 8, disc: 6, isSpecial: true },
    { label: "COLOK NAGA (3)", mult: 12, disc: 10, isSpecial: true },
    { label: "COLOK NAGA (4)", mult: 30, disc: 10, isSpecial: true },
    { label: "COLOK NAGA (5)", mult: 125, disc: 10, isSpecial: true },
    { label: "CB 4D (4)", mult: 50, disc: 10, isSpecial: true },
    { label: "CB 4D (5)", mult: 200, disc: 10, isSpecial: true },
    { label: "2 KOMBINASI", mult: 2.7, disc: 8, isSpecial: true },
    { label: "COLOK BEBAS", mult: 0.9, disc: 6, isSpecial: true },
    { label: "SHIO", mult: 9.5, disc: 8, isSpecial: true },
  ]
};

export default function TogelPrizeCalc({ showToast }: {
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  const [activeMarket, setActiveMarket] = useState<'4D' | '5D'>('4D');
  const [betCategory, setBetCategory] = useState<string>('');
  const [betType, setBetType] = useState<BetOption | null>(null);
  
  const [calcBetAmount, setCalcBetAmount] = useState<string>('1000');
  const [calcDiscount, setCalcDiscount] = useState<string>('0');
  const [calcMultiplier, setCalcMultiplier] = useState<string>('0');
  const [isSpecialLogic, setIsSpecialLogic] = useState<boolean>(false);

  // Sync default options on market change
  useEffect(() => {
    const categories = activeMarket === '4D' ? BET_OPTIONS_4D : BET_OPTIONS_5D;
    const firstCat = Object.keys(categories)[0];
    const firstBet = categories[firstCat][0];
    
    setBetCategory(firstCat);
    handleBetChange(firstBet);
  }, [activeMarket]);

  const handleBetChange = (option: BetOption) => {
    setBetType(option);
    setCalcDiscount(option.disc.toString());
    setCalcMultiplier(option.mult.toString());
    setIsSpecialLogic(option.isSpecial || false);
  };

  const calculateResult = useMemo(() => {
    const bet = parseFloat(calcBetAmount) || 0;
    const disc = parseFloat(calcDiscount) || 0;
    const mult = parseFloat(calcMultiplier) || 0;

    const netBet = bet - (bet * (disc / 100));
    
    if (isSpecialLogic) {
      // Logika Khusus: (Bet * Multiplier) + Modal Net
      // Sesuai permintaan: Total Pembayaran = Hadiah Menang + Modal yang sudah di disc
      return (bet * mult) + netBet;
    } else {
      // Logika Standar: Bet * Multiplier
      return bet * mult;
    }
  }, [calcBetAmount, calcDiscount, calcMultiplier, isSpecialLogic]);

  const currentOptions = activeMarket === '4D' ? BET_OPTIONS_4D : BET_OPTIONS_5D;

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-4xl font-black font-orbitron text-white uppercase tracking-tighter">Prize Structure</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-bold">Automatic Payout Selection Engine</p>
        </div>
        <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveMarket('4D')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeMarket === '4D' ? 'bg-[var(--primary-color)] text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            4D Market
          </button>
          <button 
            onClick={() => setActiveMarket('5D')}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeMarket === '5D' ? 'bg-[var(--primary-color)] text-black shadow-lg shadow-emerald-500/20' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            5D Market
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-[40px] border border-primary-fade bg-gradient-to-br from-emerald-500/5 to-transparent relative overflow-hidden">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-primary-fade rounded-2xl border border-primary-fade">
                <Calculator className="w-6 h-6 text-[var(--primary-color)]" />
              </div>
              <h3 className="text-xl font-black font-orbitron text-white uppercase tracking-tighter">Smart Calculator</h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bet Category</label>
                  <select 
                    value={betCategory}
                    onChange={(e) => {
                      const cat = e.target.value;
                      setBetCategory(cat);
                      handleBetChange(currentOptions[cat][0]);
                    }}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs font-bold text-zinc-300 outline-none appearance-none cursor-pointer focus:border-[var(--primary-color)]"
                  >
                    {Object.keys(currentOptions).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bet Type</label>
                  <select 
                    value={betType?.label}
                    onChange={(e) => {
                      const opt = currentOptions[betCategory].find(o => o.label === e.target.value);
                      if (opt) handleBetChange(opt);
                    }}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs font-bold text-emerald-400 outline-none appearance-none cursor-pointer focus:border-[var(--primary-color)]"
                  >
                    {currentOptions[betCategory]?.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bet Amount (Nominal)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={calcBetAmount}
                    onChange={e => setCalcBetAmount(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-5 text-2xl font-black text-white outline-none focus:border-[var(--primary-color)]"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-black text-zinc-600">IDR</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Auto Discount</span>
                  <div className="text-lg font-black text-zinc-300 font-orbitron">{calcDiscount}%</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block mb-1">Auto Multiplier</span>
                  <div className="text-lg font-black text-[var(--primary-color)] font-orbitron">{calcMultiplier}x</div>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border transition-all flex items-center justify-between ${isSpecialLogic ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/5 opacity-50'}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isSpecialLogic ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                    <Gem className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Special Calculation</label>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase italic">Logika Modal Kembali</span>
                  </div>
                </div>
                <div className={`text-[10px] font-black px-3 py-1 rounded-full ${isSpecialLogic ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-600'}`}>
                  {isSpecialLogic ? 'ACTIVE' : 'OFF'}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4 text-center">Total Estimated Payout</p>
                <div className="relative inline-block w-full text-center">
                   <div className="text-5xl font-black font-orbitron text-[var(--primary-color)] neon-text-primary tracking-tighter">
                    Rp {calculateResult.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-[30px] border border-white/5 bg-black/20 flex items-start space-x-4">
            <Info className="w-5 h-5 text-zinc-600 mt-1 shrink-0" />
            <div className="space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Protocol Sync Status:</p>
              <p className="text-[10px] text-zinc-600 leading-relaxed font-bold italic">
                Calculator ini secara otomatis menyesuaikan diskon dan multiplier berdasarkan jenis taruhan yang dipilih. 
                Mode "Modal Kembali" aktif untuk kategori Colok, Shio, dan Kombinasi.
                Rumus: (Taruhan * Hadiah) + Modal Net.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          {activeMarket === '4D' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-700">
              <PrizeBox 
                title="Hadiah Tipe Diskon" 
                color="text-blue-400"
                data={[
                  { label: "4D", value: "3.000x", sub: "Diskon 66.5%" },
                  { label: "3D", value: "400x", sub: "Diskon 59.5%" },
                  { label: "2D", value: "70x", sub: "Diskon 29.5%" },
                ]}
              />
              <PrizeBox 
                title="Colok & Kombinasi (4D)" 
                color="text-indigo-400"
                data={[
                  { label: "Colok Bebas", value: "1.5x", sub: "Diskon 6%" },
                  { label: "Colok Macau (2D)", value: "7x / 11x / 18x", sub: "Diskon 10%" },
                  { label: "Colok Naga", value: "23x / 35x", sub: "Diskon 10%" },
                  { label: "Colok Jitu", value: "8x", sub: "Diskon 6%" },
                  { label: "Shio", value: "9.5x", sub: "Diskon 8%" },
                  { label: "Kombinasi", value: "2.6x", sub: "Diskon 8%" },
                ]}
              />
              <PrizeBox 
                title="Tipe FULL (4D)" 
                color="text-emerald-400"
                data={[
                  { label: "4D", value: "10.000x" },
                  { label: "3D", value: "1.000x" },
                  { label: "2D", value: "100x" },
                ]}
              />
              <PrizeBox 
                title="Tipe Bolak-Balik (BB)" 
                color="text-amber-400"
                data={[
                  { label: "4D Tepat", value: "4.000x", sub: "Terbalik 200x" },
                  { label: "3D Tepat", value: "400x", sub: "Terbalik 100x" },
                  { label: "2D Tepat", value: "70x", sub: "Terbalik 20x" },
                ]}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-700">
               <PrizeBox 
                title="5D Tipe FULL" 
                color="text-emerald-400"
                data={[
                  { label: "5D", value: "88.000x" },
                  { label: "4D", value: "10.000x" },
                  { label: "3D", value: "1.000x" },
                ]}
              />
              <PrizeBox 
                title="Colok 5D Series" 
                color="text-indigo-400"
                data={[
                  { label: "CB 2D (Macau)", value: "4x / 6x / 20x / 200x", sub: "Diskon 10%" },
                  { label: "Colok Naga", value: "12x / 30x / 125x", sub: "Diskon 10%" },
                  { label: "CB 4D", value: "50x / 200x", sub: "Diskon 10%" },
                  { label: "Colok Jitu", value: "8x", sub: "Diskon 6%" },
                  { label: "Kombinasi", value: "2.7x", sub: "Diskon 8%" },
                  { label: "Colok Bebas", value: "0.9x", sub: "Diskon 6%" },
                ]}
              />
              <PrizeBox 
                title="5D Tipe Diskon" 
                color="text-blue-400"
                data={[
                  { label: "5D", value: "50.000x" },
                  { label: "4D", value: "7.000x" },
                  { label: "3D", value: "750x" },
                ]}
              />
              <PrizeBox 
                title="5D Bolak-Balik (BB)" 
                color="text-amber-400"
                data={[
                  { label: "5D Tepat", value: "50.000x", sub: "Balik 350x" },
                  { label: "4D Tepat", value: "5.000x", sub: "Balik 180x" },
                  { label: "3D Tepat", value: "500x", sub: "Balik 75x" },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
