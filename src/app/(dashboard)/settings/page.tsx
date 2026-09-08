import React from 'react';

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Settings</h1>
        <p className="text-gray-400 text-lg">Manage your account, billing, and API preferences.</p>
      </header>

      <div className="bg-[#121827] border border-gray-800 rounded-2xl p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">API Keys</h3>
          <p className="text-gray-400 text-sm mb-4">You can configure your OpenAI and Gemini API keys here if you run a self-hosted instance.</p>
          <input disabled type="password" value="*************************" className="bg-[#090d16] border border-gray-700 text-gray-500 text-sm rounded-lg block w-full md:w-1/2 p-2.5" />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Billing Plan</h3>
          <p className="text-gray-400 text-sm mb-4">You are currently on the Pro trial plan (120/150 mins remaining).</p>
          <button onClick={() => alert('Billing integration is disabled.')} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">Manage Subscription</button>
        </div>
      </div>
    </div>
  );
}
