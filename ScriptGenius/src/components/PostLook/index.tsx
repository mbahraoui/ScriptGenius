import Image from "next/image";
import React from "react";
import userNot from "@images/userNot.jpg";
const Index = ({ caption }: { caption: string }) => {
  return (
    <div className="w-full min-h-[650px] p-4">
      <div className="flex gap-4 mb-6">
        <div className="rounded-full overflow-hidden">
          <Image
            src={userNot}
            style={{ width: "50px", height: "50px" }}
            alt="user"
          />
        </div>
        <div className="flex flex-col  justify-center items-center">
          <p className="font-bold text-black">username</p>
          <p className="text-small text-gray-400">1 min ago</p>
        </div>
      </div>
      <textarea
        className="w-full rounded-lg px-3 py-2 text-black font-bold"
        placeholder="results"
        defaultValue={caption}
        rows={8}
      />
    </div>
  );
};

export default Index;
