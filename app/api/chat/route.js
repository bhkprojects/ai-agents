import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const body = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
You are a ${body.agent}.

User request:
${body.message}
`;

    const result = await model.generateContent(prompt);

    return Response.json({
      reply: result.response.text()
    });

  } catch (error) {
    return Response.json({
      reply: "Error: " + error.message
    });
  }
}