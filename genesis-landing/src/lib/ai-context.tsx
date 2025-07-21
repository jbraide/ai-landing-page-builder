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
  sendPrompt: (prompt: string) => void;
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

    // Connect to WebSocket server
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setState((prev) => ({
        ...prev,
        isConnected: true,
        sessionId,
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
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isLoading: false,
      }));
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setState((prev) => ({
        ...prev,
        isConnected: false,
        isLoading: false,
      }));
    };

    setSocket(ws);

    // Clean up on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const sendPrompt = (prompt: string) => {
    if (!socket || !state.isConnected || !state.sessionId) return;

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

    // Send prompt to server
    socket.send(
      JSON.stringify({
        type: "prompt",
        prompt,
        model: state.currentModel,
        sessionId: state.sessionId,
      }),
    );
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
