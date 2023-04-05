"use client";

import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { fetchSuggestionFromChatGPT } from "@/lib/fetchSuggestionFromChatGPT";
import { Timestamp } from "firebase/firestore";
import { fetchImagesFromFirebase } from "@/lib/fetchImagesFromFirebase";
import toast from "react-hot-toast";

type Props = {};

const PromptInput = (props: Props) => {
  const [input, setInput] = useState<string>("");
  // const [suggestion, setSuggestion] = useState<string>("");

  const {
    data: suggestion,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  // console.log(suggestion);

  // useEffect(() => {
  //   const fetchSuggestion = async () => {
  //     const response = await fetch("/api/suggestion", {
  //       method: "GET",
  //       headers: {
  //         cache: "no-cache",
  //         "Cache-Control": "no-cache",
  //       },
  //     });

  //     let data = await response.text();

  //     setSuggestion(data);
  //   };

  //   fetchSuggestion();
  // }, []);

  const { mutate: updateImages } = useSWR(
    "/api/getFirebase",
    fetchImagesFromFirebase,
    {
      revalidateOnFocus: false,
    }
  );

  const submitPrompt = async () => {
    const notificationPrompt = input;
    const notificationPromptShort = notificationPrompt.slice(0, 20);

    const notification = toast.loading(
      `DALL·E is creating: ${notificationPromptShort}...`
    );

    const res = await axios.post("/api/generateImage", { prompt: input });
    let imageResponse = await res.data;

    await axios.post("/api/postFirebase", {
      inputText: input,
      image: imageResponse,
      name: Timestamp ? Timestamp.now().seconds : Date.now(),
    });

    if (imageResponse.error) {
      toast.error("OPEN AI API is not responding, please try again later");

      return;
    } else {
      toast.success(`Your Ai Art has been Generated`, {
        id: notification,
      });
    }

    // updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  // const updateMensages = () => {
  //   mutate();
  // };

  // let loading = isLoading || isValidating;

  return (
    <div className="lg:mx-64 m-20 text-gray-200">
      <form className="flex flex-col lg:flex-row" onSubmit={handleSubmit}>
        <textarea
          placeholder={
            // (loading && "ChatGPT is Thinking...") ||
            // suggestion ||
            // "Enter your prompt here"
            suggestion
          }
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 outline-none resize-none p-3
          shadow-sm shadow-slate-400/10 border-[0.1px] border-gray-400 rounded-l-md "
        />
        <button
          type="submit"
          className={`p-4 font-bold 
        ${
          input
            ? "text-gray-100 bg-[#597081]/80 transition-colors duration-200 "
            : "text-gray-400 bg-[#5D737E] cursor-not-allowed"
        } 
        md:rounded-r-md `}
          disabled={!input}
        >
          Generate
        </button>
      </form>
      {input && (
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 space-x-4 pt-6 items-center">
          <p
            onClick={() => setInput(suggestion as string)}
            className=" italic font-light cursor-pointer"
          >
            Suggestion:{" "}
            <span className="text-violet-500">
              {/* {loading ? "ChatGPT is Thinking..." : suggestion} */}
              {suggestion}
            </span>
          </p>
          <button
            className="p-2 bg-[#363535]  text-[#E8E9EB] border-none text-sm
            transition-colors duration-200 rounded-md font-bold cursor-pointer"
            // onClick={updateMensages}
          >
            New Suggestion
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptInput;
