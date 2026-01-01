import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    // Page container (below navbar)
    <div className="fixed inset-x-0 top-16 bottom-0 bg-base-200 overflow-hidden">
      
      {/* App shell */}
      <div className="h-full w-full p-4">
        
        {/* Chat layout */}
        <div className="flex h-full w-full max-w-6xl mx-auto bg-base-100 rounded-lg shadow-xl overflow-hidden">
          
          {/* Sidebar */}
          <Sidebar />

          {/* Chat area */}
          <div className="flex-1 h-full flex flex-col overflow-hidden">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
