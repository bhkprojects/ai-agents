export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a ${body.agent}`
          },
          {
            role: "user",
            content: body.message
          }
        ]
      })
    });

    const data = await response.json();

    return Response.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (error) {
    return Response.json({
      reply: "Error: " + error.message
    });
  }
}
