import React from 'react';

const RegexTest: React.FC = () => {
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

  const testRegexPatterns = () => {
    // Test the regex patterns used in DynamicComponentRenderer
    const patterns = [
      { name: 'Remove imports', regex: /import.*?from.*?;/g, replacement: '' },
      { name: 'Remove exports', regex: /export\s+default\s+\w+;?\s*$/g, replacement: '' },
      { name: 'Remove interfaces', regex: /interface\s+\w+\s*{[\s\S]*?}\s*/g, replacement: '' },
      { name: 'Remove React.FC type annotations', regex: /:\s*React\.FC<.*?>/g, replacement: '' },
      { name: 'Remove props type annotations', regex: /:\s*\w+Props/g, replacement: '' },
      { name: 'Remove optional type annotations', regex: /\?\s*:\s*\w+/g, replacement: '' },
      { name: 'Remove other type annotations', regex: /:\s*\w+(?:\s*\|\s*\w+)*/g, replacement: '' },
      { name: 'Remove single line comments', regex: /\/\/.*$/gm, replacement: '' },
      { name: 'Remove multi-line comments', regex: /\/\*[\s\S]*?\*\//g, replacement: '' },
    ];

    let cleanedCode = testComponentCode;

    patterns.forEach((pattern) => {
      const before = cleanedCode;
      cleanedCode = cleanedCode.replace(pattern.regex, pattern.replacement);
      console.log(`${pattern.name}: ${before !== cleanedCode ? 'CHANGED' : 'NO CHANGE'}`);
    });

    console.log('Final cleaned code:');
    console.log(cleanedCode);

    // Test component name extraction
    const componentMatches = cleanedCode.match(/(?:const|function)\s+(\w+)\s*(?:=|\(\))/);
    const componentName = componentMatches ? componentMatches[1] : 'Unknown';
    console.log('Extracted component name:', componentName);

    return { cleanedCode, componentName };
  };

  React.useEffect(() => {
    console.log('Testing regex patterns...');
    testRegexPatterns();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Regex Pattern Test</h1>
      <p className="mb-4">Check the browser console for regex test results.</p>
      <button
        onClick={testRegexPatterns}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Run Regex Test
      </button>
    </div>
  );
};

export default RegexTest;
