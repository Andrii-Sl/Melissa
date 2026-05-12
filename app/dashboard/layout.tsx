"use client";

import BottomNav from "@/components/BottomNav";
import TopBar from "@/components/TopBar";

export default function DashboardLayout({
  children,
}:{
  children:React.ReactNode;
}) {

  return (

    <>

      <TopBar />

      {children}

      <BottomNav />

    </>

  );
}