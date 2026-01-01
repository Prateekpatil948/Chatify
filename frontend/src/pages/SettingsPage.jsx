import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-linear-to-br from-base-200 via-base-300 to-base-200">
      <div className="max-w-5xl mx-auto px-4 pt-20 space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-base-content/60">
            Customize how your chat application looks
          </p>
        </div>

        {/* Theme Selector */}
        <div className="rounded-3xl bg-base-100/90 backdrop-blur-lg border border-base-300 shadow-xl p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-base-content/60">
              Choose a theme for your chat interface
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`
                  rounded-xl p-2 border transition-all
                  ${
                    theme === t
                      ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                      : "border-base-300 hover:bg-base-200"
                  }
                `}
              >
                <div
                  className="h-8 w-full rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="grid grid-cols-4 gap-px p-1 h-full">
                    <div className="bg-primary rounded" />
                    <div className="bg-secondary rounded" />
                    <div className="bg-accent rounded" />
                    <div className="bg-neutral rounded" />
                  </div>
                </div>
                <p className="mt-1 text-[11px] font-medium text-center truncate">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-3xl bg-base-100/90 backdrop-blur-lg border border-base-300 shadow-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>

          <div className="max-w-md mx-auto rounded-2xl border border-base-300 overflow-hidden bg-base-100">
            
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold">
                J
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-base-content/60">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-4 bg-base-200 min-h-50">
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-[75%] rounded-2xl px-4 py-2 text-sm
                      ${
                        message.isSent
                          ? "bg-primary text-primary-content"
                          : "bg-base-100"
                      }
                    `}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`
                        text-[10px] mt-1 text-right
                        ${
                          message.isSent
                            ? "text-primary-content/70"
                            : "text-base-content/60"
                        }
                      `}
                    >
                      12:00 PM
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-base-100">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1 h-10 text-sm"
                  value="This is a preview"
                  readOnly
                />
                <button className="btn btn-primary h-10 min-h-0">
                  <Send size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
