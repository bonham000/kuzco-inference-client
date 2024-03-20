import MaybeNull from "./MaybeNull";

type InferenceResponse = {
  content: MaybeNull<string>;
  executionTimeMilliseconds: MaybeNull<number>;
};

export default InferenceResponse;
