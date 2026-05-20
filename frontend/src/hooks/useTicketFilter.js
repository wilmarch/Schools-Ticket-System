import { useState, useMemo } from 'react';

const PER_PAGE = 5;

export function useTicketFilter(tickets) {
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {
            const matchStatus = statusFilter ? ticket.status === statusFilter : true;
            const matchPriority = priorityFilter ? ticket.priority === priorityFilter : true;
            return matchStatus && matchPriority;
        });
    }, [tickets, statusFilter, priorityFilter]);

    const handleStatusChange = (val) => { setStatusFilter(val); setCurrentPage(1); };
    const handlePriorityChange = (val) => { setPriorityFilter(val); setCurrentPage(1); };

    const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PER_PAGE));
    const paginatedTickets = filteredTickets.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    return {
        statusFilter, setStatusFilter: handleStatusChange,
        priorityFilter, setPriorityFilter: handlePriorityChange,
        filteredTickets: paginatedTickets,
        totalFiltered: filteredTickets.length,
        currentPage, setCurrentPage,
        totalPages,
    };
}
