import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(components)/reusable-ui/select";
import { Skeleton } from "@/app/(components)/reusable-ui/skeleton";

interface MonthPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const MonthPicker = ({ value, onChange }: MonthPickerProps) => {
  const { status, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/user");
      return await response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const displayDate: Date[] = [];
  const userCreatedAt = new Date(data?.createdAt);
  const timeElapsed = new Date().getTime() - userCreatedAt.getTime();
  const monthElapsed = Math.ceil(timeElapsed / 1000 / 60 / 60 / 24 / 30);
  const startDate = new Date(userCreatedAt.setDate(1));

  let currentDate = new Date(startDate);
  for (let i = 0; i <= monthElapsed; i++) {
    displayDate.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  useEffect(() => {
    if (displayDate.length > 0 && !value) {
      onChange(`${displayDate[displayDate.length - 1].getTime()}`);
    }
  }, [data, value, onChange]);

  if (status === "pending") {
    return <Skeleton className="w-[10rem] h-10 rounded-full" />;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {displayDate.map((date) => (
            <SelectItem
              value={`${date.getTime()}`}
              key={`${monthNames[date.getMonth()]}${date.getFullYear()}`}
            >
              {`${monthNames[date.getMonth()]} ${date.getFullYear()} `}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MonthPicker;
