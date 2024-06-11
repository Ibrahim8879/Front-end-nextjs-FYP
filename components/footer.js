import React from "react";
import FooterButton from "./footerbutton";

const Footer = () => {
  return (
    <div className="h-[20rem] mb-12 text-white">
      <hr className="border-t border-gray-600 my-16" />
      <div className="text-center my-12 text-white font-bold text-3xl ">
        ANALYTICS
      </div>
      <p className="px-[30rem] text-center">
        Our cutting-edge method delves into multilingual data streams, 
        particularly from the dynamic landscape of South-East Asia, 
        utilizing advanced web scraping techniques to transcend the limitations
         of conventional data collection approaches. The outcome? An intuitive, 
         feature-rich interface that empowers users to seamlessly observe, filter,
          and query real-time data streams.
      </p>
      <div className="mt-8">
        <ul className="flex gap-12 justify-center ">
          <FooterButton>Home</FooterButton>
          <FooterButton>About</FooterButton>
          <FooterButton>Blog</FooterButton>
          <FooterButton>Contact</FooterButton>
        </ul>
      </div>
    </div>
  );
};

export default Footer;