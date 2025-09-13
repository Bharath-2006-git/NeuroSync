import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VirtualGarden from './pages/virtual-garden';
import PomodoroTimer from './pages/pomodoro-timer';
import SettingsHub from './pages/settings-hub';
import BreakSession from './pages/break-session';
import DashboardHome from './pages/dashboard-home';
import WellnessActions from './pages/wellness-actions';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/virtual-garden" element={<VirtualGarden />} />
        <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
        <Route path="/settings-hub" element={<SettingsHub />} />
        <Route path="/break-session" element={<BreakSession />} />
        <Route path="/wellness-actions/:actionType" element={<WellnessActions />} />
        <Route path="/dashboard-home" element={<DashboardHome />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
