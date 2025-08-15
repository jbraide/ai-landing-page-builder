// landingpage-builder/genesis-landing/src/lib/ai-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define types
interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  model?: "deepseek" | "gemini";
  componentCode?: string;
}

interface AIState {
  messages: AIMessage[];
  isConnected: boolean;
  isLoading: boolean;
  currentModel: "deepseek" | "gemini";
  sessionId: string | null;
}

interface AIContextType extends AIState {
  sendPrompt: (prompt: string) => Promise<void>;
  switchModel: (model: "deepseek" | "gemini") => void;
  clearConversation: () => void;
}

const AIContext = createContext<AIContextType | null>(null);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AIState>({
    messages: [],
    isConnected: false,
    isLoading: false,
    currentModel: "deepseek",
    sessionId: null,
  });

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Generate a unique session ID for this conversation
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Set session ID immediately for HTTP fallback
    setState((prev) => ({
      ...prev,
      sessionId,
    }));

    // Try to connect to WebSocket server with timeout
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";
    const ws = new WebSocket(wsUrl);
    
    // Set a timeout to fallback to HTTP mode if WebSocket doesn't connect
    const connectionTimeout = setTimeout(() => {
      if (ws.readyState !== WebSocket.OPEN) {
        console.log("WebSocket connection timeout, using HTTP API mode");
        ws.close();
        setState((prev) => ({
          ...prev,
          isConnected: false,
        }));
      }
    }, 2000); // 2 second timeout

    ws.onopen = () => {
      clearTimeout(connectionTimeout);
      setState((prev) => ({
        ...prev,
        isConnected: true,
      }));
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);

        if (message.type === "component") {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            messages: [
              ...prev.messages,
              {
                id: `msg-${Date.now()}`,
                role: "assistant",
                content: "Here is the generated component:",
                timestamp: new Date(),
                model: prev.currentModel,
                componentCode: message.code,
              },
            ],
          }));
        } else if (message.type === "status") {
          setState((prev) => ({
            ...prev,
            isLoading: true,
            messages: [
              ...prev.messages,
              {
                id: `msg-${Date.now()}`,
                role: "assistant",
                content: message.message,
                timestamp: new Date(),
              },
            ],
          }));
        } else if (message.type === "error") {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            messages: [
              ...prev.messages,
              {
                id: `msg-${Date.now()}`,
                role: "assistant",
                content: `Error: ${message.message}`,
                timestamp: new Date(),
              },
            ],
          }));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      clearTimeout(connectionTimeout);
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isLoading: false,
      }));
      console.log("WebSocket disconnected, using HTTP API mode");
    };

    ws.onerror = (error) => {
      clearTimeout(connectionTimeout);
      console.log("WebSocket connection failed, using HTTP API fallback");
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isLoading: false,
      }));
    };

    setSocket(ws);

    // Clean up on unmount
    return () => {
      clearTimeout(connectionTimeout);
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const sendPrompt = async (prompt: string) => {
    if (!state.sessionId) return;

    // Add user message to state
    const userMessage: AIMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      if (socket && state.isConnected) {
        // Use WebSocket if connected
        socket.send(
          JSON.stringify({
            type: "prompt",
            prompt,
            model: state.currentModel,
            sessionId: state.sessionId,
          }),
        );
      } else {
        // Fallback to HTTP API
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            model: state.currentModel,
            sessionId: state.sessionId,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            messages: [
              ...prev.messages,
              {
                id: `msg-${Date.now()}`,
                role: "assistant",
                content: "Here is the generated component:",
                timestamp: new Date(),
                model: prev.currentModel,
                componentCode: data.component.code,
              },
            ],
          }));
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            messages: [
              ...prev.messages,
              {
                id: `msg-${Date.now()}`,
                role: "assistant",
                content: `Error: ${data.error}`,
                timestamp: new Date(),
              },
            ],
          }));
        }
      }
    } catch (error) {
      console.error('Error sending prompt:', error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        messages: [
          ...prev.messages,
          {
            id: `msg-${Date.now()}`,
            role: "assistant",
            content: `Error: Failed to generate component - ${error instanceof Error ? error.message : 'Unknown error'}`,
            timestamp: new Date(),
          },
        ],
      }));
    }
  };

  const switchModel = (model: "deepseek" | "gemini") => {
    setState((prev) => ({ ...prev, currentModel: model }));

    // Add system message about model switch
    setState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: `msg-${Date.now()}`,
          role: "assistant",
          content: `Switched to ${model} model`,
          timestamp: new Date(),
        },
      ],
    }));
  };

  const clearConversation = () => {
    setState((prev) => ({
      ...prev,
      messages: [],
      sessionId: `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    }));
  };

  return (
    <AIContext.Provider
      value={{
        messages: state.messages,
        isConnected: state.isConnected,
        isLoading: state.isLoading,
        currentModel: state.currentModel,
        sessionId: state.sessionId,
        sendPrompt,
        switchModel,
        clearConversation,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
};
