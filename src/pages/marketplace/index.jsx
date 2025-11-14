import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';

const ProviderCard = ({ name, type, rating = 4.8, dist = '2.1 km', phone = '', wa = '', onBook }) => (
  <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-lg font-semibold text-foreground">{name}</div>
        <div className="text-sm text-muted-foreground">{type} • {dist}</div>
      </div>
      <div className="text-sm text-muted-foreground">⭐ {rating}</div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {phone && <a href={`tel:${phone}`} className="px-3 py-2 rounded-md bg-secondary text-foreground text-sm">Call</a>}
      {wa && <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-secondary text-foreground text-sm">WhatsApp</a>}
      <Button size="sm" onClick={onBook}>Book</Button>
    </div>
  </div>
);

const providers = [
  { name: 'Dr. Aishwarya Menon', type: 'Obstetrician', phone: '+918888888888', wa: '918888888888', dist: '1.6 km' },
  { name: 'Dr. Rajiv Sharma', type: 'Pediatrician', phone: '+919999999999', wa: '919999999999', dist: '2.1 km' },
  { name: 'Meera Wellness', type: 'Prenatal Yoga', phone: '+917777777777', wa: '917777777777', dist: '3.0 km' },
  { name: 'NutriNest', type: 'Maternal Nutritionist', phone: '+916666666666', wa: '916666666666', dist: 'Online' },
  { name: 'LactoCare', type: 'Lactation Support', phone: '+915555555555', wa: '915555555555', dist: 'Online' },
];

const Marketplace = () => {
  const [modal, setModal] = useState({ open: false, provider: null });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const submit = () => {
    if (!date || !time) return alert('Pick a date and time');
    setModal({ open: false, provider: null });
    alert('Request submitted! Provider will contact you.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Services Marketplace</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p)=> (
            <ProviderCard key={p.name} {...p} onBook={()=>setModal({ open: true, provider: p })} />
          ))}
        </div>

        {modal.open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-card border border-border rounded-xl p-4 w-full max-w-md">
              <div className="text-lg font-semibold mb-2">Book with {modal.provider?.name}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="bg-input px-3 py-2 rounded-lg outline-none" />
                <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className="bg-input px-3 py-2 rounded-lg outline-none" />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <Button variant="ghost" onClick={()=>setModal({ open: false, provider: null })}>Cancel</Button>
                <Button onClick={submit}>Request Booking</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
