import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ contact, messages, isTyping, onBack, isMobileView }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="fixed w-full flex items-center px-6 py-4 border-b-3 border-gray-200 bg-white">
        {isMobileView && (
          <button
            onClick={onBack}
            className="mr-3 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3"
          style={{ background: contact.bg }}
        >
          {contact.avatar}
        </div>
        <div>
          <div className="font-semibold">{contact.name}</div>
          <div className="text-xs text-green-500">Online</div>
        </div>
      </div>
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 mt-16 bg-gray-50">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={idx}
            message={msg}
            isMe={msg.from === "me"}
            animate={true}
          />
        ))}
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-2xl animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}