"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import GlassFolder from "@/app/components/GlassFolder";
import { X, Check, Clock, Archive } from "lucide-react";
import { mockIncomingRequests, mockSentRequests } from "@/app/data/mockData";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useToast } from "@/app/components/ui/Toast";

type FolderType = "received" | "sent" | "logs" | null;

// Mock logs - would come from backend in real app
const mockLogs = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1581065178026-390bc4e78dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDAzODM3MHww&ixlib=rb-4.1.0&q=80&w=400",
    action: "Accepted",
    date: "2 days ago",
    status: "success" as const,
  },
  {
    id: "2",
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1656313826909-1f89d1702a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcwMDE4MDQ4fDA&ixlib=rb-4.1.0&q=80&w=400",
    action: "Declined",
    date: "5 days ago",
    status: "error" as const,
  },
  {
    id: "3",
    name: "Rohan Gupta",
    avatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDA3MzA5MXww&ixlib=rb-4.1.0&q=80&w=400",
    action: "Expired",
    date: "1 week ago",
    status: "warning" as const,
  },
];

export function RequestsPage() {
  const [selectedFolder, setSelectedFolder] = useState<FolderType>(null);
  const [incomingRequests, setIncomingRequests] = useState(mockIncomingRequests);
  const { showToast } = useToast();

  const handleAccept = (id: string) => {
    const req = incomingRequests.find((r) => r.id === id);
    setIncomingRequests(incomingRequests.filter((req) => req.id !== id));
    showToast("success", `Match accepted! You can now chat with ${req?.name} 🎉`);
  };

  const handleReject = (id: string) => {
    setIncomingRequests(incomingRequests.filter((req) => req.id !== id));
    showToast("info", "Request declined");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center pb-20">
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[42px] text-center mb-16"
          style={{ color: "var(--ivory)", fontWeight: 700 }}
        >
          Manage Requests
        </motion.h2>

        <div className="grid grid-cols-3 gap-16 justify-items-center">
          {/* Received Folder */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            onClick={() => setSelectedFolder("received")}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Received requests folder - ${incomingRequests.length} requests`}
          >
            <GlassFolder icon={<span className="text-5xl">📥</span>} />
            <p
              className="text-center mt-4 text-[18px]"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Received ({incomingRequests.length})
            </p>
          </motion.div>

          {/* Sent Folder */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setSelectedFolder("sent")}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Sent requests folder - ${mockSentRequests.length} requests`}
          >
            <GlassFolder icon={<span className="text-5xl">📤</span>} />
            <p
              className="text-center mt-4 text-[18px]"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              Sent ({mockSentRequests.length})
            </p>
          </motion.div>

          {/* Logs Folder */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setSelectedFolder("logs")}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`Request history folder - ${mockLogs.length} records`}
          >
            <GlassFolder icon={<span className="text-5xl">📋</span>} />
            <p
              className="text-center mt-4 text-[18px]"
              style={{ color: "var(--text-primary)", fontWeight: 600 }}
            >
              History ({mockLogs.length})
            </p>
          </motion.div>
        </div>
      </div>

      {/* Slide-in Modal from Left with Stitches */}
      <AnimatePresence>
        {selectedFolder && (
          <>
            {/* Blur Veil */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 backdrop-blur-md"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
              onClick={() => setSelectedFolder(null)}
            />

            {/* Modal with Stitches */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[500px] z-50 overflow-hidden"
              style={{
                backgroundColor: "var(--card)",
                borderRight: "4px solid var(--primary)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Stitches Effect */}
              <div className="absolute right-0 top-0 bottom-0 w-[20px] flex flex-col justify-around items-center py-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 0 10px var(--primary)",
                    }}
                  />
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedFolder(null)}
                className="absolute top-6 right-8 p-2 rounded-full transition-all hover:scale-110 z-10"
                aria-label="Close requests panel"
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--text-primary)",
                }}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Content */}
              <div className="h-full overflow-y-auto p-8 pr-12">
                <h3
                  className="text-[28px] mb-6"
                  style={{ color: "var(--text-primary)", fontWeight: 700 }}
                >
                  {selectedFolder === "received" && "Received Requests"}
                  {selectedFolder === "sent" && "Sent Requests"}
                  {selectedFolder === "logs" && "Request History"}
                </h3>

                <div className="space-y-4">
                  {/* Received Requests */}
                  {selectedFolder === "received" &&
                    (incomingRequests.length > 0 ? (
                      incomingRequests.map((request, index) => (
                        <motion.div
                          key={request.id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-xl border-2"
                          style={{
                            backgroundColor: "var(--section-bg)",
                            borderColor: "var(--border)",
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={request.avatar}
                                alt={request.name}
                                className="w-full h-full object-cover"
                                width={64}
                                height={64}
                              />
                            </div>
                            <div className="flex-1">
                              <h4
                                className="text-[18px] mb-1"
                                style={{ color: "var(--text-primary)", fontWeight: 600 }}
                              >
                                {request.name}
                              </h4>
                              <p
                                className="text-[12px] mb-3"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                Can teach: {request.offeredSkills.join(", ")}
                              </p>
                              <p
                                className="text-[12px] mb-4"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                Wants: {request.wantedSkills.join(", ")}
                              </p>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleAccept(request.id)}
                                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                                  aria-label={`Accept request from ${request.name}`}
                                  style={{
                                    backgroundColor: "var(--primary)",
                                    color: "var(--background)",
                                  }}
                                >
                                  <Check className="w-4 h-4 inline mr-2" />
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleReject(request.id)}
                                  className="flex-1 px-4 py-2 rounded-lg font-medium border-2 transition-all hover:scale-105"
                                  aria-label={`Decline request from ${request.name}`}
                                  style={{
                                    borderColor: "var(--destructive)",
                                    color: "var(--destructive)",
                                  }}
                                >
                                  <X className="w-4 h-4 inline mr-2" />
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p style={{ color: "var(--text-secondary)" }}>No received requests</p>
                      </div>
                    ))}

                  {/* Sent Requests */}
                  {selectedFolder === "sent" &&
                    (mockSentRequests.length > 0 ? (
                      mockSentRequests.map((request, index) => (
                        <motion.div
                          key={request.id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-xl border-2"
                          style={{
                            backgroundColor: "var(--section-bg)",
                            borderColor: "var(--border)",
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={request.avatar}
                                alt={request.name}
                                className="w-full h-full object-cover"
                                width={64}
                                height={64}
                              />
                            </div>
                            <div className="flex-1">
                              <h4
                                className="text-[18px] mb-1"
                                style={{ color: "var(--text-primary)", fontWeight: 600 }}
                              >
                                {request.name}
                              </h4>
                              <p
                                className="text-[12px] mb-3"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                Can teach: {request.offeredSkills.join(", ")}
                              </p>
                              <div className="flex items-center gap-2 mt-3">
                                <Clock className="w-4 h-4" style={{ color: "var(--warning)" }} />
                                <span
                                  className="text-[12px]"
                                  style={{ color: "var(--warning)" }}
                                >
                                  Pending...
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p style={{ color: "var(--text-secondary)" }}>No sent requests</p>
                      </div>
                    ))}

                  {/* History/Logs */}
                  {selectedFolder === "logs" &&
                    mockLogs.map((log, index) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl border-2"
                        style={{
                          backgroundColor: "var(--section-bg)",
                          borderColor: "var(--border)",
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={log.avatar}
                              alt={log.name}
                              className="w-full h-full object-cover"
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="flex-1">
                            <h4
                              className="text-[16px] mb-1"
                              style={{ color: "var(--text-primary)", fontWeight: 600 }}
                            >
                              {log.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[12px] px-3 py-1 rounded-full"
                                style={{
                                  backgroundColor:
                                    log.status === "success"
                                      ? "var(--success)"
                                      : log.status === "error"
                                      ? "var(--destructive)"
                                      : "var(--warning)",
                                  color: "white",
                                }}
                              >
                                {log.action}
                              </span>
                              <span
                                className="text-[12px]"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {log.date}
                              </span>
                            </div>
                          </div>
                          <Archive className="w-5 h-5" style={{ color: "var(--text-disabled)" }} />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
