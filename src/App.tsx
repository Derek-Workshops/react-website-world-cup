import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PracticeAreasPage from './pages/PracticeAreasPage';
import ExperiencePage from './pages/ExperiencePage';
import TeamPage from './pages/TeamPage';
import RecognitionPage from './pages/RecognitionPage';

type Page = 'home' | 'practices' | 'experience' | 'team' | 'recognition';

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
      case 'practices':
        return <PracticeAreasPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'team':
        return <TeamPage />;
      case 'recognition':
        return <RecognitionPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Navbar activePage={activePage} onNavigate={navigate} />
      <main className={activePage !== 'home' ? 'pt-16' : ''}>
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
