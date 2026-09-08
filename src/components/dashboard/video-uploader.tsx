import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Link as LinkIcon, Loader2 } from 'lucide-react';
import { z } from 'zod';

const youtubeUrlSchema = z.string().url().refine((url) => {
  return url.includes('youtube.com') || url.includes('youtu.be');
}, 'Must be a valid YouTube URL');

export function VideoUploader({ onProcessed }: { onProcessed?: () => void }) {
  const [activeTab, setActiveTab] = useState<'upload' | 'youtube'>('youtube');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    setError('');
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 15;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        if (onProcessed) onProcessed();
      }, 1000);
    }, 3000);
  }, [onProcessed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'video/*': [] },
    multiple: false
  } as any);

  const handleYoutubeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      youtubeUrlSchema.parse(youtubeUrl);
      setIsProcessing(true);
      setProgress(0);

      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await fetch('/api/ingest-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ youtubeUrl })
      });

      const data = await response.json();
      
      clearInterval(interval);
      setProgress(100);

      if (!data.success) {
        throw new Error(data.message || 'Failed to process video');
      }

      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
        setYoutubeUrl('');
        if (onProcessed) onProcessed();
      }, 1000);

    } catch (err) {
      if (err instanceof z.ZodError) {
        setError((err as any).errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#121827] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-4 text-sm font-medium transition-colors ${
            activeTab === 'upload' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-gray-800/30' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <UploadCloud className="w-4 h-4" />
            <span>Upload File</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('youtube')}
          className={`flex-1 py-4 text-sm font-medium transition-colors ${
            activeTab === 'youtube' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-gray-800/30' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <LinkIcon className="w-4 h-4" />
            <span>Paste YouTube Link</span>
          </div>
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'upload' ? (
          <div>
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                isProcessing ? 'pointer-events-none border-gray-700 bg-gray-800/10' : 'cursor-pointer'
              } ${
                isDragActive ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-700 hover:border-gray-500 hover:bg-gray-800/30'
              }`}
            >
              <input {...getInputProps()} disabled={isProcessing} />
              
              {isProcessing ? (
                <div className="space-y-4">
                  <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium">Processing Video...</p>
                  <div className="flex justify-between text-xs text-gray-400 font-medium max-w-xs mx-auto">
                    <span>Extracting audio & detecting faces...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden max-w-xs mx-auto">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1.5 rounded-full transition-all duration-300 ease-out" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-300 font-medium mb-1">Drag and drop your video here</p>
                  <p className="text-gray-500 text-sm">MP4, MOV, WebM up to 2GB</p>
                </>
              )}
            </div>
            {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
          </div>
        ) : (
          <form onSubmit={handleYoutubeSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LinkIcon className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-[#090d16] border border-gray-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  disabled={isProcessing}
                />
              </div>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
            
            <button
              type="submit"
              disabled={!youtubeUrl || isProcessing}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-medium py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Video...</span>
                </>
              ) : (
                <span>Get Viral Clips</span>
              )}
            </button>

            {isProcessing && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>Extracting audio & detecting faces...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 h-1.5 rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
