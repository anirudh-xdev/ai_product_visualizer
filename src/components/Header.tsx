import { Sparkles } from 'lucide-react';
import { Link } from 'react-router';

export default function Header () {
  return (
    <header className="md:border-b md:border-base-400 d:shadow-sm sticky top-0 z-40 md:backdrop-blur-sm md:bg-white/95 md:pl-0 pl-10">
      <div className="container mx-auto px-4 md:px-8 md:py-5 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="p-2.5 bg-linear-to-br from-brand-primary via-brand-secondary to-brand-accent rounded-xl shadow-md">
             <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-content-100 tracking-tight">Omnexia AI</h1>
            <p className="text-xs text-content-300 font-medium tracking-tight mt-1 md:block hidden">Transform products with AI-powered visualizations</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
