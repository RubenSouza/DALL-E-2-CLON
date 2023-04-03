import axios from "axios";

const baseURL = "https://api.openai.com/v1/";
const apiKey = process.env.OPEN_AI_KEY;

// mongoose.connect(mongoUrl, { useNewUrlParser: true } as ConnectOptions);

export async function POST(request: Request) {
  const res = await request.json();
  const prompt = res.prompt;

  const response = await axios.post(
    `${baseURL}images/generations`,
    {
      // model: "image-alpha-001", // ou 'image-001'
      prompt: prompt,
      num_images: 1,
      size: "1024x1024",
      response_format: "url",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return new Response(response.data.data[0].url);
}
