import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-full ">
      <section
        className="hidden bg-primary/20 w-full h-full items-center justify-center
      md:flex flex-[2]"
      >
        <span className="flex flex-col space-y-2">
          <h1 className="text-3xl">Welcome to Easycom!</h1>
          <p className="text-gray-800">E-commerce made Easy..</p>
        </span>
      </section>
      <section className="flex-1 p-8 flex items-center justify-center h-full w-full">
        {children}
      </section>
    </main>
  );
}
