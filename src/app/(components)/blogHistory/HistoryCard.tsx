import React from "react";
import { RxCross2 } from "react-icons/rx";
import {
  CardContainer,
  CardBody,
  CardHeader,
  CardPane,
  CardTitle,
} from "@/app/(components)/index";
interface historyRecordProps {
  id: number;
  userID: number;
  blogID: number;
  readAt: Date;
  title: string;
  thumbnail: string | null;
  description: string | null;
}

interface HistoryCardProp {
  record: historyRecordProps;
  HandleDelete: Function;
}
const HistoryCard = ({ record, HandleDelete }: HistoryCardProp) => {
  return (
    <CardContainer key={record.id} className="pb-0">
      <CardPane className="flex-[1]">
        {record.thumbnail && (
          <img
            src={record.thumbnail}
            className="w-full rounded-[6px] aspect-video object-cover"
          />
        )}
      </CardPane>
      <CardPane className="flex-[3]">
        <CardHeader className="justify-between">
          <CardTitle href={`/blog/${record.id}`}>{record.title}</CardTitle>
          <RxCross2
            className="w-6 h-6 mt-1 text-item-foreground 
    hover:text-white hover:cursor-pointer  rounded-full hover:bg-[#27272a]"
            onClick={() => HandleDelete(record.blogID)}
          />
        </CardHeader>
        <CardBody>{record.description}</CardBody>
      </CardPane>
    </CardContainer>
  );
};

export default HistoryCard;
