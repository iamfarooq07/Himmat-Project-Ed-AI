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
                    content: `You are LearnHub AI — a friendly, knowledgeable learning assistant built into the LearnHub education platform. 
You help students understand course topics, explain concepts clearly, answer questions, and guide learners. 
Keep responses concise but complete. Use simple language. If a topic is complex, break it into steps.`,
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
