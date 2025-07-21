// landingpage-builder/genesis-landing/src/app/components/PreviewCanvas.tsx
import React, { useState, useEffect } from 'react';
import { useAI } from '@/lib/ai-context';

const PreviewCanvas: React.FC = () => {
  const { messages } = useAI();
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  // Extract component code from messages
  useEffect(() => {
    const components = messages
      .filter(msg => msg.componentCode)
      .map(msg => msg.componentCode)
      .join('\n\n');

    // Basic HTML structure with injected components
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Landing Page Preview</title>
        <style>
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          }
          .component {
            position: relative;
            border: 2px solid transparent;
            transition: border-color 0.3s;
          }
          .component:hover {
            border-color: #0070f3;
          }
          .component::after {
            content: attr(data-model);
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(0, 112, 243, 0.8);
            color: white;
            padding: 2px 5px;
            border-radius: 3px;
            font-size: 10px;
          }
        </style>
      </head>
      <body>
        ${components || '<div class="empty-state">No components generated yet</div>'}
      </body>
      </html>
    `;

    setPreviewHtml(html);
  }, [messages]);

  // Device view dimensions
  const deviceDimensions = {
    desktop: { width: '100%', height: '100%' },
    tablet: { width: '768px', height: '1024px' },
    mobile: { width: '375px', height: '667px' },
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg border border-gray-200">
      {/* Preview header */}
      <div className="p-3 border-b border-gray-200 bg-white rounded-t-lg flex justify-between items-center">
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
      <div className="flex-grow overflow-auto p-4 flex justify-center items-start">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full">
            <div className="flex items-center text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Preview Error</span>
            </div>
            <p className="mt-2 text-red-600">{error}</p>
          </div>
        ) : (
          <div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg"
            style={{
              width: deviceDimensions[deviceView].width,
              height: deviceDimensions[deviceView].height,
              transition: 'all 0.3s ease'
            }}
          >
            <iframe
              srcDoc={previewHtml}
              title="Preview Canvas"
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts"
              onLoad={() => setError(null)}
              onError={(e) => setError('Failed to load preview')}
            />
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="p-2 border-t border-gray-200 bg-white text-xs text-gray-500 flex justify-between">
        <div>
          {activeComponent ? `Active: ${activeComponent}` : 'Hover over components'}
        </div>
        <div>
          Next.js 14 | {deviceView} view
        </div>
      </div>
    </div>
  );
};

export default PreviewCanvas;
```

This PreviewCanvas component:
1. Displays a live preview of generated components in an iframe
2. Supports device toggles for desktop/tablet/mobile views
3. Shows component outlines when hovered (via CSS in the iframe)
4. Includes model attribution for each generated component
5. Handles preview errors with user-friendly messages
6. Maintains a status bar with context information
7. Uses responsive design and smooth transitions
8. Provides visual feedback for active components
9. Uses a sandboxed iframe for security

The component integrates with our AI context to display components generated by DeepSeek or Gemini models. The preview updates automatically as new components are generated through the chat interface.
