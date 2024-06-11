import React from "react";
export default function FooterButton({ children }) {
  return (
    <li className="cursor-pointer border-2 rounded-xl border-gray-300 px-4 py-2 hover:bg-gray-100 hover:text-black">
      {children}
    </li>
  );
}