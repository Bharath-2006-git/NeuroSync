import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';

// Simple dynamic loader for model-viewer web component
function useModelViewer() {
  useEffect(() => {
    const existing = document.querySelector('script[data-lilnest-model-viewer]');
    if (existing) return;
    const s = document.createElement('script');
    s.type = 'module';
    s.dataset.lilnestModelViewer = '1';
    s.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(s);
  }, []);
}

const Visualizer = () => {
  useModelViewer();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">3D Fetal Visualizer (Placeholder)</h1>
        <div className="text-sm text-muted-foreground">Interactive 3D preview using a placeholder model. Replace with a licensed fetal model later.</div>
        <div className="bg-card border border-border rounded-xl p-2 shadow-soft">
          {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
          <model-viewer
            src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
            alt="3D placeholder"
            camera-controls
            auto-rotate
            ar
            exposure="1.0"
            style={{ width: '100%', height: '500px', background: 'var(--color-background)' }}
          />
        </div>
        <div className="text-xs text-muted-foreground">Controls: rotate with mouse/touch, scroll to zoom. AR available on supported devices.</div>
      </main>
    </div>
  );
};

export default Visualizer;
