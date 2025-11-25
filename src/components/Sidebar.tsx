import React from 'react';
import { ImageIcon, MessageSquare, Music } from 'lucide-react';
import { Header } from './Header';
import { useSidebarContext } from '../../context/contextProvider';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: 'generate-image',
    label: 'Generate Image',
    icon: <ImageIcon className="w-5 h-5" />,
    path: '/dashboard/generate-image',
  },
  {
    id: 'chat',
    label: 'Chat With AI',
    icon: <MessageSquare className="w-5 h-5" />,
    path: '/dashboard/chat',
  },
  {
    id: 'audio',
    label: 'Sound / Audio Tools',
    icon: <Music className="w-5 h-5" />,
    path: '/dashboard/audio',
  },
];

export function Sidebar () {
  const { mobileOpen, setMobileOpen, isActive, navigate } = useSidebarContext();

  // Sidebar nav content extracted for reuse
  const SidebarNav = () => (
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false); // close sidebar on mobile after navigation
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${
                  isActive(item.path)
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-content-200 hover:bg-base-200 hover:text-content-100'
                }
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-base-100 border-r border-border-light flex-col min-h-screen">
        <Header />
        <SidebarNav />
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar overlay"
          />
          {/* Sidebar Panel */}
          <aside className="relative w-72 max-w-full bg-base-100 border-r border-border-light flex flex-col h-full animate-slideInLeft">
            <div className="flex items-center justify-between px-4 h-16 border-b border-base-300 bg-white">
               <h1 className="text-2xl font-bold text-content-100 tracking-tight">Omnexia AI</h1>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-base-200 transition"
                aria-label="Close sidebar"
              >
                <svg className="w-6 h-6 text-content-200" viewBox="0 0 24 24" fill="none">
                  <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <SidebarNav />
          </aside>
        </div>
      )}
    </>
  );
};
