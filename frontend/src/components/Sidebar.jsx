import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const {
    getUsers,
    users = [],
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers = [] } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = useMemo(() => {
    if (!showOnlineOnly) return users;
    return users.filter((u) => onlineUsers.includes(u._id));
  }, [users, onlineUsers, showOnlineOnly]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="
        h-full
        w-16 sm:w-20 lg:w-80
        border-r border-base-300
        bg-base-100/80 backdrop-blur-xl
        flex flex-col
      "
    >
      {/* Header */}
      <div className="sticky top-0 z-10 px-2 sm:px-4 py-3 border-b border-base-300 bg-base-100/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span className="hidden lg:block font-semibold text-lg">
            Contacts
          </span>
        </div>

        {/* Filters (desktop only) */}
        <div className="hidden lg:flex items-center justify-between mt-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-xs">Online only</span>
          </label>

          <span className="text-xs text-zinc-500">
            {Math.max(onlineUsers.length - 1, 0)} online
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto py-1">
        {filteredUsers.length === 0 && (
          <p className="hidden lg:block text-center text-sm text-zinc-500 mt-6">
            No one is online
          </p>
        )}

        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full
                flex items-center
                gap-2 sm:gap-3
                px-2 sm:px-4
                py-2.5 sm:py-3
                transition-colors
                hover:bg-base-200
                ${
                  isSelected
                    ? "bg-base-200 border-l-4 border-primary"
                    : "border-l-4 border-transparent"
                }
              `}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="
                    h-9 w-9 sm:h-11 sm:w-11
                    rounded-full object-cover
                    ring-2 ring-primary/20
                  "
                />
                <span
                  className={`
                    absolute bottom-0 right-0
                    h-2.5 w-2.5 sm:h-3 sm:w-3
                    rounded-full
                    ring-2 ring-base-100
                    ${isOnline ? "bg-green-500" : "bg-gray-400"}
                  `}
                />
              </div>

              {/* User Info (hidden on mobile) */}
              <div className="hidden lg:flex flex-col min-w-0">
                <span className="font-medium truncate">
                  {user.fullName}
                </span>
                <span
                  className={`text-xs ${
                    isOnline
                      ? "text-green-500"
                      : "text-base-content/50"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
