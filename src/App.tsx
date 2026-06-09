import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EpisodesPage from './pages/EpisodesPage';
import HostsPage from './pages/HostsPage';
import AboutPage from './pages/AboutPage';

type Page = 'home' | 'episodes' | 'hosts' | 'about';

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
      case 'episodes':
        return <EpisodesPage />;
      case 'hosts':
        return <HostsPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-court-dark">
      <Navbar activePage={activePage} onNavigate={navigate} />
      <main className={activePage !== 'home' ? 'pt-16' : ''}>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
