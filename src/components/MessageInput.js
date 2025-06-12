import { useState } from "react";

export default function MessageInput({ onSend, isTyping }) {
  const [value, setValue] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };

  return (
    <form
      className="sticky bottom-0 bg-white flex items-center p-4 border-t-3 border-gray-200"
      onSubmit={handleSend}
    >
      <input
        className="flex-1 rounded-full border px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        type="text"
        placeholder={isTyping ? "Bot is typing..." : "Type a message..."}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isTyping}
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 transition"
        disabled={isTyping}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}