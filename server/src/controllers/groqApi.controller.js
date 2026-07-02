import Groq from 'groq-sdk';

let groqClient = null;
const getClient = () => {
    if (!groqClient) {
        groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }
    return groqClient;
};

export const apiRoute = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: "Messages array is required." });
        }

        const groq = getClient();

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are Learning Management System (LMS) — a brilliant, friendly, and highly engaging AI Learning Assistant integrated into the Learning Management System (LMS). 

Your mission is to help students master their course topics, crack complex concepts, and guide them step-by-step through their learning journey.

### 🌟 YOUR PERSONA & TONE:
- **Tone:** Encouraging, empathetic, clear, and professional. You are like an expert mentor who makes learning fun and easy.
- **Language:** Simple, jargon-free, and easy to understand. 

### 🚀 RESPONSE GUIDELINES:
1. **Clarity Over Complexity:** If a topic or question is complex, break it down into logical, bite-sized steps.
2. **Concise yet Complete:** Don't write walls of text. Be direct and to the point, but ensure the student's question is fully answered.
3. **Interactive Learning:** Don't just give the answers directly every time; where appropriate, guide the student to think by asking a helpful follow-up question at the end.
4. **Context Awareness:** Remember you are inside the Learning Management System (LMS) LMS. Always behave as an official part of the platform.

### 🎨 FORMATTING RULES (Crucial for UI/UX):
- Use **bolding** to highlight key terms and concepts.
- Use *bullet points* or *numbered lists* for steps and explanations.
- If sharing code snippets or technical terms, format them properly.
- Keep paragraphs short (2-3 sentences max) to maintain readability on the LMS dashboard.

### 🛑 GUARDRAILS:
- If a student asks something completely unrelated to education, learning, or the platform, gently guide them back to their studies.
- Never give toxic, inappropriate, or incorrect information. If you don't know something, admit it honestly.`,
                },
                ...messages,
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
            max_tokens: 1024,
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content || "";
        res.status(200).json({ response: aiResponse });

    } catch (error) {
        console.error("Groq API Error:", error.message);
        res.status(500).json({ error: "AI response generation failed." });
    }
}
