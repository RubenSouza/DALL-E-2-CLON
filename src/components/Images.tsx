import React from "react";
import Image from "next/image";
import useSWR from "swr";
import Loader from "./Loader";
import { fetchImagesFromFirebase } from "@/lib/fetchImagesFromFirebase";

type ImageType = {
  image: string;
  inputText: string;
  name: string;
};

type Props = {};

const Images = (props: Props) => {
  const {
    data: imagesData,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/getFirebase", fetchImagesFromFirebase, {
    revalidateOnFocus: false,
  });

  console.log(imagesData);

  let loading = isLoading || isValidating;

  if (loading) {
    return (
      <Loader title={"Loading Images"} type={"spinningBubbles"} color={""} />
    );
  }

  return (
    <div className="">
      <div
        className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  2xl:grid-cols-5 mx-10 md:mx-64"
      >
        {imagesData?.map((item: ImageType, i: number) => (
          <div
            key={item?.name}
            className={`relative cursor-help 
        
      ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}
      
      hover:scale-[103%] transition-transform duration-200 ease-in-out
      `}
          >
            <div
              className="absolute flex justify-center items-center 
        w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity
        duration-200 z-10"
            >
              <p className="text-lg text-center font-light p-5">
                {item?.inputText}
              </p>
            </div>

            <Image
              src={`${item?.image}`}
              width={800}
              height={800}
              alt="image from DALL-E-2"
              key={item?.name}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
