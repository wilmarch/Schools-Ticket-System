import { useState, useEffect } from 'react';
import API from '../api';

export function useTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const response = await API.get('/tickets');
            setTickets(response.data);
        } catch (err) {
            console.error('Gagal mengambil data tiket', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTickets(); }, []);

    return { tickets, loading, fetchTickets };
}
