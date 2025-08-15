"use client";
import { AIProvider } from "@/lib/ai-context";
import ChatInterface from "./components/ChatInterface";
import PreviewCanvas from "./components/PreviewCanvas";
import React, { useState, useRef, useCallback } from "react";

export default function Home() {
  const [chatWidth, setChatWidth] = useState(30); // Default to 30% width
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

    // Constrain between 10% and 35%
    const constrainedWidth = Math.min(Math.max(newWidth, 10), 35);
    setChatWidth(constrainedWidth);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <AIProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl w-12 h-12 flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-900">
                  Genesis Landing Builder
                </h1>
                <p className="text-sm text-gray-500">
                  AI-powered Next.js landing page creation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Templates
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Export
              </button>
            </div>
          </div>
        </header>

        <main
          ref={containerRef}
          className="flex-grow flex h-full overflow-hidden"
          style={{ height: 'calc(100vh - 140px)' }} // Account for header and footer
        >
          {/* Chat Panel */}
          <div
            className="bg-white border-r border-gray-200 flex-shrink-0 overflow-hidden"
            style={{ width: `${chatWidth}%` }}
          >
            <ChatInterface />
          </div>

          {/* Resizer */}
          <div
            className={`w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize flex-shrink-0 transition-colors ${isDragging ? 'bg-blue-500' : ''
              }`}
            onMouseDown={handleMouseDown}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-0.5 h-8 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex-grow overflow-hidden bg-gray-50">
            <PreviewCanvas />
          </div>
        </main>

        <footer className="bg-white border-t mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Genesis Landing Builder. All
                rights reserved.
              </p>
              <div className="flex space-x-4">
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Documentation
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Support
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Feedback
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AIProvider>
  );
}
