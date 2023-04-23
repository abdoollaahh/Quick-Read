import React from "react";
import Hero from "./components/Hero";
import Demo from "./components/Demo";

const App = () => {
  return (
    <main className=" h-screen bg-[url('/background.jpg')] bg-cover bg-no-repeat backdrop-blur-xl">
      <div className="flex flex-col items-center justify-center">
        <Hero />
        <Demo />
      </div>
    </main>
  );
};

export default App;
