
import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  Info, 
  CircleDollarSign, 
  Activity, 
  ShieldCheck, 
  ShieldAlert,
  ChevronRight,
  HelpCircle,
  Layers
} from 'lucide-react';

type BetResult = 'WIN' | 'HALF_WIN' | 'DRAW' | 'HALF_LOSE' | 'LOSE';

interface PayoutDetail {
  payout: number;
  profit: number;
  roi: number;
  status: BetResult;
  message: string;
}

const FootballBetCalc: React.FC<{ showToast: (msg: string, type?: 'success' | 'error') => void }> = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState<'CALC' | 'MANUAL'>('CALC');
  const [betType, setBetType] = useState<string>('ASIAN_HANDICAP');
  const [stake, setStake] = useState<number>(100000);
  const [odds, setOdds] = useState<number>(1.85);
  const [handicap, setHandicap] = useState<number>(-0.25);
  const [homeScore, setHomeScore] = useState<number>(1);
  const [awayScore, setAwayScore] = useState<number>(1);

  const calculation = useMemo((): PayoutDetail => {
    let status: BetResult = 'LOSE';
    let payout = 0;
    let message = "";

    const goalDiff = homeScore - awayScore;

    switch (betType) {
      case '1X2':
        if (goalDiff > 0) status = 'WIN';
        else if (goalDiff === 0) status = 'LOSE';
        else status = 'LOSE';
        break;

      case 'ASIAN_HANDICAP':
        const finalLine = goalDiff + handicap;
        if (finalLine > 0.25) {
          status = 'WIN';
        } else if (finalLine === 0.25) {
          status = 'HALF_WIN';
        } else if (finalLine === 0) {
          status = 'DRAW';
        } else if (finalLine === -0.25) {
          status = 'HALF_LOSE';
        } else {
          status = 'LOSE';
        }
        break;

      case 'OVER_UNDER':
        const totalGoals = homeScore + awayScore;
        const ouLine = totalGoals - handicap; // here handicap is the line e.g. 2.5
        if (ouLine > 0.25) status = 'WIN';
        else if (ouLine === 0.25) status = 'HALF_WIN';
        else if (ouLine === 0) status = 'DRAW';
        else if (ouLine === -0.25) status = 'HALF_LOSE';
        else status = 'LOSE';
        break;
      
      default:
        status = goalDiff > 0 ? 'WIN' : 'LOSE';
    }

    // Payout Logic
    if (status === 'WIN') payout = stake * odds;
    else if (status === 'HALF_WIN') payout = stake + (stake * (odds - 1) / 2);
    else if (status === 'DRAW') payout = stake;
    else if (status === 'HALF_LOSE') payout = stake / 2;
    else payout = 0;

    const profit = payout - stake;
    const roi = (profit / stake) * 100;

    return { payout, profit, roi, status, message };
  }, [betType, stake, odds, handicap, homeScore, awayScore]);

  const getStatusColor = (status: BetResult) => {
    switch (status) {
      case 'WIN': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'HALF_WIN': return 'text-emerald-300 border-emerald-400/20 bg-emerald-400/5';
      case 'DRAW': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'HALF_LOSE': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      default: return 'text-rose-500 border-rose-500/30 bg-rose-500/10';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-3xl font-black font-orbitron text-white uppercase tracking-tighter italic">Football Bet Engine</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-bold">Standardized Payout Protocol V4.2</p>
        </div>
        <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveTab('CALC')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CALC' ? 'bg-[var(--primary-color)] text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Calculator
          </button>
          <button 
            onClick={() => setActiveTab('MANUAL')}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'MANUAL' ? 'bg-[var(--primary-color)] text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Market Guide
          </button>
        </div>
      </div>

      {activeTab === 'CALC' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Simulation Input */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-[40px] border border-primary-fade relative overflow-hidden">
              <div className="flex items-center space-x-3 mb-8">
                <Calculator className="w-5 h-5 text-[var(--primary-color)]" />
                <h4 className="text-sm font-black font-orbitron text-white uppercase tracking-wider">Simulation Parameters</h4>
              </div>

              <div className="space-y-6">
                {/* Market Type */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Select Market</label>
                  <select 
                    value={betType} 
                    onChange={e => setBetType(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs font-bold text-zinc-300 outline-none focus:border-[var(--primary-color)]"
                  >
                    <option value="ASIAN_HANDICAP">Asian Handicap (HDP)</option>
                    <option value="OVER_UNDER">Over / Under (OU)</option>
                    <option value="1X2">1X2 (FT/HT)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Stake (Modal)</label>
                    <input 
                      type="number" value={stake} onChange={e => setStake(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-lg font-black text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Odds (Decimal)</label>
                    <input 
                      type="number" step="0.01" value={odds} onChange={e => setOdds(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-lg font-black text-[var(--primary-color)]"
                    />
                  </div>
                </div>

                {(betType === 'ASIAN_HANDICAP' || betType === 'OVER_UNDER') && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      {betType === 'ASIAN_HANDICAP' ? 'Handicap Line' : 'Over/Under Line'}
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {[-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1, 2.5].map(v => (
                        <button 
                          key={v}
                          onClick={() => setHandicap(v)}
                          className={`p-2 rounded-xl text-[10px] font-black transition-all border ${handicap === v ? 'bg-[var(--primary-color)] text-black border-[var(--primary-color)]' : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/20'}`}
                        >
                          {v > 0 ? `+${v}` : v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block text-center">Simulation Final Score</label>
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-black text-zinc-600 uppercase mb-2">Home</span>
                      <input 
                        type="number" value={homeScore} onChange={e => setHomeScore(Number(e.target.value))}
                        className="w-16 h-16 bg-black border border-white/10 rounded-2xl text-2xl font-black text-white text-center"
                      />
                    </div>
                    <span className="text-xl font-black text-zinc-700 font-orbitron">VS</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[8px] font-black text-zinc-600 uppercase mb-2">Away</span>
                      <input 
                        type="number" value={awayScore} onChange={e => setAwayScore(Number(e.target.value))}
                        className="w-16 h-16 bg-black border border-white/10 rounded-2xl text-2xl font-black text-white text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Analytics */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-10 rounded-[40px] border-2 transition-all duration-700 flex flex-col items-center text-center space-y-6 ${getStatusColor(calculation.status)}`}>
               <div className="p-6 rounded-full bg-white/10">
                 {calculation.status.includes('WIN') ? <ShieldCheck className="w-12 h-12" /> : <ShieldAlert className="w-12 h-12" />}
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 mb-1">Transaction Outcome</p>
                 <h2 className="text-6xl font-black font-orbitron tracking-tighter uppercase">{calculation.status.replace('_', ' ')}</h2>
               </div>
               
               <div className="grid grid-cols-2 gap-8 w-full pt-6 border-t border-white/5">
                 <div className="text-left">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Total Payout</p>
                   <p className="text-2xl font-black font-orbitron">Rp {calculation.payout.toLocaleString('id-ID')}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Net Profit</p>
                   <p className={`text-2xl font-black font-orbitron ${calculation.profit >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                     {calculation.profit >= 0 ? '+' : ''}{calculation.profit.toLocaleString('id-ID')}
                   </p>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-[30px] border border-white/5 flex items-center space-x-4">
                <div className="p-3 bg-zinc-900 rounded-2xl">
                  <TrendingUp className="w-5 h-5 text-zinc-500" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Return on Investment</p>
                  <p className={`text-xl font-black font-orbitron ${calculation.roi >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                    {calculation.roi.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="glass-panel p-6 rounded-[30px] border border-white/5 flex items-center space-x-4">
                <div className="p-3 bg-zinc-900 rounded-2xl">
                  <Activity className="w-5 h-5 text-zinc-500" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Risk Profile</p>
                  <p className="text-xl font-black font-orbitron text-zinc-300">
                    {odds > 2 ? 'HIGH' : odds > 1.5 ? 'BALANCED' : 'LOW'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[30px] border border-white/5 bg-zinc-950/40 flex items-start space-x-4">
              <Info className="w-5 h-5 text-zinc-600 mt-1 shrink-0" />
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Logic Breakdown:</p>
                <p className="text-[10px] text-zinc-600 leading-relaxed font-bold italic">
                  {betType === 'ASIAN_HANDICAP' && `HDP ${handicap}: Selisih gol (${homeScore - awayScore}) vs Line (${Math.abs(handicap)}). Karena selisih gol adalah ${homeScore - awayScore}, maka hasil kalkulasi sistem adalah ${calculation.status}.`}
                  {betType === '1X2' && `Pasaran Klasik: Karena skor ${homeScore}-${awayScore}, Home menang adalah ${homeScore > awayScore ? 'Benar' : 'Salah'}.`}
                  {betType === 'OVER_UNDER' && `Total Gol (${homeScore + awayScore}) vs Line (${handicap}). Selisih: ${(homeScore + awayScore) - handicap}. Result: ${calculation.status}.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <MarketCard 
               title="Main Markets"
               items={["1X2 (Home/Draw/Away)", "Double Chance (1X, 12, X2)", "Draw No Bet (DNB)"]}
               icon={<Target className="w-4 h-4" />}
             />
             <MarketCard 
               title="Handicaps"
               items={["Asian Handicap (Quarter Logic)", "European Handicap (3-Way)", "Alternative Lines"]}
               icon={<Activity className="w-4 h-4" />}
             />
             <MarketCard 
               title="Over / Under"
               items={["O/U Full Time", "O/U Half Time", "O/U Team Goals"]}
               icon={<Layers className="w-4 h-4" />}
             />
             <MarketCard 
               title="Goal Markets"
               items={["Both Teams to Score (BTTS)", "Correct Score (Skor Tepat)", "First/Last Goal"]}
               icon={<CircleDollarSign className="w-4 h-4" />}
             />
             <MarketCard 
               title="Time Markets"
               items={["HT/FT Combinations", "Win Both Halves", "Highest Scoring Half"]}
               icon={<ChevronRight className="w-4 h-4" />}
             />
             <MarketCard 
               title="Specials"
               items={["Total Corners/Cards", "Player to Score", "Accumulators (Parlay)"]}
               icon={<Gem className="w-4 h-4" />}
             />
           </div>

           <div className="glass-panel p-10 rounded-[40px] border border-white/5 space-y-8">
              <h4 className="text-xl font-black font-orbitron text-white uppercase tracking-wider flex items-center">
                <HelpCircle className="w-6 h-6 mr-3 text-blue-400" /> Advanced Logic Rules
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-[var(--primary-color)] uppercase tracking-widest border-b border-primary-fade pb-2">Asian Handicap -0.25 (Quarter Ball)</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3 text-xs text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <span><strong>Menang:</strong> Jika tim pilihan menang dengan selisih gol minimal 1. (Hadiah Full)</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                      <span><strong>Seri:</strong> 50% modal kalah, 50% modal dikembalikan (Half Lose).</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></div>
                      <span><strong>Kalah:</strong> Jika tim pilihan kalah skor berapapun.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-blue-400 uppercase tracking-widest border-b border-blue-500/20 pb-2">Asian Handicap -0.75 (Three-Quarter)</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3 text-xs text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <span><strong>Menang Full:</strong> Jika tim pilihan menang selisih minimal 2 gol (misal 2-0, 3-1).</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></div>
                      <span><strong>Menang Setengah:</strong> Jika tim pilihan menang selisih tepat 1 gol (misal 1-0, 2-1).</span>
                    </li>
                    <li className="flex items-start space-x-3 text-xs text-zinc-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></div>
                      <span><strong>Kalah:</strong> Jika hasil seri atau tim pilihan kalah.</span>
                    </li>
                  </ul>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const MarketCard = ({ title, items, icon }: { title: string, items: string[], icon: React.ReactNode }) => (
  <div className="glass-panel p-6 rounded-[30px] border border-white/5 space-y-4 hover:border-white/20 transition-all group">
    <div className="flex items-center space-x-3 mb-2">
      <div className="p-2.5 bg-zinc-900 rounded-xl text-zinc-500 group-hover:text-[var(--primary-color)] transition-colors">
        {icon}
      </div>
      <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{title}</h5>
    </div>
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item} className="text-xs text-zinc-600 font-bold flex items-center">
          <ChevronRight className="w-3 h-3 mr-2 opacity-30" /> {item}
        </li>
      ))}
    </ul>
  </div>
);

const Gem = ({ className }: { className?: string }) => <CircleDollarSign className={className} />;

export default FootballBetCalc;
