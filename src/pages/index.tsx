import { Icons } from "@/components/Icons";
import Button from "@/components/ui/Button";
import ContentLoading from "@/components/ui/ContentLoading";
import DropdownSelect from "@/components/ui/DropdownSelect";
import { useAppContext } from "@/contexts/AppProvider";
import { FRAMEWORK, type Package } from "@/types/globals";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { Calendar, Download, File } from "lucide-react";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  requirement: z.string().min(1, { message: "Please enter your requirement" }),
  framework: z.nativeEnum(FRAMEWORK).default(FRAMEWORK.REACT),
});
type Inputs = z.infer<typeof schema>;

export default function Home() {
  const frameworks = Object.values(FRAMEWORK);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const { generatedPkgs, setGeneratedPkgs } = useAppContext();

  // react-hook-form
  const { register, handleSubmit, formState, control, reset } = useForm<Inputs>(
    {
      resolver: zodResolver(schema),
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // console.log(data);
    setGeneratedPkgs("");
    setIsLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const responseData = response.body;
    if (!responseData) {
      return;
    }

    const reader = responseData.getReader();
    const decoder = new TextDecoder();
    let done = false;
    setIsDone(done);

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedPkgs((prev) => prev + chunkValue);
      setIsDone(done);
    }

    reset();
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>npm Package Picker</title>
      </Head>
      <main className="w-full pt-32 pb-32">
        <div className="container flex max-w-6xl flex-col items-center justify-center gap-10">
          {generatedPkgs ? (
            <Fragment>
              <h1 className="max-w-2xl text-center text-3xl font-bold leading-tight text-gray-50 sm:text-5xl sm:leading-tight">
                Here are your packages
              </h1>
              <div className="grid w-full max-w-2xl place-items-center gap-10">
                <Button
                  aria-label="search again"
                  className="w-fit"
                  onClick={() => {
                    setGeneratedPkgs("");
                  }}
                >
                  Search again
                </Button>
                <div className="grid w-full gap-2">
                  {generatedPkgs.split("\n").map((pkg) => (
                    <PackageCard
                      key={crypto.randomUUID()}
                      data={pkg}
                      isDone={isDone}
                    />
                  ))}
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <h1 className="max-w-2xl text-center text-3xl font-bold leading-tight text-gray-50 sm:text-5xl sm:leading-tight">
                Find the best npm{" "}
                <span className="text-blue-500">packages</span> for your project
              </h1>
              <form
                aria-label="form for finding NPM packages"
                className="grid w-full max-w-xl gap-7"
                onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
              >
                <fieldset className="grid gap-5">
                  <label
                    htmlFor="requirement"
                    className="flex items-center gap-2.5 text-sm font-medium sm:text-base"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gray-500 text-xs font-bold text-white sm:text-sm">
                      1
                    </span>
                    <span className="flex-1 text-gray-50">
                      Enter your requirement
                    </span>
                  </label>
                  <textarea
                    id="requirement"
                    rows={2}
                    className="w-full rounded-md border-gray-400 bg-transparent px-4 pt-2.5 text-base text-gray-50 transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-800"
                    placeholder="e.g. Table"
                    {...register("requirement")}
                  />
                  {formState.errors.requirement ? (
                    <p className="-mt-1.5 text-sm font-medium text-red-500">
                      {formState.errors.requirement.message}
                    </p>
                  ) : null}
                </fieldset>
                <fieldset className="grid gap-5">
                  <label
                    htmlFor="framework"
                    className="flex items-center gap-2.5 text-sm font-medium  sm:text-base"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gray-500 text-xs font-bold text-white sm:text-sm">
                      2
                    </span>
                    <span className="flex-1 text-gray-50">
                      Select your framework
                    </span>
                  </label>
                  <DropdownSelect
                    control={control}
                    name="framework"
                    options={frameworks}
                  />
                  {formState.errors.framework ? (
                    <p className="-mt-1.5 text-sm font-medium text-red-500">
                      {formState.errors.framework.message}
                    </p>
                  ) : null}
                </fieldset>
                <Button
                  aria-label="Find packages"
                  className="w-full"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Find packages
                </Button>
              </form>
            </Fragment>
          )}
        </div>
      </main>
    </>
  );
}

// PackageCard.tsx
const PackageCard = ({ data, isDone }: { data: string; isDone: boolean }) => {
  const formattedPkg = data.replace(/[0-9]+. /, "").trim();
  const [name, description] = formattedPkg.split(": ");
  const [pkgData, setPkgData] = useState<Package>({
    name: "",
    downloads: "",
    lastPublish: "",
    repository: "",
    unpackedSize: "",
  });

  useEffect(() => {
    if (!isDone) return;
    const fetchPackage = async () => {
      const response = await fetch("/api/getPkgData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = (await response.json()) as Package;
      setPkgData(data);
    };
    fetchPackage();
  }, [name, isDone]);

  return (
    <div className="grid gap-1 rounded-md bg-gray-600/60 px-6 pt-3 pb-5 shadow-md backdrop-blur-sm backdrop-filter">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold capitalize text-gray-50 sm:text-xl">
          {name}
        </h2>
        <div className="flex items-center gap-2.5">
          {isDone && pkgData.repository ? (
            <a
              href={`https://${pkgData.repository}`}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gray-50"
            >
              <span className="sr-only">View on GitHub</span>
              <Icons.gitHub className="h-4 w-4 text-gray-300 transition-colors hover:text-gray-50 active:scale-95" />
            </a>
          ) : (
            <ContentLoading srText="loading github icon" variant="circle" />
          )}
          <a
            href={`https://www.npmjs.com/package/${name}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 "
          >
            <span className="sr-only">View on npm</span>
            <Icons.npm className="h-8 w-8 text-gray-300 transition-colors hover:text-gray-50 active:scale-95" />
          </a>
        </div>
      </div>
      <p className="text-sm text-gray-300 sm:text-base">{description}</p>
      <div className="mt-2 flex items-center gap-2.5">
        {isDone && pkgData.downloads ? (
          <div className="flex items-center gap-1.5">
            <Download className="h-4 w-4 text-gray-300" />
            <span className="text-sm font-medium text-gray-400">
              {pkgData.downloads ? pkgData.downloads.toLocaleString() : "N/A"}
            </span>
            <span className="sr-only">downloads</span>
          </div>
        ) : (
          <ContentLoading srText="loading downloads" />
        )}
        {isDone && pkgData.lastPublish ? (
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-gray-300" />
            <span className="text-sm font-medium text-gray-400">
              {pkgData.lastPublish
                ? dayjs(pkgData.lastPublish).format("MMM D, YYYY")
                : "N/A"}
            </span>
            <span className="sr-only">last publish</span>
          </div>
        ) : (
          <ContentLoading srText="loading last publish" />
        )}
        {isDone && pkgData.unpackedSize ? (
          <div className="flex items-center gap-1.5">
            <File className="h-4 w-4 text-gray-300" />
            <span className="text-sm font-medium text-gray-400">
              {pkgData.unpackedSize ? pkgData.unpackedSize : "N/A"}
            </span>
            <span className="sr-only">unpacked size</span>
          </div>
        ) : (
          <ContentLoading srText="loading unpacked size" />
        )}
      </div>
    </div>
  );
};
