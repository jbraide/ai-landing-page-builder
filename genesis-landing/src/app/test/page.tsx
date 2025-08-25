'use client';

import React from 'react';
import DynamicComponentRenderer from '@/app/components/DynamicComponentRenderer';

const TestPage: React.FC = () => {
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

  const constructionHeroCode = `
import React from 'react';

interface ConstructionHeroProps {
  className?: string;
}

const ConstructionHero: React.FC<ConstructionHeroProps> = ({ className = '' }) => {
  return (
    <section className={\`relative bg-gray-900 text-white overflow-hidden \${className}\`}>
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            Building Dreams with <span className="text-amber-400">Precision</span> & Excellence
          </h1>
          <p className="text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
            Trusted construction partners for residential, commercial, and industrial projects. Quality craftsmanship delivered on time, every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-lg transition-colors duration-300 transform hover:scale-105">
              Get Free Estimate
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-lg transition-colors duration-300">
              View Our Projects
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-32 z-0"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10 container mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center border border-white border-opacity-20">
          <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">25+</div>
          <div className="text-sm md:text-base">Years Experience</div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center border border-white border-opacity-20">
          <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">500+</div>
          <div className="text-sm md:text-base">Projects Completed</div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center border border-white border-opacity-20">
          <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">98%</div>
          <div className="text-sm md:text-base">Client Satisfaction</div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-center border border-white border-opacity-20">
          <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-2">50+</div>
          <div className="text-sm md:text-base">Expert Team Members</div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionHero;
  `;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">DynamicComponentRenderer Test</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Component */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Simple Test Component</h2>
            <DynamicComponentRenderer
              componentCode={testComponentCode}
              className="border border-gray-200 rounded-lg p-4"
            />
          </div>

          {/* Construction Hero Component */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Construction Hero Component</h2>
            <DynamicComponentRenderer
              componentCode={constructionHeroCode}
              className="border border-gray-200 rounded-lg"
            />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Component Code</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Simple Test Component Code:</h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {testComponentCode}
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-2">Construction Hero Code:</h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {constructionHeroCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
