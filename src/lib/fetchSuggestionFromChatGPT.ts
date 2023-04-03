import axios from "axios";

export async function fetchSuggestionFromChatGPT() {
  let response = await axios.get("/api/suggestion");

  let data = await response.data;

  return data;
}
