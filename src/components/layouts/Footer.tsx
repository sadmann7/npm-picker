const Footer = () => {
  return (
    <footer aria-label="footer">
      <div className="grid place-items-center bg-slate-800/80 py-5">
        <h1 className="text-sm text-slate-400 sm:text-base">
          Powered by{" "}
          <a
            aria-label="navigate to openai"
            href="https://openai.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-slate-200 transition-colors hover:text-white active:text-slate-100"
          >
            OpenAI
          </a>
          {", and "}
          <a
            aria-label="navigate to vercel"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-slate-200 transition-colors hover:text-white active:text-slate-100"
          >
            Vercel
          </a>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
