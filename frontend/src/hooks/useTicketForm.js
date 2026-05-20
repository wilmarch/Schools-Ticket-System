import { useState, useCallback } from 'react';
import API from '../api';

export function useTicketForm(onSuccess) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [message, setMessage] = useState({ type: '', text: '' });

    const showMessage = useCallback((type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (!title.trim() || !description.trim()) {
            return showMessage('error', 'Judul dan Deskripsi wajib diisi!');
        }

        try {
            await API.post('/tickets', { title, description, priority });
            showMessage('success', 'Tiket berhasil dikirim ke Admin!');
            setTitle('');
            setDescription('');
            setPriority('Low');
            if (onSuccess) onSuccess();
        } catch (err) {
            showMessage('error', err.response?.data?.message || 'Gagal mengirim tiket');
        }
    };

    return { title, setTitle, description, setDescription, priority, setPriority, message, handleSubmit };
}
