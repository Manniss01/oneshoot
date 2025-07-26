"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import logo from "./assets/logo.png";

import Bubble from "./components/Bubble";
import LoadingBubble from "./components/LoadingBubble";
import PromptSuggestionsRow from "./components/PromptSuggestionsRow";

import { useChat } from "@ai-sdk/react";
import type { Message } from "ai";

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const Home = () => {
  const {
    append,
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    reset,
  } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handlePrompt = (text: string) => {
    const id = crypto?.randomUUID?.() || generateUUID();
    const msg: Message = { id, content: text, role: "user" };
    append(msg);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleClearChat = () => {
    const confirmClear = window.confirm("Are you sure you want to clear the chat?");
    if (!confirmClear) return;

    if (reset) {
      reset();
    } else {
      window.location.reload();
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <main>
      <Image src={logo} width={180} alt="Football logo" className="logo" />

      <div className="chat-container">
        <section
          className={`chat-area ${messages.length > 0 ? "active" : ""}`}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.length === 0 ? (
            <>
              <p className="intro-text">
                Welcome to <strong>Oneshoot RAG Football Chatbot</strong> — your expert assistant for all things football.
                Ask about players, teams, matches, stats, and more. We are here to help you stay ahead of the game!
              </p>
              <PromptSuggestionsRow onPromptClick={handlePrompt} />
            </>
          ) : (
            <>
              {messages.map((m) => (
                <Bubble key={m.id} message={m} />
              ))}
              {isLoading && <LoadingBubble />}
              <div ref={bottomRef} />
            </>
          )}
        </section>

        <form onSubmit={onSubmit} className="chat-form" aria-label="Send message form">
          <input
            className="input-box"
            onChange={handleInputChange}
            value={input}
            placeholder="Type your football question..."
            disabled={isLoading}
            autoFocus
            aria-label="Chat input"
            ref={inputRef}
          />

          <div className="button-row">
            <button type="submit" className="send-button" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </button>

            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="clear-chat-button"
                aria-label="Clear chat history"
                title="Clear chat history"
                type="button"
              >
                Clear Chat
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Home;
