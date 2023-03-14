import Button from "@/components/ui/Button";
import DropdownSelect from "@/components/ui/DropdownSelect";
import { FRAMEWORK } from "@/types/globals";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  requirement: z.string().min(1, { message: "Please enter your requirement" }),
  framework: z.nativeEnum(FRAMEWORK).default(FRAMEWORK.REACT),
});
type Inputs = z.infer<typeof schema>;

export default function Home() {
  const frameworks = Object.values(FRAMEWORK);

  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState("");

  // react-hook-form
  const { register, handleSubmit, formState, control } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    // setPackages("");
    // setIsLoading(true);
    // const response = await fetch("/api/generate", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     ...data,
    //   }),
    // });

    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }

    // // This data is a ReadableStream
    // const responseData = response.body;
    // if (!responseData) {
    //   return;
    // }

    // const reader = responseData.getReader();
    // const decoder = new TextDecoder();
    // let done = false;

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);
    //   setPackages((prev) => prev + chunkValue);
    // }

    // setIsLoading(false);
  };

  console.log(packages);

  return (
    <>
      <Head>
        <title>NPM Package Picker</title>
      </Head>
      <main className="w-full pt-32 pb-32">
        <div className="container flex flex-col items-center justify-center gap-10">
          <h1 className="max-w-2xl text-center text-3xl font-bold leading-tight text-gray-50 sm:text-5xl sm:leading-tight">
            Find the best NPM packages for your project
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
                rows={3}
                className="w-full rounded-md border-gray-400 bg-transparent px-4 pt-2.5 text-base text-gray-50 transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-900"
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
        </div>
      </main>
    </>
  );
}
