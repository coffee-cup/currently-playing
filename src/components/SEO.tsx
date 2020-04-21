import * as React from "react";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { DefaultSeoProps } from "next-seo";

export interface Props {
  title?: string;
  description?: string;
}

const title = "Currently Playing";
const url = "https://currently-playing.now.sh/";
const description =
  "Shows the current playing song on Spotify with a dynamic gradient.";
const image = "https://currently-playing.now.sh/og.png";

const defaultConfig: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    site_name: title,
    images: [{ url: image }],
  },
  twitter: {
    handle: "@jakerunzer",
    cardType: "summary",
  },
};

const SEO: React.FC<Props> = props => {
  const title =
    props.title != null
      ? `${props.title} | ${defaultConfig.title}`
      : defaultConfig.title;
  const description = props.description || defaultConfig.description;

  return (
    <>
      <DefaultSeo {...defaultConfig} />

      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </>
  );
};

export default SEO;
