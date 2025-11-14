import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(email, password, name);
      window.location.href = '/dashboard-home';
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create Account</h1>
        <form onSubmit={onSubmit} className="bg-card border border-border rounded-xl p-4 space-y-3">
          <Input label="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          {error && <div className="text-sm text-error">{error}</div>}
          <Button type="submit" loading={loading} fullWidth>Register</Button>
          <div className="text-sm text-muted-foreground">Already have an account? <a href="/login" className="text-primary">Login</a></div>
        </form>
      </main>
    </div>
  );
};

export default Register;
