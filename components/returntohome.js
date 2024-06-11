"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
const ReturnToHomeButton = () => {

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex items-center text-white p-6">
        <Link href="/" className="ml-2">
            <Image src="/123.jpg" alt="My Image" width='50' height='50'/>
        </Link>
    </header>
  );
};

export default ReturnToHomeButton;
