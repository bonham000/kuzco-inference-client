"use server";

import DEBUG_INFERENCE_RESPONSE from "@/constants/DebugInferenceResponse";
import KUZCO_API_URL from "@/constants/KuzcoApiUrl";
import InferenceResponse from "@/types/InferenceResponse";
import MaybeNull from "@/types/MaybeNull";
import dayjs from "@/utils/dayjs";
import getDiffMilliseconds from "@/utils/getDiffMilliseconds";
import sleep from "@/utils/sleep";
import axios from "axios";

const DEBUG = false;

const DEFAULT_TIMEOUT = 5 * 60 * 1000;

async function handleInferenceRequest(
  userInput: string,
  apiKey: string
): Promise<string | null> {
  try {
    const messages = [{ content: userInput + "\n", role: "user" }];
    const response = await axios.post(
      `${KUZCO_API_URL}/chat/completions`,
      {
        messages,
        model: "llama3",
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: DEFAULT_TIMEOUT,
      }
    );

    if (response.data?.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    }
  } catch (error) {
    console.error("Request to Kuzco Inference API failed with error:", error);
  }

  return null;
}

export default async function inferenceApi(
  prompt: string,
  apiKey: string
): Promise<MaybeNull<InferenceResponse>> {
  const start = dayjs();
  if (DEBUG) {
    await sleep(5_000);
    const end = dayjs();
    return {
      content: DEBUG_INFERENCE_RESPONSE,
      executionTimeMilliseconds: getDiffMilliseconds(start, end),
    };
  }

  const content = await handleInferenceRequest(prompt, apiKey);
  const end = dayjs();
  return {
    content,
    executionTimeMilliseconds: getDiffMilliseconds(start, end),
  };
}
