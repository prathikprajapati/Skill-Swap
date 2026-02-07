import { useState } from "react";
import { mockAcceptedMatches } from "@/app/data/mockData";
import {
  Send,
  ArrowLeftRight,
  Smile,
  Paperclip,
  MessageSquare,
  Check,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/app/components/ui/skill-swap-button";
import EmojiPicker from "emoji-picker-react";
import { useDropzone } from "react-dropzone";

interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
}

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      sender: "them",
      text: "Hi! I'm excited to learn React from you.",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      sender: "me",
      text: "Great to connect! I'd love to teach you React and learn about Machine Learning from you.",
      timestamp: "10:32 AM",
      status: "read",
    },
    {
      id: "3",
      sender: "them",
      text: "Perfect! When would be a good time for our first session?",
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      sender: "me",
      text: "How about this Thursday at 3 PM?",
      timestamp: "10:36 AM",
      status: "delivered",
    },
    {
      id: "5",
      sender: "them",
      text: "Great! When can we start the first session?",
      timestamp: "2h ago",
    },
  ],
  "2": [
    {
      id: "1",
      sender: "them",
      text: "Thanks for accepting! Looking forward to learning React.",
      timestamp: "Yesterday",
    },
  ],
};

const mockSkillSwaps: Record<string, { youTeach: string; youLearn: string }> = {
  "1": { youTeach: "React", youLearn: "Machine Learning" },
  "2": { youTeach: "React", youLearn: "Java" },
};

export function ChatPage() {
  const [selectedMatchId, setSelectedMatchId] = useState<string>("1");
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [messages, setMessages] =
    useState<Record<string, Message[]>>(mockMessages);
  const [error, setError] = useState<string | null>(null);

  const selectedMatch = mockAcceptedMatches.find(
    (m) => m.id === selectedMatchId,
  );
  const currentMessages = messages[selectedMatchId] || [];
  const skillSwap = mockSkillSwaps[selectedMatchId];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setAttachments((prev) => [...prev, ...acceptedFiles]);
    },
    noClick: true,
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() && attachments.length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedMatchId]: [...(prev[selectedMatchId] || []), newMessage],
    }));
    setMessageInput("");
    setAttachments([]);

    // Simulate typing indicator and reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate a reply
      const replies = [
        "Thanks for your message! That sounds interesting.",
        "I appreciate you sharing that. Let me think about it.",
        "Great point! I'd love to discuss this further.",
        "Thanks for reaching out. When would be a good time to connect?",
        "That makes sense. I'm looking forward to our session!",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "them",
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedMatchId]: [...(prev[selectedMatchId] || []), replyMessage],
      }));
    }, 2000);
  };

  const handleEmojiSelect = (emojiObject: any) => {
    setMessageInput((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const invalidFiles = files.filter((file) => file.size > maxSize);

    if (invalidFiles.length > 0) {
      setError("File size exceeds 10MB limit");
      return;
    }

    setAttachments((prev) => [...prev, ...files]);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && showEmojiPicker) {
      setShowEmojiPicker(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header Section */}
      <div className="mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <h2
          className="text-3xl md:text-4xl mb-3 tracking-tight"
          style={{ color: "var(--text-primary)", fontWeight: 700 }}
        >
          Messages
        </h2>
        <p
          className="text-base md:text-lg"
          style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}
        >
          Chat with your accepted matches and plan your learning sessions
        </p>
      </div>

      <div
        className="flex-1 flex rounded-2xl overflow-hidden border"
        style={{
          borderColor: "var(--border)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Left Sidebar - Matches List */}
        <div
          className="w-full md:w-72 border-r flex flex-col md:h-full h-32"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="p-3 border-b"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--section-bg)",
            }}
          >
            <h3
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Active Matches ({mockAcceptedMatches.length})
            </h3>
          </div>


          <div className="flex-1 overflow-y-auto">
            {mockAcceptedMatches.map((match) => (
              <button
                key={match.id}
                onClick={() => setSelectedMatchId(match.id)}
                className="w-full p-3 border-b transition-all duration-200 text-left hover:bg-[var(--section-bg)]"
                style={{
                  backgroundColor:
                    selectedMatchId === match.id
                      ? "var(--section-bg)"
                      : "transparent",
                  borderColor: "var(--border)",
                  borderLeft:
                    selectedMatchId === match.id
                      ? "3px solid var(--accent-indigo)"
                      : "3px solid transparent",
                }}
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url(${match.avatar})`,
                      border: `2px solid ${selectedMatchId === match.id ? "var(--accent-indigo)" : "var(--border)"}`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4
                        className="text-sm font-semibold truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {match.name}
                      </h4>
                      {match.unread > 0 && (
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                          style={{
                            backgroundColor: "var(--accent-indigo)",
                            color: "white",
                          }}
                        >
                          {match.unread}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs truncate"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {match.lastMessage}
                    </p>
                    <p
                      className="text-[10px] mt-0.5"
                      style={{ color: "var(--text-disabled)" }}
                    >
                      {match.timestamp}
                    </p>
                  </div>
                </div>
              </button>

            ))}
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <div
          className="flex-1 flex flex-col"
          style={{ backgroundColor: "var(--background)" }}
        >
          {selectedMatch ? (
            <>
          {/* Chat Header */}
          <div
            className="p-3 border-b"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
            }}
          >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedMatch.avatar})` }}
                  />
                  <div className="flex-1">
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedMatch.name}
                    </h3>
                  </div>
                </div>


                {/* Skill Swap Context */}
                {skillSwap && (
                  <div
                    className="mt-2 p-2 rounded-lg flex items-center gap-2"
                    style={{ backgroundColor: "var(--section-bg)" }}
                  >
                    <ArrowLeftRight
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--accent)" }}
                    />
                    <div className="flex items-center gap-1.5 text-xs">
                      <span style={{ color: "var(--text-secondary)" }}>
                        You teach:
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          backgroundColor: "var(--accent-light)",
                          color: "var(--accent)",
                        }}
                      >
                        {skillSwap.youTeach}
                      </span>
                      <span style={{ color: "var(--text-secondary)" }}>•</span>
                      <span style={{ color: "var(--text-secondary)" }}>
                        You learn:
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          backgroundColor: "var(--primary-light)",
                          color: "var(--primary-dark)",
                        }}
                      >
                        {skillSwap.youLearn}
                      </span>
                    </div>
                  </div>
                )}

              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    role="listitem"
                    aria-label={`Message from ${message.sender === "me" ? "you" : selectedMatch?.name} at ${message.timestamp}`}
                  >
                    <div className="max-w-[75%]">
                      <div
                        className="px-3 py-2 rounded-2xl shadow-sm"
                        style={{
                          backgroundColor:
                            message.sender === "me"
                              ? "var(--accent-indigo)"
                              : "var(--card)",
                          color:
                            message.sender === "me"
                              ? "white"
                              : "var(--text-primary)",
                          border: message.sender === "me" ? "none" : "1px solid var(--border)",
                          borderRadius: message.sender === "me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        }}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                      <div
                        className="flex items-center gap-1 mt-1 px-1"
                        style={{
                          justifyContent:
                            message.sender === "me" ? "flex-end" : "flex-start",
                        }}
                      >
                        <p
                          className="text-[10px]"
                          style={{ color: "var(--text-disabled)" }}
                        >
                          {message.timestamp}
                        </p>
                        {message.sender === "me" && message.status && (
                          <div className="flex items-center">
                            {message.status === "sent" && (
                              <Check className="w-3 h-3 text-gray-400" />
                            )}
                            {message.status === "delivered" && (
                              <CheckCheck className="w-3 h-3 text-gray-400" />
                            )}
                            {message.status === "read" && (
                              <CheckCheck className="w-3 h-3 text-blue-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}


                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                    <div
                      className="px-3 py-2 rounded-2xl flex gap-1"
                      style={{ 
                        backgroundColor: "var(--card)",
                        borderRadius: "16px 16px 16px 4px",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          backgroundColor: "var(--text-disabled)",
                          animationDelay: "0ms",
                        }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          backgroundColor: "var(--text-disabled)",
                          animationDelay: "150ms",
                        }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          backgroundColor: "var(--text-disabled)",
                          animationDelay: "300ms",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>


              {/* Message Input */}
              <div
                className="p-3 border-t"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card)",
                }}
                {...getRootProps()}
              >
                {isDragActive && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-20 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10">
                    <p className="text-blue-700 font-medium text-sm">Drop files here</p>
                  </div>
                )}
                {error && (
                  <div className="mb-2 p-2 bg-red-100 border border-red-300 rounded-lg text-red-700 text-xs">
                    {error}
                  </div>
                )}
                {attachments.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-full text-xs"
                      >
                        <Paperclip className="w-3 h-3" />
                        <span className="truncate max-w-[100px]">{file.name}</span>
                        <button
                          onClick={() =>
                            setAttachments((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="w-full px-3 py-2.5 pr-10 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent-indigo)] focus:border-[var(--accent-indigo)] text-sm"
                      style={{
                        backgroundColor: "var(--background)",
                        borderColor: "var(--border)",
                        color: "var(--text-primary)",
                      }}
                      aria-label="Type your message"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute bottom-full right-0 mb-2 z-20 max-h-64 overflow-y-auto">
                        <EmojiPicker
                          onEmojiClick={handleEmojiSelect}
                          height={300}
                          width={350}
                          searchDisabled={false}
                          skinTonesDisabled={false}
                          previewConfig={{
                            showPreview: false,
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <input
                    {...getInputProps()}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input">
                    <Button type="button" variant="outline" className="px-2.5 py-2.5">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </label>
                  <Button type="submit" className="px-4 py-2.5">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>

            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--section-bg)' }}
                >
                  <MessageSquare
                    className="w-10 h-10"
                    style={{ color: "var(--text-disabled)" }}
                  />
                </div>
                <p
                  style={{ color: "var(--text-secondary)" }}
                  className="text-base font-medium"
                >
                  Select a match to start chatting
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
