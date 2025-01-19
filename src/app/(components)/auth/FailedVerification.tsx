import Link from "next/link";
import React from "react";
const FailedVerification = () => {
  return (
    <div className="min-h-screen flex ">
      <div
        className="bg-item m-auto flex items-center w-fit
       flex-col gap-7 p-9 rounded-md border-[1px] border-item-foreground"
      >
        <h1 className="text-2xl">Verification Failed</h1>
        <p className="text-item-foreground">please go back and try again</p>
        <button className="w-full mt-8 text-[1rem]">
          <Link href="/auth/Login">Back</Link>
        </button>
      </div>
    </div>
  );
};

export default FailedVerification;
