// landingpage-builder/genesis-landing/src/app/components/DynamicComponentRenderer.tsx
"use client";

import React, { useState, useEffect } from "react";

interface DynamicComponentRendererProps {
  componentCode: string;
  className?: string;
}

const DynamicComponentRenderer: React.FC<DynamicComponentRendererProps> = ({
  componentCode,
  className = "",
}) => {
  const [error, setError] = useState<string | null>(null);
  const [RenderedComponent, setRenderedComponent] =
    useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!componentCode) {
      setRenderedComponent(null);
      setError(null);
      return;
    }

    const compileAndRenderComponent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Clean the code - remove markdown code blocks if present
        let cleanCode = componentCode
          .replace(/^```[\w]*\n?/gm, "")
          .replace(/\n?```$/gm, "")
          .trim();

        console.log("Original component code:", componentCode);
        console.log("After markdown cleanup:", cleanCode);

        // Debug: Log the exact line that's causing the error
        const lines = cleanCode.split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (
            lines[i].includes("const properties") ||
            lines[i].includes("[] =")
          ) {
            console.log(`Line ${i + 1}:`, lines[i]);
          }
        }

        // Remove TypeScript syntax with targeted replacement
        const originalBeforeTS = cleanCode;
        console.log(
          "Before TS removal - properties line:",
          cleanCode.includes("const properties")
            ? cleanCode.match(/const properties[^\n]*/)?.[0]
            : "Not found",
        );

        // First, handle the specific React.FC pattern that's causing issues
        cleanCode = cleanCode
          // Fix the exact pattern: const Component: React.FC = () => {
          .replace(
            /const\s+(\w+)\s*:\s*React\.FC\s*=\s*\(\)\s*=>\s*{/g,
            "const $1 = () => {",
          )
          // Remove interfaces
          .replace(/interface\s+\w+\s*{[\s\S]*?}\s*/g, "")
          // Remove React.FC with generics
          .replace(/:\s*React\.FC<[^>]*>/g, "")
          // Remove simple React.FC
          .replace(/:\s*React\.FC/g, "")
          // Remove props type annotations
          .replace(/:\s*\w+Props/g, "")
          // Remove optional type annotations
          .replace(/\?\s*:\s*\w+/g, "")
          // Remove other type annotations
          .replace(/:\s*\w+(?:\s*\|\s*\w+)*/g, "")
          // Remove array type annotations (e.g., : Property[])
          .replace(/:\s*\w+\[\]/g, "")
          // Remove object type annotations (e.g., : { key: string })
          .replace(/:\s*\{[\s\S]*?\}/g, "")
          // Remove function type annotations
          .replace(/:\s*\([^)]*\)\s*=>\s*\w+/g, "")
          // Fix the exact error case: const properties: Property[] = [
          .replace(/const\s+(\w+)\s*:\s*\w+\[\]\s*=\s*\[/g, "const $1 = [")
          // Final cleanup: remove any remaining colons that might be from type annotations
          .replace(/(\w+):\s*(?=\=)/g, "$1 ")
          // COMPREHENSIVE FIX: Handle all array declaration patterns
          .replace(
            /(const|let|var)\s+(\w+)\s*:\s*\w+\[\]\s*=\s*\[/g,
            "$1 $2 = [",
          )
          .replace(/(const|let|var)\s+(\w+)\[\]\s*=\s*\[/g, "$1 $2 = [")
          .trim();

        console.log("Before TS removal:", originalBeforeTS);
        console.log("After TS removal:", cleanCode);

        // Debug: Check if we still have the problematic pattern
        if (cleanCode.includes("properties[] =")) {
          console.error(
            "STILL HAS properties[] = pattern:",
            cleanCode.match(/const properties\[\][^\n]*/)?.[0],
          );
        }

        console.log("Final cleaned code after TypeScript removal:", cleanCode);

        // Debug: Check if we have any remaining React.FC issues
        if (cleanCode.includes(".FC") || cleanCode.includes("[] =")) {
          console.warn("Found .FC or [] = in cleaned code - attempting to fix");
          const beforeFix = cleanCode;

          // COMPREHENSIVE FIX: Handle ALL array declaration patterns
          cleanCode = cleanCode
            // Fix properties[] = [
            .replace(/const properties\[\]\s*=\s*\[/g, "const properties = [")
            // Fix testimonials[] = [
            .replace(
              /const testimonials\[\]\s*=\s*\[/g,
              "const testimonials = [",
            )
            // Fix services[] = [
            .replace(/const services\[\]\s*=\s*\[/g, "const services = [")
            // Fix ANY const array[] = [ pattern
            .replace(/(const|let|var)\s+(\w+)\[\]\s*=\s*\[/g, "$1 $2 = [");

          cleanCode = cleanCode
            // Fix the exact error pattern: Component.FC = () => {
            .replace(/(\w+)\.FC\s*=\s*\(\)\s*=>\s*{/g, "$1 = () => {")
            .replace(/\.FC\s*=/g, " =") // Fix cases like "LuxuryRentals.FC ="
            .replace(/\.FC/g, "") // Remove any remaining .FC
            // Fix array declarations that might have empty brackets
            .replace(/(\w+)\[\]\s*=/g, "$1 =") // Fix properties[] = to properties =
            // Fix any remaining type annotation issues
            .replace(/(\w+):\s*=/g, "$1 =") // Fix property: = to property =
            // Final cleanup for array declarations
            .replace(/(const|let|var)\s+(\w+)\[\]\s*=/g, "$1 $2 =") // Fix const properties[] = to const properties =
            // Fix the specific error pattern we're seeing
            .replace(/(const\s+\w+)\[\]\s*=\s*\[/g, "$1 = [");
          console.warn(`Fixed patterns: ${beforeFix} -> ${cleanCode}`);
        }

        // Final check for ANY array declaration pattern
        const arrayPattern = /(const|let|var)\s+(\w+)\[\]\s*=/;
        if (arrayPattern.test(cleanCode)) {
          console.error(
            "CRITICAL: Array declaration pattern still exists after all fixes!",
          );
          console.error("Current code:", cleanCode);
          // Force fix ALL array declaration patterns as a last resort
          cleanCode = cleanCode.replace(
            /(const|let|var)\s+(\w+)\[\]\s*=/g,
            "$1 $2 =",
          );
        }

        // Extract component name
        const componentNameMatch = cleanCode.match(/export default (\w+);?$/m);
        if (!componentNameMatch || !componentNameMatch[1]) {
          console.error(
            "Could not find export default statement in:",
            cleanCode,
          );
          throw new Error("Could not extract component name from code");
        }
        const componentName = componentNameMatch[1];
        console.log("Extracted component name:", componentName);

        // Load Babel standalone dynamically
        const { transform } = await import("@babel/standalone");

        // Transform JSX to JavaScript using Babel
        const transformed = transform(cleanCode, {
          presets: ["react"],
          filename: "generated-component.js",
        });

        if (!transformed.code) {
          throw new Error("Failed to transform JSX to JavaScript");
        }

        // Remove import statements and fix exports
        const finalCode = transformed.code
          .replace(/import\s+.*?from\s+['"`].*?['"`];?/g, "")
          .replace(/import\s+.*?;?/g, "")
          .replace(/require\(['"`].*?['"`]\)/g, "")
          .replace(/export\s+default\s+(\w+);?/g, "return $1;")
          .replace(/^export\s+/gm, "")
          .trim();

        // Create a function from the compiled code
        const componentFunction = new Function(
          "React",
          `
          try {
            ${finalCode}
          } catch (e) {
            console.error("Error in component execution:", e);
            return null;
          }
          `,
        );

        // Execute the function to get the component
        const GeneratedComponent = componentFunction(React);

        if (typeof GeneratedComponent !== "function") {
          throw new Error("Generated component is not a valid React component");
        }

        // Render the component
        const element = React.createElement(GeneratedComponent);
        setRenderedComponent(element);
      } catch (err) {
        console.error("Error compiling component:", err);
        setError(
          err instanceof Error ? err.message : "Failed to compile component",
        );
        setRenderedComponent(null);
      } finally {
        setIsLoading(false);
      }
    };

    compileAndRenderComponent();
  }, [componentCode]);

  if (error) {
    return (
      <div
        className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className}`}
      >
        <h3 className="text-red-800 font-semibold mb-3">
          Component Compilation Error
        </h3>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <details className="mt-4">
          <summary className="text-red-700 cursor-pointer text-sm font-medium">
            Show generated code
          </summary>
          <pre className="mt-3 p-4 bg-red-100 rounded text-xs overflow-auto max-h-60 text-red-800 whitespace-pre-wrap">
            {componentCode}
          </pre>
        </details>
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> The AI-generated component couldn&apos;t be
            executed. This might be due to complex syntax or unsupported
            features.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-64 text-gray-500 ${className}`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-center">Compiling component...</p>
      </div>
    );
  }

  if (!RenderedComponent) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-64 text-gray-500 ${className}`}
      >
        <svg
          className="w-16 h-16 mb-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        <p className="text-center text-lg">No component to render</p>
        <p className="text-sm text-center mt-1 text-gray-400">
          Generate a component using the chat interface
        </p>
      </div>
    );
  }

  return <div className={className}>{RenderedComponent}</div>;
};

export default DynamicComponentRenderer;
