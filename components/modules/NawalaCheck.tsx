
import React, { useState } from 'react';
import { Shield, ShieldCheck, ShieldAlert, Globe, ExternalLink, Info, Search, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export default function NawalaCheck({ showToast }: Props) {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SAFE' | 'WARNING' | 'BLOCKED'>('IDLE');
  const [reason, setReason] = useState('');

  const check = () => {
    if (!domain) {
      showToast('Masukkan nama domain!', 'error');
      return;
    }
    
    const lower = domain.toLowerCase().trim();
    const blacklist = ['slot', 'judi', 'porn', 'bet', 'casino', 'bola', 'togel', 'poker', '88', 'hoki', 'gacor', 'maxwin', 'jp'];
    const suspicious = ['free', 'win', 'link', 'alternatif', 'login', 'daftar'];
    
    if (blacklist.some(k => lower.includes(k))) {
      setStatus('BLOCKED');
      setReason('Keyword terdeteksi dalam daftar hitam (Gambling/High Risk).');
    } else if (suspicious.some(k => lower.includes(k))) {
      setStatus('WARNING');
      setReason('Pola domain mengandung kata-kata mencurigakan (Low Trust).');
    } else if (!lower.includes('.')) {
      setStatus('WARNING');
      setReason('Format domain tidak valid atau tidak lengkap.');
    } else {
      setStatus('SAFE');
      setReason('Domain terlihat bersih dari keyword sensitif umum.');
    }
    showToast('Analisis sistem selesai');
  };

  const officialLinks = [
    { name: 'TrustPositif Kominfo', url: 'https://trustpositif.kominfo.go.id/', desc: 'Database resmi pemerintah Indonesia.' },
    { name: 'Who.is Check', url: `https://who.is/whois/${domain || ''}`, desc: 'Cek status registrasi dan expiry domain.' },
    { name: 'DNS Checker', url: 'https://dnschecker.org/', desc: 'Cek propagasi IP & status blokir DNS global.' },
    { name: 'VirusTotal', url: 'https://www.virustotal.com/', desc: 'Cek reputasi domain terhadap malware/phishing.' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-3xl font-black font-orbitron text-white uppercase tracking-tighter italic">Firewall Scanner</h3>
          <p className="text-[10px] text-zinc-500 uppercase tracking-[0.4em] font-bold">Domain Risk Assessment Protocol</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Simulation Logic */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-10 rounded-[40px] border border-white/10 space-y-8 text-center relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none">
              <Shield className="w-64 h-64 text-white" />
            </div>

            <div className="mx-auto w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center relative z-10">
              <Globe className="w-10 h-10 text-blue-500" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-300">Scanner Simulasi</h2>
              <p className="text-zinc-500 text-xs mt-2 max-w-sm mx-auto">Mendeteksi potensi blokir Nawala berdasarkan filter kata kunci lokal.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 relative z-10">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  value={domain}
                  onChange={e => { setDomain(e.target.value); setStatus('IDLE'); }}
                  onKeyDown={e => e.key === 'Enter' && check()}
                  className="w-full bg-black/60 border-2 border-white/5 rounded-2xl py-4 pl-12 pr-4 text-lg outline-none focus:border-blue-500 transition-all font-mono text-zinc-200"
                  placeholder="domain-anda.com"
                />
              </div>
              <button 
                onClick={check} 
                className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-black font-orbitron text-xs text-white transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest"
              >
                Scan Domain
              </button>
            </div>

            {status !== 'IDLE' && (
              <div className={`p-8 rounded-[30px] border-2 animate-in zoom-in-95 duration-500 relative z-10 ${
                status === 'SAFE' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' :
                status === 'WARNING' ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' :
                'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}>
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 rounded-full bg-white/5">
                    {status === 'SAFE' && <ShieldCheck className="w-12 h-12" />}
                    {status === 'WARNING' && <AlertTriangle className="w-12 h-12" />}
                    {status === 'BLOCKED' && <ShieldAlert className="w-12 h-12" />}
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-black font-orbitron uppercase tracking-tighter">{status}</div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{reason}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-black/40 flex items-start space-x-4">
            <Info className="w-5 h-5 text-zinc-600 mt-1 shrink-0" />
            <div className="space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Catatan Operator:</p>
              <p className="text-[10px] text-zinc-600 leading-relaxed font-bold italic">
                Scanner ini tidak terhubung ke database Kominfo secara langsung. Ini adalah alat bantu untuk memprediksi apakah sebuah domain "layak" atau "berisiko" sebelum dirilis ke publik.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Real-time Resources */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-[40px] border border-white/5 space-y-6">
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-black font-orbitron text-white uppercase tracking-wider">Live Check Resources</h4>
            </div>
            
            <p className="text-[10px] text-zinc-500 font-bold uppercase leading-relaxed">
              Gunakan link di bawah ini untuk pengecekan **GRATIS** dan **REAL-TIME** di portal eksternal:
            </p>

            <div className="space-y-3">
              {officialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-blue-400 uppercase tracking-widest group-hover:text-blue-300">{link.name}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[10px] text-zinc-600 font-bold italic">{link.desc}</p>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5">
               <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20 flex items-start space-x-3">
                 <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                 <p className="text-[9px] text-amber-200/60 font-bold uppercase leading-relaxed">
                   Ingat: Domain yang berstatus "SAFE" di sini masih bisa terblokir jika dilaporkan secara manual atau masuk dalam radar sniffing ISP.
                 </p>
               </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[30px] border border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <div className="p-3 bg-emerald-500/10 rounded-xl">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
               </div>
               <div>
                 <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">System Health</p>
                 <p className="text-xs font-black text-zinc-300 font-orbitron">SCANNER_READY</p>
               </div>
            </div>
            <div className="text-[8px] font-black text-zinc-700 tracking-widest">V.2.0_STABLE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
