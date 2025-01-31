import React from "react";
import {
  CardContainer,
  CardBody,
  CardFooter,
  CardHeader,
  CardPane,
  CardTitle,
} from "@/app/(components)/reusable-ui/blogCard";
import OptionsBar from "../(components)/reusable-ui/OptionsBar";

const page = () => {
  return (
    <>
      <CardContainer>
        <CardPane className="flex-[3]">
          <CardHeader>
            <CardTitle href="/">Where are we now</CardTitle>
          </CardHeader>
          <CardBody>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
            unde quibusdam magni ipsa minima accusantium cumque facilis error
            quos. Dolorum magnam quae architecto sunt ut molestiae molestias
            mollitia voluptas qui. mollitia voluptas qui. mollitia voluptas qui.
            mollitia voluptas qui. mollitia voluptas qui. mollitia voluptas qui.
          </CardBody>
          <CardFooter className="flex justify-between">
            <div className="flex gap-4 items-center">
              <p className="font-montserrat text-[0.8rem]">10 min read</p>
              <p className="font-montserrat text-[0.8rem]">20/04/2021</p>
            </div>
            <OptionsBar blogID={21} authorID={2} />
          </CardFooter>
        </CardPane>
        <CardPane className="flex-[1]">
          <div className="w-full aspect-video rounded-lg bg-slate-500"></div>
        </CardPane>
      </CardContainer>
    </>
  );
};

export default page;
