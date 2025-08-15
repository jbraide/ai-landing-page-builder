// landingpage-builder/genesis-landing/src/app/components/PreviewCanvas.tsx
import React, { useState, useEffect } from 'react';
import { useAI } from '@/lib/ai-context';
import DynamicComponentRenderer from './DynamicComponentRenderer';

const PreviewCanvas: React.FC = () => {
  const { messages } = useAI();
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Device view dimensions
  const deviceDimensions = {
    desktop: { width: '100%', minHeight: 'auto' },
    tablet: { width: '768px', minHeight: 'auto' },
    mobile: { width: '375px', minHeight: 'auto' },
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Preview header */}
      <div className="p-3 border-b border-gray-200 bg-white flex justify-between items-center">
        <h2 className="text-lg font-semibold">Live Preview</h2>

        {/* Device selector */}
        <div className="flex space-x-2">
          <button
            onClick={() => setDeviceView('desktop')}
            className={`p-2 rounded-md ${deviceView === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Desktop view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => setDeviceView('tablet')}
            className={`p-2 rounded-md ${deviceView === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Tablet view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={() => setDeviceView('mobile')}
            className={`p-2 rounded-md ${deviceView === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Mobile view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-grow overflow-auto p-4">
        <div
          className="mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-all duration-300"
          style={{
            width: deviceDimensions[deviceView].width,
            minHeight: deviceDimensions[deviceView].minHeight,
          }}
        >
          <DynamicComponentRenderer
            componentCode={messages
              .filter(msg => msg.componentCode)
              .map(msg => msg.componentCode)
              .join('\n\n')}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="p-2 border-t border-gray-200 bg-white text-xs text-gray-500 flex justify-between">
        <div>
          React Component Preview
        </div>
        <div>
          Next.js 15 | {deviceView} view
        </div>
      </div>
    </div>
  );
};

export default PreviewCanvas;
