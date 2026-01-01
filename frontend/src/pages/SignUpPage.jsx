import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return toast.error("Enter a valid email");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Minimum 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  return (
    // ⬇️ SAME background as Login
    <div className="min-h-[calc(100vh-4rem)] relative bg-linear-to-br from-base-200 via-base-300 to-base-200 overflow-hidden">
      {/* SAME decorative blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* SAME glass panel */}
          <div className="rounded-3xl bg-base-100/90 backdrop-blur-lg border border-base-300 shadow-xl p-8">
            {/* Header */}
            <div className="mb-7 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold">Create your account</h1>
              <p className="mt-1 text-sm text-base-content/60">
                Join Chatify and start chatting
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 z-10 pointer-events-none" />
                  <input
                    type="text"
                    className="
                      input input-bordered w-full pl-10 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-primary/30
                    "
                    placeholder="Prateek Patil"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 z-10 pointer-events-none" />
                  <input
                    type="email"
                    className="
                      input input-bordered w-full pl-10 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-primary/30
                    "
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 z-10 pointer-events-none" />

                  <input
                    type={showPassword ? "text" : "password"}
                    className="
                      input input-bordered w-full pl-10 pr-10 rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-primary/30
                    "
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-base-300 flex justify-center">
              <Link
                to="/login"
                className="
                inline-flex items-center gap-2
                px-5 py-2
                rounded-full
                text-sm font-medium
                border border-primary/40
                text-primary
                hover:bg-primary/10
                transition
              "
              >
                Sign in
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
