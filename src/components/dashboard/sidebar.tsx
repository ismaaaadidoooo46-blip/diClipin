import React from 'react';
import { Home, Folder, LayoutTemplate, Share2, Settings, Scissors } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NavLink, Link } from 'react-router-dom';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: 'Home/Dashboard', path: '/' },
  { icon: Folder, label: 'Projects', path: '/projects' },
  { icon: LayoutTemplate, label: 'Brand Templates', path: '/templates' },
  { icon: Share2, label: 'Social Accounts', path: '/social' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#090d16] border-r border-gray-800 flex flex-col text-white flex-shrink-0">
      <Link to="/" className="p-6 flex items-center space-x-3 hover:opacity-80 transition-opacity">
        <div className="bg-cyan-500 p-2 rounded-lg">
          <Scissors className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">diClipin</span>
      </Link>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => cn(
              "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-gray-800/50 text-cyan-400" 
                : "text-gray-400 hover:bg-gray-800/30 hover:text-gray-200"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-800">
        <div className="bg-[#121827] rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Credits</span>
            <span className="text-sm font-medium text-cyan-400">120/150 mins</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
          <button 
            onClick={() => alert('Upgrade Plan feature coming soon!')}
            className="w-full mt-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}
