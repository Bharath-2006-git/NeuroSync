import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      window.location.href = '/dashboard-home';
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-xl p-4 space-y-3">
          <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          {error && <div className="text-sm text-error">{error}</div>}
          <Button type="submit" loading={loading} fullWidth>Login</Button>
          <Button type="button" variant="secondary" fullWidth onClick={async ()=>{ try{ await loginWithGoogle(); window.location.href='/dashboard-home'; } catch{} }}>Continue with Google</Button>
          <div className="text-sm text-muted-foreground">No account? <a href="/register" className="text-primary">Register</a></div>
          <div className="text-sm"><a href="/reset-password" className="text-primary">Forgot password?</a></div>
        </form>
      </main>
    </div>
  );
};

export default Login;
