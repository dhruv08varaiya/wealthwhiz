import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import OnboardingWizard from '../components/OnboardingWizard/OnboardingWizard';
import './AppLayout.css';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(
    () => localStorage.getItem('ww_onboarding_done') !== 'true'
  );

  return (
    <div className="app-layout">
      {showOnboarding && (
        <OnboardingWizard onComplete={() => setShowOnboarding(false)} />
      )}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-layout__main">
        <Navbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
