'use client';

import React from 'react';
import DynamicComponentRenderer from '@/app/components/DynamicComponentRenderer';

const TestSimplePage: React.FC = () => {
  const testComponentCode = `
import React from 'react';

interface TestComponentProps {
  className?: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ className = '' }) => {
  return (
    <div className={\`bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg \${className}\`}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Test Component
        </h1>
        <p className="text-xl mb-6 opacity-90">
          This is a simple test component to verify the DynamicComponentRenderer works correctly.
        </p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Test Button
        </button>
      </div>
    </div>
  );
};

export default TestComponent;
  `;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Component Renderer Test</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">DynamicComponentRenderer Test</h2>
          <DynamicComponentRenderer
            componentCode={testComponentCode}
            className="border border-gray-200 rounded-lg p-4"
          />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Component Code</h2>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            {testComponentCode}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TestSimplePage;
