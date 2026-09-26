import React from 'react';
import { AWEProvider } from './awe/context';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

export default function App() {
  return (
    <AWEProvider>
      <div className="min-h-screen bg-[#111111] text-[#F2EFE8]">
        <Navigation />
        <HomePage />
        <Footer />
      </div>
    </AWEProvider>
  );
}
