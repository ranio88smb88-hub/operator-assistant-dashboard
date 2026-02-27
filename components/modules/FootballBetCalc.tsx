
import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  Info, 
  Activity, 
  ShieldCheck, 
  ShieldAlert,
  HelpCircle,
  Layers,
  CheckCircle2,
  Plus,
  Trash2,
  Trophy,
  Dices
} from 'lucide-react';

type BetResult = 'WIN' | 'HALF_WIN' | 'DRAW' | 'HALF_LOSE' | 'LOSE' | 'PENDING';

interface ParlayLeg {
  id: string;
  match: string;
  type: string;
  subType: string;
  handicap: number;
  odds: number;
  homeScore: number;
  awayScore: number;
  exactScore?: string;
}

interface PayoutDetail {
  payout: number;
  profit: number;
  roi: number;
  status: BetResult;
  explanation: string;
}

const FootballBetCalc: React.FC<{ showToast: (msg: string, type?: 'success' | 'error') => void }> = ({ showToast }) => {
  const [activeTab, setActiveTab] = useState<'SINGLE' | 'PARLAY' | 'MANUAL'>('SINGLE');
  
  // Single Bet States
  const [betType, setBetType] = useState<string>('ASIAN_HANDICAP');
  const [stake, setStake] = useState<number>(100000);
  const [odds, setOdds] = useState<number>(1.95);
  const [handicap, setHandicap] = useState<number>(-0.25);
  const [subType, setSubType] = useState<string>('HOME');
  const [exactScoreInput, setExactScoreInput] = useState<string>('1-0');
  const [homeScore, setHomeScore] = useState<number>(2);
  const [awayScore, setAwayScore] = useState<number>(1);

  // Parlay States
  const [parlayStake, setParlayStake] = useState<number>(100000);
  const [parlayLegs, setParlayLegs] = useState<ParlayLeg[]>([
    { id: '1', match: 'Match 1', type: 'ASIAN_HANDICAP', subType: 'HOME', handicap: -0.5, odds: 1.90, homeScore: 1, awayScore: 0 }
  ]);

  const calculateLegStatus = (leg: ParlayLeg): BetResult => {
    const goalDiff = leg.homeScore - leg.awayScore;
    const totalGoals = leg.homeScore + leg.awayScore;

    switch (leg.type) {
      case 'ASIAN_HANDICAP':
        const hdpFinal = goalDiff + leg.handicap;
        if (hdpFinal > 0.25) return 'WIN';
        if (hdpFinal === 0.25) return 'HALF_WIN';
        if (hdpFinal === 0) return 'DRAW';
        if (hdpFinal === -0.25) return 'HALF_LOSE';
        return 'LOSE';

      case 'OVER_UNDER':
        const ouDiff = totalGoals - leg.handicap;
        if (leg.subType === 'OVER') {
          if (ouDiff > 0.25) return 'WIN';
          if (ouDiff === 0.25) return 'HALF_WIN';
          if (ouDiff === 0) return 'DRAW';
          if (ouDiff === -0.25) return 'HALF_LOSE';
          return 'LOSE';
        } else {
          if (ouDiff < -0.25) return 'WIN';
          if (ouDiff === -0.25) return 'HALF_WIN';
          if (ouDiff === 0) return 'DRAW';
          if (ouDiff === 0.25) return 'HALF_LOSE';
          return 'LOSE';
        }

      case '1X2':
        if (leg.subType === 'HOME' && goalDiff > 0) return 'WIN';
        if (leg.subType === 'DRAW' && goalDiff === 0) return 'WIN';
        if (leg.subType === 'AWAY' && goalDiff < 0) return 'WIN';
        return 'LOSE';

      case 'DOUBLE_CHANCE':
        if (leg.subType === '1X' && goalDiff >= 0) return 'WIN';
        if (leg.subType === '12' && goalDiff !== 0) return 'WIN';
        if (leg.subType === 'X2' && goalDiff <= 0) return 'WIN';
        return 'LOSE';

      case 'BTTS': // Both Teams To Score
        const bothScored = leg.homeScore > 0 && leg.awayScore > 0;
        if (leg.subType === 'YES' && bothScored) return 'WIN';
        if (leg.subType === 'NO' && !bothScored) return 'WIN';
        return 'LOSE';

      case 'ODD_EVEN':
        const isOdd = totalGoals % 2 !== 0;
        if (leg.subType === 'ODD' && isOdd) return 'WIN';
        if (leg.subType === 'EVEN' && !isOdd) return 'WIN';
        return 'LOSE';

      case 'DNB': // Draw No Bet
        if (goalDiff === 0) return 'DRAW';
        if (leg.subType === 'HOME' && goalDiff > 0) return 'WIN';
        if (leg.subType === 'AWAY' && goalDiff < 0) return 'WIN';
        return 'LOSE';

      case 'CORRECT_SCORE':
        const scoreStr = `${leg.homeScore}-${leg.awayScore}`;
        if (leg.exactScore === scoreStr) return 'WIN';
        return 'LOSE';

      case 'TOTAL_GOALS':
        if (leg.subType === '0-1' && totalGoals <= 1) return 'WIN';
        if (leg.subType === '2-3' && (totalGoals === 2 || totalGoals === 3)) return 'WIN';
        if (leg.subType === '4-6' && (totalGoals >= 4 && totalGoals <= 6)) return 'WIN';
        if (leg.subType === '7+' && totalGoals >= 7) return 'WIN';
        return 'LOSE';

      default: return 'LOSE';
    }
  };

  const getLegExplanation = (leg: ParlayLeg): string => {
    const goalDiff = leg.homeScore - leg.awayScore;
    const totalGoals = leg.homeScore + leg.awayScore;
    const hdpLabel = leg.handicap > 0 ? `+${leg.handicap}` : leg.handicap.toString();

    switch (leg.type) {
      case 'ASIAN_HANDICAP':
        const hdpFinal = goalDiff + leg.handicap;
        if (hdpFinal > 0.25) return `Skor ${leg.homeScore}-${leg.awayScore} (Selisih ${goalDiff}) + HDP ${hdpLabel} = ${hdpFinal}. Unggul > 0.25 (Menang Penuh: x${leg.odds}).`;
        if (hdpFinal === 0.25) return `Skor ${leg.homeScore}-${leg.awayScore} (Selisih ${goalDiff}) + HDP ${hdpLabel} = 0.25. Unggul tepat 0.25 (Menang Setengah: x${((leg.odds + 1) / 2).toFixed(3)}).`;
        if (hdpFinal === 0) return `Skor ${leg.homeScore}-${leg.awayScore} (Selisih ${goalDiff}) + HDP ${hdpLabel} = 0. Skor Seri (Draw: x1.00).`;
        if (hdpFinal === -0.25) return `Skor ${leg.homeScore}-${leg.awayScore} (Selisih ${goalDiff}) + HDP ${hdpLabel} = -0.25. Tertinggal 0.25 (Kalah Setengah: x0.50).`;
        return `Skor ${leg.homeScore}-${leg.awayScore} (Selisih ${goalDiff}) + HDP ${hdpLabel} = ${hdpFinal}. Tertinggal (Kalah Penuh: x0.00).`;

      case 'OVER_UNDER':
        const ouDiff = totalGoals - leg.handicap;
        if (leg.subType === 'OVER') {
          if (ouDiff > 0.25) return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Melebihi line > 0.25 (Over Menang: x${leg.odds}).`;
          if (ouDiff === 0.25) return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Melebihi line tepat 0.25 (Over Menang Setengah: x${((leg.odds + 1) / 2).toFixed(3)}).`;
          if (ouDiff === 0) return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Tepat di line (Draw: x1.00).`;
          if (ouDiff === -0.25) return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Kurang dari line 0.25 (Over Kalah Setengah: x0.50).`;
          return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Di bawah line (Over Kalah: x0.00).`;
        } else {
          if (ouDiff < -0.25) return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Di bawah line > 0.25 (Under Menang: x${leg.odds}).`;
          if (ouDiff === -0.25) return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Di bawah line tepat 0.25 (Under Menang Setengah: x${((leg.odds + 1) / 2).toFixed(3)}).`;
          if (ouDiff === 0) return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Tepat di line (Draw: x1.00).`;
          if (ouDiff === 0.25) return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Melebihi line 0.25 (Under Kalah Setengah: x0.50).`;
          return `Total Gol ${totalGoals} vs Line ${leg.handicap}. Di atas line (Under Kalah: x0.00).`;
        }

      case '1X2':
        if (leg.subType === 'HOME') return goalDiff > 0 ? `Tuan Rumah menang (${leg.homeScore}-${leg.awayScore}) (Menang: x${leg.odds}).` : `Tuan Rumah tidak menang (Kalah: x0.00).`;
        if (leg.subType === 'DRAW') return goalDiff === 0 ? `Skor Seri (${leg.homeScore}-${leg.awayScore}) (Menang: x${leg.odds}).` : `Skor tidak seri (Kalah: x0.00).`;
        if (leg.subType === 'AWAY') return goalDiff < 0 ? `Tamu menang (${leg.homeScore}-${leg.awayScore}) (Menang: x${leg.odds}).` : `Tamu tidak menang (Kalah: x0.00).`;
        return "";

      case 'BTTS':
        const bothScored = leg.homeScore > 0 && leg.awayScore > 0;
        if (leg.subType === 'YES') return bothScored ? `Kedua tim mencetak gol (Menang: x${leg.odds}).` : `Salah satu atau kedua tim tidak mencetak gol (Kalah: x0.00).`;
        return !bothScored ? `Salah satu atau kedua tim tidak mencetak gol (Menang: x${leg.odds}).` : `Kedua tim mencetak gol (Kalah: x0.00).`;

      case 'DNB':
        if (goalDiff === 0) return "Skor Seri, taruhan dikembalikan (Draw: x1.00).";
        if (leg.subType === 'HOME') return goalDiff > 0 ? `Tuan Rumah menang (Menang: x${leg.odds}).` : `Tuan Rumah kalah (Kalah: x0.00).`;
        return goalDiff < 0 ? `Tamu menang (Menang: x${leg.odds}).` : `Tamu kalah (Kalah: x0.00).`;

      case 'DOUBLE_CHANCE':
        if (leg.subType === '1X') return goalDiff >= 0 ? `Tuan Rumah menang atau seri (${leg.homeScore}-${leg.awayScore}) (Menang: x${leg.odds}).` : `Tuan Rumah kalah (Kalah: x0.00).`;
        if (leg.subType === '12') return goalDiff !== 0 ? `Salah satu tim menang (${leg.homeScore}-${leg.awayScore}) (Menang: x${leg.odds}).` : `Skor seri (Kalah: x0.00).`;
        if (leg.subType === 'X2') return goalDiff <= 0 ? `Tamu menang atau seri (${leg.homeScore}-${leg.awayScore}) (Menang: x${leg.odds}).` : `Tamu kalah (Kalah: x0.00).`;
        return "";

      case 'ODD_EVEN':
        const isOdd = totalGoals % 2 !== 0;
        const wonOE = (leg.subType === 'ODD' && isOdd) || (leg.subType === 'EVEN' && !isOdd);
        return wonOE ? `Total gol ${totalGoals} sesuai target ${leg.subType} (Menang: x${leg.odds}).` : `Total gol ${totalGoals} tidak sesuai target ${leg.subType} (Kalah: x0.00).`;

      case 'CORRECT_SCORE':
        const scoreStr = `${leg.homeScore}-${leg.awayScore}`;
        return leg.exactScore === scoreStr ? `Skor akhir tepat ${scoreStr} (Menang: x${leg.odds}).` : `Skor akhir ${scoreStr} tidak sesuai target ${leg.exactScore} (Kalah: x0.00).`;

      case 'TOTAL_GOALS':
        let wonTG = false;
        if (leg.subType === '0-1' && totalGoals <= 1) wonTG = true;
        if (leg.subType === '2-3' && (totalGoals === 2 || totalGoals === 3)) wonTG = true;
        if (leg.subType === '4-6' && (totalGoals >= 4 && totalGoals <= 6)) wonTG = true;
        if (leg.subType === '7+' && totalGoals >= 7) wonTG = true;
        return wonTG ? `Total gol ${totalGoals} masuk range ${leg.subType} (Menang: x${leg.odds}).` : `Total gol ${totalGoals} di luar range ${leg.subType} (Kalah: x0.00).`;

      default:
        return `Hasil berdasarkan skor akhir ${leg.homeScore}-${leg.awayScore} dengan tipe taruhan ${leg.type}.`;
    }
  };

  const parlayCalculation = useMemo(() => {
    let currentMultiplier = 1.0;
    let finalStatus: BetResult = 'WIN';
    
    for (const leg of parlayLegs) {
      const status = calculateLegStatus(leg);
      if (status === 'LOSE') {
        currentMultiplier = 0;
        finalStatus = 'LOSE';
        break;
      } else if (status === 'HALF_WIN') {
        currentMultiplier *= (leg.odds + 1) / 2;
        if (finalStatus !== 'HALF_LOSE') finalStatus = 'HALF_WIN';
      } else if (status === 'HALF_LOSE') {
        currentMultiplier *= 0.5;
        finalStatus = 'HALF_LOSE';
      } else if (status === 'DRAW') {
        currentMultiplier *= 1.0;
      } else {
        currentMultiplier *= leg.odds;
      }
    }

    const payout = parlayStake * currentMultiplier;
    return {
      payout,
      profit: payout - parlayStake,
      status: finalStatus,
      multiplier: currentMultiplier
    };
  }, [parlayLegs, parlayStake]);

  const singleCalculation = useMemo((): PayoutDetail => {
    const status = calculateLegStatus({ 
      id: '0', match: '', type: betType, subType, handicap, odds, homeScore, awayScore, exactScore: exactScoreInput
    });
    let payout = 0;
    if (status === 'WIN') payout = stake * odds;
    else if (status === 'HALF_WIN') payout = stake + (stake * (odds - 1) / 2);
    else if (status === 'DRAW') payout = stake;
    else if (status === 'HALF_LOSE') payout = stake / 2;
    
    return { 
      payout, 
      profit: payout - stake, 
      roi: stake > 0 ? ((payout - stake) / stake) * 100 : 0, 
      status,
      explanation: getLegExplanation({ 
        id: '0', match: '', type: betType, subType, handicap, odds, homeScore, awayScore, exactScore: exactScoreInput
      })
    };
  }, [betType, stake, odds, handicap, subType, homeScore, awayScore, exactScoreInput]);

  const addLeg = () => {
    if (parlayLegs.length >= 10) {
      showToast('Maksimum 10 pertandingan per paket parlay', 'error');
      return;
    }
    const newLeg: ParlayLeg = {
      id: Math.random().toString(36).substr(2, 9),
      match: `Match ${parlayLegs.length + 1}`,
      type: 'ASIAN_HANDICAP',
      subType: 'HOME',
      handicap: 0,
      odds: 1.90,
      homeScore: 0,
      awayScore: 0
    };
    setParlayLegs([...parlayLegs, newLeg]);
  };

  const removeLeg = (id: string) => {
    if (parlayLegs.length <= 1) return;
    setParlayLegs(parlayLegs.filter(l => l.id !== id));
  };

  const updateLeg = (id: string, field: keyof ParlayLeg, value: any) => {
    setParlayLegs(parlayLegs.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const getStatusColor = (status: BetResult) => {
    switch (status) {
      case 'WIN': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]';
      case 'HALF_WIN': return 'text-emerald-300 border-emerald-400/20 bg-emerald-400/5';
      case 'DRAW': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'HALF_LOSE': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      default: return 'text-rose-500 border-rose-500/30 bg-rose-500/10';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-3xl font-black font-orbitron text-white uppercase tracking-tighter italic">Football Bet Engine</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-bold">Standardized Payout Protocol V6.5 // All Markets Integrated</p>
        </div>
        <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
          {['SINGLE', 'PARLAY', 'MANUAL'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[var(--primary-color)] text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'SINGLE' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-[40px] border border-primary-fade relative overflow-hidden">
              <div className="flex items-center space-x-3 mb-8">
                <Calculator className="w-5 h-5 text-[var(--primary-color)]" />
                <h4 className="text-sm font-black font-orbitron text-white uppercase tracking-wider">Single Parameters</h4>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Market Type</label>
                  <select 
                    value={betType} 
                    onChange={e => setBetType(e.target.value)} 
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs font-bold text-zinc-300 outline-none focus:border-[var(--primary-color)] appearance-none"
                  >
                    <option value="ASIAN_HANDICAP">Asian Handicap (HDP)</option>
                    <option value="OVER_UNDER">Over / Under (OU)</option>
                    <option value="1X2">1X2 (FT/HT)</option>
                    <option value="DOUBLE_CHANCE">Double Chance</option>
                    <option value="BTTS">Both Teams to Score</option>
                    <option value="ODD_EVEN">Odd / Even (Total Gol)</option>
                    <option value="DNB">Draw No Bet (DNB)</option>
                    <option value="CORRECT_SCORE">Correct Score (Tebak Skor)</option>
                    <option value="TOTAL_GOALS">Total Goals (Range)</option>
                  </select>
                </div>

                {/* Sub-Type Selectors based on Market */}
                {['1X2', 'DNB'].includes(betType) && (
                  <div className="grid grid-cols-3 gap-2">
                    {['HOME', 'DRAW', 'AWAY'].map(opt => (
                      <button key={opt} onClick={() => setSubType(opt)} disabled={betType === 'DNB' && opt === 'DRAW'}
                        className={`py-3 rounded-xl text-[10px] font-black border transition-all ${subType === opt ? 'bg-[var(--primary-color)] text-black border-[var(--primary-color)]' : 'bg-white/5 border-white/5 text-zinc-500'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {betType === 'OVER_UNDER' && (
                  <div className="grid grid-cols-2 gap-2">
                    {['OVER', 'UNDER'].map(opt => (
                      <button key={opt} onClick={() => setSubType(opt)}
                        className={`py-3 rounded-xl text-[10px] font-black border transition-all ${subType === opt ? 'bg-[var(--primary-color)] text-black border-[var(--primary-color)]' : 'bg-white/5 border-white/5 text-zinc-500'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {betType === 'DOUBLE_CHANCE' && (
                  <div className="grid grid-cols-3 gap-2">
                    {['1X', '12', 'X2'].map(opt => (
                      <button key={opt} onClick={() => setSubType(opt)}
                        className={`py-3 rounded-xl text-[10px] font-black border transition-all ${subType === opt ? 'bg-[var(--primary-color)] text-black border-[var(--primary-color)]' : 'bg-white/5 border-white/5 text-zinc-500'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {['BTTS', 'ODD_EVEN'].includes(betType) && (
                  <div className="grid grid-cols-2 gap-2">
                    {(betType === 'BTTS' ? ['YES', 'NO'] : ['ODD', 'EVEN']).map(opt => (
                      <button key={opt} onClick={() => setSubType(opt)}
                        className={`py-3 rounded-xl text-[10px] font-black border transition-all ${subType === opt ? 'bg-[var(--primary-color)] text-black border-[var(--primary-color)]' : 'bg-white/5 border-white/5 text-zinc-500'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {betType === 'CORRECT_SCORE' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Exact Score Target (H-A)</label>
                    <input type="text" value={exactScoreInput} onChange={e => setExactScoreInput(e.target.value)} className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-center font-black text-xl text-white" placeholder="e.g. 2-1" />
                  </div>
                )}

                {betType === 'TOTAL_GOALS' && (
                  <div className="grid grid-cols-4 gap-2">
                    {['0-1', '2-3', '4-6', '7+'].map(opt => (
                      <button key={opt} onClick={() => setSubType(opt)}
                        className={`py-2 rounded-xl text-[9px] font-black border transition-all ${subType === opt ? 'bg-[var(--primary-color)] text-black border-[var(--primary-color)]' : 'bg-white/5 border-white/5 text-zinc-500'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Stake (Modal)</label>
                    <input type="number" value={stake} onChange={e => setStake(Number(e.target.value))} className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-lg font-black text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Odds (Decimal)</label>
                    <input type="number" step="0.01" value={odds} onChange={e => setOdds(Number(e.target.value))} className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-lg font-black text-[var(--primary-color)]" />
                  </div>
                </div>

                {['ASIAN_HANDICAP', 'OVER_UNDER'].includes(betType) && (
                   <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Handicap / Goal Line</label>
                    <div className="grid grid-cols-5 gap-2">
                      {[-2.5, -2, -1.75, -1.5, -1.25, -1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5].map(val => (
                        <button key={val} onClick={() => setHandicap(val)} className={`py-1.5 rounded-lg text-[9px] font-black border transition-all ${handicap === val ? 'bg-[var(--primary-color)] text-black border-[var(--primary-color)]' : 'bg-white/5 border-white/5 text-zinc-500'}`}>
                          {val > 0 ? `+${val}` : val}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 bg-white/5 rounded-[30px] border border-white/5 space-y-4">
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block text-center">Simulation Result</label>
                    <div className="flex items-center justify-center space-x-6">
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] font-black text-zinc-600 uppercase mb-2">Home Score</span>
                        <input type="number" value={homeScore} onChange={e => setHomeScore(Number(e.target.value))} className="w-16 h-16 bg-black border border-white/10 rounded-2xl text-2xl font-black text-white text-center" />
                      </div>
                      <span className="text-xl font-black text-zinc-700 font-orbitron">VS</span>
                      <div className="flex flex-col items-center">
                        <span className="text-[8px] font-black text-zinc-600 uppercase mb-2">Away Score</span>
                        <input type="number" value={awayScore} onChange={e => setAwayScore(Number(e.target.value))} className="w-16 h-16 bg-black border border-white/10 rounded-2xl text-2xl font-black text-white text-center" />
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-10 rounded-[40px] border-2 transition-all duration-700 flex flex-col items-center text-center space-y-6 ${getStatusColor(singleCalculation.status)}`}>
               <div className="p-6 rounded-full bg-white/10">
                 {singleCalculation.status.includes('WIN') ? <ShieldCheck className="w-12 h-12" /> : <ShieldAlert className="w-12 h-12" />}
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60 mb-1">Single Outcome</p>
                 <h2 className="text-6xl font-black font-orbitron tracking-tighter uppercase">{singleCalculation.status.replace('_', ' ')}</h2>
                 <div className="mt-6 p-4 bg-black/20 rounded-2xl border border-white/5 max-w-md mx-auto">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-2">Analisis Hasil:</p>
                   <p className="text-[11px] font-bold italic leading-relaxed">
                     {singleCalculation.explanation}
                   </p>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-8 w-full pt-6 border-t border-white/5">
                 <div className="text-left text-zinc-200">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Total Payout</p>
                   <p className="text-2xl font-black font-orbitron">Rp {singleCalculation.payout.toLocaleString('id-ID')}</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-1">Net Profit</p>
                   <p className={`text-2xl font-black font-orbitron ${singleCalculation.profit >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                     {singleCalculation.profit >= 0 ? '+' : ''}{singleCalculation.profit.toLocaleString('id-ID')}
                   </p>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-[30px] border border-white/5 flex items-center space-x-4">
                <div className="p-3 bg-zinc-900 rounded-xl text-zinc-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">ROI (Return)</p>
                  <p className={`text-lg font-black font-orbitron ${singleCalculation.roi >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {singleCalculation.roi.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="glass-panel p-6 rounded-[30px] border border-white/5 flex items-center space-x-4">
                <div className="p-3 bg-zinc-900 rounded-xl text-zinc-600">
                  <Dices className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Risk Level</p>
                  <p className="text-lg font-black font-orbitron text-zinc-300">
                    {odds > 5 ? 'EXTREME' : odds > 2.5 ? 'HIGH' : odds > 1.8 ? 'STABLE' : 'LOW'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[30px] border border-white/5 bg-zinc-950/40 space-y-4">
               <div className="flex items-center space-x-2">
                 <Info className="w-4 h-4 text-zinc-600" />
                 <h5 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Calculation Rules Summary</h5>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] text-zinc-600 font-bold italic leading-relaxed">
                 <div className="space-y-1">
                   <p className="text-zinc-400">WIN FULL: Stake x Odds</p>
                   <p className="text-zinc-400">HALF WIN: Stake + (Stake * (Odds - 1) / 2)</p>
                   <p className="text-zinc-400">DRAW: Stake Returned (1.00)</p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-rose-400/60">HALF LOSE: Stake / 2 (Lost half)</p>
                   <p className="text-rose-500/60">LOSE FULL: Zero Payout</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'PARLAY' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Parlay Match List ({parlayLegs.length}/10)</h4>
              <button onClick={addLeg} className="bg-[var(--primary-color)]/10 text-[var(--primary-color)] px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-[var(--primary-color)]/20 hover:bg-[var(--primary-color)] hover:text-black transition-all flex items-center">
                <Plus className="w-3 h-3 mr-2" /> Add Match
              </button>
            </div>
            
            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
              {parlayLegs.map((leg, index) => (
                <div key={leg.id} className="glass-panel p-6 rounded-[30px] border border-white/5 flex flex-col md:flex-row gap-6 relative group">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Match #{index + 1}</span>
                      <button onClick={() => removeLeg(leg.id)} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-zinc-500 uppercase">Market</label>
                        <select value={leg.type} onChange={e => updateLeg(leg.id, 'type', e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-[10px] font-bold text-zinc-300 outline-none">
                          <option value="ASIAN_HANDICAP">HDP</option>
                          <option value="OVER_UNDER">O/U</option>
                          <option value="1X2">1X2</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-zinc-500 uppercase">Line / Odds</label>
                        <div className="flex gap-2">
                          <input type="number" step="0.25" value={leg.handicap} onChange={e => updateLeg(leg.id, 'handicap', Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-[10px] font-black text-white" placeholder="Line" />
                          <input type="number" step="0.01" value={leg.odds} onChange={e => updateLeg(leg.id, 'odds', Number(e.target.value))} className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-[10px] font-black text-[var(--primary-color)]" placeholder="Odds" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-zinc-500 uppercase">Simulasi Skor (H-A)</label>
                        <div className="flex gap-2 items-center">
                          <input type="number" value={leg.homeScore} onChange={e => updateLeg(leg.id, 'homeScore', Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-center text-xs font-black text-white" />
                          <span className="text-zinc-700">-</span>
                          <input type="number" value={leg.awayScore} onChange={e => updateLeg(leg.id, 'awayScore', Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-center text-xs font-black text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`md:w-56 flex flex-col items-center justify-center p-4 rounded-2xl border-2 ${getStatusColor(calculateLegStatus(leg))}`}>
                    <span className="text-[8px] font-black uppercase opacity-60 mb-1">Leg Status</span>
                    <span className="text-[10px] font-black uppercase mb-3">{calculateLegStatus(leg).replace('_', ' ')}</span>
                    <div className="w-full p-2 bg-black/20 rounded-lg border border-white/5">
                      <p className="text-[9px] font-bold italic text-center opacity-80 leading-tight">
                        {getLegExplanation(leg)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-8 rounded-[40px] border border-primary-fade flex flex-col items-center text-center space-y-8 bg-gradient-to-b from-primary-fade to-transparent sticky top-24">
               <div className="w-16 h-16 bg-[var(--primary-color)] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                 <Trophy className="w-8 h-8 text-black" />
               </div>
               
               <div className="w-full space-y-2">
                 <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Stake (Modal)</label>
                 <input type="number" value={parlayStake} onChange={e => setParlayStake(Number(e.target.value))} className="w-full bg-black/60 border border-white/10 rounded-2xl p-5 text-2xl font-black text-white text-center" />
               </div>

               <div className="grid grid-cols-2 gap-4 w-full border-y border-white/5 py-6">
                 <div>
                   <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Current Multiplier</p>
                   <p className="text-xl font-black font-orbitron text-[var(--primary-color)]">@{parlayCalculation.multiplier.toFixed(3)}</p>
                 </div>
                 <div>
                   <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Parlay Status</p>
                   <p className={`text-xl font-black font-orbitron ${parlayCalculation.status === 'LOSE' ? 'text-rose-500' : 'text-emerald-400'}`}>
                     {parlayCalculation.status}
                   </p>
                 </div>
               </div>

               <div className="w-full space-y-4">
                 <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Win</span>
                    <span className="text-3xl font-black font-orbitron text-white">Rp {parlayCalculation.payout.toLocaleString('id-ID')}</span>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Net Profit</span>
                    <span className={`text-xl font-black font-orbitron ${parlayCalculation.profit >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {parlayCalculation.profit >= 0 ? '+' : ''}{parlayCalculation.profit.toLocaleString('id-ID')}
                    </span>
                 </div>
               </div>
               
               <p className="text-[9px] text-zinc-600 font-bold italic leading-relaxed">
                 Sistem secara otomatis menghitung perkalian odds berdasarkan hasil tiap pertandingan dalam paket parlay Anda.
               </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'MANUAL' && (
        <div className="space-y-8 animate-in fade-in duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <MarketCard title="Asian Handicap" items={["0.25 (Quarter): Menang 1/2 jika seri.", "0.50 (Half): Menang/Kalah mutlak.", "0.75 (Three-Quarter): Menang 1/2 jika selisih 1 gol."]} icon={<Target className="w-4 h-4" />} />
             <MarketCard title="Over / Under" items={["OU 2.25: Seri 2 gol = Menang 1/2 (Under).", "OU 2.75: Seri 3 gol = Kalah 1/2 (Under).", "Total gol kedua tim dijumlahkan."]} icon={<Layers className="w-4 h-4" />} />
             <MarketCard title="Parlay Calculation" items={["Win Full: x Odds.", "Half Win: x ((Odds+1)/2).", "Half Lose: x 0.5 (Total Payout / 2).", "Draw: x 1.00 (Modal Balik)."]} icon={<Activity className="w-4 h-4" />} />
           </div>
        </div>
      )}
    </div>
  );
};

const MarketCard = ({ title, items, icon }: { title: string, items: string[], icon: React.ReactNode }) => (
  <div className="glass-panel p-6 rounded-[30px] border border-white/5 space-y-4 hover:border-white/20 transition-all group">
    <div className="flex items-center space-x-3 mb-2">
      <div className="p-2.5 bg-zinc-900 rounded-xl text-zinc-500 group-hover:text-[var(--primary-color)] transition-colors">{icon}</div>
      <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{title}</h5>
    </div>
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item} className="text-xs text-zinc-600 font-bold flex items-center"><CheckCircle2 className="w-3 h-3 mr-2 text-emerald-500/30" /> {item}</li>
      ))}
    </ul>
  </div>
);

export default FootballBetCalc;
