import LOADING_MESSAGES from "@/constants/LoadingMessages";
import randomInRange from "@/utils/randomInRange";
import DynamicTypingComponent from "./DynamicTypingComponent";
import Row from "./Row";

const LOADING_DELAY = 30;

export default function LoadingResponse() {
  const loadingContent =
    LOADING_MESSAGES[randomInRange(0, LOADING_MESSAGES.length - 1)];
  return (
    <Row>
      <DynamicTypingComponent
        intervalDuration={LOADING_DELAY}
        content={loadingContent}
      />
      <DynamicTypingComponent
        delay={loadingContent.length * LOADING_DELAY}
        intervalDuration={250}
        content="..."
        loop
      />
    </Row>
  );
}
