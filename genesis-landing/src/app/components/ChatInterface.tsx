// landingpage-builder/genesis-landing/src/app/components/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useAI } from '@/lib/ai-context';

const ChatInterface: React.FC = () => {
  const { messages, sendPrompt, isLoading, isConnected, currentModel, switchModel } = useAI();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendPrompt(inputValue);
      setInputValue('');
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg border border-gray-200">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">AI Chat Builder</h2>
          <div className="flex items-center space-x-2">
            <span className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-sm text-gray-500">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Model selector */}
        <div className="mt-2 flex space-x-2">
          <button
            onClick={() => switchModel('deepseek')}
            className={`px-3 py-1 rounded-md text-sm ${
              currentModel === 'deepseek'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            DeepSeek
          </button>
          <button
            onClick={() => switchModel('gemini')}
            className={`px-3 py-1 rounded-md text-sm ${
              currentModel === 'gemini'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Gemini
          </button>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p>Welcome to the AI Landing Page Builder!</p>
            <p className="mt-2">Type a prompt to start creating your page.</p>
            <p className="text-sm mt-4">Examples:</p>
            <ul className="text-sm text-gray-600 mt-1">
              <li>"Create a hero section with a headline and CTA"</li>
              <li>"Add a testimonial section with 3 cards"</li>
              <li>"Make the header sticky with a dark background"</li>
            </ul>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-100 border border-blue-200'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center mb-1">
                  <span className="font-medium">
                    {message.role === 'user' ? 'You' : currentModel === 'deepseek' ? 'DeepSeek' : 'Gemini'}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.componentCode ? (
                  <div className="mt-2">
                    <p>{message.content}</p>
                    <div className="mt-2 bg-gray-800 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                      <pre>{message.componentCode}</pre>
                    </div>
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your prompt here..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading || !isConnected}
          />
          <button
            type="submit"
            disabled={isLoading || !isConnected || !inputValue.trim()}
            className={`px-4 py-2 rounded-r-lg ${
              isLoading || !isConnected || !inputValue.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Send'
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {!isConnected ? 'Connecting to AI service...' : 'Press Enter to send'}
        </p>
      </form>
    </div>
  );
};

export default ChatInterface;
