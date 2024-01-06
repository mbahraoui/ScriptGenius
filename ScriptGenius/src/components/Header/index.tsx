/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@images/instalogo-removebg.png";
import { motion } from "framer-motion";

const Index = () => {
  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  };

  const variantsLeftToRight = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  };

  return (
    <motion.div
      initial="hidden"
      transition={{ duration: 1, delay: 0.3 }}
      animate="visible"
      variants={variants}
      className="w-full sticky top-0 left-0 right-0 z-50 "
    >
      <div className="w-full py-2  bg-white/60 flex justify-between items-center   border-black shadow-md  h-[80px]   ">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 2 }}
          className=" text-center py-2 w-[200px] px-5"
        >
          <Image
            src={Logo}
            alt="insta logo"
            style={{ width: "50px", height: "50px" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 2 }}
          variants={variantsLeftToRight}
          className=" text-center py-2 flex-1 flex items-center justify-end px-5"
        >
          <div className="flex gap-5 items-center justify-start ">
            <Link href={"/"}>
              <div className="py-2 text-mainFontColor text-small w-[100px] bg-slate-100 rounded-md cursor-pointer hover:text-white hover:bg-mainC hover:border-1 hover:border-white  hover:shadow-md">
                Home
              </div>
            </Link>

            <Link href={"/contact"}>
              <div className="py-2 text-mainFontColor  text-small w-[100px] bg-slate-100 rounded-md cursor-pointer hover:text-white hover:bg-mainC hover:border-1 hover:border-white  hover:shadow-md">
                Contact
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
