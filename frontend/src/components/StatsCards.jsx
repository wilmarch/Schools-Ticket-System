import React from 'react';

function StatsCards({ tickets }) {
    const stats = [
        {
            label: 'Submitted',
            count: tickets.filter(t => t.status === 'Submitted').length,
            color: 'bg-slate-100 text-slate-700',
            dot: 'bg-slate-400',
        },
        {
            label: 'Ongoing',
            count: tickets.filter(t => t.status === 'Ongoing').length,
            color: 'bg-blue-50 text-blue-700',
            dot: 'bg-blue-500',
        },
        {
            label: 'Done',
            count: tickets.filter(t => t.status === 'Done').length,
            color: 'bg-teal-50 text-teal-700',
            dot: 'bg-teal-500',
        },
    ];

    const total = tickets.length;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Tiket</p>
                <p className="text-3xl font-extrabold text-indigo-700 mt-1">{total}</p>
            </div>
            {stats.map((s) => (
                <div key={s.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-800">{s.count}</p>
                </div>
            ))}
        </div>
    );
}

export default StatsCards;
