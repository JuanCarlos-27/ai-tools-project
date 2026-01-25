import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dashboard, Explorer } from './pages';
import type { Tool } from './types';
import { fetchAIToolsData } from './utils/csvParser';
import starIcon from './assets/logo.webp';
import LanguageSelector from './components/common/LanguageSelector';
import ThemeToggle from './components/common/ThemeToggle';

type NavTabsProps = {
  direction?: 'row' | 'column';
  onNavigate?: () => void;
};

function NavTabs({ direction = 'row', onNavigate }: NavTabsProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const isColumn = direction === 'column';
  const containerClasses = isColumn ? 'flex flex-col gap-2' : 'flex items-center gap-1';
  const linkBaseClasses = `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200${isColumn ? ' w-full justify-start' : ''}`;

  return (
    <div
      className={`${containerClasses} p-1 rounded-lg`}
      style={{ backgroundColor: 'var(--color-nav-hover-bg)', borderRadius: '13px' }}
    >
      <Link
        to="/"
        className={linkBaseClasses}
        style={{
          backgroundColor: isActive('/') ? 'var(--color-primary)' : 'transparent',
          color: isActive('/') ? 'var(--color-bg-page)' : 'var(--color-text-secondary)',
          borderRadius: '10px',
          fontWeight: isActive('/') ? '700' : '500',
          boxShadow: isActive('/') ? '0 4px 6px -1px var(--color-primary-light)' : 'none'
        }}
        onClick={() => onNavigate?.()}
        onMouseEnter={(e) => {
          if (!isActive('/')) {
            e.currentTarget.style.color = 'var(--color-text-primary)';
            e.currentTarget.style.backgroundColor = 'var(--color-nav-hover-bg)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive('/')) {
            e.currentTarget.style.color = 'var(--color-text-secondary)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        {t('nav.dashboard')}
      </Link>
      <Link
        to="/explorer"
        className={linkBaseClasses}
        style={{
          backgroundColor: isActive('/explorer') ? 'var(--color-primary)' : 'transparent',
          color: isActive('/explorer') ? 'var(--color-bg-page)' : 'var(--color-text-secondary)',
          borderRadius: '10px',
          fontWeight: isActive('/explorer') ? '700' : '500',
          boxShadow: isActive('/explorer') ? '0 4px 6px -1px var(--color-primary-light)' : 'none'
        }}
        onClick={() => onNavigate?.()}
        onMouseEnter={(e) => {
          if (!isActive('/explorer')) {
            e.currentTarget.style.color = 'var(--color-text-primary)';
            e.currentTarget.style.backgroundColor = 'var(--color-nav-hover-bg)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive('/explorer')) {
            e.currentTarget.style.color = 'var(--color-text-secondary)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {t('nav.explorer')}
      </Link>
    </div>
  );
}

function AppContent({ tools }: { tools: Tool[] }) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => setIsMobileMenuOpen(false);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur border-b" style={{ backgroundColor: 'var(--color-header-bg)', borderColor: 'var(--color-border)', boxShadow: '0 1px 3px var(--color-shadow)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              {/* Icon - Star */}
              <div className="relative">
                <img src={starIcon} alt={t('header.logoAlt')} className="size-11 object-contain" />
              </div>

              {/* Title */}
              <div>
                <h1 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                  {t('header.title')}
                </h1>
                <p className="hidden sm:block text-xs" style={{ color: 'var(--color-text-secondary)', marginTop: '-2px' }}>
                  {t('header.subtitle')}
                </p>
              </div>
            </Link>

            {/* Navigation & Language Selector */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                <NavTabs />
                <ThemeToggle />
                <LanguageSelector />
              </div>
              <div className="flex md:hidden items-center gap-2">
                <ThemeToggle />
                <LanguageSelector />
                <button
                  type="button"
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  aria-label={t('nav.toggleMenu')}
                  aria-expanded={isMobileMenuOpen}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden pb-3 pt-2">
              <NavTabs direction="column" onNavigate={() => setIsMobileMenuOpen(false)} />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Routes>
          <Route path="/" element={<Dashboard tools={tools} />} />
          <Route path="/explorer" element={<Explorer tools={tools} />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-footer-bg)', boxShadow: '0 -1px 3px var(--color-shadow)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-6">
            {/* Main Content */}
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">

                <span className="hidden sm:block text-xs" style={{ color: 'var(--color-border)' }}>•</span>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {t('footer.projectDesc')}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/JuanCarlos-27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all p-2 rounded-lg"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-accent)';
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  aria-label={t('footer.githubLabel')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/juan-romero-3328701a8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all p-2 rounded-lg"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-accent)';
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  aria-label={t('footer.linkedinLabel')}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  const { t } = useTranslation();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAIToolsData().then(data => {
      setTools(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-page)' }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--color-primary)' }}></div>
          <p className="mt-4" style={{ color: 'var(--color-text-secondary)' }}>{t('loading.message')}</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-grid">
        <AppContent tools={tools} />
      </div>
    </BrowserRouter>
  );
}

export default App
