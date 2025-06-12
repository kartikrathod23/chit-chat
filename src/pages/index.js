import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";
import contacts from "../data/contacts";
import initialChats from "../data/chats";

const BOT_REPLIES = [
  "That's interesting!",
  "Can you tell me more?",
  "I'll get back to you soon.",
  "Thanks for the update!",
  "👍",
  "😊",
  "Let me check on that.",
  "Sounds good!"
];

export default function Home() {
  const [selectedId, setSelectedId] = useState(contacts[0].id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chats, setChats] = useState(initialChats);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const selectedContact = contacts.find((c) => c.id === selectedId);
  const messages = chats[selectedId] || [];

  // Handle mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowChat(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle contact selection
  const handleContactSelect = (id) => {
    setSelectedId(id);
    if (isMobileView) {
      setShowChat(true);
    }
  };

  // Handle back button
  const handleBack = () => {
    setShowChat(false);
  };

  // Handle sending a message
  const handleSend = (text) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user's message with initial "sent" status
    const newMsg = { from: "me", text, time, status: "sent" };
    setChats((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMsg]
    }));
    setIsTyping(true);

    // Update message status to "delivered" after a short delay
    setTimeout(() => {
      setChats((prev) => ({
        ...prev,
        [selectedId]: prev[selectedId].map((msg, idx) => 
          idx === prev[selectedId].length - 1 
            ? { ...msg, status: "delivered" }
            : msg
        )
      }));
    }, 1000);
  
    // Simulate bot reply with typing animation
    setTimeout(() => {
      const botReply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      const botMsg = {
        from: "them",
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "received"
      };
      setChats((prev) => ({
        ...prev,
        [selectedId]: [...(prev[selectedId] || []), botMsg]
      }));
      setIsTyping(false);

      // Update user's message status to "read" after bot replies
      setTimeout(() => {
        setChats((prev) => ({
          ...prev,
          [selectedId]: prev[selectedId].map((msg, idx) => 
            idx === prev[selectedId].length - 2 
              ? { ...msg, status: "read" }
              : msg
          )
        }));
      }, 500);
    }, 1200 + Math.random() * 1000);
  };

  // When switching contacts, stop typing animation
  useEffect(() => {
    setIsTyping(false);
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-16 h-[calc(100vh-4rem)]">
        {/* Sidebar - Hidden on mobile when chat is shown */}
        <div className={`${isMobileView && showChat ? 'hidden' : 'block'} md:block`}>
          <Sidebar
            selectedId={selectedId}
            onSelect={handleContactSelect}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            isMobileView={isMobileView}
          />
        </div>

        {/* Chat Window - Full width on mobile */}
        <main className={`flex-1 flex flex-col transition-all duration-300
          ${isMobileView ? 'w-full' : sidebarCollapsed ? 'ml-20' : 'ml-80'}
          h-[calc(100vh-4rem)]`}>
          <div className={`flex-1 flex flex-col ${isMobileView && !showChat ? 'hidden' : 'block'}`}>
            <ChatWindow
              contact={selectedContact}
              messages={messages}
              isTyping={isTyping}
              onBack={handleBack}
              isMobileView={isMobileView}
            />
            <MessageInput onSend={handleSend} isTyping={isTyping} />
          </div>
        </main>
      </div>
    </div>
  );
}