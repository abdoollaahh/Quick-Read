import React from "react";

const Hero = () => {
  return (
    <div className="prose flex justify-center p-10 text-center">
      <div className="flex flex-col">
        <h1>
          Summarize Articles with{" "}
          <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            QuickRead
          </span>
        </h1>
        <h2 className="my-2">
          Streamline Your Reading Experience with Automated Article
          Summarization.
        </h2>
      </div>
    </div>
  );
};

export default Hero;
