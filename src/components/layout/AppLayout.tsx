import React from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
    </>
  );
}
