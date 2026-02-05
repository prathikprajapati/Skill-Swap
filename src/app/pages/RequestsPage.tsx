import { useState } from "react";
import { RequestCard } from "@/app/components/ui/request-card";
import { ConfirmModal } from "@/app/components/ui/ConfirmModal";
import { useToast } from "@/app/components/ui/Toast";
import { mockIncomingRequests, mockSentRequests } from "@/app/data/mockData";
import { Inbox, Send, CheckCircle } from "lucide-react";

type TabType = "incoming" | "sent";

export function RequestsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("incoming");
  const [incomingRequests, setIncomingRequests] = useState(mockIncomingRequests);
  const [sentRequests] = useState(mockSentRequests);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [requestToReject, setRequestToReject] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleAccept = (id: string) => {
    const request = incomingRequests.find(r => r.id === id);
    setIncomingRequests(incomingRequests.filter((req) => req.id !== id));
    showToast("success", `Match accepted! You can now chat with ${request?.name} 🎉`);
  };

  const handleRejectClick = (id: string) => {
    setRequestToReject(id);
    setShowRejectConfirm(true);
  };

  const handleRejectConfirm = () => {
    if (requestToReject) {
      setIncomingRequests(incomingRequests.filter((req) => req.id !== requestToReject));
      showToast("info", "Request declined");
      setRequestToReject(null);
    }
    setShowRejectConfirm(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 
          className="text-[32px] mb-2"
          style={{ color: 'var(--text-primary)', fontWeight: 600 }}
        >
          Match Requests
        </h2>
        <p 
          className="text-[16px]"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
        >
          Review incoming requests and track your sent requests
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("incoming")}
            className="pb-4 px-4 relative transition-all duration-200 flex items-center gap-2 rounded-t-lg"
            style={{
              color: activeTab === "incoming" ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              fontWeight: activeTab === "incoming" ? 600 : 400,
              backgroundColor: activeTab === "incoming" ? 'var(--section-bg)' : 'transparent',
            }}
          >
            <Inbox className="w-4 h-4" />
            Incoming Requests
            {incomingRequests.length > 0 && (
              <span 
                className="px-2.5 py-0.5 rounded-full text-[12px] min-w-[24px] text-center"
                style={{
                  backgroundColor: 'var(--accent-indigo)',
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                {incomingRequests.length}
              </span>
            )}
            {activeTab === "incoming" && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5" 
                style={{ backgroundColor: 'var(--accent-indigo)' }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("sent")}
            className="pb-4 px-4 relative transition-all duration-200 flex items-center gap-2 rounded-t-lg"
            style={{
              color: activeTab === "sent" ? 'var(--accent-indigo)' : 'var(--text-secondary)',
              fontWeight: activeTab === "sent" ? 600 : 400,
              backgroundColor: activeTab === "sent" ? 'var(--section-bg)' : 'transparent',
            }}
          >
            <Send className="w-4 h-4" />
            Sent Requests
            {sentRequests.length > 0 && (
              <span 
                className="px-2.5 py-0.5 rounded-full text-[12px] min-w-[24px] text-center"
                style={{
                  backgroundColor: 'var(--text-secondary)',
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                {sentRequests.length}
              </span>
            )}
            {activeTab === "sent" && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5" 
                style={{ backgroundColor: 'var(--accent-indigo)' }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "incoming" && (
          <>
            {incomingRequests.length > 0 ? (
              incomingRequests.map((request, index) => (
                <div
                  key={request.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                >
                  <RequestCard
                    user={request}
                    type="incoming"
                    onAccept={() => handleAccept(request.id)}
                    onReject={() => handleRejectClick(request.id)}
                  />
                </div>
              ))
            ) : (
              <div 
                className="p-16 text-center rounded-xl"
                style={{ backgroundColor: 'var(--section-bg)' }}
              >
                <Inbox 
                  className="w-16 h-16 mx-auto mb-4 opacity-30" 
                  style={{ color: 'var(--text-secondary)' }} 
                />
                <p 
                  className="text-[18px] mb-2"
                  style={{ color: 'var(--text-primary)', fontWeight: 600 }}
                >
                  No incoming requests
                </p>
                <p 
                  className="text-[14px]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  When someone sends you a match request, it will appear here
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === "sent" && (
          <>
            {sentRequests.length > 0 ? (
              sentRequests.map((request, index) => (
                <div
                  key={request.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                >
                  <RequestCard
                    user={request}
                    type="sent"
                  />
                </div>
              ))
            ) : (
              <div 
                className="p-16 text-center rounded-xl"
                style={{ backgroundColor: 'var(--section-bg)' }}
              >
                <Send 
                  className="w-16 h-16 mx-auto mb-4 opacity-30" 
                  style={{ color: 'var(--text-secondary)' }} 
                />
                <p 
                  className="text-[18px] mb-2"
                  style={{ color: 'var(--text-primary)', fontWeight: 600 }}
                >
                  No sent requests
                </p>
                <p 
                  className="text-[14px]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Find matches on the dashboard and send them a request
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Reject Confirm Modal */}
      <ConfirmModal
        isOpen={showRejectConfirm}
        onClose={() => setShowRejectConfirm(false)}
        onConfirm={handleRejectConfirm}
        title="Decline Request"
        message="Are you sure you want to decline this request?"
      />
    </div>
  );
}