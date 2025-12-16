import puter from "@heyputer/puter.js";

export const playTextToSpeech = async (text: string, voice: string) => {
  try {
    const audio = await puter.ai.txt2speech(text, {
      provider: "openai",
      model: "gpt-4o-mini-tts",
      voice,
      response_format: "mp3",
      instructions: "Keep the delivery clear and friendly.",
    });
    audio.play();
    return audio;
  } catch (error) {
    console.error("Puter TTS Error:", error);
    throw error;
  }
};
