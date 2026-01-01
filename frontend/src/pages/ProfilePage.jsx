import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectImg, setSelectImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-base-200 via-base-300 to-base-200 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Main Card */}
        <div className="rounded-3xl bg-base-100/90 backdrop-blur-lg border border-base-300 shadow-xl p-6 space-y-8">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-1 text-sm text-base-content/60">
              Your profile information
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-base-300"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-1 right-1
                  bg-primary text-primary-content
                  p-2 rounded-full cursor-pointer
                  shadow-md transition
                  hover:scale-105
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-base-content/60 text-center">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Basic Info */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <User className="w-4 h-4 text-zinc-400" />
                <span>Full Name</span>
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300">
                {authUser?.fullName}
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <div className="text-sm text-base-content/60 flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>Email Address</span>
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-base-300">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="pt-6 border-t border-base-300">
            <h2 className="text-lg font-medium mb-4">
              Account Information
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-base-300">
                <span className="text-base-content/70">Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-base-content/70">Account Status</span>
                <span className="text-success font-medium">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
