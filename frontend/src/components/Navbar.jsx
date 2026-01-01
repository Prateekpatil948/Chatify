import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-base-300 bg-base-100/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 transition hover:opacity-90"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition">
              <img
                src="/MyLogo1.png"
                alt="Chatify Logo"
                className="h-6 w-6 object-contain"
              />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Chatify
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Settings */}
            <Link
              to="/settings"
              className="btn btn-sm btn-ghost rounded-lg px-3 hover:bg-base-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4 text-zinc-400" />
              <span className="hidden sm:inline ml-2">Settings</span>
            </Link>

            {authUser && (
              <>
                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-base-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-primary/20">
                    <img
                      src={authUser.profilePic || "/avatar.png"}
                      alt={authUser.fullName || "Profile"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="hidden md:inline text-sm font-medium truncate max-w-30">
                    {authUser.fullName}
                  </span>
                </Link>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="btn btn-sm rounded-lg px-3 border border-error/30 bg-error/10 text-error hover:bg-error hover:text-error-content transition focus:outline-none focus-visible:ring-2 focus-visible:ring-error/40"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
