import React from "react";
import Logo from "../../public/Icon.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <div className="w-full flex items-center bg-blue-500 text-white py-2 px-8 gap-2">
        <Image src={Logo} alt="icon" />
        <div className="font-bold text-[24px]">Alan Resto</div>
      </div>
      <div className="w-full border-b py-2 px-16 shadow-sm flex gap-16">
        <Link href={"/food"}>Food</Link>
        <Link href={"/"}>Transaksi</Link>
      </div>
    </div>
  );
};

export default Navbar;
