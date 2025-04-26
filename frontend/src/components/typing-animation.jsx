import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypingAnimation = () => {
  return (
    <div className="text-5xl font-bold bg-gradient-to-r from-[#170439] via-[#853EF3] to-pink-600 bg-clip-text text-transparent">
      <Typewriter
        words={[
          "Kozy.",
          "Where Comfort Meets Convenience.",
          "Find Your Perfect Stay.",
          "Streamline Your Search.",
        ]}
        loop={0}
        cursor="True"
        cursorStyle="|"
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={1500}
      />
    </div>
  );
};

export default TypingAnimation;
