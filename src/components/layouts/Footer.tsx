const Footer = () => {
  return (
    <footer
      aria-label="footer"
      className="bg-gradient-to-b from-gray-700/80 to-gray-800"
    >
      <div className="container grid w-full max-w-6xl place-items-center py-5 text-center">
        <h1 className="text-sm text-gray-400 sm:text-base">
          Powered by{" "}
          <a
            aria-label="navigate to openai"
            href="https://openai.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gray-300 transition-colors hover:text-gray-100 active:text-gray-300"
          >
            OpenAI
          </a>
          {", and "}
          <a
            aria-label="navigate to vercel"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-gray-300 transition-colors hover:text-gray-100 active:text-gray-300"
          >
            Vercel
          </a>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
