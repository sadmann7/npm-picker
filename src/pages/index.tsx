import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  requirement: z.string().min(1),
});
type Inputs = z.infer<typeof schema>;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState("");

  // react-hook-form
  const { register, handleSubmit, formState, control, reset } = useForm<Inputs>(
    {
      resolver: zodResolver(schema),
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setPackages("");
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

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setPackages((prev) => prev + chunkValue);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>NPM Package Picker</title>
      </Head>
      <main className="container mt-32 mb-16 flex flex-col items-center justify-center gap-14">
        <div className="grid max-w-2xl place-items-center gap-5">
          <h1 className="text-center text-3xl font-bold leading-tight text-slate-50 sm:text-5xl sm:leading-tight">
            Find the best NPM packages for your project
          </h1>
          <p className="text-center text-lg text-slate-400 sm:text-xl"></p>
        </div>
        <form
          aria-label="form for finding NPM packages"
          className="grid w-full max-w-xl gap-7"
          onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
        >
          <fieldset className="grid gap-5">
            <label
              htmlFor="requirement"
              className="flex gap-2.5 text-sm font-medium text-slate-50 sm:text-base"
            >
              <span className="grid h-6 w-6  place-items-center rounded-full bg-violet-500 text-xs text-white sm:text-sm">
                1
              </span>
              <span className="flex-1">What is your requirement?</span>
            </label>
            <textarea
              id="show"
              className="w-full rounded-md border-slate-400 bg-transparent px-4 pt-2.5 pb-10 text-base text-slate-50 transition-colors placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 sm:pb-6"
              placeholder="e.g. A package that can do..."
              {...register("requirement")}
            />
            {formState.errors.requirement ? (
              <p className="-mt-1.5 text-sm font-medium text-red-500">
                {formState.errors.requirement.message}
              </p>
            ) : null}
          </fieldset>
        </form>
      </main>
    </>
  );
}
