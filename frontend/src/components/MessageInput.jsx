import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { Smile, Paperclip, SendHorizonal } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [isSendingImage, setIsSendingImage] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const fileRef = useRef(null);
  const { sendMessage, selectedUser, isSending } = useChatStore();

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;
    if (!selectedUser?._id) return;

    let imageBase64 = null;

    if (image) {
      setIsSendingImage(true);
      imageBase64 = await fileToBase64(image);
    }

    try {
      await sendMessage({
        receiverId: selectedUser._id,
        text: text.trim(),
        image: imageBase64,
      });
    } finally {
      setText("");
      setImage(null);
      setIsSendingImage(false);
      setShowEmojiPicker(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="bottom-0 bg-base-100/80 backdrop-blur-xl border-t border-base-300 px-4 py-3 relative">

      {/* 😀 Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-4 z-9999 shadow-2xl rounded-xl overflow-hidden">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="auto"
            previewPosition="none"
          />
        </div>
      )}

      {/* 🖼 Image Preview */}
      {image && (
        <div className="mb-3">
          <div className="relative inline-block">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className={`h-24 rounded-2xl border shadow-md ${
                isSendingImage ? "opacity-60" : ""
              }`}
            />

            {(isSendingImage || isSending) && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
                <span className="loading loading-spinner loading-sm text-white"></span>
              </div>
            )}

            {!isSendingImage && !isSending && (
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-error text-white text-xs flex items-center justify-center shadow"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* 💬 Stylish Message Box */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 bg-base-200/90 backdrop-blur rounded-full px-4 py-3 shadow-md">

          {/* Emoji Button */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker((p) => !p)}
            disabled={isSendingImage || isSending}
            className="text-base-content/70 hover:text-base-content hover:scale-110 transition disabled:opacity-50"
          >
            <Smile size={20} />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              isSendingImage
                ? "Converting image..."
                : isSending
                ? "Sending..."
                : "Type a message…"
            }
            disabled={isSendingImage || isSending}
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-base-content/50"
          />

          {/* File Upload */}
          <label className="cursor-pointer text-base-content/70 hover:text-base-content hover:scale-110 transition">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
              disabled={isSendingImage || isSending}
            />
            <Paperclip size={20} />
          </label>

          {/* Send Button */}
          <button
            type="submit"
            disabled={(!text.trim() && !image) || isSendingImage || isSending}
            className={`h-10 w-10 flex items-center justify-center rounded-full shadow transition-all ${
              isSendingImage || isSending
                ? "bg-primary/40 cursor-not-allowed"
                : "bg-linear-to-br from-primary to-secondary text-white hover:scale-105"
            }`}
          >
            {isSendingImage || isSending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <SendHorizonal size={18} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
