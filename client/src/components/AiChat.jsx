import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/context.jsx";

// ─── Markdown-lite renderer ───────────────────────────────────────────────────
// Converts **bold**, `code`, and newlines to JSX without a library
function renderText(text) {
  const lines = text.split("\n");
  return lines.map((line, li) => {
    // Split by bold (**text**) and inline code (`code`)
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
      <span key={li}>
        {parts.map((part, pi) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={pi}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code
                key={pi}
                className="bg-black/10 px-1 py-0.5 rounded text-[12px] font-mono"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return part;
        })}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
}

// ─── Single message bubble ────────────────────────────────────────────────────
function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[12px] font-semibold
        ${isUser ? "bg-[#3B8C5A] text-white" : "bg-[#E8F4ED] text-[#3B8C5A]"}`}
      >
        {isUser ? (
          <i className="ti ti-user text-[14px]" />
        ) : (
          <i className="ti ti-robot text-[14px]" />
        )}
      </div>
      {/* Bubble */}
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed
        ${
          isUser
            ? "bg-[#3B8C5A] text-white rounded-tr-sm"
            : "bg-white border border-[#EAE8E3] text-[#1A1A1A] rounded-tl-sm"
        }`}
      >
        {msg.role === "assistant" ? renderText(msg.content) : msg.content}
      </div>
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="w-8 h-8 rounded-full bg-[#E8F4ED] flex items-center justify-center flex-shrink-0">
        <i className="ti ti-robot text-[#3B8C5A] text-[14px]" />
      </div>
      <div className="bg-white border border-[#EAE8E3] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
        <span
          className="w-2 h-2 bg-[#3B8C5A] rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-2 h-2 bg-[#3B8C5A] rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-2 h-2 bg-[#3B8C5A] rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}

// ─── Suggested prompts ────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Explain what is JavaScript in simple words",
  "How does React useState hook work?",
  "What is the difference between SQL and NoSQL?",
  "Give me a beginner roadmap for web development",
];

// ─── Main AiChat component ────────────────────────────────────────────────────
export default function AiChat() {
  const [messages, setMessages] = useState([]); // { role, content }[]
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const { user } = useContext(UserContext);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    const userMsg = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/ai/ask-ai", {
        messages: updatedMessages,
      });
      const aiMsg = { role: "assistant", content: res.data.response };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errMsg =
        err?.response?.data?.error || "Failed to get response. Try again.";
      setError(errMsg);
      // Remove the user message on error so they can retry
      setMessages(messages);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
    inputRef.current?.focus();
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] bg-white border border-[#EAE8E3] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAE8E3] bg-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E8F4ED] rounded-[10px] flex items-center justify-center">
            <i className="ti ti-robot text-[#3B8C5A] text-[18px]" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#1A1A1A]">
              Learning Management System AI
            </p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#3B8C5A] rounded-full" />
              <p className="text-[11.5px] text-[#3B8C5A]">
                Online · Powered by LMS
              </p>
            </div>
          </div>
        </div>
        {!isEmpty && (
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-[#888] hover:text-[#555] bg-[#F7F5F2] hover:bg-[#EEE] border border-[#EAE8E3] rounded-[8px] transition"
          >
            <i className="ti ti-refresh text-[13px]" /> New Chat
          </button>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-[#F7F5F2]/40">
        {/* Empty / welcome state */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center h-full text-center pt-4 pb-8">
            <div className="w-16 h-16 bg-[#E8F4ED] rounded-2xl flex items-center justify-center mb-4">
              <i className="ti ti-sparkles text-[#3B8C5A] text-[30px]" />
            </div>
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">
              Hi {user?.email?.split("@")[0] || "there"}, I'm your AI Tutor
            </h3>
            <p className="text-[13px] text-[#999] mb-6 max-w-xs">
              Ask me anything about your courses, programming, or any topic you
              want to learn.
            </p>
            {/* Suggestion chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="text-left px-3.5 py-2.5 bg-white border border-[#EAE8E3] rounded-[10px] text-[12.5px] text-[#555] hover:border-[#3B8C5A]/50 hover:text-[#3B8C5A] hover:bg-[#E8F4ED]/40 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}

        {/* Typing indicator */}
        {loading && <TypingIndicator />}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-[10px] text-[12.5px] text-red-600">
            <i className="ti ti-alert-circle text-[14px]" />
            {error}
            <button onClick={() => setError("")} className="ml-auto">
              <i className="ti ti-x text-[13px]" />
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="px-5 py-4 border-t border-[#EAE8E3] bg-white">
        <div className="flex items-end gap-2.5">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows={1}
              disabled={loading}
              className="w-full px-4 py-3 pr-4 bg-[#FAFAF9] border border-[#E4E2DC] rounded-[12px] text-[13.5px] text-[#1A1A1A] placeholder-[#BDBAB4] focus:outline-none focus:border-[#3B8C5A] focus:bg-white transition resize-none disabled:opacity-60"
              style={{ minHeight: "46px", maxHeight: "120px" }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 120) + "px";
              }}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-11 h-11 bg-[#3B8C5A] hover:bg-[#2F7048] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-[12px] flex items-center justify-center flex-shrink-0 transition"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <i className="ti ti-send text-[17px]" />
            )}
          </button>
        </div>
        <p className="text-[11px] text-[#CCC] mt-2 text-center">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
