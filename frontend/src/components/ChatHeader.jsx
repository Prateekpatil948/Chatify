import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="sticky top-0 z-20 border-b border-base-300 bg-base-100/80 backdrop-blur-xl px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/30"
            />
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-base-100 ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>

          {/* Info */}
          <div className="min-w-0">
            <h3 className="font-semibold text-sm truncate">
              {selectedUser.fullName}
            </h3>
            <p
              className={`text-xs ${
                isOnline ? "text-green-500" : "text-base-content/60"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-base-200 transition"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
