"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import inferenceApi from "@/backend/inferenceApi";
import Row from "@/components/Row";
import { Code2Icon, InfoIcon, MoonIcon, SunIcon } from "lucide-react";
import Col from "@/components/Col";
import { Tooltip } from "@/components/ui/Tooltip";
import { useTheme } from "next-themes";
import formatDate from "@/utils/formatDate";
import GITHUB_REPO_URL from "@/constants/GitHubRepoUrl";
import { cn } from "@/utils/utils";
import useToast from "@/hooks/useToast";
import formatMilliseconds from "@/utils/formatMilliseconds";
import FALLBACK_RESPONSE from "@/constants/FallbackResponse";
import ChatType from "@/types/ChatType";
import ChatResponse from "@/components/ChatResponse";
import Link from "@/components/Link";
import openLink from "@/utils/openLink";

export default function Home() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatType[]>([]);

  const isDarkTheme = theme === "dark";
  const disabled = loading || isTyping;
  const submitDisabled = disabled || apiKey === "";

  const handleToggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const handleSubmitInferenceRequest = async () => {
    if (submitDisabled) {
      return;
    }

    try {
      setLoading(true);
      setChatHistory((current) =>
        current.concat({
          prompt,
          status: null,
          timestamp: new Date(),
          response: null,
        })
      );
      setPrompt("");
      const inferenceResult = await inferenceApi(prompt, apiKey);
      if (inferenceResult == null) {
        toast({
          title: "❗ Failed to receive a response.",
        });
      }
      const response = inferenceResult ?? FALLBACK_RESPONSE;
      setChatHistory((current) => {
        const stateCopy = current.slice();
        const index = stateCopy.length - 1;
        stateCopy[index].status = "success";
        stateCopy[index].response = response;
        return stateCopy;
      });
    } catch (err) {
      setChatHistory((current) => {
        const stateCopy = current.slice();
        const index = stateCopy.length - 1;
        stateCopy[index].status = "failure";
        return stateCopy;
      });
      toast({
        title: "❗ Inference request failed or timed out out.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center flex-col p-8 pt-20 sm:p-24">
      <Row className="absolute gap-2 top-5 right-5">
        <Button onClick={() => openLink(GITHUB_REPO_URL)} variant="outline">
          <Code2Icon size={18} />
        </Button>
        <Button onClick={handleToggleTheme} variant="outline">
          {isDarkTheme ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </Button>
      </Row>
      <div className="w-full sm:w-[650px] flex flex-col gap-10">
        <Col>
          <h3 className="font-medium text-3xl">Kuzco Inference Client</h3>
          <p className="text-sm">
            <Link href="https://kuzco.xyz/">Kuzco</Link> is a distributed GPU
            cluster for LLM inference on{" "}
            <Link href="https://solana.com/">Solana</Link>.
          </p>
          <p className="text-sm">
            This is an <Link href={GITHUB_REPO_URL}>open source</Link> frontend
            built by a fan.
          </p>
        </Col>
        <Col className="gap-2">
          <Row className="gap-2">
            <p className="font-semibold">API Key</p>
            <Tooltip
              content={
                <div className="max-w-[350px]">
                  <p className="text-sm">
                    Your API key is required to pay for requests to the network
                    using <span className="font-semibold">$KZO</span> points
                    which you can currently earn by contributing your GPUs to
                    the network. Your API key is not stored anywhere. Feel free
                    to <Link href={GITHUB_REPO_URL}>view the code</Link> to
                    verify this.
                  </p>
                </div>
              }
            >
              <InfoIcon size={16} strokeWidth={2} />
            </Tooltip>
          </Row>
          <Row className="gap-2">
            <Input
              autoFocus
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Kuzco API key"
            />
          </Row>
          <p className="text-xs">
            Your <span className="font-semibold text-subtle">$KZO</span> points
            are required to pay for inference requests.
          </p>
        </Col>
        <Col className="gap-2">
          <p className="font-semibold">Inference</p>
          <Textarea
            disabled={disabled}
            className="h-32"
            placeholder="Compose a message to Mistral..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Row className="justify-end">
            <Tooltip
              disabled={apiKey !== ""}
              content={
                <div>
                  <p>Please enter an API key to submit a request.</p>
                </div>
              }
            >
              <Button
                className={cn(submitDisabled && "cursor-not-allowed")}
                variant="default"
                onClick={handleSubmitInferenceRequest}
              >
                Submit
              </Button>
            </Tooltip>
          </Row>
        </Col>
        <Col className="gap-2">
          {chatHistory.length > 0 && <p className="font-semibold">Messages</p>}
          {chatHistory
            .slice()
            .reverse()
            .map((chat) => {
              const { prompt, response, timestamp } = chat;
              const { executionTimeMilliseconds = null } = response ?? {};
              return (
                <Col
                  className="border-border border rounded-sm p-4 gap-4"
                  key={timestamp.toISOString()}
                >
                  <Col>
                    <Row className="justify-between">
                      <p className="font-bold">Human</p>
                      <p className="text-xs text-muted">
                        {formatDate(timestamp)}
                      </p>
                    </Row>
                    <p className="text-subtle">{prompt}</p>
                  </Col>
                  <Col>
                    <Row className="justify-between">
                      {response != null && <p className="font-bold">Mistral</p>}
                      {executionTimeMilliseconds != null && (
                        <p className="text-xs text-muted">
                          Computation time:{" "}
                          {formatMilliseconds(executionTimeMilliseconds)}{" "}
                          seconds
                        </p>
                      )}
                    </Row>
                    <ChatResponse
                      chat={chat}
                      loading={loading}
                      setIsTyping={setIsTyping}
                    />
                  </Col>
                </Col>
              );
            })}
        </Col>
      </div>
    </main>
  );
}
