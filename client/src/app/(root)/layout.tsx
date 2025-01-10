import { ReactNode } from "react";
import { Header } from "@/components/header/header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
