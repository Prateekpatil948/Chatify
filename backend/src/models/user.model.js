import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    // 🔐 Password required ONLY for local auth
    password: {
      type: String,
      minlength: 6,
      required: function () {
        return this.authProvider === "local";
      },
    },

    // 🔑 Auth provider
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // 🔑 Google account ID
    googleId: {
      type: String,
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
