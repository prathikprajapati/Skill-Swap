import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Send, 
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  ArrowLeft
} from "lucide-react";

/* ── Mock Conversations Data ── */
const CONVERSATIONS = [
  {
    id: "1",
    user: {
      name: "Emma Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      lastMessage: "Sure! Let's schedule a call tomorrow",
      isOnline: true,
    },
    unread: 2,
    lastActive: "2 min ago",
  },
  {
    id: "2",
    user: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      lastMessage: "Thanks for the React tips!",
      isOnline: false,
    },
    unread: 0,
    lastActive: "1 hour ago",
  },
  {
    id: "3",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      lastMessage: "The design looks amazing! 🔥",
      isOnline: true,
    },
    unread: 0,
    lastActive: "3 hours ago",
  },
  {
    id: "4",
    user: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      lastMessage: "Can you help me with TypeScript?",
      isOnline: false,
    },
    unread: 1,
    lastActive: "1 day ago",
  },
];

/* ── Mock Messages Data ── */
const MOCK_MESSAGES = [
  { id: "1", senderId: "other", text: "Hey! How's your React learning going?", timestamp: "10:30 AM", status: "read" },
  { id: "2", senderId: "me", text: "Going great! Just finished the hooks chapter", timestamp: "10:32 AM", status: "read" },
  { id: "3", senderId: "other", text: "Awesome! Have you tried building any small projects?", timestamp: "10:33 AM", status: "read" },
  { id: "4", senderId: "me", text: "Yes! I'm working on a todo app right now", timestamp: "10:35 AM", status: "read" },
  { id: "5", senderId: "me", text: "Would love to get your feedback on it soon", timestamp: "10:35 AM", status: "delivered" },
  { id: "6", senderId: "other", text: "Definitely! Share it whenever you're ready", timestamp: "10:40 AM", status: "read" },
  { id: "7", senderId: "other", text: "Sure! Let's schedule a call tomorrow", timestamp: "10:45 AM", status: "read" },
];

/* ── Message Component ── */
function Message({ message, isOwn }: { message: typeof MOCK_MESSAGES[0]; isOwn: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
          isOwn 
            ? 'bg-white text-neutral-900 rounded-br-md' 
            : 'bg-neutral-800 text-white rounded-bl-md'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : ''}`}>
          <span className={`text-xs ${isOwn ? 'text-neutral-500' : 'text-neutral-400'}`}>
            {message.timestamp}
          </span>
          {isOwn && (
            message.status === 'read' ? (
              <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
            ) : (
              <Check className="w-3.5 h-3.5 text-neutral-400" />
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Conversation Item Component ── */
function ConversationItem({ 
  conversation, 
  isActive,
  onClick 
}: { 
  conversation: typeof CONVERSATIONS[0]; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
        isActive ? 'bg-neutral-800' : 'hover:bg-neutral-800/50'
      }`}
    >
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
          <AvatarFallback>
            {conversation.user.name.split(" ").map((n: string) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        {conversation.user.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-neutral-900 rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white truncate">{conversation.user.name}</h3>
          <span className="text-xs text-neutral-500">{conversation.lastActive}</span>
        </div>
        <p className="text-sm text-neutral-400 truncate">{conversation.user.lastMessage}</p>
      </div>
      {conversation.unread > 0 && (
        <span className="w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {conversation.unread}
        </span>
      )}
    </button>
  );
}

/* ── Main Chat Page ── */
export default function ChatPage() {
  const [selectedId, setSelectedId] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = CONVERSATIONS.find(c => c.id === selectedId);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: String(messages.length + 1),
      senderId: "me",
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent" as const,
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="h-[calc(100vh-100px)] flex rounded-2xl overflow-hidden bg-neutral-900/50 border border-neutral-800">
      {/* Left Sidebar - Conversations List */}
      <div className={`${selectedId ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-neutral-800`}>
        {/* Header */}
        <div className="p-4 border-b border-neutral-800">
          <h1 className="text-xl font-bold text-white mb-3">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {CONVERSATIONS.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={selectedId === conversation.id}
              onClick={() => setSelectedId(conversation.id)}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className={`${!selectedId ? 'hidden md:flex' : 'flex'} flex-1 flex-col`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="md:hidden p-2 hover:bg-neutral-800 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                  <AvatarFallback>
                    {selectedConversation.user.name.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-white">{selectedConversation.user.name}</h3>
                  <p className="text-xs text-green-400">
                    {selectedConversation.user.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-neutral-400" />
                </button>
                <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-neutral-400" />
                </button>
                <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <Message 
                  key={message.id} 
                  message={message} 
                  isOwn={message.senderId === "me"} 
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-neutral-800">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-neutral-400" />
                </button>
                <button className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                  <Smile className="w-5 h-5 text-neutral-400" />
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl px-4"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-neutral-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Select a conversation</h3>
              <p className="text-neutral-400">Choose a conversation from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

