import { Music, Sparkles } from "lucide-react";
import TextToSpeech from "./Sound/TextToSpeech";
import { motion } from "framer-motion";

export default function AudioToolsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-linear-to-br from-brand-primary to-purple-600 rounded-2xl shadow-lg shadow-brand-primary/20">
            <Music className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-content-100 tracking-tight">
              Sound Studio
            </h1>
            <p className="text-content-200 text-lg mt-1">
              Professional voice synthesis and audio tools
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>Puter AI Enabled</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 gap-8"
      >
        <section>
          <TextToSpeech />
        </section>

        {/* Future audio tools can be added here */}
      </motion.div>
    </div>
  );
}
