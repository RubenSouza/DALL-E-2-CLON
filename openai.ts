import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.NEXT_PUBLIC_OPEN_AI_ORGANIZATION,
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;
