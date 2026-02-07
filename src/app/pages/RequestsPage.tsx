import { useState, useEffect, useRef } from "react";
import { RequestCard } from "@/app/components/ui/request-card";
import { ConfirmModal } from "@/app/components/ui/ConfirmModal";
import { useToast } from "@/app/components/ui/Toast";
import { mockIncomingRequests, mockSentRequests } from "@/app/data/mockData";
import { Inbox, Send, ChevronDown } from "lucide-react";

type TabType = "incoming" | "sent";

export function RequestsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("incoming");
  const [incomingRequests, setIncomingRequests] = useState(mockIncomingRequests);
  const [sentRequests] = useState(mockSentRequests);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [requestToReject, setRequestToReject] = useState<string | null>(null);
  const { showToast } = useToast();

  // Infinite scroll states
  const [displayedIncoming, setDisplayedIncoming] = useState(6);
  const [displayedSent, setDisplayedSent] = useState(6);
  const [loadingMoreIncoming, setLoadingMoreIncoming] = useState(false);
  const [loadingMoreSent, setLoadingMoreSent] = useState(false);
  const loadMoreIncomingRef = useRef<HTMLDivElement>(null);
  const loadMoreSentRef = useRef<HTMLDivElement>(null);

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

  // Infinite scroll for incoming requests
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMoreIncoming && displayedIncoming < incomingRequests.length) {
          setLoadingMoreIncoming(true);
          setTimeout(() => {
            setDisplayedIncoming(prev => Math.min(prev + 6, incomingRequests.length));
            setLoadingMoreIncoming(false);
          }, 1000);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreIncomingRef.current) {
      observer.observe(loadMoreIncomingRef.current);
    }

    return () => observer.disconnect();
  }, [displayedIncoming, incomingRequests.length, loadingMoreIncoming]);

  // Infinite scroll for sent requests
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMoreSent && displayedSent < sentRequests.length) {
          setLoadingMoreSent(true);
          setTimeout(() => {
            setDisplayedSent(prev => Math.min(prev + 6, sentRequests.length));
            setLoadingMoreSent(false);
          }, 1000);
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreSentRef.current) {
      observer.observe(loadMoreSentRef.current);
    }

    return () => observer.disconnect();
  }, [displayedSent, sentRequests.length, loadingMoreSent]);

  // Reset displayed counts when tab changes
  useEffect(() => {
    setDisplayedIncoming(6);
    setDisplayedSent(6);
  }, [activeTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <h2 
          className="text-3xl md:text-4xl mb-3 tracking-tight"
          style={{ color: 'var(--text-primary)', fontWeight: 700 }}
        >
          Match Requests
        </h2>
        <p 
          className="text-base md:text-lg"
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
            <span className="text-sm">Incoming</span>
            {incomingRequests.length > 0 && (
              <span 
                className="px-2 py-0.5 rounded-full text-xs min-w-[20px] text-center font-semibold"
                style={{
                  backgroundColor: 'var(--accent-indigo)',
                  color: 'white',
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
            <span className="text-sm">Sent</span>
            {sentRequests.length > 0 && (
              <span 
                className="px-2 py-0.5 rounded-full text-xs min-w-[20px] text-center font-semibold"
                style={{
                  backgroundColor: 'var(--text-secondary)',
                  color: 'white',
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

      {/* Cards Grid - Consistent with Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {activeTab === "incoming" && (
          <>
            {incomingRequests.length > 0 ? (
              <>
                {incomingRequests.slice(0, displayedIncoming).map((request, index) => (
                  <div
                    key={request.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'backwards' }}
                  >
                    <RequestCard
                      user={request}
                      type="incoming"
                      onAccept={() => handleAccept(request.id)}
                      onReject={() => handleRejectClick(request.id)}
                    />
                  </div>
                ))}
                {displayedIncoming < incomingRequests.length && (
                  <div ref={loadMoreIncomingRef} className="col-span-full flex justify-center py-8">
                    {loadingMoreIncoming ? (
                      <div 
                        className="flex items-center gap-3 px-6 py-3 rounded-full"
                        style={{ backgroundColor: 'var(--section-bg)' }}
                      >
                        <div 
                          className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent"
                          style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
                        />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                          Loading more requests...
                        </span>
                      </div>
                    ) : (
                      <div 
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer transition-all hover:shadow-md"
                        style={{ 
                          backgroundColor: 'var(--card)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                        Scroll for more
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div
                className="col-span-full p-12 md:p-16 text-center rounded-2xl border"
                style={{ 
                  backgroundColor: 'var(--section-bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <Inbox className="w-10 h-10" style={{ color: 'var(--text-disabled)' }} />
                </div>
                <p
                  className="text-lg md:text-xl mb-2"
                  style={{ color: 'var(--text-primary)', fontWeight: 600 }}
                >
                  No incoming requests
                </p>
                <p
                  className="text-sm md:text-base max-w-md mx-auto"
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
              <>
                {sentRequests.slice(0, displayedSent).map((request, index) => (
                  <div
                    key={request.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                    style={{ animationDelay: `${index * 75}ms`, animationFillMode: 'backwards' }}
                  >
                    <RequestCard
                      user={request}
                      type="sent"
                    />
                  </div>
                ))}
                {displayedSent < sentRequests.length && (
                  <div ref={loadMoreSentRef} className="col-span-full flex justify-center py-8">
                    {loadingMoreSent ? (
                      <div 
                        className="flex items-center gap-3 px-6 py-3 rounded-full"
                        style={{ backgroundColor: 'var(--section-bg)' }}
                      >
                        <div 
                          className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent"
                          style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }}
                        />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                          Loading more requests...
                        </span>
                      </div>
                    ) : (
                      <div 
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm cursor-pointer transition-all hover:shadow-md"
                        style={{ 
                          backgroundColor: 'var(--card)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        <ChevronDown className="w-4 h-4 animate-bounce" />
                        Scroll for more
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div
                className="col-span-full p-12 md:p-16 text-center rounded-2xl border"
                style={{ 
                  backgroundColor: 'var(--section-bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <Send className="w-10 h-10" style={{ color: 'var(--text-disabled)' }} />
                </div>
                <p
                  className="text-lg md:text-xl mb-2"
                  style={{ color: 'var(--text-primary)', fontWeight: 600 }}
                >
                  No sent requests
                </p>
                <p
                  className="text-sm md:text-base max-w-md mx-auto"
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
