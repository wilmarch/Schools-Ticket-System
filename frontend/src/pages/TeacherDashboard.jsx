import React, { useState } from 'react';
import TicketModal from '../components/TicketModal';
import TicketTable from '../components/TicketTable';
import StatsCards from '../components/StatsCards';
import TicketFilter from '../components/TicketFilter';
import Pagination from '../components/Pagination';
import { useAuth } from '../hooks/useAuth';
import { useTickets } from '../hooks/useTickets';
import { useTicketForm } from '../hooks/useTicketForm';
import { useTicketFilter } from '../hooks/useTicketFilter';

function TeacherDashboard() {
  const { email, logout } = useAuth();
  const { tickets, loading, fetchTickets } = useTickets();
  const form = useTicketForm(fetchTickets);
  const filter = useTicketFilter(tickets);
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center mb-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">Teacher Dashboard</h1>
            <p className="text-slate-600 text-sm">Selamat datang, <span className="font-semibold text-indigo-600">{email}</span></p>
          </div>
          <button onClick={logout} className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition text-sm font-semibold">Logout</button>
        </div>

        <StatsCards tickets={tickets} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Buat Tiket Baru</h2>
            {form.message.text && <div className={`p-3 rounded mb-4 text-sm ${form.message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{form.message.text}</div>}
            <form onSubmit={form.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Judul Masalah</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={form.title} onChange={(e) => form.setTitle(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Deskripsi Detail</label>
                <textarea rows="3" className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={form.description} onChange={(e) => form.setDescription(e.target.value)}></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Prioritas</label>
                <select className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 outline-none" value={form.priority} onChange={(e) => form.setPriority(e.target.value)}>
                  <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white p-2.5 rounded-md font-bold hover:bg-indigo-700 transition">Kirim Tiket</button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2 animate-fade-in">
            <h2 className="text-lg font-bold mb-4">Riwayat Tiket Anda</h2>
            <TicketFilter
              statusFilter={filter.statusFilter}
              onStatusChange={filter.setStatusFilter}
              priorityFilter={filter.priorityFilter}
              onPriorityChange={filter.setPriorityFilter}
            />
            <TicketTable
              tickets={filter.filteredTickets}
              loading={loading}
              role="teacher"
              emptyMessage="Tidak ada tiket yang cocok dengan filter."
              onViewTicket={(ticket) => setSelectedTicket(ticket)}
            />
            <Pagination
              currentPage={filter.currentPage}
              totalPages={filter.totalPages}
              onPageChange={filter.setCurrentPage}
            />
          </div>
        </div>
      </div>

      <TicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        role="teacher"
      />
    </div>
  );
}

export default TeacherDashboard;