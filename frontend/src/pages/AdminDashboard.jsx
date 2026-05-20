import React, { useState } from 'react';
import API from '../api';
import TicketModal from '../components/TicketModal';
import TicketTable from '../components/TicketTable';
import StatsCards from '../components/StatsCards';
import TicketFilter from '../components/TicketFilter';
import Pagination from '../components/Pagination';
import { useAuth } from '../hooks/useAuth';
import { useTickets } from '../hooks/useTickets';
import { useTicketFilter } from '../hooks/useTicketFilter';

function AdminDashboard() {
  const { email, logout } = useAuth();
  const { tickets, loading, fetchTickets } = useTickets();
  const filter = useTicketFilter(tickets);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await API.patch(`/tickets/${id}/status`, { status: newStatus });
      fetchTickets();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengubah status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center mb-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">Admin Dashboard</h1>
            <p className="text-slate-600 text-sm">Akun: <span className="font-semibold text-indigo-600">{email}</span></p>
          </div>
          <button onClick={logout} className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition text-sm font-semibold">Logout</button>
        </div>

        <StatsCards tickets={tickets} />

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 animate-fade-in">
          <h2 className="text-lg font-bold mb-4">Semua Antrean Tiket</h2>
          <TicketFilter
            statusFilter={filter.statusFilter}
            onStatusChange={filter.setStatusFilter}
            priorityFilter={filter.priorityFilter}
            onPriorityChange={filter.setPriorityFilter}
          />
          <TicketTable
            tickets={filter.filteredTickets}
            loading={loading}
            role="admin"
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

      <TicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        role="admin"
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}

export default AdminDashboard;