'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface DynamicComponentRendererProps {
  componentCode: string;
  className?: string;
}

const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({
  componentCode,
  className = '',
}) => {
  const [error, setError] = useState<string | null>(null);
  const [RenderedComponent, setRenderedComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (!componentCode) {
      setRenderedComponent(null);
      setError(null);
      return;
    }

    try {
      setError(null);

      // Create a function that executes the AI-generated component code
      const executeGeneratedCode = () => {
        try {
          // Clean up the code by removing imports and exports
          let cleanCode = componentCode
            .replace(/import.*?from.*?;/g, '') // Remove imports
            .replace(/export\s+default\s+\w+;?\s*$/g, '') // Remove exports
            .trim();

          // Find the main component name - look for the last const declaration
          const componentMatches = cleanCode.match(/const\s+(\w+):\s*React\.FC/g);
          if (!componentMatches || componentMatches.length === 0) {
            throw new Error('No React component found in the code');
          }

          // Get the last component name (main component)
          const lastMatch = componentMatches[componentMatches.length - 1];
          const componentName = lastMatch.match(/const\s+(\w+):/)?.[1];

          if (!componentName) {
            throw new Error('Could not extract component name');
          }

          // Create the complete executable code
          const executableCode = `
            ${cleanCode}
            return ${componentName};
          `;

          console.log('Executing component:', componentName);
          console.log('Code to execute:', executableCode);

          // Create and execute the component function
          const componentFunction = new Function('React', 'useState', 'useEffect', 'Image', executableCode);
          const GeneratedComponent = componentFunction(React, useState, useEffect, Image);

          return GeneratedComponent;
        } catch (execError) {
          console.error('Error executing component code:', execError);
          const errorMessage = execError instanceof Error ? execError.message : 'Unknown execution error';
          throw new Error(`Failed to execute component: ${errorMessage}`);
        }
      };

      const GeneratedComponent = executeGeneratedCode();
      setRenderedComponent(() => GeneratedComponent);

    } catch (err) {
      console.error('Error processing component:', err);
      setError(err instanceof Error ? err.message : 'Failed to process component');
      setRenderedComponent(null);
    }
  }, [componentCode]);

  if (error) {
    return (
      <div className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <h3 className="text-red-800 font-semibold mb-3">Component Execution Error</h3>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <details className="mt-4">
          <summary className="text-red-700 cursor-pointer text-sm font-medium">Show generated code</summary>
          <pre className="mt-3 p-4 bg-red-100 rounded text-xs overflow-auto max-h-60 text-red-800 whitespace-pre-wrap">
            {componentCode}
          </pre>
        </details>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> The AI-generated component couldn't be executed directly.
            This might be due to complex imports, external dependencies, or syntax that requires compilation.
          </p>
        </div>
      </div>
    );
  }

  if (!RenderedComponent) {
    return (
      <div className={`flex flex-col items-center justify-center h-64 text-gray-500 ${className}`}>
        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <p className="text-center text-lg">No component to render</p>
        <p className="text-sm text-center mt-1 text-gray-400">Generate a component using the chat interface</p>
      </div>
    );
  }

  try {
    return (
      <div className={className}>
        <RenderedComponent />
      </div>
    );
  } catch (renderError) {
    const errorMessage = renderError instanceof Error ? renderError.message : 'Unknown render error';
    return (
      <div className={`p-6 bg-orange-50 border border-orange-200 rounded-lg ${className}`}>
        <h3 className="text-orange-800 font-semibold mb-3">Component Render Error</h3>
        <p className="text-orange-600 text-sm mb-4">
          The component was created successfully but failed to render: {errorMessage}
        </p>
        <details className="mt-4">
          <summary className="text-orange-700 cursor-pointer text-sm font-medium">Show generated code</summary>
          <pre className="mt-3 p-4 bg-orange-100 rounded text-xs overflow-auto max-h-60 text-orange-800 whitespace-pre-wrap">
            {componentCode}
          </pre>
        </details>
      </div>
    );
  }
};

export default DynamicComponentRenderer;