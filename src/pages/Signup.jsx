import { useState } from 'react';
import API from '../api/axios';
import '../styles/auth.css';

export default function Signup() {
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });
      alert('Account created');
      window.location = '/login';
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Welcome to Mini Drive</h2>
        <p>Upload images, videos & files securely</p>

        <form onSubmit={submit}>
          <input name="name" placeholder="Full Name" required />
          <input name="email" placeholder="Email" required />

          <div className="input-box">
            <input
              type={show ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
            />
            <span className="toggle" onClick={() => setShow(!show)}>
              {show ? '🙈' : '👁'}
            </span>
          </div>

          <button>CREATE ACCOUNT</button>
        </form>

        <div className="auth-links">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
    </div>
  );
}
