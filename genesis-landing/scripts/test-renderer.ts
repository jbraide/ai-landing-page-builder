import React from 'react';
import { useState, useEffect } from 'react';

// Test component code that should work with DynamicComponentRenderer
const testComponentCode = `
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

// Simplified version of the DynamicComponentRenderer logic for testing
function testComponentRenderer(componentCode: string) {
  try {
    // Clean up the code by removing TypeScript syntax, imports, and exports
    const cleanCode = componentCode
      .replace(/import.*?from.*?;/g, '') // Remove imports
      .replace(/export\s+default\s+\w+;?\s*$/g, '') // Remove exports
      .replace(/interface\s+\w+\s*{[\s\S]*?}\s*/g, '') // Remove interfaces
      .replace(/:\s*React\.FC<.*?>/g, '') // Remove React.FC type annotations
      .replace(/:\s*\w+Props/g, '') // Remove props type annotations
      .replace(/\?\s*:\s*\w+/g, '') // Remove optional type annotations
      .replace(/:\s*\w+(?:\s*\|\s*\w+)*/g, '') // Remove other type annotations
      .replace(/\/\/.*$/gm, '') // Remove single line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .trim();

    console.log('Cleaned code:');
    console.log(cleanCode);

    // Find the main component name
    const componentMatches = cleanCode.match(/(?:const|function)\s+(\w+)\s*(?:=|\(\))/);
    if (!componentMatches || !componentMatches[1]) {
      throw new Error('No React component found in the code');
    }

    const componentName = componentMatches[1];
    console.log('Extracted component name:', componentName);

    // Create the complete executable code
    const executableCode = `
      ${cleanCode}
      return ${componentName};
    `;

    console.log('Executable code:');
    console.log(executableCode);

    // Create and execute the component function
    const componentFunction = new Function('React', 'useState', 'useEffect', executableCode);
    const GeneratedComponent = componentFunction(React, useState, useEffect);

    if (typeof GeneratedComponent !== 'function') {
      throw new Error('Generated component is not a valid React component');
    }

    console.log('✅ Component successfully created!');
    console.log('Component type:', typeof GeneratedComponent);

    return GeneratedComponent;

  } catch (error) {
    console.error('❌ Error executing component code:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown execution error';
    throw new Error(`Failed to execute component: ${errorMessage}`);
  }
}

// Run the test
console.log('🧪 Testing DynamicComponentRenderer logic...\n');

try {
  const component = testComponentRenderer(testComponentCode);
  console.log('\n✅ Test completed successfully! The component renderer should work correctly.');
  console.log('Component function created:', !!component);
} catch (error) {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
}
