import { useEffect, useMemo, useState } from "react";
import { Users, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false); // 🔥 Mobile drawer state

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  /* =========================
     SORT USERS
  ========================= */
  const sortedUsers = useMemo(() => {
    let list = [...users];

    if (showOnlineOnly) {
      list = list.filter((u) => onlineUsers.includes(u._id));
    }

    return list.sort((a, b) => {
      const aOnline = onlineUsers.includes(a._id);
      const bOnline = onlineUsers.includes(b._id);

      if (aOnline && !bOnline) return -1;
      if (!aOnline && bOnline) return 1;
      return 0;
    });
  }, [users, onlineUsers, showOnlineOnly]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      {/* ================= MOBILE TOGGLE BUTTON ================= */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-20 left-4 z-40 btn btn-circle btn-sm"
      >
        <Users className="h-4 w-4" />
      </button>

      {/* ================= MOBILE OVERLAY ================= */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-full w-72
          bg-base-100 border-r border-base-300
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-300 px-4 py-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-semibold">Chats</span>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden btn btn-ghost btn-sm btn-circle"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Online filter */}
        <div className="px-4 py-2 border-b border-base-300">
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <span>Online only</span>
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
          </label>
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto p-2">
          {sortedUsers.length === 0 ? (
            <p className="mt-6 text-center text-sm text-base-content/60">
              No users found
            </p>
          ) : (
            sortedUsers.map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isActive = selectedUser?._id === user._id;

              return (
                <button
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                    setIsOpen(false); // 🔥 close drawer on mobile
                  }}
                  className={`
                    flex w-full items-center gap-3 rounded-xl px-3 py-2
                    transition
                    ${isActive ? "bg-primary/10" : "hover:bg-base-200"}
                  `}
                >
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-base-100" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col items-start truncate">
                    <span className="truncate font-medium">
                      {user.fullName}
                    </span>
                    <span className="text-xs text-base-content/60">
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
