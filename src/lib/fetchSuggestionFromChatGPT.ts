"use client";

// import axios from "axios";

const baseURL = "https://api.openai.com/v1";
const model = "text-davinci-003";
const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_KEY;

export async function fetchSuggestionFromChatGPT() {
  const prompt =
    "Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.";

  const response = await fetch(`${baseURL}/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Cache-Control": "no-cache",
      cache: "no-cache",
    },
    body: JSON.stringify({
      model: model,
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      temperature: 0.9,
    }),
  });
  let data = await response.json();
  let textData = data?.choices?.[0]?.text?.trim();
  console.log(textData);
  return textData;
}

// export async function fetchSuggestionFromChatGPT() {
//   const response = await fetch("/api/suggestion", {
//     method: "GET",
//     headers: {
//       cache: "no-cache",
//       "Cache-Control": "no-cache",
//     },
//   });

//   let data = await response.text();

//   return data;
// }
