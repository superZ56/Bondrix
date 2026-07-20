/*

- Crée une instance de Groq et Gemini
- generate() essaie Groq d'abord, si ça échoue → Gemini
- Expose une interface simple pour les features

*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

class AIService {
  constructor() {
    this.groq = null;
    this.gemini = null;
  }

  _init() {
    if (!this.groq && process.env.GROQ_API_KEY) {
      this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }
    if (!this.gemini && process.env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
  }

  async generate(prompt, options = {}) {
    this._init();
    const { provider = "groq", model, temperature = 0.7, maxTokens = 256 } = options;

    try {
      if (provider === "groq" && this.groq) {
        return await this._groqGenerate(prompt, model, temperature, maxTokens);
      }
      return await this._geminiGenerate(prompt, model, temperature, maxTokens);
    } catch (error) {
      console.warn(`Groq failed (${error.message}), fallback to Gemini...`);
      return await this._geminiGenerate(prompt, model, temperature, maxTokens);
    }
  }

  async _groqGenerate(prompt, model, temperature, maxTokens) {
    const completion = await this.groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: model || "llama-3.1-8b-instant",
      temperature,
      max_tokens: 256,
    });
    return completion.choices[0]?.message?.content || "";
  }

  async _geminiGenerate(prompt, model, temperature, maxTokens) {
    const generativeModel = this.gemini.getGenerativeModel({
      model: model || "gemini-2.0-flash",
    });
    const result = await generativeModel.generateContent(prompt, {
      generationConfig: { temperature, maxOutputTokens: maxTokens },
    });
    return result.response.text() || "";
  }
}

export default new AIService();