import React from 'react';

function TicketFilter({ statusFilter, onStatusChange, priorityFilter, onPriorityChange }) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <select
                value={statusFilter}
                onChange={(e) => onStatusChange(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            >
                <option value="">Semua Status</option>
                <option value="Submitted">Submitted</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Done">Done</option>
            </select>

            <select
                value={priorityFilter}
                onChange={(e) => onPriorityChange(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            >
                <option value="">Semua Prioritas</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </div>
    );
}

export default TicketFilter;
