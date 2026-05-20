import React, { useState, useEffect } from 'react';

function TicketModal({ ticket, onClose, role, onUpdateStatus }) {
    const [tempStatus, setTempStatus] = useState('');

    useEffect(() => {
        if (ticket) {
            setTempStatus(ticket.status);
        }
    }, [ticket]);

    if (!ticket) return null;

    const handleSaveStatus = () => {
        onUpdateStatus(ticket.id, tempStatus);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl relative">

                <div className="flex justify-between items-start border-b pb-3 mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Detail Tiket</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-red-500 text-xl font-bold transition-colors">&times;</button>
                </div>

                <div className="space-y-4 text-sm">

                    {role === 'admin' && (
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Pengirim</p>
                            <p className="font-semibold text-indigo-600">{ticket.authorEmail}</p>
                        </div>
                    )}

                    <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Judul</p>
                        <p className="font-semibold text-slate-800">{ticket.title}</p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Deskripsi</p>
                        <p className="text-slate-700 bg-slate-50 p-3 rounded-md border whitespace-pre-line mt-1">
                            {ticket.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Tanggal</p>
                            <p className="font-semibold text-slate-700 mt-1">
                                {new Date(ticket.createdAt).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Prioritas</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold ${ticket.priority === 'High' ? 'bg-red-100 text-red-700' : ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                {ticket.priority}
                            </span>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Status</p>

                        {role === 'admin' ? (
                            <div className="space-y-2 mt-1">
                                <select
                                    className="w-full p-2 border border-slate-300 rounded-md bg-white text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    value={tempStatus}
                                    onChange={(e) => setTempStatus(e.target.value)}
                                >
                                    <option value="Submitted">Submitted</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Done">Done</option>
                                </select>

                                <button
                                    onClick={handleSaveStatus}
                                    disabled={tempStatus === ticket.status}
                                    className={`w-full py-2 rounded-md font-bold text-sm transition-colors ${tempStatus !== ticket.status
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        ) : (
                            <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold ${ticket.status === 'Done' ? 'bg-teal-100 text-teal-700' : ticket.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                                {ticket.status}
                            </span>
                        )}
                    </div>
                </div>

                <button onClick={onClose} className="mt-6 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-lg text-sm transition-colors">
                    Tutup Detail
                </button>
            </div>
        </div>
    );
}

export default TicketModal;