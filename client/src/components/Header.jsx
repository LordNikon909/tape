// src/components/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTrades } from '../api';

export default function Header({ user, setUser }) {
  const navigate = useNavigate();
  const [pendingTrades, setPendingTrades] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const fetchTrades = async () => {
      if (!user) return;
      try {
        const trades = await getTrades();
        // Only count trades that are still pending
        const pending = trades.filter((t) => t.status === 'pending').length;
        setPendingTrades(pending);
      } catch (err) {
        console.error('Failed to fetch trades:', err);
      }
    };

    fetchTrades();
  }, [user]);

  return (
    <header
      style={{
        padding: '1rem',
        minHeight: '3rem',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Link to='/' style={{ marginRight: '1rem' }}>
          Tape Trader
        </Link>
      </nav>

      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Links only visible if user is logged in */}
        {user && (
          <>
            <Link to='/tapes' style={{ marginRight: '1rem' }}>
              {user.username}'s Collection ({user?.tapes?.length || 0})
            </Link>
            <Link to='/trades' style={{ marginRight: '1rem' }}>
              Trades {pendingTrades > 0 && `(${pendingTrades})`}
            </Link>
          </>
        )}
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to='/login' style={{ marginRight: '1rem' }}>
              Login
            </Link>
            <Link to='/signup'>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
