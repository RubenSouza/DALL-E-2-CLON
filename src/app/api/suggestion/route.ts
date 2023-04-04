import axios from "axios";

const baseURL = "https://api.openai.com/v1/";
const model = "text-davinci-003";
const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_KEY;

export async function GET(request: Request) {
  const response = await axios.post(
    `${baseURL}engines/${model}/completions`,
    {
      prompt:
        "Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.",
      max_tokens: 100,
      n: 1,
      temperature: 0.8,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Cache-Control": "no-cache",
      },
    }
  );
  let textData = response.data.choices[0].text.trim();

  return new Response(textData);
}
