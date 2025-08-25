import React from 'react';

interface TestComponentProps {
  className?: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ className = '' }) => {
  return (
    <div className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg ${className}`}>
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
