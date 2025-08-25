// landingpage-builder/genesis-landing/src/app/api/compile/route.ts
import { NextRequest } from "next/server";
import { transform } from "@babel/standalone";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return Response.json(
        { error: "Code is required and must be a string" },
        { status: 400 },
      );
    }

    // Clean the code first
    let cleanCode = code
      .replace(/^```[\w]*\n?/gm, "")
      .replace(/\n?```$/gm, "")
      .trim();

    // Remove TypeScript syntax
    cleanCode = cleanCode
      .replace(/interface\s+\w+\s*{[\s\S]*?}\s*/g, "")
      .replace(/:\s*React\.FC<.*?>/g, "")
      .replace(/:\s*\w+Props/g, "")
      .replace(/\?\s*:\s*\w+/g, "")
      .replace(/:\s*\w+(?:\s*\|\s*\w+)*/g, "")
      .replace(/const\s+(\w+)\s*:\s*React\.FC/g, "const $1")
      .trim();

    // Transform JSX to JavaScript using Babel with custom parser to preserve Tailwind classes
    const transformed = transform(cleanCode, {
      presets: ["react"],
      filename: "generated-component.js",
      parserOpts: {
        plugins: ["jsx"],
      },
      plugins: [
        // Custom plugin to preserve Tailwind CSS classes
        function preserveTailwindClasses() {
          return {
            visitor: {
              JSXAttribute(path) {
                if (path.node.name.name === "className") {
                  if (path.node.value.type === "StringLiteral") {
                    // Preserve the string literal as-is
                    return;
                  }
                  if (path.node.value.type === "JSXExpressionContainer") {
                    const expression = path.node.value.expression;
                    if (expression.type === "TemplateLiteral") {
                      // Process template literals to preserve Tailwind classes
                      expression.quasis.forEach((quasi) => {
                        if (quasi.value.raw.includes(":")) {
                          // Preserve the raw value to keep Tailwind classes intact
                          quasi.value.cooked = quasi.value.raw;
                        }
                      });
                    }
                  }
                }
              },
            },
          };
        },
      ],
    });

    if (!transformed.code) {
      throw new Error("Failed to transform JSX to JavaScript");
    }

    // Remove import statements from compiled code and fix exports
    let finalCode = transformed.code
      .replace(/import\s+.*?from\s+['"`].*?['"`];?/g, "")
      .replace(/import\s+.*?;?/g, "")
      .replace(/require\(['"`].*?['"`]\)/g, "")
      .replace(/export\s+default\s+(\w+);?/g, "// export removed: $1")
      .replace(/^export\s+/gm, "")
      .trim();

    // Fix any Tailwind class issues that might have occurred during transformation
    finalCode = finalCode
      .replace(/(className:\s*["'`])([^"']*?):([^"']*?)(["'`])/g, "$1$2:$3$4")
      .replace(/(["'`][^"']*?):([^"']*?["'`])/g, "$1:$2");

    return Response.json({
      success: true,
      compiledCode: finalCode,
      originalCode: code,
      cleanCode: cleanCode,
    });
  } catch (error) {
    console.error("Compilation error:", error);
    return Response.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown compilation error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return Response.json({
    message: "Component compilation API",
    methods: ["POST"],
    requiredFields: ["code"],
  });
}
