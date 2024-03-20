import MaybeNull from "@/types/MaybeNull";
import { useState, useCallback, useEffect } from "react";

type DynamicTypingComponentProps = {
  content: string;
  loop?: boolean;
  intervalDuration?: number;
  delay?: number;
  isFinishedTyping?: () => void;
};

export default function DynamicTypingComponent({
  intervalDuration = 3,
  loop = false,
  content,
  isFinishedTyping,
  delay = 0,
}: DynamicTypingComponentProps) {
  const [hasCompletedTyping, setHasCompletedTyping] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [intervalInstance, setIntervalInstance] =
    useState<MaybeNull<NodeJS.Timeout>>(null);

  const startTyping = useCallback(() => {
    if (intervalInstance == null && !hasCompletedTyping) {
      const interval = setInterval(() => {
        setVisibleIndex((cur) => {
          if (cur === content.length) {
            if (isFinishedTyping != null) {
              isFinishedTyping();
              setHasCompletedTyping(true);
            }
            return loop ? 0 : cur;
          } else {
            return cur + 1;
          }
        });
      }, intervalDuration);
      setIntervalInstance(interval);
    }
    return () => {
      if (intervalInstance != null) {
        clearInterval(intervalInstance);
      }
    };
  }, [
    content.length,
    hasCompletedTyping,
    intervalDuration,
    intervalInstance,
    isFinishedTyping,
    loop,
    setVisibleIndex,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => startTyping(), delay);
    return () => clearTimeout(timer);
  }, [delay, startTyping]);

  const visibleContent = content.slice(0, visibleIndex);
  return <p className="text-base text-subtle">{visibleContent}</p>;
}
