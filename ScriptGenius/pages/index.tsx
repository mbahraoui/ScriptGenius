import { ReactElement, useState } from "react";
import { MainLayout } from "@/layout/Main";
import UploadImage from "@components/Upload";
import { motion } from "framer-motion";
import Image from "next/image";
import PostLook from "@components/PostLook";
import { toast } from "react-hot-toast";
export default function Home() {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  };

  // Example POST method implementation:
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const handleClickOnGenerateCaption = () => {
    if (image === "") {
      toast.error("please upload an image ");
      return;
    }
    setLoading(true);
    postData("http://localhost:8000/api/caption_generator/", {
      img_url: image,
    }).then((data) => {
      console.log(data[0].caption); // JSON data parsed by `data.json()` call
      setCaption(data[0].caption);
      setLoading(false);
    });
  };

  const clearAll = () => {
    setCaption("");
    setImage("");
  };

  return (
    <>
      <div className=" flex gap-4 justify-center items-center h-screen  ">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="w-[600px]  h-[700px] -mt-[120px] rounded-lg overflow-hidden"
        >
          {image === "" ? (
            <UploadImage setImage={setImage} />
          ) : (
            <Image
              src={image}
              alt="upload png"
              width={620}
              height={740}
              style={{ width: "620px", height: "740px" }}
            />
          )}
        </motion.div>
        {!loading ? (
          <div className="w-[700px] h-[700px]  -mt-[120px]">
            {caption !== "" ? (
              <motion.div
                initial="hidden"
                transition={{ duration: 1, delay: 0.5 }}
                animate="visible"
                variants={variants}
                className="w-full"
              >
                <PostLook caption={caption} />

                <div className="flex items-end justify-end">
                  <div
                    onClick={clearAll}
                    className=" cursor-pointer hover:shadow-md text-center w-[200px] py-2 bg-mainC text-white rounded-lg"
                  >
                    <p>Go back</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full flex flex-col space-y-6 justify-center items-center">
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                  onClick={() => handleClickOnGenerateCaption()}
                  className="py-2 px-6 rounded-md bg-mainC2 text-white cursor-pointer hover:animate-none hover:bg-mainC transition-all delay-100"
                >
                  Generate Caption
                </motion.p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-[700px] h-[700px]  -mt-[120px] flex items-center justify-center">
            <div>
              <p className="text-xl font-serif animate-bounce">
                please wait ...
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
