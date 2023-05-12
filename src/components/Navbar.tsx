import React from "react";
import Logo from "../../public/Icon.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <div>
      <div className="w-full flex items-center bg-blue-500 text-white py-2 px-8 gap-2">
        <Image src={Logo} alt="icon" />
        <div className="font-bold text-[24px]">Alan Resto</div>
      </div>
      <div className="w-full border-b pt-2 px-16 shadow-sm flex gap-16 bg-white">
        <div
          className={`flex flex-col items-center ${
            router.pathname !== "/" ? "text-cyan-500 font-semibold" : ""
          }`}
        >
          <Link href={"/food"}>Food</Link>
          <div
            className={`${
              router.pathname !== "/"
                ? "border-b-2 border-cyan-500"
                : "border-b-2 border-transparent"
            } h-2 w-[120px] m-0`}
          />
        </div>
        <div
          className={`flex flex-col items-center ${
            router.pathname === "/" ? "text-cyan-500 font-semibold" : ""
          }`}
        >
          <Link href={"/"}>Transaksi</Link>
          <div
            className={`${
              router.pathname === "/"
                ? "border-b-2 border-cyan-500"
                : "border-b-2 border-transparent"
            } h-2 w-[120px] m-0`}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
