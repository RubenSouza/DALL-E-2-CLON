// @ts-nocheck

import ReactLoading from "react-loading";

const Loader = ({ title, type, color }) => {
  return (
    <div
      className="text-white w-full h-full flex flex-col 
      justify-center items-center space-y-4 mt-64"
    >
      <ReactLoading type={type} height={200} width={200} />
      <p className="text-2xl font-semibold">{title}</p>
    </div>
  );
};

export default Loader;
