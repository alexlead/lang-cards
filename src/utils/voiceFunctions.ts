import { IVoiceOption, SpeakOptions } from "../models/model";


export const getVoices = (): Promise<IVoiceOption[]> => {
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          resolve(window.speechSynthesis.getVoices());
        };
      }
    });
  };


  export const speakText = async (text: string, options: SpeakOptions = {}): Promise<void> => {
    const {
      rate = 1,
      pauseBetweenSentences = 500,
      lang = "en-US",
      voiceName,
    } = options;
  
    const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  
    const synth = window.speechSynthesis;
  
    const getVoice = (): SpeechSynthesisVoice | null => {
      const voices = synth.getVoices();
      if (voiceName) {
        return voices.find((voice) => voice.name === voiceName) || null;
      }
      return voices.find((voice) => voice.lang.startsWith(lang)) || null;
    };
  
    const voice = getVoice();
    if (!voice) {
      throw new Error(`No voice found for language "${lang}" or name "${voiceName}"`);
    }

    for (const sentence of sentences) {
      await new Promise<void>((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(sentence.trim());
        utterance.voice = voice;
        utterance.lang = lang;
        utterance.rate = rate;
  
        utterance.onend = () => {
          setTimeout(resolve, pauseBetweenSentences); 
        };
  
        utterance.onerror = (e) => {
          reject(new Error(`SpeechSynthesis error: ${e.error}`));
        };
  
        synth.speak(utterance);
      });
    }
  };