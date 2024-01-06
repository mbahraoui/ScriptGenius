/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import UploadPng from "@images/upload.png";
import axios from "axios";
import { toast } from "react-hot-toast";

type Props = {
  setImage: Dispatch<SetStateAction<string>>;
};

const Index = ({ setImage }: Props) => {
  const [loading, setLoading] = useState(false);
  const cloud_name = "etude-universitaire";
  //   const api_key = "828894822391139";
  const api_secret = "sgd4xwih";
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target?.files?.[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", api_secret);
    setLoading(true);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => {
        setImage(res.data.secure_url);
        setLoading(false);
      })
      .catch((e) => {
        toast.error("something went wrong");
        setLoading(false);
      });
  };

  return (
    <div
      style={{ width: "620px", height: "740px" }}
      className="bg-white flex justify-center items-center"
    >
      {!loading ? (
        <div className="cursor-pointer flex flex-col items-center justify-center gap-4">
          <Image
            src={UploadPng}
            alt="upload png"
            style={{ width: "120px", height: "70px" }}
          />
          <input type="file" name="image" id="" onChange={handleFile} />
        </div>
      ) : (
        <div>
          <p className="text-xl font-serif animate-bounce text-black">
            loading ....
          </p>
        </div>
      )}
    </div>
  );
};

export default Index;
