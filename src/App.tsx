import React from 'react';
import { AWEProvider } from './awe/context';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PlaceholderPage } from './pages/PlaceholderPage';

function Page() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/') return <HomePage />;
  if (path === '/services') return <ServicesPage />;
  if (path === '/about') return <PlaceholderPage eyebrow="ABOUT AYUUWORKS / 01" title="THE STUDIO BEHIND THE WORK." description="Strategy, design, technology and storytelling brought together by Ayush Mishra, Founder / Creative Technologist." cta="Start a project" />;
  if (path === '/process') return <PlaceholderPage eyebrow="PROCESS / 01" title="SEE. THINK. BUILD. MOVE." description="A focused process for turning a business problem into something people can see, understand and act on." cta="Start a project" />;
  if (path === '/work' || path === '/case-studies') return <PlaceholderPage eyebrow="WORK / 01" title="WORK WITH A REASON." description="Selected AyuuWorks projects will be presented with context, creative direction, execution and genuine evidence where available." />;
  if (path === '/contact') return <PlaceholderPage eyebrow="CONTACT / 01" title="LET'S TALK ABOUT THE WORK." description="Have a project, campaign, space or idea in mind? Start the conversation and we will work out the right next step." cta="Start a project" />;
  if (path === '/start-a-project') return <PlaceholderPage eyebrow="START A PROJECT / 01" title="WHAT SHOULD YOUR BUSINESS BECOME NEXT?" description="Tell us what you are building, what needs to change, what you need made, your timeline and the range you are working with." />;
  if (path === '/privacy-policy') return <PlaceholderPage eyebrow="LEGAL / 01" title="PRIVACY POLICY" description="This page will contain AyuuWorks' privacy practices, data handling and contact information." />;
  if (path === '/terms') return <PlaceholderPage eyebrow="LEGAL / 02" title="TERMS & CONDITIONS" description="This page will contain the terms governing AyuuWorks services, projects and website use." />;
  if (path === '/cookies') return <PlaceholderPage eyebrow="LEGAL / 03" title="COOKIE POLICY" description="This page will explain cookies and similar technologies used by the website." />;
  return <PlaceholderPage eyebrow="404 / NOT FOUND" title="THIS PAGE TOOK A WRONG TURN." description="The page you requested does not exist. Head back to AyuuWorks and keep exploring." cta="Back to the studio" />;
}

export default function App() {
  return <AWEProvider><div className="min-h-screen bg-[#111111]"><Navigation /><Page /><Footer /></div></AWEProvider>;
}
