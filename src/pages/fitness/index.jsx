import React from 'react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { buildFitnessPlan } from '../../utils/fitnessRules';

const SectionCard = ({ title, desc, action, to }) => (
  <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
    <div className="text-lg font-semibold mb-1 text-foreground">{title}</div>
    <div className="text-sm text-muted-foreground mb-3">{desc}</div>
    {action && (
      <Button variant="secondary" size="sm" onClick={() => (window.location.href = to)}>
        {action}
      </Button>
    )}
  </div>
);

const Fitness = () => {
  const { user } = useAuth();
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid, 'profiles', 'mother');
      const snap = await getDoc(ref);
      if (mounted) setProfile(snap.exists() ? snap.data() : {});
    })();
    return () => { mounted = false; };
  }, [user]);

  const plan = React.useMemo(() => buildFitnessPlan(profile || {}), [profile]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Smart Trimester Fitness</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-card rounded-xl p-4 shadow-soft border border-border">
            <div className="text-lg font-semibold mb-2">Personalized Plan</div>
            {!profile ? (
              <div className="text-sm text-muted-foreground">Loading your profile…</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="font-medium mb-1">Recommendations</div>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {plan.recommendations.map((r, i) => (<li key={i}>{r}</li>))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-1">Warnings</div>
                  {plan.warnings.length === 0 ? (
                    <div className="text-sm text-muted-foreground">None</div>
                  ) : (
                    <ul className="list-disc pl-5 text-sm space-y-1 text-warning">
                      {plan.warnings.map((w, i) => (<li key={i}>{w}</li>))}
                    </ul>
                  )}
                </div>
                <div className="md:col-span-2">
                  <div className="font-medium mb-1">Daily 15‑minute Routine</div>
                  <ol className="list-decimal pl-5 text-sm space-y-1">
                    {plan.dailyPlan.map((s, i) => (<li key={i}>{s}</li>))}
                  </ol>
                  <div className="text-xs text-muted-foreground mt-2">Stop immediately if any red‑flag symptoms occur. Consult your doctor for personalized advice.</div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-card rounded-xl p-4 shadow-soft border border-border">
            <div className="font-medium mb-1">Contraindications</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {plan.contraindications.map((c, i) => (<li key={i}>{c}</li>))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SectionCard title="Trimester Yoga" desc="Gentle yoga by trimester with GIF steps and voice cues." />
          <SectionCard title="Breathing & Lamaze" desc="Guided diaphragmatic and paced breathing." />
          <SectionCard title="Pelvic Floor Therapy" desc="Kegels, posture and back relief." />
          <SectionCard title="Stretching" desc="Hip mobility and back care." />
          <SectionCard title="Walking Plans" desc="Indoor + outdoor step goals synced to Google Fit (manual)." />
          <SectionCard title="Labor Prep" desc="Week 37+ routines with safety notes." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard title="Kick Counter" desc="Track fetal movements (28+ weeks)." action="Open" to="/kick-counter" />
          <SectionCard title="Contraction Timer" desc="Time and pattern recognition." action="Open" to="/kick-counter" />
          <SectionCard title="Emergency Stop" desc="If dizziness logged, workouts pause and show doctor card." />
        </div>
      </main>
    </div>
  );
};

export default Fitness;
