import InferenceResponse from "./InferenceResponse";
import MaybeNull from "./MaybeNull";

type ResponseStatus = "success" | "failure";

type ChatType = {
  timestamp: Date;
  prompt: string;
  status: MaybeNull<ResponseStatus>;
  response: MaybeNull<InferenceResponse>;
};

export default ChatType;
