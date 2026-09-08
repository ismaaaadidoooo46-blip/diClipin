import React from 'react';
import { Play, Download, Edit3, Clock, Tag } from 'lucide-react';
import type { Clip } from '@/types/video';

interface ClipCardProps {
  clip: Clip;
  key?: React.Key;
}

export function ClipCard({ clip }: ClipCardProps) {
  // Score color logic
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400 border-green-400/30 bg-green-400/10';
    if (score >= 70) return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
  };

  return (
    <div className="bg-[#121827] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all group flex flex-col h-full shadow-lg">
      <div className="relative aspect-[9/16] bg-gray-900 w-full overflow-hidden">
        {/* Placeholder for video thumbnail - simulating a vertical crop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <img 
          src={clip.thumbnailUrl} 
          alt={clip.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/10 backdrop-blur-md p-4 rounded-full hover:bg-white/20 transition-colors border border-white/20">
            <Play className="w-6 h-6 text-white fill-white" />
          </button>
        </div>

        {/* Virality Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={`px-3 py-1.5 rounded-full border backdrop-blur-md flex items-center space-x-1.5 font-bold text-sm shadow-xl ${getScoreColor(clip.viralityScore)}`}>
            <span className="animate-pulse">🔥</span>
            <span>{clip.viralityScore}</span>
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4 z-20">
          <div className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs font-medium text-white flex items-center space-x-1 border border-white/10">
            <Clock className="w-3 h-3" />
            <span>{clip.duration}</span>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start space-x-2 mb-3">
          <Tag className="w-4 h-4 text-cyan-500 mt-1 flex-shrink-0" />
          <span className="text-xs font-semibold text-cyan-500 uppercase tracking-wider">{clip.topic}</span>
        </div>
        
        <h3 className="text-white font-bold text-lg leading-tight mb-4 flex-1 line-clamp-3">
          {clip.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button onClick={() => alert('Edit feature is not available in the preview.')} className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-700">
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button onClick={() => alert('Exporting video...')} className="flex items-center justify-center space-x-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-cyan-500/30">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
