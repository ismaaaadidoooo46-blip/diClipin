import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VideoUploader } from '@/components/dashboard/video-uploader';
import { ClipCard } from '@/components/dashboard/clip-card';
import type { Clip } from '@/types/video';

// Initial mock data for the UI
const INITIAL_CLIPS: Clip[] = [
  {
    id: '1',
    title: 'The Hidden Truth About AI Development in 2024',
    duration: '0:45',
    topic: 'Technology & AI',
    viralityScore: 98,
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '#'
  },
  {
    id: '2',
    title: 'Why Most Startups Fail (And How to Avoid It)',
    duration: '0:58',
    topic: 'Entrepreneurship',
    viralityScore: 85,
    thumbnailUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '#'
  },
  {
    id: '3',
    title: '3 Morning Habits That Changed My Life',
    duration: '0:32',
    topic: 'Self Improvement',
    viralityScore: 92,
    thumbnailUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '#'
  }
];

export function DashboardPage() {
  const [clips, setClips] = useState<Clip[]>(INITIAL_CLIPS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClips = clips.filter((clip) => {
    const query = searchQuery.toLowerCase();
    return (
      clip.title.toLowerCase().includes(query) ||
      clip.topic.toLowerCase().includes(query)
    );
  });

  const handleVideoProcessed = () => {
    // Add a new mock clip to demonstrate functionality
    const newClip: Clip = {
      id: Math.random().toString(36).substring(7),
      title: 'Newly Extracted Viral Segment',
      duration: '0:28',
      topic: 'New Content',
      viralityScore: 95,
      thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
      videoUrl: '#'
    };
    setClips([newClip, ...clips]);
  };

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
          Create Viral Clips
        </h1>
        <p className="text-gray-400 text-lg">
          Turn your long-form videos into engaging short-form content with AI.
        </p>
      </header>

      <section className="max-w-3xl">
        <VideoUploader onProcessed={handleVideoProcessed} />
      </section>

      <section className="pt-8 border-t border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Recent Clips</h2>
            <p className="text-gray-400 text-sm">Your AI-generated shorts ready for publishing.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search clips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#121827] border border-gray-700 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-10 p-2.5 transition-colors"
              />
            </div>
            
            <Link to="/projects" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 flex-shrink-0">
              View All Projects &rarr;
            </Link>
          </div>
        </div>
        
        {filteredClips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClips.map(clip => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#121827] border border-gray-800 rounded-2xl">
            <Search className="mx-auto h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">No clips found</h3>
            <p className="text-gray-400 text-sm">We couldn't find any clips matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}
