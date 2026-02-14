import React from 'react';
import { PASARAN_SCHEDULE } from '../../constants';
import { Clock, Info } from 'lucide-react';

export default function PasaranSchedule({ showToast }: {
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold">Pasaran Schedule</h3>
          <p className="text-zinc-500 text-sm">Real-time daily market hours.</p>
        </div>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden border border-white/5 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Pasaran</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase text-center">Close</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase text-center">Result</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {PASARAN_SCHEDULE.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-semibold text-zinc-200">{p.name}</td>
                <td className="px-6 py-4 text-center text-rose-400 font-mono">{p.close}</td>
                <td className="px-6 py-4 text-center text-emerald-400 font-mono">{p.open}</td>
                <td className="px-6 py-4 text-right">
                  <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
