import React, { ReactNode } from "react";
import Navbar from "./Navbar";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-[1440px] mx-auto ">
      <Navbar />
      {children}
    </div>
  );
};

export default Container;
