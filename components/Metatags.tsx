import Head from "next/head";
import { FC } from "react";

interface MetaTagesProps {
  title?: string;
  description?: string;
  image?: string;
}

const MetaTags: FC<MetaTagesProps> = (props) => {
  return (
    <Head>
      <title>
        {props.title
          ? props.title
          : "ZPACE - Flexible space sharing platform"}
      </title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@zpace" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content={props.image} />
    </Head>
  );
};

export default MetaTags;
