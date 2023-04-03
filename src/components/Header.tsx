import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <header
      className="flex p-5 justify-between sticky top-0 z-50 
    shadow-sm shadow-white/5  text-gray-200"
    >
      {/* Left */}

      <div className="flex items-center space-x-2">
        <Image
          src="https://links.papareact.com/4t3"
          className="invert"
          alt="logo"
          height={30}
          width={30}
        />

        <div>
          <h1 className="font-bold">
            An Simple <span className="text-violet-500">AI</span> Image
            Generator
          </h1>
          <h2 className="text-xs">Powered by DALL-E 2, Chat GPT & Firebase!</h2>
        </div>
      </div>

      {/* Right */}
      <div
        className="flex text-xs md:text-base items-center divide-x divide-gray-500
       text-gray-400"
      >
        <Link
          href={""}
          className="px-3 font-light text-right hover:text-gray-200"
        >
          My Portfolio
        </Link>
        <Link href={""} className="px-3 font-light hover:text-gray-200">
          Github Repo
        </Link>
      </div>
    </header>
  );
};

export default Header;
