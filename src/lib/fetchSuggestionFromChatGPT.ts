import axios from "axios";

export async function fetchSuggestionFromChatGPT() {
  const response = await fetch("/api/suggestion", {
    headers: {
      cache: "no-cache",
    },
  });

  let data = await response.text();

  return data;
}

// export async function fetchSuggestionFromChatGPT() {
//   let response = await axios.get("/api/suggestion", {
//     headers: {
//       "Cache-Control": "no-cache",
//     },
//   });

//   let data = await response.data;

//   return data;
// }
