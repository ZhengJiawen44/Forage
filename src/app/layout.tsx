import type { Metadata } from "next";
import "@/app/globals.css";
import { amita, lora, roboto_mono } from "@/app/ui/fonts";
import { Sidebar } from "@/app/(components)";
import { Dashboard } from "@/app/(components)";

export const metadata: Metadata = {
  title: "forage",
  description: "forage is a blog site dedicated to developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.className} ${roboto_mono.className} ${amita.className}  antialiased`}
      >
        <Dashboard />
        <div className="lg:grid grid-cols-3 h-screen lg:p-[5rem]  gap-[3rem] min-h-screen">
          <div className="col-span-2 p-10  min-h-screen ">{children}</div>
          <div className="col-span-1 pt-16 pl-[2.5rem] bg-item">
            <Sidebar />
          </div>
        </div>
      </body>
    </html>
  );
}

// import { usePathname } from "next/navigation";
// import { ReactNode, useEffect, useState } from "react";
// import SearchBar from "@/components/ui/SearchBar";
// import Recommendation from "@/components/sidebar/Recommendations";
// import { TbUserCircle, TbPencil } from "react-icons/tb";
// import Link from "next/link";
// // import useUser from "@/lib/getUser";

// interface LayoutProps {
//   children: ReactNode;
// }
// export default function Layout({ children }: LayoutProps) {
//   // const { user, loading, error } = useUser();
//   return (
//     <>
//       <div
//         className="shadow-lg shadow-black/30 w-full-b-[1px]
//       py-2 sm:py-3 flex items-center gap-3 justify-between px-3 lg:px-[3rem] "
//       >
//         <div className="flex max-w-[70%] sm:min-w-[50%] items-center gap-3">
//           <h1 className="sm:text-[1.5rem]">
//             <Link href={"/Blog"}>BlogSpot</Link>1
//           </h1>
//           <SearchBar />
//         </div>

//         <div className="flex items-center gap-3 w-fit">
//           <Link
//             aria-label="create a new blog"
//             className="m-0 p-0 -[1px] bg-item w-fit h-fit px-4 py-2  sm:flex sm:items-center sm:gap-1 rounded-[20px] text-item-foreground hover:text-foreground"
//             href="/Blog/new"
//           >
//             <TbPencil />
//             <p className="hidden sm:block m-0 p-0">write</p>
//           </Link>

//           <Link href="/Auth/Login">
//             <TbUserCircle
//               className="text-item-foreground h-[2rem] w-[2rem] sm:h-[2.5rem] sm:w-[2.5rem]
//            hover:text-white hover:cursor-pointer transition-all duration-300"
//             />
//           </Link>
//         </div>
//       </div>

//       <div className="lg:grid grid-cols-3 h-screen">
//         <div
//           className="col-span-2  lg:overflow-y-auto lg:scrollbar-hide
//        pt-10 pl-[2rem] xl:pl-[8rem] 2xl:pl-[16rem] pr-7"
//         >
//           {children}
//         </div>
//         <div className="col-span-1-l-2 overflow-y-auto scrollbar-hide pt-16 pl-[2.5rem]">
//           <Recommendation />
//         </div>
//       </div>
//     </>
//   );
// }
