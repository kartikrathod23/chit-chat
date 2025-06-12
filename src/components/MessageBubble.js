import { useEffect, useRef } from "react";

export default function MessageBubble({ message, isMe, animate }) {
  const ref = useRef(null);

  useEffect(() => {
    if (animate && ref.current) {
      ref.current.classList.add(isMe ? "animate-slideInRight" : "animate-slideInLeft");
    }
  }, [animate, isMe]);

  const getStatusIcon = (status) => {
    if (!isMe) return null;
    
    switch (status) {
      case "sent":
        return <span className="text-gray-400 message-status">✓</span>;
      case "delivered":
        return <span className="text-gray-400 message-status font-extrabold">✓✓</span>;
      case "read":
        return <span className="text-blue-400 message-status font-extrabold">✓✓</span>;
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`
          max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow
          ${isMe
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-gray-100 text-gray-900 rounded-bl-sm"}
          transition-all duration-300
        `}
      >
        <div>{message.text}</div>
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className={`text-xs ${isMe ? 'text-indigo-200' : 'text-gray-400'}`}>
            {message.time}
          </span>
          {getStatusIcon(message.status)}
        </div>
      </div>
    </div>
  );
}