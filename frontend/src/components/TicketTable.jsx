import React from 'react';

function TicketTable({ tickets, loading, role, emptyMessage, onViewTicket }) {
    const priorityStyle = (p) =>
        p === 'High' ? 'bg-red-100 text-red-700' :
            p === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700';

    const statusStyle = (s) =>
        s === 'Done' ? 'bg-teal-100 text-teal-700' :
            s === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700';

    if (loading) {
        return <div className="text-center py-8 text-slate-500 text-sm">Memuat data...</div>;
    }

    if (tickets.length === 0) {
        return <div className="text-center py-8 text-slate-500 text-sm bg-slate-50 rounded border border-dashed">{emptyMessage || 'Belum ada tiket.'}</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                    <tr>
                        {role === 'admin' && <th className="px-4 py-3 text-left font-bold">Pengirim</th>}
                        <th className="px-4 py-3 text-left font-bold">Judul</th>
                        <th className="px-4 py-3 text-left font-bold">Prioritas</th>
                        <th className="px-4 py-3 text-left font-bold">Status</th>
                        <th className="px-4 py-3 text-left font-bold">Tanggal</th>
                        <th className="px-4 py-3 text-center font-bold">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {tickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                            {role === 'admin' && <td className="px-4 py-3 font-semibold text-indigo-600">{ticket.authorEmail}</td>}
                            <td className="px-4 py-3 font-semibold text-slate-800">{ticket.title}</td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${priorityStyle(ticket.priority)}`}>{ticket.priority}</span>
                            </td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusStyle(ticket.status)}`}>{ticket.status}</span>
                            </td>
                            <td className="px-4 py-3 text-slate-600">{new Date(ticket.createdAt).toLocaleDateString('id-ID')}</td>
                            <td className="px-4 py-3 text-center">
                                <button
                                    onClick={() => onViewTicket(ticket)}
                                    className="text-xs px-3 py-1.5 rounded-md font-bold transition bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TicketTable;
