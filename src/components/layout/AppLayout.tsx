import React from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <main className="p-4 sm:p-6">
        <div className="max-w-[800px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
