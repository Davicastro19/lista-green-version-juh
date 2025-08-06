import { ReactNode } from "react";


import BottomNav from "@/components/nav/bottom-nav";
import Sidebar from "@/components/nav/sidebar";


interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-row h-screen  text-foreground bg-[var(--base)] " >

      <Sidebar />
      <main className="flex-1 flex flex-col   p-[0px]   mb-0 lg:mb-0 lg:p-[10px]  ">
      <div className="flex-1   px-2 lg:px-2 py-2 bg-white  rounded-xl shadow-md  overflow-auto h-60 ">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
