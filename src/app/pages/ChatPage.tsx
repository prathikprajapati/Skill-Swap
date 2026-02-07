import { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/ui/skill-swap-button";
import { mockMatches, mockMessages, currentUser } from "@/app/data/mockData";
import { Send, Paperclip, Calendar, Clock, Check, CheckCheck, MoreVertical, Phone, Video, ChevronLeft } from "lucide-react";
import { useToast } from "@/app/components/ui/Toast";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: "sent" | "delivered" | "seen";
}

export function ChatPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string>("1");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
  const [showTemplates, setShowTemplates] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  const selectedMatch = mockMatches.find((m) => m.id === selectedMatchId) || mockMatches[0];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedMatchId]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text: messageInput,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedMatchId]: [...(prev[selectedMatchId] || []), newMessage],
    }));

    setMessageInput("");

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedMatchId]: prev[selectedMatchId].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        ),
      }));
    }, 1000);

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedMatchId]: prev[selectedMatchId].map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "seen" } : msg
        ),
      }));
    }, 3000);
  };

  const handleTemplateClick = (template: string) => {
    setMessageInput(template);
    setShowTemplates(false);
  };

  const messageTemplates = [
    "When can we meet?",
    "What time works for you?",
    "I'm available this weekend",
    "Can we schedule a session?",
  ];

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(date);
    }
  };

  // Group messages by date
  const groupedMessages = (messages[selectedMatchId] || []).reduce((groups, message) => {
    const date = new Date(message.timestamp).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4">
      {/* Sidebar - 20% width */}
      <div 
        className="w-[20%] min-w-[200px] rounded-2xl border flex flex-col overflow-hidden"
        style={{ 
          backgroundColor: 'var(--card)',
          borderColor: '#2D2D2D',
        }}
      >
        <div className="p-4 border-b" style={{ borderColor: '#2D2D2D' }}>
          <h2 className="text-lg font-semibold" style={{ color: '#E0E0E0' }}>
            Messages
          </h2>
          <p className="text-sm" style={{ color: '#BDBDBD' }}>
            {mockMatches.length} active conversations
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockMatches.map((match) => (
            <button
              key={match.id}
              onClick={() => setSelectedMatchId(match.id)}
              className={`w-full p-3 flex items-center gap-3 transition-all text-left border-b ${
                selectedMatchId === match.id ? "bg-[var(--section-bg)]" : "hover:bg-[var(--section-bg)]/50"
              }`}
              style={{ borderColor: '#2D2D2D' }}
            >
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${match.avatar})` }}
                />
                {match.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[var(--card)]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate" style={{ color: '#E0E0E0' }}>
                  {match.name}
                </p>
                <p className="text-xs truncate" style={{ color: '#757575' }}>
                  {match.matchScore}% match
                </p>
              </div>
              {selectedMatchId === match.id && (
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-indigo)' }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window - 80% width */}
      <div 
        className="flex-1 rounded-2xl border flex flex-col overflow-hidden"
        style={{ 
          backgroundColor: 'var(--card)',
          borderColor: '#2D2D2D',
        }}
      >
        {/* Chat Header */}
        <div 
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: '#2D2D2D' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedMatch.avatar})` }}
            />
            <div>
              <h3 className="font-semibold" style={{ color: '#E0E0E0', fontWeight: 500 }}>
                {selectedMatch.name}
              </h3>
              <p className="text-xs" style={{ color: '#757575' }}>
                {selectedMatch.isOnline ? "Online" : "Last seen recently"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-lg transition-colors hover:bg-[var(--section-bg)]"
              onClick={() => showToast("info", "Session scheduling coming soon!")}
            >
              <Calendar className="w-5 h-5" style={{ color: '#BDBDBD' }} />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-[var(--section-bg)]">
              <Phone className="w-5 h-5" style={{ color: '#BDBDBD' }} />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-[var(--section-bg)]">
              <Video className="w-5 h-5" style={{ color: '#BDBDBD' }} />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-[var(--section-bg)]">
              <MoreVertical className="w-5 h-5" style={{ color: '#BDBDBD' }} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              {/* Date Divider */}
              <div className="flex items-center justify-center my-4">
                <div className="h-px flex-1" style={{ backgroundColor: '#2D2D2D' }} />
                <span className="px-3 text-xs" style={{ color: '#757575' }}>
                  {formatDate(new Date(date))}
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: '#2D2D2D' }} />
              </div>

              {/* Messages for this date */}
              <div className="space-y-3">
                {dateMessages.map((message, index) => {
                  const isMe = message.senderId === currentUser.id;
                  const showAvatar = !isMe && (index === 0 || dateMessages[index - 1].senderId !== message.senderId);

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                        {!isMe && showAvatar && (
                          <div
                            className="w-8 h-8 rounded-full bg-cover bg-center flex-shrink-0"
                            style={{ backgroundImage: `url(${selectedMatch.avatar})` }}
                          />
                        )}
                        {!isMe && !showAvatar && <div className="w-8" />}

                        <div
                          className={`px-4 py-2.5 rounded-2xl ${
                            isMe 
                              ? "rounded-br-md" 
                              : "rounded-bl-md"
                          }`}
                          style={{
                            backgroundColor: isMe ? 'rgba(108, 99, 255, 0.15)' : '#2D2D2D',
                            border: isMe ? '1px solid rgba(108, 99, 255, 0.3)' : '1px solid #3D3D3D',
                          }}
                        >
                          <p style={{ color: '#E0E0E0', fontWeight: 400 }}>{message.text}</p>
                          <div className={`flex items-center gap-1 mt-1 ${isMe ? "justify-end" : "justify-start"}`}>
                            <span className="text-[10px]" style={{ color: '#757575' }}>
                              {formatTime(message.timestamp)}
                            </span>
                            {isMe && (
                              <>
                                {message.status === "sent" && <Check className="w-3 h-3" style={{ color: '#757575' }} />}
                                {message.status === "delivered" && <CheckCheck className="w-3 h-3" style={{ color: '#757575' }} />}
                                {message.status === "seen" && <CheckCheck className="w-3 h-3" style={{ color: '#3b82f6' }} />}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Templates */}
        {showTemplates && (
          <div 
            className="px-4 py-2 border-t"
            style={{ 
              backgroundColor: 'var(--section-bg)',
              borderColor: '#2D2D2D',
            }}
          >
            <div className="flex gap-2 overflow-x-auto pb-2">
              {messageTemplates.map((template) => (
                <button
                  key={template}
                  onClick={() => handleTemplateClick(template)}
                  className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors hover:opacity-80"
                  style={{ 
                    backgroundColor: 'rgba(108, 99, 255, 0.2)',
                    color: '#6C63FF',
                  }}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div 
          className="p-4 border-t"
          style={{ borderColor: '#2D2D2D' }}
        >
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-lg transition-colors hover:bg-[var(--section-bg)]"
              onClick={() => showToast("info", "File attachment coming soon!")}
            >
              <Paperclip className="w-5 h-5" style={{ color: '#BDBDBD' }} />
            </button>
            <button 
              className="p-2 rounded-lg transition-colors hover:bg-[var(--section-bg)]"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              <span className="text-sm" style={{ color: '#BDBDBD' }}>💬</span>
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={`Plan your session with ${selectedMatch.name}...`}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-[var(--accent-indigo)]/30 transition-all"
                style={{ 
                  backgroundColor: 'var(--section-bg)',
                  borderColor: '#2D2D2D',
                  color: '#E0E0E0',
                }}
              />
            </div>
            <Button 
              onClick={handleSendMessage} 
              disabled={!messageInput.trim()}
              size="sm"
              className="px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
