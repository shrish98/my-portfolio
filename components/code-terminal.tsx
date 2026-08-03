"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check, Play, Cpu, Zap, Layers } from "lucide-react";

type CodeTab = {
  id: string;
  name: string;
  icon: typeof Cpu;
  language: string;
  description: string;
  code: Array<{ line: number; content: string; type?: "keyword" | "string" | "comment" | "function" | "plain" }>;
  logs: string[];
};

const tabs: CodeTab[] = [
  {
    id: "agent",
    name: "agent.ts",
    icon: Cpu,
    language: "TypeScript",
    description: "LangGraph Agentic Workflow & Gemini AI",
    code: [
      { line: 1, content: "// Initialize Agentic Workflow with LangGraph", type: "comment" },
      { line: 2, content: "import { StateGraph, END } from '@langchain/langgraph';", type: "keyword" },
      { line: 3, content: "import { GoogleGemini } from '@langchain/google-genai';", type: "keyword" },
      { line: 4, content: "", type: "plain" },
      { line: 5, content: "const agent = new StateGraph({ channels: stateSchema });", type: "plain" },
      { line: 6, content: "agent.addNode('reasoner', async (state) => {", type: "function" },
      { line: 7, content: "  const plan = await gemini.analyzeCodebase(state.query);", type: "string" },
      { line: 8, content: "  return { nextStep: plan.action, context: plan.ragDocs };", type: "plain" },
      { line: 9, content: "});", type: "plain" },
      { line: 10, content: "agent.addEdge('reasoner', END);", type: "function" },
    ],
    logs: ["✔ LangGraph agent initialized", "✔ Gemini 2.0 Flash connected", "✔ Vector store linked (MongoDB)"],
  },
  {
    id: "taskforge",
    name: "taskforge.ts",
    icon: Zap,
    language: "TypeScript",
    description: "Distributed Queue & Worker Execution",
    code: [
      { line: 1, content: "// BullMQ Async Distributed Queue Worker", type: "comment" },
      { line: 2, content: "import { Queue, Worker } from 'bullmq';", type: "keyword" },
      { line: 3, content: "import { redisConnection } from './config/redis';", type: "keyword" },
      { line: 4, content: "", type: "plain" },
      { line: 5, content: "export const taskQueue = new Queue('TaskForge', { connection });", type: "plain" },
      { line: 6, content: "const worker = new Worker('TaskForge', async (job) => {", type: "function" },
      { line: 7, content: "  console.log(`Processing Job #${job.id}: ${job.name}`);", type: "string" },
      { line: 8, content: "  await processTelemetryData(job.data);", type: "plain" },
      { line: 9, content: "}, { concurrency: 5, connection });", type: "plain" },
      { line: 10, content: "worker.on('completed', (job) => io.emit('task:done', job.id));", type: "function" },
    ],
    logs: ["✔ BullMQ Redis pool listening on port 6379", "✔ 5 Concurrent workers ready", "✔ Sockets broadcasting telemetry"],
  },
  {
    id: "reposight",
    name: "reposight.ts",
    icon: Layers,
    language: "TypeScript",
    description: "Repo Vector Indexing & Hybrid Search",
    code: [
      { line: 1, content: "// Repository Vector Search & AST Parsing", type: "comment" },
      { line: 2, content: "import { VectorStore } from '@reposight/vector';", type: "keyword" },
      { line: 3, content: "import { cloneAndParseRepo } from './utils/git';", type: "keyword" },
      { line: 4, content: "", type: "plain" },
      { line: 5, content: "export async function queryRepo(repoUrl: string, prompt: string) {", type: "function" },
      { line: 6, content: "  const AST = await cloneAndParseRepo(repoUrl);", type: "plain" },
      { line: 7, content: "  const matches = await vectorStore.similaritySearch(prompt, 5);", type: "string" },
      { line: 8, content: "  return generateContextualAnswer(matches, prompt);", type: "plain" },
      { line: 9, content: "}", type: "plain" },
    ],
    logs: ["✔ Git AST parser ready", "✔ Cosine similarity threshold: 0.88", "✔ Response generated in 14ms"],
  },
];

export function CodeTerminal() {
  const [activeTab, setActiveTab] = useState<string>("agent");
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleCopy = () => {
    const textToCopy = currentTab.code.map((c) => c.content).join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 1200);
  };

  return (
    <div className="plate-ticks relative w-full max-w-lg mx-auto glass-dark border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
      {/* Top macOS Control Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1d] border-b border-white/10 select-none">
        {/* Buttons */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Title */}
        <div className="flex items-center gap-1.5 text-foreground/40 text-[11px]">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>shrishti@dev:~/{currentTab.name}</span>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-foreground/60 hover:text-white transition-all cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span className="text-[10px]">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center bg-[#070b14] border-b border-white/5 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-r border-white/5 transition-all text-[11px] cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#0d1425] text-indigo-300 border-b-2 border-b-indigo-400 font-semibold"
                  : "text-foreground/40 hover:text-foreground/80 hover:bg-white/5"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-400" : "text-foreground/40"}`} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Code View Area */}
      <div className="p-4 bg-[#050810] min-h-[220px] overflow-x-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            {currentTab.code.map((item) => (
              <div key={item.line} className="flex gap-4 items-baseline leading-relaxed">
                <span className="text-foreground/20 text-[10px] w-4 text-right select-none">{item.line}</span>
                <span
                  className={
                    item.type === "comment"
                      ? "text-emerald-400/70 italic"
                      : item.type === "keyword"
                      ? "text-indigo-400 font-medium"
                      : item.type === "string"
                      ? "text-cyan-300"
                      : item.type === "function"
                      ? "text-amber-300 font-medium"
                      : "text-foreground/80"
                  }
                >
                  {item.content}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Terminal Log Output Bar */}
      <div className="p-3 bg-[#0a0e1a] border-t border-white/10 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-foreground/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>SYSTEM READY</span>
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded font-semibold text-[10px] transition-all cursor-pointer active:scale-95"
          >
            <Play className={`w-3 h-3 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Running..." : "Run Snippet"}
          </button>
        </div>

        {/* Live Logs */}
        <div className="space-y-1 pt-1 border-t border-white/5 text-[10px]">
          {currentTab.logs.map((log, idx) => (
            <div key={idx} className="text-emerald-400/80 flex items-center gap-1.5">
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
