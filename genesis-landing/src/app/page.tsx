"use client";
import { AIProvider } from "@/lib/ai-context";
import ChatInterface from "./components/ChatInterface";
import PreviewCanvas from "./components/PreviewCanvas";

export default function Home() {
  return (
    <AIProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
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
                Publish
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="h-full">
              <ChatInterface />
            </div>
            <div className="h-full">
              <PreviewCanvas />
            </div>
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
