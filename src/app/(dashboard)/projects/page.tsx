import React from 'react';

export function ProjectsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Projects</h1>
        <p className="text-gray-400 text-lg">Manage all your extracted viral clips and video workflows.</p>
      </header>

      <div className="bg-[#121827] border border-gray-800 rounded-2xl p-12 text-center">
        <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
        <p className="text-gray-400 mb-6">You haven't created any projects yet. Go back to the dashboard to start processing your first video.</p>
      </div>
    </div>
  );
}
