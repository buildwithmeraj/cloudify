import React from "react";
import Icon from "./Icon";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold">
      <Icon />{" "}
      <div>
        Cloudi<span className="text-[#F7931E]">fy</span>
      </div>
    </div>
  );
};

export default Logo;
