import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return { email, role, logout };
}
