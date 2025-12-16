import { useState, useRef } from "react";
import { playTextToSpeech } from "../../services/puterService";
import { Volume2, Loader2, Play, Square, Download } from "lucide-react";

const voices = [
  "alloy",
  "ash",
  "ballad",
  "coral",
  "echo",
  "fable",
  "nova",
  "onyx",
  "sage",
  "shimmer",
];

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("alloy");
  const [status, setStatus] = useState<"idle" | "loading" | "playing">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAction = async () => {
    if (status === "playing") {
      audioRef.current?.pause();
      audioRef.current = null;
      setStatus("idle");
      return;
    }

    if (!text.trim()) return;

    setStatus("loading");
    try {
      const audio = await playTextToSpeech(text, voice);
      audioRef.current = audio;
      audio.onended = () => setStatus("idle");
      setStatus("playing");
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  const handleDownload = async () => {
    if (!audioRef.current?.src) return;
    const blob = await (await fetch(audioRef.current.src)).blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `speech-${Date.now()}.mp3`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-base-100/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-brand-primary/20 rounded-xl">
          <Volume2 className="w-6 h-6 text-brand-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-content-100">Text to Speech</h2>
          <p className="text-sm text-content-200">Powered by Puter.js AI</p>
        </div>
      </div>

      <textarea
        className="w-full h-40 p-5 rounded-xl bg-base-200/50 border border-white/5 focus:border-brand-primary/50 text-content-100 outline-none resize-none text-lg shadow-inner mb-6"
        placeholder="Enter text to convert..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-between items-center bg-base-200/30 p-2 rounded-xl border border-white/5">
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          disabled={status === "playing"}
          className="bg-base-300 border border-white/10 text-content-100 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-base-100 disabled:opacity-50"
        >
          {voices.map((v) => (
            <option key={v} value={v}>
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          {audioRef.current && status !== "loading" && (
            <button
              onClick={handleDownload}
              className="p-2.5 bg-base-300 hover:bg-base-100 text-content-100 rounded-lg border border-white/5"
            >
              <Download className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleAction}
            disabled={
              status === "loading" || (!text.trim() && status === "idle")
            }
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
              status === "playing"
                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                : "bg-brand-primary text-white hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === "playing" ? (
              <Square className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            <span>
              {status === "loading"
                ? "Generating..."
                : status === "playing"
                ? "Stop"
                : "Speak"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
