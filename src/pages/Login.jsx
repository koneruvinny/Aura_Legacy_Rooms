import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../css/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('aura_token', response.data.token);
      localStorage.setItem('aura_user', JSON.stringify(response.data.user));
      navigate('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container container">
      <div className="auth-box glass-panel">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to your Aura account</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary full-width auth-btn">
            Sign In
          </button>
        </form>
        
        <div className="auth-footer">
          Don&apos;t have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
