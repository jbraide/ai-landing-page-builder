# Scripting Guidelines for Genesis Landing Builder

## Core Principles
1. **Executable-First**: Scripts must be runnable without modification
2. **No Embedded Documentation**: Avoid mixing instructions with executable code
3. **Clear Error Handling**: Provide actionable error messages
4. **Environment Agnostic**: Handle environment variables safely
5. **Graceful Shutdown**: Implement proper cleanup procedures

## Best Practices

### 1. Documentation Separation
```markdown
❌ Avoid:
  // To use:
  // 1. Install dependencies: `npm install dotenv`
  // 2. Run with: node script.js

✅ Instead:
  Create separate README.md files in the docs directory
```

### 2. Environment Setup
```javascript
// Always validate environment variables
require('dotenv').config({ path: '../.env.local' });

if (!process.env.REQUIRED_VAR) {
  console.error('Error: REQUIRED_VAR is missing from .env.local');
  process.exit(1);
}
```

### 3. Error Handling
```javascript
// Use try/catch blocks with informative messages
try {
  // Critical operation
} catch (error) {
  console.error(`Operation failed: ${error.message}`);
  console.error('Solution: Check the configuration in .env.local');
  process.exit(1);
}
```

### 4. Logging Standards
```javascript
// Use consistent logging format
console.log(`[${new Date().toISOString()}] Starting service`);
console.error(`[${new Date().toISOString()}] ERROR: Service failed`);
```

### 5. Graceful Shutdown
```javascript
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  // Cleanup logic
  process.exit(0);
});
```

### 6. Security Practices
```javascript
// Never expose sensitive information
console.log(`Using API key: ${process.env.API_KEY}`); // ❌ Bad
console.log('Using configured API key'); // ✅ Good
```

### 7. Script Structure
```markdown
1. Shebang declaration
2. Environment setup
3. Imports
4. Configuration
5. Main functionality
6. Cleanup handlers
```

## Script Template
```javascript
#!/usr/bin/env node
// Description: [Brief purpose description]

// 1. Environment setup
require('dotenv').config({ path: '../.env.local' });

// 2. Validate required variables
const REQUIRED_ENV = ['API_KEY', 'SECRET'];
REQUIRED_ENV.forEach(key => {
  if (!process.env[key]) {
    console.error(`ERROR: Missing ${key} in environment`);
    process.exit(1);
  }
});

// 3. Imports
const http = require('http');

// 4. Main functionality
async function main() {
  try {
    console.log('Starting service...');
    // Core logic
  } catch (error) {
    console.error('Critical failure:', error.message);
    process.exit(1);
  }
}

// 5. Cleanup handlers
process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down...');
  // Cleanup tasks
  process.exit(0);
});

process.on('uncaughtException', error => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

// Start the script
main();
```

## Review Checklist
1. [ ] No instructional comments in executable code
2. [ ] Environment variables properly validated
3. [ ] Error handling for all critical operations
4. [ ] Graceful shutdown implemented
5. [ ] No sensitive information in logs
6. [ ] Separate documentation exists in /docs
7. [ ] Script follows standard structure
8. [ ] Tested with missing environment variables
9. [ ] Tested with SIGINT signal
10. [ ] Error messages provide actionable solutions