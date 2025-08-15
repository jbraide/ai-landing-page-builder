# Developer Notes: Genesis Landing Builder

## Best Practices & Lessons Learned

### 1. AI Service Communication (HTTP)
- **Lesson**: Use standard HTTP POST requests for AI generation.
- **Best Practice**:
  ```typescript
  // Example for calling AI generation via HTTP
  async function generateComponentHttp(prompt: string, model: ModelType) {
    const response = await fetch('http://localhost:3001/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, model }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate component');
    }
    const data = await response.json();
    return data.componentCode;
  }
  ```

### 2. AI Model Integration
- **Lesson**: Different models have different rate limits and response formats
- **Best Practice**:
  ```typescript
  // Implement retry logic with exponential backoff
  async function generateWithRetry(prompt: string, model: ModelType, retries = 3) {
    try {
      return await generateComponent(prompt, model);
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)));
        return generateWithRetry(prompt, model, retries - 1);
      }
      throw error;
    }
  }
  ```

### 3. Security Considerations
- **Lesson**: Sandboxing is crucial for dynamic component rendering
- **Best Practice**:
  ```jsx
  <iframe
    sandbox="allow-same-origin allow-scripts"
    // Never allow: 'allow-same-origin allow-top-navigation allow-forms allow-modals'
  />
  ```

### 4. Error Handling Patterns
- **Lesson**: Provide user-friendly error messages for AI failures
- **Best Practice**:
  ```typescript
  // Map technical errors to user-friendly messages
  const errorMessages = {
    'invalid_api_key': 'API key is invalid. Please check your configuration.',
    'rate_limit': 'AI service is busy. Please try again shortly.',
    default: 'An unexpected error occurred. Please try again.'
  };
  ```

### 5. State Management
- **Lesson**: Session state should persist across reloads
- **Best Practice**:
  ```typescript
  // Use localStorage for session persistence
  useEffect(() => {
    const savedSession = localStorage.getItem('ai_session');
    if (savedSession) setState(JSON.parse(savedSession));
  }, []);

  useEffect(() => {
    localStorage.setItem('ai_session', JSON.stringify(state));
  }, [state]);
  ```

### 6. Component Validation
- **Lesson**: AI-generated components need strict validation
- **Best Practice**:
  ```typescript
  // Security validation pattern
  const validateComponent = (code: string) => {
    const forbiddenPatterns = [
      /eval\(/,
      /Function\(/,
      /innerHTML\s*=/,
      /outerHTML\s*=/,
      /document\.write/,
      /window\.location/
    ];
    return !forbiddenPatterns.some(pattern => pattern.test(code));
  };
  ```

### 7. Performance Optimization
- **Lesson**: Real-time previews can cause performance issues
- **Best Practice**:
  ```typescript
  // Debounce preview updates
  const debouncedUpdate = useMemo(() => debounce(updatePreview, 500), []);
  useEffect(() => {
    debouncedUpdate(components);
  }, [components]);
  ```

### 8. Dependency Management
- **Lesson**: Keep AI dependencies decoupled
- **Best Practice**:
  ```typescript
  // Abstract AI service interface
  interface AIService {
    generateComponent(prompt: string): Promise<string>;
  }
  class DeepSeekService implements AIService { ... }
  class GeminiService implements AIService { ... }
  ```

### 9. Testing Strategy
- **Lesson**: Mock AI services for reliable testing
- **Best Practice**:
  ```typescript
  // Jest mock implementation
  jest.mock('../ai-service', () => ({
    generateComponent: jest.fn().mockResolvedValue('// Mock component')
  }));
  ```

### 10. Deployment Considerations
- **Lesson**: HTTP AI service should be deployed as a dedicated microservice.
- **Best Practice**:
  ```markdown
  Production Architecture:
  - Frontend: Vercel
  - AI Generation Service: Dedicated Node.js server (e.g., on a VPS or containerized)
  - AI Services: Edge functions for low-latency responses (if applicable)
  ```

## Checklist Before Committing
1. [ ] Validate all AI-generated code
2. [ ] Test multiple device previews
3. [ ] Verify API key security
4. [ ] Check WebSocket reconnection logic
5. [ ] Test model switching functionality
6. [ ] Verify session persistence
7. [ ] Run security audit on dynamic code
8. [ ] Test error boundary components
9. [ ] Verify rate limiting
10. [ ] Update developer notes with new learnings

## Anti-Patterns to Avoid
```markdown
1. **Hardcoding API keys**  
   ❌ `const API_KEY = 'sk-12345'`  
   ✅ Use environment variables with .env.local

2. **Blocking UI on AI responses**
   ❌ `await generateComponent()`
   ✅ Use asynchronous HTTP requests with proper loading states

3. **Trusting AI output without validation**  
   ❌ `eval(aiResponse)`  
   ✅ Use strict sanitization and validation

4. **Monolithic component architecture**  
   ❌ 500+ line components  
   ✅ Atomic design with small, reusable components

5. **Ignoring model rate limits**  
   ❌ Sequential requests without delays  
   ✅ Implement queueing with exponential backoff
```

## Continuous Improvement
- **Weekly**: Review error logs for common AI failure patterns
- **Monthly**: Audit security practices for dynamic content
- **Quarterly**: Evaluate new AI models and update integrations
- **Annually**: Conduct full penetration testing