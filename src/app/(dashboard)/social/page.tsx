import React from 'react';

export function SocialPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Social Accounts</h1>
        <p className="text-gray-400 text-lg">Connect your YouTube, TikTok, and Instagram accounts to publish directly.</p>
      </header>

      <div className="bg-[#121827] border border-gray-800 rounded-2xl p-12 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Auto-Publishing Coming Soon</h3>
        <p className="text-gray-400">OAuth connections are currently disabled in this preview environment.</p>
      </div>
    </div>
  );
}
