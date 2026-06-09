import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupsPage';
import SchedulePage from './pages/SchedulePage';
import TeamsPage from './pages/TeamsPage';
import StatsPage from './pages/StatsPage';
import FollowBrazilPage from './pages/FollowBrazilPage';

type Page = 'home' | 'groups' | 'schedule' | 'teams' | 'stats' | 'follow-brazil';

function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  const navigate = (page: string) => {
    setActivePage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'groups':
        return <GroupsPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'teams':
        return <TeamsPage />;
      case 'stats':
        return <StatsPage />;
      case 'follow-brazil':
        return <FollowBrazilPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      <Navbar activePage={activePage} onNavigate={navigate} />
      <main className={activePage !== 'home' ? 'pt-16' : ''}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
