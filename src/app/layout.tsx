import type { Metadata } from "next";
import "@/app/globals.css";
import { montserrat } from "@/app/ui/fonts";
import { Sidebar } from "@/app/(components)";
import Dashboard from "@/app/(components)/dashboard/index";
import { Toaster } from "./(components)/reusable-ui/toaster";
import { UserProvider } from "./providers/UserProvider";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "forage",
  description: "forage is a blog site dedicated to developers",
};

async function getUser() {
  const cookieStore = await cookies();
  // Construct the Cookie header string from the client's cookies
  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      // Include the client's cookies in the request
      Cookie: cookieString,
    },
  });

  if (!res.ok) {
    return undefined;
  }

  const user = await res.json();
  return user;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en">
      <body
        className={`${montserrat.className}  antialiased bg-item lg:bg-background`}
      >
        <UserProvider initialUser={user}>
          <Dashboard />
          <div className="block content-center lg:flex h-screen lg:gap-[2rem] md:p-5 xl:px-28 2xl:px-64 min-h-screen mt-10 2xl:mt-20">
            <div className="m-auto  lg:w-[70%] xl:w-[70%] min-h-screen">
              {children}
            </div>

            <Sidebar />
          </div>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
