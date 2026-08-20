import { useState } from 'react';
import { ChevronDown, Sparkles, FileText, Wrench, Shield } from 'lucide-react';
import { AppView } from '../types';
import logoImg from '../images/audi-site-logo.webp';

interface HeaderProps {
  currentView?: AppView;
  onNavigate?: (view: AppView) => void;
  onOpenSampleModal?: () => void;
}

export default function Header({ currentView = 'home', onNavigate, onOpenSampleModal }: HeaderProps) {
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-white/95 backdrop-blur-md border-b border-grey-200 px-6 py-3.5">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            id="header-logo-button"
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            aria-label="AudiWindowSticker Home"
          >
            {/* Logo Image Placeholder */}
            <div id="header-logo-placeholder" className="flex items-center">
              <img
                id="header-logo-image"
                src={logoImg}
                alt="AudiWindowSticker Logo"
                className="h-8 sm:h-9 w-auto max-w-[220px] object-contain group-hover:opacity-90 transition-opacity"
              />
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="nav-msrp-button"
              onClick={() => onNavigate?.('msrp')}
              className={`cursor-pointer px-3.5 py-1.5 rounded-xs text-xs font-bold transition-colors flex items-center gap-1.5 ${
                currentView === 'msrp'
                  ? 'bg-brand-black text-brand-white font-extrabold shadow-xs'
                  : 'text-grey-700 hover:text-brand-black hover:bg-grey-50'
              }`}
            >
              <span>MSRP by VIN</span>
              <span className="text-[9px] bg-brand-red text-white px-1.5 py-0.2 rounded-xs font-black uppercase">
                New
              </span>
            </button>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                onBlur={() => setTimeout(() => setIsToolsOpen(false), 200)}
                className="cursor-pointer px-3.5 py-1.5 rounded-xs text-xs font-bold text-grey-700 hover:text-brand-black hover:bg-grey-50 transition-colors flex items-center gap-1"
              >
                <span>Tools</span>
                <ChevronDown size={14} className={`text-grey-500 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isToolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-brand-white border border-grey-200 rounded-sm shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => {
                      onNavigate?.('home');
                      setIsToolsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-grey-800 hover:bg-grey-50 hover:text-brand-black rounded-xs flex items-center gap-2 cursor-pointer"
                  >
                    <FileText size={14} className="text-grey-500" />
                    <span>Monroney Window Sticker</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate?.('msrp');
                      setIsToolsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-grey-800 hover:bg-grey-50 hover:text-brand-black rounded-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles size={14} className="text-brand-red" />
                    <span>Factory MSRP by VIN</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate?.('msrp');
                      setIsToolsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-grey-800 hover:bg-grey-50 hover:text-brand-black rounded-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Wrench size={14} className="text-grey-500" />
                    <span>Build Sheet by VIN</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => onOpenSampleModal?.()}
              className="cursor-pointer px-3.5 py-1.5 rounded-xs text-xs font-bold text-grey-700 hover:text-brand-black hover:bg-grey-50 transition-colors"
            >
              Sample Sticker
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate?.('login')}
            className="cursor-pointer text-xs font-bold text-grey-800 hover:text-brand-black transition-colors px-3 py-2"
          >
            Log in
          </button>
          <button 
            onClick={() => onNavigate?.('signup')}
            className="cursor-pointer text-xs font-bold bg-brand-black text-brand-white px-4 py-2.5 rounded-xs hover:bg-grey-900 transition-colors shadow-xs"
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}

