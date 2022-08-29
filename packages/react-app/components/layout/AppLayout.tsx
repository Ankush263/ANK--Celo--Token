import * as React from "react";
import Meta from "../meta/Meta";
import Footer from "./Footer";
import { Header } from "./Header";
import  ANKToken from "../ANKToken";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AppLayout({ title, description, children }: Props) {
  return (
    <div>
      <Header />
      <Meta title={title} description={description} />
      {/* {children} */}
      <ANKToken />
      {/* <Footer /> */}
    </div>
  );
}
