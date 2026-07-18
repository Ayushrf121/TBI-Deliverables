import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export const askSipBot = async (req, res, next) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt context is required." });
        }

        // 1. Safely resolve the path to website_summary.txt at backend root
        const summaryPath = path.resolve(process.cwd(), "website_summary.txt");
        let knowledgeBase = "";

        try {
            knowledgeBase = fs.readFileSync(summaryPath, "utf-8");
        } catch (fsError) {
            console.error("Failed to load website_summary.txt:", fsError);
            return res.status(500).json({ 
                success: false, 
                message: "Knowledge base file missing on server." 
            });
        }

        // 2. Initialize Google Gemini
        const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 3. Inject the file text into a lean system instruction frame
        const strictKnowledgeBasePrompt = `
You are a specialized technical documentation assistant for this specific codebase architecture.
Here is the strict knowledge base containing the only information you are allowed to know:

--- START SYSTEM KNOWLEDGE BASE ---
${knowledgeBase}
--- END SYSTEM KNOWLEDGE BASE ---

CRITICAL CORE RULE: 
- You must ONLY answer questions directly related to the provided codebase architecture above.
- If the user asks about anything outside of this documentation (e.g., general coding, history, math, outside frameworks, weather, etc.), you must refuse to answer.
- Your exact refusal text must be: "I am designed to answer questions about this website and its codebase architecture only."

User Question: ${prompt}
Response:`;

        const result = await model.generateContent(strictKnowledgeBasePrompt);
        const responseText = result.response.text();

        return res.status(200).json({
            success: true,
            reply: responseText
        });
    } catch (error) {
        console.error("Gemini AI External-Prompt Pipeline Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to resolve workspace query context."
        });
    }
};