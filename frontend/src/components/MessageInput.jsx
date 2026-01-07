import { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [isSendingImage, setIsSendingImage] = useState(false); // ✅ New state for image sending
  const fileRef = useRef(null);

  const { sendMessage, selectedUser, isSending } = useChatStore();

  // ✅ Convert File → Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !image) return;
    if (!selectedUser?._id) return;

    let imageBase64 = null;

    // 🔥 Handle image processing
    if (image) {
      setIsSendingImage(true); // ✅ Start image loader
      try {
        imageBase64 = await fileToBase64(image);
      } catch (error) {
        console.error("Failed to convert image:", error);
        setIsSendingImage(false);
        return;
      }
    }

    try {
      await sendMessage({
        receiverId: selectedUser._id,
        text: text.trim(),
        image: imageBase64, // ✅ Base64 STRING
      });
    } finally {
      // ✅ Reset states
      setText("");
      setImage(null);
      setIsSendingImage(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="sticky bottom-0 bg-base-100 border-t border-base-300 px-2 py-2">
      {/* Image preview */}
      {image && (
        <div className="mb-2 px-2">
          <div className="relative inline-block">
            {/* Image preview with loader overlay */}
            <div className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className={`h-24 w-auto rounded-xl border border-base-300 ${
                  isSendingImage ? "opacity-60" : ""
                }`}
              />

              {/* ⏳ Image sending loader overlay */}
              {isSendingImage && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                  <div className="flex flex-col items-center gap-1">
                    <span className="loading loading-spinner loading-sm text-white"></span>
                    <span className="text-white text-xs">Sending...</span>
                  </div>
                </div>
              )}

              {/* ⏳ General message sending loader (when image is already processed) */}
              {!isSendingImage && isSending && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                  <div className="flex flex-col items-center gap-1">
                    <span className="loading loading-spinner loading-sm text-white"></span>
                    <span className="text-white text-xs">Sending...</span>
                  </div>
                </div>
              )}
            </div>

            {/* ❌ Remove image button (disabled while sending) */}
            {!isSendingImage && !isSending && (
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-error text-white text-xs flex items-center justify-center hover:bg-error/90 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Image upload button - disabled while sending */}
        <label
          className={`shrink-0 p-2 rounded-full transition cursor-pointer ${
            isSendingImage || isSending
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-base-200 active:scale-95"
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
            disabled={isSendingImage || isSending}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-base-content"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828a4 4 0 00-5.656-5.656L6.343 10.172a6 6 0 108.485 8.485"
            />
          </svg>
        </label>

        {/* Text input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            isSendingImage
              ? "Converting image..."
              : isSending
              ? "Sending..."
              : "Message..."
          }
          disabled={isSendingImage || isSending}
          className="flex-1 min-w-0 rounded-full bg-base-200 px-4 py-2 text-sm focus:outline-none disabled:opacity-60"
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={(!text.trim() && !image) || isSendingImage || isSending}
          className={`shrink-0 p-2 rounded-full transition ${
            isSendingImage || isSending
              ? "bg-primary/50 cursor-not-allowed"
              : "bg-primary text-primary-content hover:bg-primary/90 active:scale-95"
          }`}
        >
          {isSendingImage || isSending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M22 2L11 13"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M22 2L15 22L11 13L2 9L22 2Z"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
