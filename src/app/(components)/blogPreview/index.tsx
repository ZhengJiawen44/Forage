import React from "react";

interface blogPreviewProps {
  display: Boolean;
  setDisplay: React.Dispatch<React.SetStateAction<Boolean>>;
  description?: string;
  thumbnail?: string;
}
const index = ({
  display,
  setDisplay,
  description,
  thumbnail,
}: blogPreviewProps) => {
  console.log(display);

  if (!display) {
    return;
  }
  return (
    <div className="absolute inset-0 top-0 left-0 z-10 bg-item lg:bg-background">
      <div className="flex gap-14 h-fit my-8 border p-8 rounded-lg">
        <textarea
          className="w-[70%] md:w-[80%] xl:w-[77%] bg-item lg:bg-background focus:outline-none resize-none
   scrollbar-thumb-black lg:scrollbar-thumb-item scrollbar-thin scrollbar-track-transparent  text-[0.8rem] lg:text-[1rem]"
          id="description"
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
              className="text-sm md:text-[0.9rem] text-item-foreground whitespace-nowrap hover:text-white hover:cursor-pointer
               transition-all duration-300"
            >
              New Thumbnail
            </label>
            <input type="file" id="thumbnail" className="hidden" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <button
          className="border-item border p-4 px-4 py-1  rounded-3xl font-sans"
          type="button"
          onClick={() => setDisplay((display) => !display)}
        >
          Back
        </button>
        <button className="bg-[#285000] px-4 py-1 rounded-3xl font-sans">
          publish
        </button>
      </div>
    </div>
  );
};

export default index;
