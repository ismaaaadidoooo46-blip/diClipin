import React from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#090d16] overflow-hidden text-gray-100 font-sans selection:bg-cyan-500/30">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
