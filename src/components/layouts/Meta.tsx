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
  siteName = "npm Package Picker",
  title = "npm Package Picker",
  description = "Find the best npm packages for your project",
  image = "https://npmpicker.vercel.app/api/og?title=npm%20Package%20Picker&description=Find%20the%20best%20npm%20packages%20for%20your%20project",
  keywords = "npm, package, picker, react, vue, angular, svelte, next, gatsby, vite, snowpack, webpack, parcel, rollup, esbuild, vite, sapper, sveltekit, nest, express, fastify, koa, hapi, adonis, loopback, nestjs, nest.js, next.js, gatsby.js, vite.js, snowpack.js, webpack.js, parcel.js, rollup.js, esbuild.js, vite.js, sapper.js, sveltekit.js, nest.js, express.js, fastify.js, koa.js, hapi.js, adonis.js, loopback.js, nestjs.js, nest.js, next.js, gatsby.js, vite.js, snowpack.js, webpack.js, parcel.js, rollup.js, esbuild.js, vite.js, sapper.js, sveltekit.js, nest.js, express.js, fastify.js, koa.js, hapi.js, adonis.js, loopback.js, nestjs.js, nest.js, next.js, gatsby.js, vite.js, snowpack.js, webpack.js, parcel.js, rollup.js, esbuild.js, vite.js, sapper.js, sveltekit.js, nest.js, express.js, fastify.js, koa.js, hapi.js, adonis.js, loopback.js, nestjs.js, nest.js, next.js, gatsby.js, vite.js, snowpack.js, webpack.js, parcel.js, rollup.js, esbuild.js, vite.js, sapper.js, sveltekit.js, nest.js, express.js, fastify.js, koa.js, hapi.js, adonis.js, loopback.js, nestjs.js, nest.js, next.js, gatsby.js, vite.js, snowpack.js, webpack.js, parcel.js, rollup.js, esbuild.js, vite.js, sapper.js, sveltekit.js, nest.js, express.js, fastify.js, koa.js, hapi.js, adonis.js, loopback.js, nestjs.js, nest.js, next.js, gatsby.js, vite.js, snowpack.js, webpack.js, parcel.js, rollup.js, esbuild.js, vite.js, sapper.js, sveltekit.js, nest.js, express.js, fastify.js, koa.js, hapi.js, adonis.js, loopback.js",
  url = "https://npmpicker.vercel.app/",
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
