import { ReactNode } from "react";
import { Header } from "@/components/header/header";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
