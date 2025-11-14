import React from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';

const Row = ({ label, value, href }) => (
  <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
    <div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
    {href && <a href={href} className="text-primary text-sm">Open</a>}
  </div>
);

const Emergency = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Emergency & SOS</h1>
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="text-sm text-muted-foreground">Long press the pink round button at bottom-left for 3s to send SOS with your location.</div>
          <Row label="Hospital" value="Add your hospital number" href="tel:" />
          <Row label="Partner / Family" value="Add contact" href="tel:" />
          <Row label="Maps" value="Share live location" href="https://maps.google.com" />
          <div className="pt-2">
            <Button onClick={()=>window.location.href='sms:?&body=Emergency%20SOS%20from%20LILNEST'}>Quick SMS</Button>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-lg font-semibold mb-2">Pregnancy Red Flags</div>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Severe bleeding, leaking fluid</li>
            <li>Decreased baby movements</li>
            <li>Severe headache, visual disturbances</li>
            <li>Persistent vomiting or chest pain</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Emergency;
