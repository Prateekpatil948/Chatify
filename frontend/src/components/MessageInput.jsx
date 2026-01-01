import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      removeImage();
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="sticky bottom-0 w-full z-20">
      {/* Image Preview */}
      {imagePreview && (
        <div className="px-4 pt-3 bg-base-100/80 backdrop-blur-xl">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border border-zinc-300"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-300 flex items-center justify-center hover:bg-base-200 transition"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 border-t border-base-300 bg-base-100/80 backdrop-blur-xl px-3 py-2"
      >
        {/* Text + Image */}
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            className="
            w-full input input-bordered rounded-xl
            input-sm sm:input-md
            focus:outline-none focus:ring-2 focus:ring-primary/40
          "
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`
            hidden sm:flex btn btn-circle btn-ghost transition
            ${
              imagePreview
                ? "text-emerald-500 ring-2 ring-emerald-500/30"
                : "text-base-content/50"
            }
          `}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="
          btn btn-sm btn-circle
          bg-primary text-primary-content
          hover:bg-primary/90
          disabled:opacity-40 disabled:cursor-not-allowed
          transition
        "
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
