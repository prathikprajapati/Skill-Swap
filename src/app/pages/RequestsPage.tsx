import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  Inbox, 
  Check, 
  X, 
  Clock, 
  UserPlus,
  MessageCircle
} from "lucide-react";

/* ── Mock Requests Data ── */
const INCOMING_REQUESTS = [
  {
    id: "1",
    user: {
      name: "Emma Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      bio: "Product designer wanting to learn React",
    },
    skillOffered: "UI/UX Design",
    skillWanted: "React Development",
    message: "Hi! I'd love to exchange my design skills for some React help. I've been struggling with state management.",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      bio: "Mobile developer interested in ML",
    },
    skillOffered: "React Native",
    skillWanted: "Python",
    message: "Hey! I see you're learning Python. I can teach you React Native in exchange!",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    user: {
      name: "Lisa Wang",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      bio: "Data scientist and Python enthusiast",
    },
    skillOffered: "Data Science",
    skillWanted: "Frontend Development",
    message: "I'd love to learn how to build beautiful UIs. Can we swap skills?",
    timestamp: "1 day ago",
  },
];

const SENT_REQUESTS = [
  {
    id: "4",
    user: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      bio: "Full-stack developer",
    },
    skillOffered: "React & TypeScript",
    skillWanted: "UI Design",
    status: "pending",
    timestamp: "3 days ago",
  },
  {
    id: "5",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      bio: "Backend developer learning design",
    },
    skillOffered: "Node.js",
    skillWanted: "Figma",
    status: "accepted",
    timestamp: "1 week ago",
  },
];

/* ── Request Card Component ── */
function RequestCard({ 
  request, 
  type,
  onAccept, 
  onReject 
}: { 
  request: any; 
  type: "incoming" | "sent";
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6"
    >
      <div className="flex gap-4">
        <Avatar className="w-14 h-14">
          <AvatarImage src={request.user.avatar} alt={request.user.name} />
          <AvatarFallback>
            {request.user.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{request.user.name}</h3>
              <p className="text-sm text-neutral-400">{request.user.bio}</p>
            </div>
            <span className="text-xs text-neutral-500">{request.timestamp}</span>
          </div>

          {/* Skill Exchange */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 bg-neutral-800/50 rounded-xl p-3 text-center">
              <p className="text-xs text-neutral-400 mb-1">They offer</p>
              <p className="text-sm font-medium text-white">{request.skillOffered}</p>
            </div>
            <div className="text-neutral-500">
              <UserPlus className="w-5 h-5" />
            </div>
            <div className="flex-1 bg-neutral-800/50 rounded-xl p-3 text-center">
              <p className="text-xs text-neutral-400 mb-1">You get</p>
              <p className="text-sm font-medium text-white">{request.skillWanted}</p>
            </div>
          </div>

          {/* Message */}
          {request.message && (
            <div className="mt-4 p-3 bg-neutral-800/30 rounded-xl">
              <p className="text-sm text-neutral-300">"{request.message}"</p>
            </div>
          )}

          {/* Actions */}
          {type === "incoming" ? (
            <div className="flex gap-3 mt-4">
              <Button 
                onClick={() => onAccept?.(request.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-4 h-4 mr-2" />
                Accept
              </Button>
              <Button 
                onClick={() => onReject?.(request.id)}
                variant="outline" 
                className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
            </div>
          ) : (
            <div className="mt-4">
              {request.status === "pending" ? (
                <div className="flex items-center gap-2 text-yellow-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Pending response</span>
                </div>
              ) : request.status === "accepted" ? (
                <div className="flex items-center gap-2 text-green-400">
                  <Check className="w-4 h-4" />
                  <span className="text-sm">Accepted - Start chatting!</span>
                  <Button size="sm" className="ml-2 bg-green-600 hover:bg-green-700">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Chat
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-400">
                  <X className="w-4 h-4" />
                  <span className="text-sm">Declined</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Requests Page ── */
export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState<"incoming" | "sent">("incoming");
  const [incoming, setIncoming] = useState(INCOMING_REQUESTS);
  const [sent, setSent] = useState(SENT_REQUESTS);

  const handleAccept = (id: string) => {
    setIncoming(prev => prev.filter(r => r.id !== id));
  };

  const handleReject = (id: string) => {
    setIncoming(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Requests</h1>
          <p className="text-neutral-400 mt-1">Manage your skill swap requests</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-neutral-800/50 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("incoming")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === "incoming"
                ? "bg-white text-neutral-900"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Inbox className="w-5 h-5" />
            <span className="font-medium">Incoming</span>
            {incoming.length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {incoming.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === "sent"
                ? "bg-white text-neutral-900"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Send className="w-5 h-5" />
            <span className="font-medium">Sent</span>
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {activeTab === "incoming" ? (
              incoming.length > 0 ? (
                incoming.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    type="incoming"
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Inbox className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                  <p className="text-neutral-400">No incoming requests</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Requests from other users will appear here
                  </p>
                </motion.div>
              )
            ) : (
              sent.length > 0 ? (
                sent.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    type="sent"
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Send className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                  <p className="text-neutral-400">No sent requests</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Start exploring to send skill swap requests!
                  </p>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

