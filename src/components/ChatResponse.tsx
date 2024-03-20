import DynamicTypingComponent from "./DynamicTypingComponent";
import ChatType from "@/types/ChatType";
import ResponseLoading from "./ResponseLoading";

type ChatResponseProps = {
  chat: ChatType;
  loading: boolean;
  setIsTyping: (state: boolean) => void;
};

export default function ChatResponse({
  chat,
  setIsTyping,
  loading,
}: ChatResponseProps) {
  const { status, response } = chat;

  if (response == null && loading) {
    return <ResponseLoading />;
  }

  if (status === "failure") {
    return <p className="text-subtle">❌ Failed to generate response.</p>;
  }

  if (response?.content == null) {
    return <p className="text-subtle">No response received.</p>;
  }

  return (
    <DynamicTypingComponent
      isFinishedTyping={() => setIsTyping(false)}
      content={response.content}
    />
  );
}
