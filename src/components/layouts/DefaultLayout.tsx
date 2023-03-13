import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Meta from "@/components/layouts/Meta";
import Head from "next/head";
import { type ReactNode } from "react";

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <Meta />
      </Head>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
