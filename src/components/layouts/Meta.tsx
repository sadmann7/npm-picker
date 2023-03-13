import Head from "next/head";

type MetaProps = {
  siteName?: string;
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
};

const Meta = ({
  siteName = "Meta Tags Generator",
  title = "Meta Tags Generator",
  description = "Generate meta tags for your website with AI",
  image = "https://metatagz.vercel.app/api/og?title=Meta%20Tags%20Generator&description=Generate%20meta%20tags%20for%20your%20website%20with%20AI",
  keywords = "meta tags generator, SEO, Google, website visibility",
  url = "https://metatagz.vercel.app/",
}: MetaProps) => {
  return (
    <Head>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
