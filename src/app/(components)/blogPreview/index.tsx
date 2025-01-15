import React from "react";

interface blogPreviewProps {
  display: Boolean;
  description?: string;
  thumbnail?: string;
}
const index = ({ display, description, thumbnail }: blogPreviewProps) => {
  if (!display) {
    return;
  }
  return (
    <div className="absolute w-full h-full top-0 left-0 z-10 bg-background">
      <div className="flex gap-10 h-fit my-8 border p-8 rounded-lg">
        <textarea
          className="w-[70%] md:w-[80%] xl:w-[77%] bg-background focus:outline-none resize-none"
          defaultValue={description}
        ></textarea>

        <div className="w-[30%] md:w-[20%] xl:w-[23%] relative">
          <img className="rounded-lg" src={thumbnail} />
          <div
            className="absolute bottom-[50%] right-[50%] translate-x-1/2 translate-y-1/2
           bg-black bg-opacity-80 w-fit py-1 px-4 rounded-3xl"
          >
            <label
              htmlFor="thumbnail"
              className="text-sm md:text-[0.8rem] text-item-foreground whitespace-nowrap hover:text-white hover:cursor-pointer
               transition-all duration-300"
            >
              New Thumbnail
            </label>
            <input type="file" id="thumbnail" className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
