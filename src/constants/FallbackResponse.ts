import InferenceResponse from "@/types/InferenceResponse";

const FALLBACK_RESPONSE: InferenceResponse = {
  content: "No response received.",
  executionTimeMilliseconds: null,
};

export default FALLBACK_RESPONSE;
